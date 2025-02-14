import { PaletteOptions } from "@mui/material";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1D69D8",
    dark: "#061B5C",
    light: "#F3F6FC",
  },
  secondary: {
    main: "#3EC28B",
  },
  background: {
    default: "#ffffff",
    paper: "#f7f7f7",

    // default: "#F3F6FC",
    // paper: "#ffffff",
  },
  text: {
    primary: "#333F4F",
    secondary: "#626262",
    disabled: "#7D7D7D",
  },

  success: { main: "#3EC28B" },
  error: { main: "#FF5F3E" },

  // Custom colors
  gray: {
    main: "#626262",
    light: "#99A4BA",
    lighter: "#DCE1EC",
    dark: "#333F4F",
    contrastText: "#3E3E3E",
    border: "#d4d4d4",
  },

  blueMinus5: "#EAF1FD",
  blueMinus4: "#F3F6FC",
  blueMinus3: "#EBF4FF",
  blueMinus2: "#DDEBFD",
  blueMinus1: "#3373E0",
  blue: "#1D69D8",
  bluePlus1: "#061B5C",
  grayMinus3: "#F4F4F6",
  grayMinus2: "#D4DCEC",
  grayMinus1: "#99A4BA",
  grayPlus1: "#333F4F",
  black: "#1A1C1F",
  white: "#FFFFFC",
  yellowMinus2: "#FFF0D0",
  yellowMinus1: "#FFC67F",
  yellow: "#DA9500",
  green: "#3EC28B",
  red: "#FF5F3E",
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#1D69D8",
  },
  secondary: {
    main: "#3EC28B",
  },
  background: {
    default: "#121212",
    paper: "#1d1d1d",
  },
  text: {
    primary: "#fff",
    secondary: "#ccc",
  },
};
