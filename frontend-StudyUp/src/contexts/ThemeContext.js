
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    background: "#F5F7FA",
    buttonstyle:{
        backgroundColor: '#314EB7',
        color: 'white',
        },
    text: "#1F3C88",
  },
  dark: {
    background: "#0B1020",
    buttonstyle:{
        backgroundColor: '#008acaff',
        color: 'black',
        },
    text: "#ffffffff",
  },
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ mode, colors: themes[mode], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
