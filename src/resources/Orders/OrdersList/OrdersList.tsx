import { FC } from 'react';
import {
  Datagrid,
  List,
  TextField,
  TextInput,
  ListProps,
  BooleanField,
} from 'react-admin';

const customersFilters = [
  <TextInput
    key="id"
    label="Id (введите полностью)"
    source="id!$eq"
    alwaysOn
  />,
  <TextInput
    key="artistClientId!$eq"
    label="Id артиста (введите полностью)"
    source="artistClientId!$eq"
    alwaysOn
  />,
  <TextInput
    key="customerClientId!$eq"
    label="Id заказчика (введите полностью)"
    source="customerClientId!$eq"
    alwaysOn
  />,
];

const OrdersList: FC<ListProps> = (props) => {
  return (
    <List filters={customersFilters} {...props}>
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="id" sortable />
        <TextField source="customerClientId" sortable label="Id заказчика" />
        <TextField source="artistClientId" sortable label="Id артиста" />
        <TextField source="status" sortable label="Статус" />
        {/* <BooleanField
          source="fundsTransferredToArtist"
          label="Средства выплачены артисту"
        /> */}
      </Datagrid>
    </List>
  );
};

export default OrdersList;
