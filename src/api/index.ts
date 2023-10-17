import { AppConfig } from 'config';
import { http } from 'services';
import { V1AdminPanelArtistProfileApi } from './generated/api';

export default {
  AdminArtistProfile: new V1AdminPanelArtistProfileApi(
    undefined,
    AppConfig.BASE_API_URL,
    http.axios,
  ),
};
