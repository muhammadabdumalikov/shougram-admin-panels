import { ORDERSTATUS, OrderTypeOrmEntity } from 'api/generated';
import { FC } from 'react';
import {
  Datagrid,
  List,
  TextField,
  TextInput,
  ListProps,
  ReferenceField,
  DateField,
  SelectInput,
  FunctionField,
  DateInput,
  DeleteWithConfirmButton,
} from 'react-admin';
import moment from 'moment';

const ServiceList: FC<ListProps> = (props) => {
  return (
    <List
      sort={{ field: 'createdAt', order: 'DESC' }}
      {...props}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="name" label="Name" />
        <TextField source="login" label="Login" />
        <TextField source="email" label="Email" />
        <TextField source="url" label="Url" />
        <DeleteWithConfirmButton
          confirmContent="You will not be able to recover this record. Are you sure?"
          confirmColor="warning"
        // translateOptions={{ name: record?.name }}
        />
      </Datagrid>
    </List>
  );
};

export default ServiceList;
