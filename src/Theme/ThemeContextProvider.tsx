import React, { createContext, useState, useMemo, ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkTheme: false,
});

const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const activeTheme = useMemo(() => theme(isDarkTheme), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
