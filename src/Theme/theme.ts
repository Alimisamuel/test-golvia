import { createTheme } from "@mui/material";
import { darkPalette, lightPalette } from "./palette";

const _theme = createTheme();

const theme = (isDarkMode: boolean) => {
  return createTheme({
    cssVariables: true,
    palette: isDarkMode ? darkPalette : lightPalette,
    typography: {
      fontFamily: "outfit",

      h1: {
        fontSize: "32px",
        fontWeight: 900,
      },
      h2: {
        fontSize: "24px",
        fontWeight: 700,
        fontFamily: "butler",
      },
      h3: {
        fontWeight: 600,
        fontFamily: "outfit",
        color: "#14376A",
        fontSize: "30px",
      },
      button: {
        textTransform: "initial",
        fontFamily: "outfit",
        disabled: {
          background: "#5b5b5b",
        },
      },

      // Custom fonts
      p$14: {
        fontSize: "14px",
      },
      p$16: {
        fontSize: "16px",
      },
      p$18: {
        fontSize: "18px",
      },
      h$20: {
        fontSize: "20px",
      },
      h$24: {
        fontSize: "24px",
      },
      h$32: {
        fontSize: "32px",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
          outlined: {
            "&.MuiButton-outlinedGray": {
              color: "var(--mui-palette-primary)",
            },
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            [_theme.breakpoints.up("md")]: {
              borderRadius: "10px",
            },
            "& .MuiSelect-icon": {
              top: "unset",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "16px",
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h$32: "h3",
            h$24: "h4",
            h$20: "h5",
            p$18: "p",
            p$16: "p",
            p$14: "p",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label": {
              // Move label above the input
              position: "relative",
              transform: "scale(1)",
              marginBottom: "8px",
            },
            "& label.Mui-focused": {
              color: "var(--mui-palette-text-secondary)",
            },
            "& fieldset legend": {
              width: 0,
            },
            "& .MuiOutlinedInput-input": {
              paddingTop: "14px",
              paddingBottom: "14px",
            },
            "& .MuiInputBase-multiline": {
              paddingTop: 0,
              paddingBottom: 0,
            },
            "& input:-webkit-autofill": {
              backgroundColor: "white",
              WebkitBoxShadow: "0 0 0 100px var(--mui-palette-primary-light) inset", // Autofill background color
              WebkitTextFillColor: "var(--mui-palette-text-secondary)",
            },
          },
        },
        defaultProps: {
          InputLabelProps: {
            shrink: true,
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            scrollbarWidth: "none",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--mui-palette-blueMinus2)",
          },
        },
      },
    },
  });
};

export default theme;
