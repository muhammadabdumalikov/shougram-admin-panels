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
} from 'react-admin';
import { formatOrderStatusName } from '../helpers';
import { OrderPaymentStatusButton } from '../components';

const ordersFilters = [
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
  <SelectInput
    key="status"
    label="Статус"
    source="status!$eq"
    choices={Object.values(ORDERSTATUS).map((value) => {
      return {
        id: value,
        name: formatOrderStatusName(value),
      };
    })}
    alwaysOn
  />,
  <SelectInput
    key="fundsTransferredToArtist"
    label="Средства выплачены"
    source="fundsTransferredToArtist"
    choices={[
      {
        id: true,
        name: 'Да',
      },
      {
        id: false,
        name: 'Нет',
      },
    ]}
    alwaysOn
  />,
  <DateInput
    key="createdAtStart"
    label="Создана с"
    source="createdAt!$gte"
    alwaysOn
  />,
  <DateInput
    key="createdAtEnd"
    label="Создана до"
    source="createdAt!$lte"
    alwaysOn
  />,
];

const OrdersList: FC<ListProps> = (props) => {
  return (
    <List
      filters={ordersFilters}
      filterDefaultValues={{ status: ORDERSTATUS.UnderConsideration }}
      sort={{ field: 'createdAt', order: 'DESC' }}
      {...props}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="id" />
        <ReferenceField
          source="artistClientId"
          reference="artists"
          label="Id артиста"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>
        <ReferenceField
          source="customerClientId"
          reference="customers"
          label="Id заказчика"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>
        <FunctionField
          label="Статус"
          sortBy="status"
          render={(record: OrderTypeOrmEntity) =>
            formatOrderStatusName(record.status)
          }
        />
        <DateField source="createdAt" label="Дата создания" />
        <FunctionField
          label="Средства выплачены артисту"
          render={(record: OrderTypeOrmEntity) =>
            typeof record.fundsTransferredToArtist === 'boolean' && (
              <OrderPaymentStatusButton
                isFundsTransferredToArtist={record.fundsTransferredToArtist}
              />
            )
          }
        />
      </Datagrid>
    </List>
  );
};

export default OrdersList;
