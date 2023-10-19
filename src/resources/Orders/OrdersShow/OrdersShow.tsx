import {
  ArtistOrderResponseDto,
  OrderExecutionBaseResponseDto,
  OrderPaymentBaseResponseDto,
  OrderTypeOrmEntity,
} from 'api/generated';
import React from 'react';
import {
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  FunctionField,
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';
import {
  formatOccasionName,
  formatOrderExecutionsStatusName,
  formatOrderStatusName,
  formatPaymentStatusName,
} from '../helpers';
import { VideoPlayerField } from 'components';
import { OrderPaymentStatusButton } from '../components';
import { ShowActions } from './components';

const OrdersShow = () => {
  return (
    <Show title="Заявка" actions={<ShowActions />}>
      <TabbedShowLayout>
        <Tab label="О заявке">
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
          <DateField source="createdAt" label="Дата создания" />
        </Tab>
        <Tab label="О видео">
          <FunctionField
            label="Кому"
            render={(record: ArtistOrderResponseDto) =>
              `${record.orderDetails?.toPerson?.name}, ${
                record.orderDetails?.toPerson?.gender === 'male'
                  ? 'мужчина'
                  : 'женщина'
              }`
            }
          />
          <FunctionField
            label="От кого"
            render={(record: ArtistOrderResponseDto) => {
              return record.orderDetails.type === 'another'
                ? `${record.orderDetails?.fromPerson?.name}, ${
                    record.orderDetails?.fromPerson?.gender === 'male'
                      ? 'мужчина'
                      : 'женщина'
                  }`
                : '';
            }}
          />
          <TextField source="orderDetails.textToVideo" label="Текст к видео" />
          <FunctionField
            label="Случай"
            render={(record: ArtistOrderResponseDto) =>
              formatOccasionName(record.occasion)
            }
          />
        </Tab>
        <Tab label="История выполнения">
          <ArrayField source="orderExecutions" label="">
            <Datagrid bulkActionButtons={false}>
              <FunctionField
                label="Видео"
                render={(record: OrderExecutionBaseResponseDto) => {
                  return (
                    record.videoFilePlaybackId && (
                      <VideoPlayerField
                        playbackId={record.videoFilePlaybackId}
                      />
                    )
                  );
                }}
              />
              <FunctionField
                label="Cтатус"
                render={(record: OrderExecutionBaseResponseDto) =>
                  formatOrderExecutionsStatusName(record.status)
                }
              />
              <DateField showTime source="createdAt" label="Дата создания" />
              <BooleanField
                source="viewedByCustomer"
                label="Просмотрено заказчиком"
              />
              <TextField
                source="customerRejectComment"
                label="Комментарий заказчика"
              />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="История платежей">
          <ArrayField source="orderPayments" label="">
            <Datagrid bulkActionButtons={false}>
              <DateField source="createdAt" label="Дата создания" showTime />
              <FunctionField
                label="Статус платежа"
                render={(record: OrderPaymentBaseResponseDto) =>
                  formatPaymentStatusName(record.status)
                }
              />
              <FunctionField
                label="Размер платежа"
                render={(record: OrderPaymentBaseResponseDto) =>
                  record.amount &&
                  record?.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: record.currency,
                  })
                }
              />
              <TextField source="transactionId" label="Id транзакции" />
              <FunctionField
                label="Ошибка"
                render={(record: OrderPaymentBaseResponseDto) =>
                  record.errorMessage &&
                  Object.values(record.errorMessage).join(',')
                }
              />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default OrdersShow;
