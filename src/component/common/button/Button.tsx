import React from 'react';
import { ButtonPropsType } from 'component/common/button/Button.interface';
import { colorStyle } from 'Styled.GlobalStyle';
import * as Styled from 'component/common/button/Styled.Button';

const Button = ({
  dataTestId,
  width = '200px',
  height = '45px',
  color = colorStyle.white,
  backgroundColor = colorStyle.dark,
  text,
  onClickFunc,
}: ButtonPropsType) => {
  return (
    <Styled.Button
      data-testid={dataTestId}
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      onClick={onClickFunc}
    >
      {text}
    </Styled.Button>
  );
};

export default Button;
