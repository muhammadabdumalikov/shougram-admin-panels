import { Layout } from 'components';
import { authProvider, dataProvider, i18nProvider } from 'providers';
import { Admin, Resource, ShowGuesser } from 'react-admin';

import { ThemeProvider } from 'styled-components';
import { LoginPage } from 'pages';
import { useDirectionTheme } from 'hooks';
import { Resources } from 'types';
import { CustomersList } from 'resources';
import GroupsIcon from '@mui/icons-material/Groups';

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
          name={Resources.CLIENTS}
          show={ShowGuesser}
          icon={GroupsIcon}
          list={CustomersList}
          options={{ label: 'Заказчики' }}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default App;
