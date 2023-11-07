import { OrderTypeOrmEntity } from 'api/generated';

export const getOrderPriceLabel = (record: OrderTypeOrmEntity) => {
  const payment = record.orderPayments.find(
    (payment) => payment.status === 'payed',
  );

  return payment?.amount
    ? payment.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: payment.currency,
      })
    : '';
};
