import { List, ListProps } from 'react-admin';
import styled from 'styled-components';
import { TabbedDataGrid } from './components';

const ArtistsList = (props: ListProps) => {
  return (
    <Root>
      <StyledList sort={{ field: 'createdAt', order: 'ASC' }} {...props}>
        <TabbedDataGrid />
      </StyledList>
    </Root>
  );
};

export default ArtistsList;

const StyledList = styled(List)`
  .MuiFormHelperText-root {
    display: block !important;
    position: relative;
  }
`;

const Root = styled.div`
  .MuiToolbar-root > form {
    align-items: flex-start;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
