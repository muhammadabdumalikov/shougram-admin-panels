import { FC, useEffect } from 'react';
import { TextInput } from 'react-admin';
import { required, useTranslate } from 'ra-core';
import { useFormContext } from 'react-hook-form';

interface LoginFormFieldsProps {
  errorMessage?: string;
}

export const LoginFormFields: FC<LoginFormFieldsProps> = ({ errorMessage }) => {
  const { setError } = useFormContext();
  const translate = useTranslate();

  useEffect(() => {
    setError('username', { message: errorMessage });
    setError('password', { message: errorMessage });
  }, [errorMessage]);

  return (
    <>
      <TextInput
        autoFocus
        source="username"
        label={'Имя пользователя'}
        validate={[required('Поле обязательно для заполнения')]}
        fullWidth
      />
      <TextInput
        source="password"
        label={'Пароль'}
        type="password"
        autoComplete="current-password"
        validate={required('Поле обязательно для заполнения')}
        fullWidth
      />
    </>
  );
};
