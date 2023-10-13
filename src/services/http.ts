import Axios, { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from 'config';

import StorageService, { StorageKeys } from './storage';

export class Http {
  constructor(private readonly axiosInstance: AxiosInstance) {
    this.useInterceptors();
  }

  setAuthorizationHeader(token: string): void {
    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }

  private useInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<AxiosError> => {
        if (error.response?.status === 401) {
          StorageService.resetItem(StorageKeys.ACCESS_TOKEN);
        }
        return Promise.reject(error);
      },
    );
  }

  get get() {
    return this.axiosInstance.get;
  }

  get post() {
    return this.axiosInstance.post;
  }

  get put() {
    return this.axiosInstance.put;
  }

  get patch() {
    return this.axiosInstance.patch;
  }

  get delete() {
    return this.axiosInstance.delete;
  }

  get axios(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default new Http(
  Axios.create({
    baseURL: AppConfig.BASE_API_URL,
  }),
);
