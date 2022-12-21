import styled from 'styled-components';
import { getGridColumns, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const Home = styled.div`
  display: grid;
  column-gap: 90px;
  row-gap: 50px;
  ${getGridColumns(3)};

  ${getResponsiveMediaQuery('md')} {
    ${getGridColumns(2)};
  }

  ${getResponsiveMediaQuery('sm')} {
    ${getGridColumns(1)};
  }
`;
