export const formatArtistProfileStatusName = (value?: string) => {
  switch (value) {
    case 'new':
      return 'Новый';
    case 'active':
      return 'Активный';
    case 'blocked':
      return 'Заблокирован';
    default:
      return '';
  }
};
