import React from 'react';
import { render } from '@testing-library/react';
import { BodyContainerPropsType } from 'component/page/BodyContainer.interface';
import BodyContainer from 'component/page/BodyContainer';

const renderComponent = (props: BodyContainerPropsType) => render(<BodyContainer {...props} />);

describe('src/component/page/BodyContainer', () => {
  let props: BodyContainerPropsType;
  beforeEach(() => {
    props = {
      children: <div />,
    };
  });

  it('renders BodyContainer component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('bodyContainer-component-testid')).toBeInTheDocument();
  });
});
