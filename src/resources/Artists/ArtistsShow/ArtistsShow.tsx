import { OrderTypeOrmEntityArtistClient } from 'api/generated';
import React from 'react';
import {
  DateField,
  EmailField,
  FunctionField,
  ImageField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';
import { formatArtistProfileStatusName } from '../helpers';
import { VideoPlayerField } from 'components';
import { ShowActions } from './components';

const ArtistsShow = () => {
  return (
    <Show actions={<ShowActions />} title="Артист">
      <TabbedShowLayout>
        <Tab label="Об артисте">
          <TextField source="id" />
          <TextField source="artistProfile.name" label="Имя/Псевдоним" />
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
                width: 250,
                minHeight: 250,
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
                    playbackId={
                      record.artistProfile?.videoPresentationPlaybackId
                    }
                  />
                )
              );
            }}
          />
          ;
          <DateField source="createdAt" label="Дата регистрации" />
        </Tab>
        <Tab label="Об услугах">
          <FunctionField
            label="Стоимость"
            render={(record: OrderTypeOrmEntityArtistClient) => {
              return record?.artistProfile?.service?.amount
                ? ` ${record.artistProfile.service.amount.toLocaleString(
                  'ja-JP',
                  {
                    style: 'currency',
                    currency: record.artistProfile.service.currency,
                  },
                )} `
                : null;
            }}
          />
          <TextField
            source="artistProfile.service.limitDays"
            label="Срок выполнения заказа"
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default ArtistsShow;
