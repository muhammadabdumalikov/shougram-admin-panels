export const getUrlPathname = (url: string) => new URL(url).pathname.slice(1);

export const parseUrlVariables = (pathname: string) => {
  const variables: { [key: string]: string } = {};

  const pathnameArray = pathname.slice(1, -1).split('/');

  let i = 0;
  while (i < pathnameArray?.length) {
    if (pathnameArray[i]) {
      variables[pathnameArray[i]] = pathnameArray[i + 1];

      i += 2;
    } else {
      i++;
    }
  }

  return variables;
};
