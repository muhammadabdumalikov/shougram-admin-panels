import React from 'react';
import {
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { ShowActions } from './components';

const CustomersShow = () => {
  return (
    <Show title="Заказчик" actions={<ShowActions />}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="customerProfile.nickName" label="Никнейм" />
        <EmailField source="email" label="Эл.почта" />
        <TextField source="phoneNumber" label="Номер телефона" />
        <DateField source="createdAt" label="Дата регистрации" />
      </SimpleShowLayout>
    </Show>
  );
};

export default CustomersShow;
