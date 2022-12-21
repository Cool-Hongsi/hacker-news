import styled from 'styled-components';
import { getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const BodyContainer = styled.div`
  padding: 80px 50px;

  ${getResponsiveMediaQuery('sm')} {
    padding: 60px 30px;
  }
`;
