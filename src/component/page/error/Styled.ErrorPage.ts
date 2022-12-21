import styled from 'styled-components';
import { fontStyle } from 'Styled.GlobalStyle';

export const ErrorPage = styled.div`
  height: calc(100vh - 160px); // 160px is padding in BodyContainer
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${fontStyle.family.latoB};
  font-size: ${fontStyle.size.lg};
`;
