import styled from 'styled-components';

export const App = styled.div`
  width: 100vw;
  max-width: 1920px;

  .loadingSpinner-component {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
