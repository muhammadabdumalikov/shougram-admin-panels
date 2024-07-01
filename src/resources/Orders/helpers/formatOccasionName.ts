export const formatOccasionName = (value?: string) => {
  switch (value) {
    case 'birthday':
      return 'День рождения';
    case 'wedding':
      return 'Свадьба';
    case 'new_year':
      return 'Новый год';
    case 'anniversary':
      return 'Годовщина';
    case 'guidance':
      return 'Напутствие';
    case 'advice':
      return 'Совет';
    case 'other':
      return 'Другое';
    default:
      return '';
  }
};
