import { createGlobalStyle } from 'styled-components';
import { FontStyle, ColorStyle, ResponsiveSize } from 'GlobalStyle.interface';

export const fontStyle: FontStyle = {
  size: {
    ms: '10px',
    xs: '13px',
    sm: '16px',
    md: '20px',
    lg: '28px',
    xl: '40px',
  },
  family: {
    latoL: 'Lato-Light',
    latoR: 'Lato-Regular',
    latoB: 'Lato-Bold',
    lexendDecaT: 'LexendDeca-Thin',
    lexendDecaL: 'LexendDeca-Light',
    lexendDecaR: 'LexendDeca-Regular',
    lexendDecaEB: 'LexendDeca-ExtraBold',
  },
};

export const colorStyle: ColorStyle = {
  dark: '#333333',
  black: '#000000',
  lightDark: '#555555',
  grey: '#E0E0E0',
  lightGrey: '#EEEEEE',
  darkGrey: '#A3A3A3',
  red: '#FF0000',
  white: '#FFFFFF',
};

export const responsiveSize: ResponsiveSize = {
  sm: '768px',
  md: '1200px',
  lg: '1201px',
};

/**
 * Get specific responsive media query
 ** sm - 0 ~ 768
 ** md - 769 ~ 1200
 ** lg - 1201 ~
 * @param selectedSize string (sm / md / lg)
 * @returns matched media query
 */
export const getResponsiveMediaQuery = (selectedSize: string): string => {
  switch (selectedSize) {
    case 'sm':
      // 0 - 768
      return `@media screen and (max-width: ${responsiveSize.sm})`;
    case 'md':
      // 769 - 1200
      return `@media screen and (min-width: ${responsiveSize.sm}) and (max-width: ${responsiveSize.md})`;
    case 'lg':
      // 1201 ~
      return `@media screen and (min-width: ${responsiveSize.md})`;
    default:
      return '';
  }
};

/**
 * Get grid columns
 * @param selectedColumns number
 * @returns grid-template-columns: repeat(${selectedColumns}, 1fr)
 */
export const getGridColumns = (selectedColumns: number): string => {
  return `grid-template-columns: repeat(${selectedColumns}, 1fr)`;
};

const GlobalStyle = createGlobalStyle`
  *, :after, :before {
    background-repeat: no-repeat;
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-size: ${fontStyle.size.sm}; // default font size
    font-family: ${fontStyle.family.latoR}; // default font family
    display: flex;
    justify-content: center;

    a {
      text-decoration: none;
      color: ${colorStyle.dark};
    }
  }

  /* Not show scroll bar, but make it work */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
