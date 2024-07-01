export const formatOrderStatusName = (value?: string) => {
  switch (value) {
    case 'pending_payment':
      return 'Ожидает оплаты';
    case 'pending':
      return 'Ожидает';
    case 'accepted':
      return 'Принято';
    case 'rejected':
      return 'Отклонено';
    case 'cancelled':
      return 'Отменено';
    case 'done_waiting_for_approval':
      return 'Ожидает одобрения';
    case 'done_approved':
      return 'Выполнено';
    case 'waiting_for_rework':
      return 'Ожидает доработки';
    case 'under_consideration':
      return 'На рассмотрении';
    case 'done_after_consideration':
      return 'Принято после согласования';
    case 'reject_after_consideration':
      return 'Отклонено после согласования';
    default:
      return '';
  }
};
