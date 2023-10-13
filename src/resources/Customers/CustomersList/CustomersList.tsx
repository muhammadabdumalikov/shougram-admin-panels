import {
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  ResourceComponentInjectedProps,
  TextField,
  TextInput,
} from 'react-admin';

const customersFilters = [
  <TextInput key="1" label="Почта" source="email!$contL" alwaysOn />,
  <TextInput
    key="1"
    type="phone"
    label="Номер телефона"
    source="phoneNumber!$contL"
    alwaysOn
  />,
];

const CustomersList = (props: ResourceComponentInjectedProps) => {
  return (
    <List filters={customersFilters} filter={{ type: 'CUSTOMER' }} {...props}>
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="id" sortable />
        <DateField source="createdAt" sortable label="Дата регистрации" />
        <EmailField source="email" sortable label="Эл. почта" />
        <TextField source="phoneNumber" sortable label="Телефон" />
      </Datagrid>
    </List>
  );
};

export default CustomersList;
