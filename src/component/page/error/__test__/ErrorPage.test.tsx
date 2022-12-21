import React from 'react';
import { render } from '@testing-library/react';
import { ErrorPagePropsType } from 'component/page/error/ErrorPage.interface';
import ErrorPage from 'component/page/error/ErrorPage';

const renderComponent = (props: ErrorPagePropsType) => render(<ErrorPage {...props} />);

describe('src/component/page/error/ErrorPage', () => {
  let props: ErrorPagePropsType;

  beforeEach(() => {
    props = {
      dataTestId: 'error-testid',
      error: new Error('Test Error'),
    };
  });

  it('render Error component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('error-testid')).toBeInTheDocument();
  });

  it('test props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('error-name-testid')).toHaveTextContent('Error');
    expect(getByTestId('error-message-testid')).toHaveTextContent('Test Error');
  });
});
