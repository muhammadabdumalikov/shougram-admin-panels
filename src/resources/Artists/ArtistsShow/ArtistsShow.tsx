import React from 'react';
import {
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

const ArtistsShow = () => {
  return (
    <Show title="Артист">
      <SimpleShowLayout>
        <TextField source="id" />
        <DateField source="createdAt" label="Дата регистрации" />
        <TextField source="phoneNumber" label="Номер телефона" />
        <EmailField source="email" label="Эл.почта" />
        <TextField source="status" />
      </SimpleShowLayout>
    </Show>
  );
};

export default ArtistsShow;
