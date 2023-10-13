import { RaThemeOptions } from 'react-admin';
import { AdminTheme } from 'styles';

const useDirectionTheme = () => {
  const currentTheme: RaThemeOptions = {
    ...AdminTheme,
    palette: AdminTheme.palette,
  };

  return { currentTheme };
};

export default useDirectionTheme;
