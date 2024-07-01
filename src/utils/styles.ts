import { css } from 'styled-components';

export const hideText = (lineCount: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: ${lineCount};
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: ${lineCount};
  -webkit-box-orient: vertical;
  box-orient: vertical;
`;
