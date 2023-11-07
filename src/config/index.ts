export const AppConfig = {
  BASE_API_URL: import.meta.env.VITE_BASE_URL || '',
  API_URL: `${process.env.REACT_APP_BASE_API_URL}`,
};
