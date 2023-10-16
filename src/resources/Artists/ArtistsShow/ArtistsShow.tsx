import { OrderTypeOrmEntityArtistClient } from 'api/generated';
import React from 'react';
import {
  DateField,
  EmailField,
  FunctionField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { formatArtistProfileStatusName } from '../helpers';
import { VideoPlayerField } from 'components';

const ArtistsShow = () => {
  return (
    <Show title="Артист">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="phoneNumber" label="Номер телефона" />
        <EmailField source="email" label="Эл.почта" />
        <FunctionField
          label="Статус"
          render={(record: OrderTypeOrmEntityArtistClient) =>
            formatArtistProfileStatusName(record.artistProfile?.status)
          }
        />
        <ImageField
          label="Аватар"
          source="artistProfile.avatarFullUrl"
          sx={{
            '& img': {
              minWidth: 200,
              minHeight: 200,
              objectFit: 'cover',
            },
          }}
        />
        <FunctionField
          label="Видео визитка"
          render={(record: OrderTypeOrmEntityArtistClient) => {
            return (
              record.artistProfile?.videoPresentationPlaybackId && (
                <VideoPlayerField
                  playbackId={record.artistProfile?.videoPresentationPlaybackId}
                />
              )
            );
          }}
        />
        ;
        <DateField source="createdAt" label="Дата регистрации" />
      </SimpleShowLayout>
    </Show>
  );
};

export default ArtistsShow;
