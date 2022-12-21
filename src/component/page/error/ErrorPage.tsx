import React from 'react';
import { ErrorPagePropsType } from 'component/page/error/ErrorPage.interface';
import * as Styled from 'component/page/error/Styled.ErrorPage';

const ErrorPage = ({ dataTestId, error }: ErrorPagePropsType) => {
  return (
    <Styled.ErrorPage data-testid={dataTestId}>
      <div data-testid="error-name-testid">{error.name}</div>
      <div data-testid="error-message-testid">{error.message}</div>
    </Styled.ErrorPage>
  );
};

export default ErrorPage;
