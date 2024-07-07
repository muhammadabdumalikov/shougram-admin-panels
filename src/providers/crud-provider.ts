import {
  CondOperator,
  QueryFilter,
  QuerySort,
  RequestQueryBuilder,
} from '@nestjsx/crud-request';
import omitBy from 'lodash.omitby';
import { DataProvider, fetchUtils } from 'ra-core';
import { stringify } from 'query-string';
import { Resources } from 'types';

const countDiff = (
  o1: Record<string, any>,
  o2: Record<string, any>,
): Record<string, any> => omitBy(o1, (v, k) => o2[k] === v);

const composeFilter = (paramsFilter: any): QueryFilter[] => {
  const flatFilter = fetchUtils.flattenObject(paramsFilter);
  return Object.keys(flatFilter).map((key) => {
    const splitKey = key.split(/\|\||:/);
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gi;

    let field = splitKey[0];
    let ops = splitKey[1];
    if (!ops) {
      if (
        typeof flatFilter[key] === 'boolean' ||
        typeof flatFilter[key] === 'number' ||
        (typeof flatFilter[key] === 'string' &&
          flatFilter[key].match(/^\d+$/)) ||
        flatFilter[key].match(uuidRegex)
      ) {
        ops = CondOperator.EQUALS;
      } else {
        ops = CondOperator.CONTAINS_LOW;
      }
    }

    if (field.startsWith('_') && field.includes('.')) {
      field = field.split(/\.(.+)/)[1];
    }
    return { field, operator: ops, value: flatFilter[key] } as QueryFilter;
  });
};

const encodeFilter = (paramsFilter: any): string => {
  const flatFilter = fetchUtils.flattenObject(paramsFilter);
  const stringifiedFilter = Object.keys(flatFilter)
    .map((key) => {
      const splitKey = key.split(/!/);
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gi;

      let field = splitKey[0];
      let ops = splitKey[1];
      if (!ops) {
        if (
          typeof flatFilter[key] === 'boolean' ||
          typeof flatFilter[key] === 'number' ||
          (typeof flatFilter[key] === 'string' &&
            flatFilter[key].match(/^\d+$/)) ||
          flatFilter[key].match(uuidRegex)
        ) {
          ops = CondOperator.EQUALS;
        } else {
          ops = CondOperator.CONTAINS_LOW;
        }
      }

      if (field.startsWith('_') && field.includes('.')) {
        field = field.split(/\.(.+)/)[1];
      }
      return 'filter=' + field + '||' + ops + '||' + flatFilter[key];
    })
    .join('&');
  return encodeURI(stringifiedFilter);
};

const encodeSort = (paramsSort: any): string => {
  const stringifiedSort = 'sort=' + paramsSort.field + ',' + paramsSort.order;
  return encodeURI(stringifiedSort);
};

const composeQueryParams = (queryParams: any = {}): string => {
  return stringify(fetchUtils.flattenObject(queryParams), { skipNull: true });
};

const mergeEncodedQueries = (...encodedQueries: any[]) =>
  encodedQueries.map((query) => query).join('&');

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
): DataProvider => ({
  getList: (resource, params) => {
    if (resource === 'artists' || resource === 'customers') {
      resource = Resources.CLIENTS;
    }
    const { page, perPage } = params.pagination;
    const { q: queryParams, $OR: orFilter, ...filter } = params.filter || {};

    const encodedQueryParams = composeQueryParams(queryParams);
    const encodedQueryFilter = RequestQueryBuilder.create()
      .setLimit(perPage)
      .setPage(page)
      .setOffset((page - 1) * perPage)
      .query();

    const query = mergeEncodedQueries(
      encodedQueryParams,
      encodedQueryFilter,
      encodeFilter(filter),
      encodeSort(params.sort),
    );
    const url = resource === "promocode" ? `${apiUrl}/${Resources.PROMOCODELIST}` : resource === "secrets" ? `${apiUrl}/${Resources.SECRETSLIST}` : `${apiUrl}/${resource}?${query}`;
    const returnData =
      (resource === "promocode" || resource === "secrets")
        ?
        // @ts-ignore
        httpClient(url, { method: "POST", body: JSON.stringify({ page, perPage }) }).then(({ json }) => ({
          data: json.items?.map((item: any) => { return { ...item, id: resource === "secrets" ? item?.id : item?.code } }),
          total: json.meta.total
        }
        ))
        :
        httpClient(url).then(({ json }) => ({
          data: json.data,
          total: json.total,
        }));

    return returnData

  },

  getOne: (resource, params) => {
    if (resource === 'artists' || resource === 'customers') {
      resource = Resources.CLIENTS;
    }
    // if (resource === 'artists') {
    //   resource = Resources.ARTISTSCREATE;
    // }
    // console.log("crud", params)
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      }),
    );
  },

  getMany: (resource, params) => {
    if (resource === 'artists' || resource === 'customers') {
      resource = Resources.CLIENTS;
    }
    const query = RequestQueryBuilder.create()
      .setFilter({
        field: 'id',
        operator: CondOperator.IN,
        value: `${params.ids}`,
      })
      .query();

    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => ({ data: json.data || json }));
  },

  getManyReference: (resource, params) => {
    if (resource === 'artists' || resource === 'customers') {
      resource = Resources.CLIENTS;
    }
    const { page, perPage } = params.pagination;
    const { q: queryParams, ...otherFilters } = params.filter || {};
    const filter: QueryFilter[] = composeFilter(otherFilters);

    filter.push({
      field: params.target,
      operator: CondOperator.EQUALS,
      value: params.id,
    });

    const encodedQueryParams = composeQueryParams(queryParams);
    const encodedQueryFilter = RequestQueryBuilder.create({
      filter,
    })
      .sortBy(params.sort as QuerySort)
      .setLimit(perPage)
      .setOffset((page - 1) * perPage)
      .query();

    const query = mergeEncodedQueries(encodedQueryParams, encodedQueryFilter);

    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  update: (resource, params) => {
    // if (resource === 'artists' || resource === 'customers') {
    //   resource = Resources.CLIENTS;
    // }
    if (resource === 'artists') {
      resource = Resources.ARTISTSUPDATE;
    }
    // no need to send all fields, only updated fields are enough
    const data = countDiff(params.data, params.previousData);
    console.log(data)
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(({ json }) => (
      { data: json?.client }
    ));
  },

  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }),
      ),
    ).then((responses) => ({
      data: responses.map(({ json }) => json),
    })),
  //@ts-ignore
  create: (resource, params) => {
    // if (resource === 'artists' || resource === 'customers') {
    //   resource = Resources.CLIENTS;
    // }
    if (resource === 'artists') {
      resource = Resources.ARTISTSCREATE;
    } if (resource === 'uploadImage') {
      resource = `${Resources.UPLOADIMAGE}`;
    } if (resource === 'promocode') {
      resource = Resources.PROMOCODECREATE
    } if (resource === "secrets") {
      resource = Resources.SECRETSCREATE
    }
    // if (resource === "service") {
    //   resource = Resources.SERVICESCREATE
    // }

    console.log("crud", params?.data)

    return httpClient(`${resource === "uploadFullImage" ? params?.data?.url : `${apiUrl}/${resource}`}`, {
      method: resource === "uploadFullImage" ? "PUT" : "POST",
      body: JSON.stringify(resource === "uploadFullImage" ? { image: params?.data?.file } : params.data?.formData),
    }).then(({ json }) => ({
      data: { ...json, ...params.data, id: json.clientId, },
    }));
  },

  delete: (resource, params) => {
    // if (resource === 'artists' || resource === 'customers') {
    //   resource = Resources.CLIENTS;
    // }
    let body;

    if (resource === 'artists') {
      resource = Resources.ARTISTSDELETE;
      body = { artistProfileId: params?.previousData?.artistProfile?.id, artistClientId: params?.previousData?.artistProfile?.clientId }
    }
    // else if (resource === 'promocode') {
    //   resource = Resources.PROMOCODEDELETE
    //   body = { id: params?.id }
    // }
    const returnData = (resource === "promocode" || resource === "secrets")
      ?
      httpClient(`${apiUrl}/${resource === "secrets" ? Resources.PROMOCODEDELETE : Resources.PROMOCODEDELETE}/${params?.id}`, {
        method: 'DELETE'
      }).then(({ json }) => ({ data: { ...json, id: params.id } }))
      :
      httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(body)
      }).then(({ json }) => ({ data: { ...json, id: params.id } }))

    return returnData;
  },

  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        }),
      ),
    ).then((responses) => ({ data: responses.map(({ json }) => json) })),
});
