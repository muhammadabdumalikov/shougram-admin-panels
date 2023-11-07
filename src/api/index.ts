import { AppConfig } from 'config';
import { http } from 'services';
import {
  V1AdminPanelArtistProfileApi,
  V1AdminPanelOrdersApi,
} from './generated/api';

export default {
  AdminArtistProfile: new V1AdminPanelArtistProfileApi(
    undefined,
    AppConfig.BASE_API_URL,
    http.axios,
  ),
  AdminOrders: new V1AdminPanelOrdersApi(
    undefined,
    AppConfig.BASE_API_URL,
    http.axios,
  ),
};
