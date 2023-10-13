import { HtmlHTMLAttributes, ReactNode, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useCheckAuth } from 'ra-core';
import { LoginForm } from './components';
import { ErrorResponse } from 'types';
import { useOnFetchError } from 'hooks';

const LoginPage = (props: LoginProps) => {
  const { children, backgroundImage, ...rest } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  let backgroundImageLoaded = false;
  const checkAuth = useCheckAuth();
  const navigate = useNavigate();
  const { onError } = useOnFetchError();

  useEffect(() => {
    checkAuth({}, false)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        onError(error as ErrorResponse);
        navigate('/login');
      });
  }, [checkAuth, navigate]);

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      backgroundImageLoaded = true;
    }
  };

  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = updateBackgroundImage;
      img.src = backgroundImage;
    }
  };

  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage();
    }
  });

  return (
    <Root {...rest} ref={containerRef}>
      <Card className={LoginClasses.card}>
        <div className={LoginClasses.avatar}>
          <Avatar className={LoginClasses.icon}>
            <LockIcon />
          </Avatar>
        </div>
        {children}
      </Card>
    </Root>
  );
};

export default LoginPage;

export interface LoginProps extends HtmlHTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
  sx?: SxProps;
}

const PREFIX = 'RaLogin';
export const LoginClasses = {
  card: `${PREFIX}-card`,
  avatar: `${PREFIX}-avatar`,
  icon: `${PREFIX}-icon`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height: '1px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage:
    'radial-gradient(circle at 50% 14em, #8937FB 0%, #410E93 50%, #410E93 100%)',

  [`& .${LoginClasses.card}`]: {
    minWidth: 300,
    marginTop: '6em',
  },
  [`& .${LoginClasses.avatar}`]: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${LoginClasses.icon}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

LoginPage.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

LoginPage.defaultProps = {
  children: <LoginForm />,
};
