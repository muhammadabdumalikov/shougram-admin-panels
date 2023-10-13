import { ErrorType } from 'types';

export const getErrorMessage = (
  err: unknown,
  defaultMessage = 'Something went wrong',
) => {
  const error = err as ErrorType;
  if (typeof error.response.data.message === 'string') {
    return error.response.data.message;
  } else if (error?.response?.data?.message?.[0]) {
    const messages = error.response.data.message;

    return messages.reduce(
      (resultMessage, message) => resultMessage + `${message}. `,
      '',
    );
  } else {
    return defaultMessage;
  }
};
