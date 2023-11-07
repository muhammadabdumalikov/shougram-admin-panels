export const formatPaymentStatusName = (value?: string) => {
  switch (value) {
    case 'pending_pay':
      return 'Ожидает оплаты';
    case 'payed':
      return 'Оплачено';
    case 'pending_refund':
      return 'Ожидает возврата средств';
    case 'refunded':
      return 'Средства возвращены';
    default:
      return '';
  }
};
