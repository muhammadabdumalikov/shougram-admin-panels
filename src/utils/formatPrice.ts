export const formatPrice = (priceInCents: number, currency = 'EUR') => {
  const priceInDollars = priceInCents / 100;
  const formattedPrice = priceInDollars.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
  return formattedPrice;
};
