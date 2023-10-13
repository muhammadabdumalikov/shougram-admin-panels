import { AppConfig } from 'config';
import { fetchUtils } from 'react-admin';
import { StorageKeys, StorageService } from 'services';
import crudProvider from './crud-provider';

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = StorageService.getItem(StorageKeys.ACCESS_TOKEN);
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export default crudProvider(AppConfig.BASE_API_URL, httpClient);
