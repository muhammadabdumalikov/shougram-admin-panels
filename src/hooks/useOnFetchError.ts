import { useNotify } from 'react-admin';
import { ErrorResponse } from 'types';

const useOnFetchError = () => {
  const notify = useNotify();

  const onError = (error: ErrorResponse) => {
    const isMessageArray = Array.isArray(error.body.message);
    const message = isMessageArray
      ? error.body.message[0]
      : (error.body.message as string);

    notify(message || 'Something went wrong', {
      type: 'error',
    });
  };
  return { onError };
};

export default useOnFetchError;
