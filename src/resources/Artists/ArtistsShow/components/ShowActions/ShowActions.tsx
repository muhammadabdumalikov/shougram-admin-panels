import React from 'react';
import { TopToolbar, useRecordContext } from 'react-admin';
import { UpdateArtistStatusButton } from '../../../components';
import {
  AdminUpdateArtistProfileDtoStatusEnum,
  ClientTypeOrmEntity,
} from 'api/generated';

const ShowActions = () => {
  const record = useRecordContext<ClientTypeOrmEntity>();
  return (
    <TopToolbar>
      {record.artistProfile?.status !==
        AdminUpdateArtistProfileDtoStatusEnum.Active && (
        <UpdateArtistStatusButton isBlock />
      )}
      {record.artistProfile?.status !==
        AdminUpdateArtistProfileDtoStatusEnum.Blocked && (
        <UpdateArtistStatusButton isBlock={false} />
      )}
    </TopToolbar>
  );
};
export default ShowActions;
