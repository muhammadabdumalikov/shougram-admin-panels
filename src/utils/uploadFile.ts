import { http } from 'services';

export const uploadFile = (
  url: string,
  values: any,
  callback?: (...arg: any) => any,
) => {
  const file = new Blob([values], { type: 'application/octet-stream' });
  return http.put(url, file, {
    headers: { 'Content-Type': 'application/octet-stream' },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / values.size);
      callback && callback(percent > 100 ? 100 : percent);
    },
  });
};
