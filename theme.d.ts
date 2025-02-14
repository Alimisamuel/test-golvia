import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    p$14: React.CSSProperties;
    p$16: React.CSSProperties;
    p$18: React.CSSProperties;
    h$20: React.CSSProperties;
    h$24: React.CSSProperties;
    h$32: React.CSSProperties;
  }

  // Allow usage of custom typography variants in `variant` prop
  interface TypographyVariantsOptions {
    p$14: React.CSSProperties;
    p$16: React.CSSProperties;
    p$18: React.CSSProperties;
    h$20: React.CSSProperties;
    h$24: React.CSSProperties;
    h$32: React.CSSProperties;
  }

  interface Palette {
    gray: {
      main: string;
      light: string;
      lighter: string;
      dark: string;
      contrastText: string;
    };
    blueMinus4: string;
    blueMinus3: string;
    blueMinus2: string;
    blueMinus1: string;
    blue: string;
    bluePlus1: string;
    grayMinus3: string;
    grayMinus2: string;
    grayMinus1: string;
    grayPlus1: string;
    black: string;
    white: string;
    yellowMinus2: string;
    yellowMinus1: string;
    yellow: string;
    green: string;
    red: string;
  }

  interface PaletteOptions {
    gray?: {
      main?: string;
      light?: string;
      lighter?: string;
      dark?: string;
      contrastText?: string;
          border?:string;
      
    };
    blueMinus5?: string;
    blueMinus3?: string;
    blueMinus4?: string;
    blueMinus2?: string;
    blueMinus1?: string;
    blue?: string;
    bluePlus1?: string;
    grayMinus3?: string;
    grayMinus2?: string;
    grayMinus1?: string;
    grayPlus1?: string;
    black?: string;
    white?: string;
    yellowMinus2?: string;
    yellowMinus1?: string;
    yellow?: string;
    green?: string;
    red?: string;

  }
}

// Extend Typography's `variant` prop to include custom variants
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    p$14: true;
    p$16: true;
    p$18: true;
    h$20: true;
    h$24: true;
    h$32: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gray: true;
    blueMinus4: true;
    blueMinus3: true;
    blueMinus2: true;
    blueMinus1: true;
    blue: true;
    bluePlus1: true;
    grayMinus3: true;
    grayMinus2: true;
    grayMinus1: true;
    grayPlus1: true;
    black: true;
    white: true;
    yellowMinus2: true;
    yellowMinus1: true;
    yellow: true;
    green: true;
    red: true;
  }
}
