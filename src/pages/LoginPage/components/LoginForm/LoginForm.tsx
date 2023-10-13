import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Button, CardContent, CircularProgress } from '@mui/material';
import { Form, useLogin, useNotify, useSafeSetState } from 'ra-core';
import { FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { LoginFormFields } from './LoginFormFields';

const LoginForm = (props: LoginFormProps) => {
  const { redirectTo, className } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const login = useLogin();
  const notify = useNotify();

  const submit = (values: FieldValues) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
        setErrorMessage('');
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error);

        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          {
            type: 'warning',
            messageArgs: {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          },
        );
      });
  };

  return (
    <StyledForm onSubmit={submit} mode="onChange" className={className}>
      <CardContent className={LoginFormClasses.content}>
        <LoginFormFields errorMessage={errorMessage} />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
          fullWidth
          className={LoginFormClasses.button}
        >
          {loading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            'Войти'
          )}
        </Button>
      </CardContent>
    </StyledForm>
  );
};

export default LoginForm;

const PREFIX = 'RaLoginForm';

export const LoginFormClasses = {
  content: `${PREFIX}-content`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoginFormClasses.content}`]: {
    width: 300,
  },
  [`& .${LoginFormClasses.button}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${LoginFormClasses.icon}`]: {
    margin: theme.spacing(0.3),
  },
}));

export interface LoginFormProps {
  redirectTo?: string;
  className?: string;
}

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
};
