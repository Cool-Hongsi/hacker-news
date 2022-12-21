import styled from 'styled-components';
import { LoadingSpinnerPropsType } from 'component/common/loadingSpinner/LoadingSpinner.interface';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const LoadingSpinner = styled.div<Partial<LoadingSpinnerPropsType>>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .loadingSpinner {
    border-radius: 50%;
    animation: spin 2s linear infinite;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 4px solid ${(props) => props.outsideColor};
    border-top: 4px solid ${(props) => props.insideColor};
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .loadingSpinner-text {
    color: ${colorStyle.white};
    font-size: ${fontStyle.size.sm};
    font-family: ${fontStyle.family.lexendDecaR};
    margin-top: 30px;
  }
`;
