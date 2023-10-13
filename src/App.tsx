import { Layout } from 'components';
import { authProvider, dataProvider, i18nProvider } from 'providers';
import { Admin, Resource } from 'react-admin';

import { ThemeProvider } from 'styled-components';
import { LoginPage } from 'pages';
import { useDirectionTheme } from 'hooks';
import {
  ArtistsList,
  ArtistsShow,
  CustomersList,
  CustomersShow,
} from 'resources';
import GroupsIcon from '@mui/icons-material/Groups';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

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
        />
        <Resource
          name="customers"
          icon={GroupsIcon}
          list={CustomersList}
          show={CustomersShow}
          options={{ label: 'Заказчики' }}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default App;
