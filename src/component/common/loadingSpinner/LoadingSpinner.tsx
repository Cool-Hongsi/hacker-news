import React from 'react';
import { colorStyle } from 'Styled.GlobalStyle';
import { LoadingSpinnerPropsType } from 'component/common/loadingSpinner/LoadingSpinner.interface';
import * as Styled from 'component/common/loadingSpinner/Styled.LoadingSpinner';

const LoadingSpinner = ({
  dataTestId,
  text = '',
  width = '55px',
  height = '55px',
  outsideColor = colorStyle.lightGrey,
  insideColor = colorStyle.dark,
}: LoadingSpinnerPropsType) => {
  return (
    <Styled.LoadingSpinner
      data-testid={dataTestId}
      width={width}
      height={height}
      outsideColor={outsideColor}
      insideColor={insideColor}
    >
      <div className="loadingSpinner"></div>
      {text && (
        <div className="loadingSpinner-text" data-testid="loadingSpinner-text-testid">
          {text}
        </div>
      )}
    </Styled.LoadingSpinner>
  );
};

export default LoadingSpinner;
