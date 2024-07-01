export const formatOrderExecutionsStatusName = (value?: string) => {
  switch (value) {
    case 'pending':
      return 'Ожидает';
    case 'rejected':
      return 'Отклонено';
    case 'approved':
      return 'Одобрено';
    default:
      return '';
  }
};
