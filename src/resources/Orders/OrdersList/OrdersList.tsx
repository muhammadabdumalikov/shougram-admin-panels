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
import { formatOrderStatusName, getOrderPriceLabel } from '../helpers';
import { OrderPaymentStatusButton } from '../components';
import moment from 'moment';

const ordersFilters = [
  <TextInput
    key="number"
    label="Номер заказа (введите полностью)"
    source="number!$eq"
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
    parse={(value) => moment(value).startOf('day').toISOString()}
    alwaysOn
  />,
  <DateInput
    key="createdAtEnd"
    label="Создана по"
    source="createdAt!$lte"
    parse={(value) => moment(value).endOf('day').toISOString()}
    alwaysOn
  />,
];

const OrdersList: FC<ListProps> = (props) => {
  return (
    <List
      filters={ordersFilters}
      filterDefaultValues={{ 'status!$eq': ORDERSTATUS.UnderConsideration }}
      sort={{ field: 'createdAt', order: 'DESC' }}
      {...props}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <TextField source="number" label="Номер заказа" />
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
          label="Стоимость"
          render={(record: OrderTypeOrmEntity) => getOrderPriceLabel(record)}
        />
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
