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
          <TextField source="profile.name" label="Имя/Псевдоним" />
          <TextField source="phoneNumber" label="Номер телефона" />
          <EmailField source="email" label="Эл.почта" />
          <FunctionField
            label="Статус"
            render={(record: any) =>
              formatArtistProfileStatusName(record.profile?.status)
            }
          />
          <ImageField
            label="Аватар"
            source="profile.avatarFullUrl"
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
            render={(record: any) => {
              return (
                record.profile?.videoPresentationPlaybackId && (
                  <VideoPlayerField
                    playbackId={
                      record.profile?.videoPresentationPlaybackId
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
            render={(record: any) => {
              return record?.profile?.services?.[0]?.amount
                ? ` ${record.profile.services[0].amount.toLocaleString(
                  'ja-JP',
                  {
                    style: 'currency',
                    currency: record.profile.services[0].currency,
                  },
                )} `
                : null;
            }}
          />
          <TextField
            source="profile.services[0].limitDays"
            label="Срок выполнения заказа"
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default ArtistsShow;
