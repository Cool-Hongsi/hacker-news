import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinnerPropsType } from 'component/common/loadingSpinner/LoadingSpinner.interface';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import { colorStyle } from 'Styled.GlobalStyle';

const renderComponent = (props: LoadingSpinnerPropsType) => render(<LoadingSpinner {...props} />);

describe('src/component/common/loadingSpinner/LoadingSpinner', () => {
  let props: LoadingSpinnerPropsType;
  beforeEach(() => {
    props = {
      dataTestId: 'loadingSpinner-component',
      text: 'Loading',
      width: '55px',
      height: '55px',
      outsideColor: colorStyle.lightGrey,
      insideColor: colorStyle.dark,
    };
  });

  it('render LoadingSpinner component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('loadingSpinner-component')).toBeInTheDocument();
  });
  it('test props value', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('loadingSpinner-component')).toHaveAttribute('width', '55px');
    expect(getByTestId('loadingSpinner-component')).toHaveAttribute('height', '55px');
  });
  it('test text value', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('loadingSpinner-text-testid')).toBeInTheDocument();
    expect(getByTestId('loadingSpinner-text-testid')).toHaveTextContent('Loading');
  });
});
