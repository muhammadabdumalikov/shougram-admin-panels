import {
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AuthActionType,
  AUTH_GET_PERMISSIONS,
} from 'react-admin';
import { http, StorageService } from 'services';
import { StorageKeys } from 'services/storage';
import decodeJwt from 'jwt-decode';
import { JWTToken } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authProvider = (type: AuthActionType, params: any): Promise<any> => {
  console.log(type);
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return http
      .post('/v1/admins/sign-in', { username, password })
      .then(({ data }) => {
        if (data.token) {
          http.setAuthorizationHeader(data.token);
          StorageService.setItem(StorageKeys.ACCESS_TOKEN, data.token);
          StorageService.setItem(StorageKeys.ROLE, data?.admin?.role);
        }
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  if (type === AUTH_LOGOUT) {
    StorageService.resetItem(StorageKeys.ACCESS_TOKEN);
    StorageService.resetItem(StorageKeys.ROLE);
    StorageService.resetItem(StorageKeys.PERMISSIONS);

    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params?.response?.status;

    if (status === 401 || status === 403) {
      StorageService.resetItem(StorageKeys.ACCESS_TOKEN);
      StorageService.resetItem(StorageKeys.ROLE);
      StorageService.resetItem(StorageKeys.PERMISSIONS);
      return Promise.reject();
    }

    return Promise.resolve();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem(StorageKeys.ROLE);
    const token = StorageService.getItem(StorageKeys.ACCESS_TOKEN);
    const decodedToken = decodeJwt<JWTToken>(token || '');
    return role
      ? Promise.resolve({ role, permissions: decodedToken.permissions })
      : Promise.reject();
  }

  if (type === AUTH_CHECK) {
    const token = StorageService.getItem(StorageKeys.ACCESS_TOKEN);
    const code = StorageService.getItem(StorageKeys.CODE);
    if (token) {
      http.setAuthorizationHeader(token);
      return Promise.resolve();
    } else if (code) {
      return Promise.resolve(code);
    }
    return Promise.reject();
  }
  return Promise.reject(new Error('Unknown method'));
};

export default authProvider;
