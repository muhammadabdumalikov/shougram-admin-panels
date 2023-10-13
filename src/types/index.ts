export * from './resources';

export type ErrorResponse = {
  body: {
    error: string;
    message: string[] | string;
    statusCode: number;
  };
  name: string;
  status: number;
};

export type ErrorType = {
  message: string;
  response: {
    status: number;
    data: {
      message: Array<string>;
    };
  };
};

export enum CondOperator {
  EQUALS = '$eq',
  NOT_EQUALS = '$ne',
  GREATER_THAN = '$gt',
  LOWER_THAN = '$lt',
  GREATER_THAN_EQUALS = '$gte',
  LOWER_THAN_EQUALS = '$lte',
  STARTS = '$starts',
  ENDS = '$ends',
  CONTAINS = '$cont',
  EXCLUDES = '$excl',
  IN = '$in',
  NOT_IN = '$notin',
  IS_NULL = '$isnull',
  NOT_NULL = '$notnull',
  BETWEEN = '$between',
  EQUALS_LOW = '$eqL',
  NOT_EQUALS_LOW = '$neL',
  STARTS_LOW = '$startsL',
  ENDS_LOW = '$endsL',
  CONTAINS_LOW = '$contL',
  EXCLUDES_LOW = '$exclL',
  IN_LOW = '$inL',
  NOT_IN_LOW = '$notinL',
}

export enum AdsType {
  SHOP = 'SHOP',
  GOODS = 'GOODS',
  ALL = 'ALL',
}

export enum CountriesType {
  SERBIA = 'SERBIA',
  MONTENEGRO = 'MONTENEGRO',
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
}

export interface Option {
  id: string;
  name: string;
}

export interface PermissionOptions {
  holderPermissions: Option[];
  jobTitlesPermissions: Option[];
  categoriesPermissions: Option[];
  companiesPermissions: Option[];
  managersPermissions: Option[];
  QRCodesPermissions: Option[];
  requestsPermissions: Option[];
  statisticPermissions: Option[];
  vacanciesPermissions: Option[];
  adsPermissions: Option[];
}

export interface JWTToken {
  permissions: string[];
  tokenType: string;
}

export interface PermissionsData {
  permissions: string[];
  role: string;
}

export interface ImageSizeType {
  width: number;
  height: number;
}
