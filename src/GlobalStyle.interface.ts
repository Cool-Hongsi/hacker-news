interface FontStyle {
  size: {
    ms: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  family: {
    latoL: string;
    latoR: string;
    latoB: string;
    lexendDecaT: string;
    lexendDecaL: string;
    lexendDecaR: string;
    lexendDecaEB: string;
  };
}

interface ColorStyle {
  dark: string;
  black: string;
  lightDark: string;
  grey: string;
  lightGrey: string;
  darkGrey: string;
  red: string;
  white: string;
}

interface ResponsiveSize {
  sm: string;
  md: string;
  lg: string;
}

export type { FontStyle, ColorStyle, ResponsiveSize };
