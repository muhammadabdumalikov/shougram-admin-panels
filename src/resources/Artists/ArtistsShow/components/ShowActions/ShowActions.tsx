import React from 'react';
import { TopToolbar, useRecordContext } from 'react-admin';
import { UpdateArtistStatusButton } from '../../../components';
import {
  AdminUpdateArtistProfileDtoStatusEnum,
  ClientTypeOrmEntity,
} from 'api/generated';
import { Link } from 'react-router-dom';
import { Resources } from 'types';
import { Button } from '@mui/material';
import { stringify } from 'query-string';
import VideoFileIcon from '@mui/icons-material/VideoFile';

const ShowActions = () => {
  const record = useRecordContext<ClientTypeOrmEntity>();

  return (
    <TopToolbar>
      <Button
        size="small"
        color="primary"
        startIcon={<VideoFileIcon />}
        component={Link}
        to={{
          pathname: '/' + Resources.ORDERS,
          search: stringify({
            filter: JSON.stringify({
              artistClientId: record?.id,
            }),
          }),
        }}
        state={{ _scrollToTop: true }}
      >
        Заявки
      </Button>
      {record?.artistProfile?.status !==
        AdminUpdateArtistProfileDtoStatusEnum.Active && (
        <UpdateArtistStatusButton isBlock />
      )}
      {record?.artistProfile?.status !==
        AdminUpdateArtistProfileDtoStatusEnum.Blocked && (
        <UpdateArtistStatusButton isBlock={false} />
      )}
    </TopToolbar>
  );
};
export default ShowActions;
