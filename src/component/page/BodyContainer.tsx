import React from 'react';
import { BodyContainerPropsType } from 'component/page/BodyContainer.interface';
import * as Styled from 'component/page/Styled.BodyContainer';

const BodyContainer = ({ children }: BodyContainerPropsType) => {
  return <Styled.BodyContainer data-testid="bodyContainer-component-testid">{children}</Styled.BodyContainer>;
};

export default BodyContainer;
