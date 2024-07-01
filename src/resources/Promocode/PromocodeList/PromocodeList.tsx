import {
  ClientResponseDtoTypeEnum,
  CustomerArtistProfileResponseDTOStatusEnum,
  OrderTypeOrmEntityArtistClient,
} from 'api/generated';
import {
  Datagrid,
  DateField,
  EmailField,
  FunctionField,
  List,
  SelectInput,
  TextField,
  TextInput,
  ListProps,
  EditButton,
  DeleteWithConfirmButton
} from 'react-admin';
import { FC } from 'react';
import { type } from '../constants/promocode';

const customersFilters = [
  <SelectInput
    key="type"
    label="Статус"
    source="ap.status"
    choices={[
      {
        id: CustomerArtistProfileResponseDTOStatusEnum.New,
        name: 'Новый',
      },
      {
        id: CustomerArtistProfileResponseDTOStatusEnum.Active,
        name: 'Активный',
      },
      {
        id: CustomerArtistProfileResponseDTOStatusEnum.Blocked,
        name: 'Заблокирован',
      },
    ]}
    alwaysOn
  />,
  <TextInput
    key="id"
    label="Id (введите полностью)"
    source="id!$eq"
    alwaysOn
  />,
  <TextInput
    key="ap.name"
    label="Имя/Псевдоним"
    source="ap.name!$contL"
    alwaysOn
  />,
  <TextInput key="email" label="Почта" source="email!$contL" alwaysOn />,
  <TextInput
    key="phone"
    type="phone"
    label="Номер телефона"
    source="phoneNumber!$contL"
    alwaysOn
  />,
];

const PromocodeList: FC<ListProps> = (props) => {
  return (
    <List
      // filters={customersFilters}
      // filter={{
      //   type: ClientResponseDtoTypeEnum.Artist,
      // }}
      {...props}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="code" sortable />
        <FunctionField label="Count" render={(record: any) => { return record?.count + " pcs" }} />
        <FunctionField label="Value" render={(record: any) => {
          return record?.value + " " + type?.find((item) => item?.id === record?.type)?.symbol
        }
        } />
        <DateField source="from_date" sortable />
        <DateField source="to_date" sortable />
        {/* <EditButton /> */}
        <DeleteWithConfirmButton
          confirmContent="You will not be able to recover this record. Are you sure?"
          confirmColor="warning"
        // translateOptions={{ name: record?.name }}
        />
      </Datagrid>
    </List>
  );
};

export default PromocodeList;
