export const formatSalary = (value: number) => {
  const devidedValue = String(value).split('.');
  if (devidedValue.length > 1) {
    if (devidedValue[1].length > 1) {
      return parseInt(String(value).replace('.', ''));
    } else {
      return parseInt(String(value).replace('.', '')) * 10;
    }
  }

  return value * 100;
};
