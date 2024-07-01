export enum StorageKeys {
  ACCESS_TOKEN = 'accessToken',
  DIRECTION_MAIN_COLOR = 'directionMainColor',
  ROLE = 'role',
  CODE = 'code',
  PERMISSIONS = 'permissions',
}

class StorageService {
  getItem(item: StorageKeys) {
    return localStorage.getItem(item);
  }

  setItem(item: StorageKeys, token: string) {
    localStorage.setItem(item, token);
  }

  resetItem(item: StorageKeys) {
    localStorage.removeItem(item);
  }
}

export default new StorageService();
