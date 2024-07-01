import * as React from 'react';
import { Fragment, useCallback, useEffect } from 'react';
import {
  Count,
  DatagridConfigurable,
  TextField,
  useListContext,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@mui/material';
import { ArtistProfileMeResponseDtoStatusEnum } from 'api/generated';

const tabs = [
  { id: ArtistProfileMeResponseDtoStatusEnum.New, name: 'Новые' },
  { id: ArtistProfileMeResponseDtoStatusEnum.Active, name: 'Активные' },
  { id: ArtistProfileMeResponseDtoStatusEnum.Blocked, name: 'Заблокированные' },
];

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  console.log('filterValues', filterValues);

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>, value: string) => {
      setFilters &&
        setFilters(
          {
            ...filterValues,
            'ap.status': value || ArtistProfileMeResponseDtoStatusEnum.New,
          },
          displayedFilters,
          false, // no debounce, we want the filter to fire immediately
        );
    },
    [displayedFilters, filterValues, setFilters],
  );

  useEffect(() => {
    setFilters &&
      setFilters(
        {
          ...filterValues,
          'ap.status': ArtistProfileMeResponseDtoStatusEnum.New,
        },
        displayedFilters,
        false, // no debounce, we want the filter to fire immediately
      );
  }, []);

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues['ap.status']}
        indicatorColor="secondary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} (
                <Count
                  filter={{
                    ...filterValues,
                    'ap.status': choice.id,
                  }}
                  sx={{ lineHeight: 'inherit' }}
                />
                )
              </span>
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      <DatagridConfigurable rowClick="show" bulkActionButtons={false}>
        <TextField source="artistProfile.name" sortable={false} label="Name" />
      </DatagridConfigurable>
    </Fragment>
  );
};

export default TabbedDatagrid;
