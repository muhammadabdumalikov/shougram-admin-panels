import { Layout } from 'components';
import { authProvider, dataProvider, i18nProvider } from 'providers';
import { Admin, Resource } from 'react-admin';

import { ThemeProvider } from 'styled-components';
import { LoginPage } from 'pages';
import { useDirectionTheme } from 'hooks';
import {
  ArtistsList,
  ArtistsCreate,
  ArtistsEdit,
  ArtistsShow,
  CustomersList,
  CustomersShow,
  OrdersList,
  OrdersShow,
  SecretsList,
  SecretsCreate,
  ServiceList,
  ServiceCreate
} from 'resources';
import GroupsIcon from '@mui/icons-material/Groups';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import QrCodeIcon from '@mui/icons-material/QrCode';
import KeyIcon from '@mui/icons-material/Key';
import { Resources } from 'types';
import { PromocodeCreate, PromocodeList } from 'resources/Promocode';

const App = () => {
  const { currentTheme } = useDirectionTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <Admin
        theme={currentTheme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={Layout}
        loginPage={LoginPage}
        i18nProvider={i18nProvider}
        requireAuth
      >
        <Resource
          name="artists"
          icon={FaceRetouchingNaturalIcon}
          show={ArtistsShow}
          list={ArtistsList}
          options={{ label: 'Артисты' }}
          create={ArtistsCreate}
          edit={ArtistsEdit}
        />
        <Resource
          name="customers"
          icon={GroupsIcon}
          list={CustomersList}
          show={CustomersShow}
          options={{ label: 'Заказчики' }}
        />
        <Resource
          name={Resources.ORDERS}
          icon={VideoFileIcon}
          list={OrdersList}
          show={OrdersShow}
          options={{ label: 'Заявки' }}
        />
        <Resource
          name={"secrets"}
          icon={KeyIcon}
          list={SecretsList}
          // show={OrdersShow}
          options={{ label: 'Secrets' }}
          create={SecretsCreate}
        />
        <Resource
          name={"promocode"}
          icon={QrCodeIcon}
          list={PromocodeList}
          // show={OrdersShow}
          options={{ label: 'Promocode' }}
          create={PromocodeCreate}
        />
        {/* <Resource
          name={"service"}
          icon={MiscellaneousServicesIcon}
          list={ServiceList}
          // show={OrdersShow}
          options={{ label: 'Service' }}
          create={ServiceCreate}
        /> */}
      </Admin>
    </ThemeProvider>
  );
};

export default App;
