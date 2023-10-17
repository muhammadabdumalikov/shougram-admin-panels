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
  ResourceComponentInjectedProps,
  SelectInput,
  TextField,
  TextInput,
} from 'react-admin';
import { formatArtistProfileStatusName } from '../helpers';

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

const ArtistsList = (props: ResourceComponentInjectedProps) => {
  return (
    <List
      filters={customersFilters}
      filter={{
        type: ClientResponseDtoTypeEnum.Artist,
      }}
      {...props}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="id" sortable />
        <DateField source="createdAt" sortable label="Дата регистрации" />
        <TextField
          source="artistProfile.name"
          sortable={false}
          label="Имя/Псевдоним"
        />
        <EmailField source="email" sortable label="Эл. почта" />
        <TextField source="phoneNumber" sortable label="Телефон" />
        <FunctionField
          label="Статус"
          render={(record: OrderTypeOrmEntityArtistClient) =>
            formatArtistProfileStatusName(record.artistProfile?.status)
          }
        />
      </Datagrid>
    </List>
  );
};

export default ArtistsList;
