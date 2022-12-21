import styled from 'styled-components';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const News = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 8px ${colorStyle.grey};
  padding: 20px 35px 30px 30px;
  height: 100%;
  transition: 0.5s;

  :hover {
    background-color: ${colorStyle.lightGrey};
  }

  .news-index {
    font-family: ${fontStyle.family.lexendDecaR};
    font-size: ${fontStyle.size.lg};
    margin-bottom: 10px;
    border-bottom: double 3px ${colorStyle.grey};
  }

  .news-title {
    font-family: ${fontStyle.family.latoR};
    line-height: 25px;
  }
`;
