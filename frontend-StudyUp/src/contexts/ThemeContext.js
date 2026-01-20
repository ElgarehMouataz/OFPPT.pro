
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
light: {
    background: "#e5e7eb",
    cardBackground: "#ffffff",
    buttonstyle: {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      fontWeight: '600',
      letterSpacing: '0.3px'
    },
    text: "#18181b",
    titleHighlight: {
      backgroundColor: "#e0e7ff",
      color: "#18181b",
      padding: "8px 16px",
      borderRadius: "8px"
    },
    boxShadow: "0 2px 8px rgba(79, 70, 229, 0.12)",
    icon: {
      backgroundImage: "url(/images/darkMode.webp)",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: '#a5b4fc', 
    }
  },
  dark: {
    background: "#0a0e27",
    cardBackground: "#1a1f3a",
    buttonstyle: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      fontWeight: '600',
      letterSpacing: '0.3px'
    },
    text: "#e0e7ff",
    titleHighlight: {
      backgroundColor: "#312e81",
      color: "#e0e7ff",
      padding: "8px 16px",
      borderRadius: "8px"
    },
    boxShadow: "0 4px 6px rgba(79, 70, 229, 0.3)",
    icon: {
      backgroundImage: "url(/images/lightMode.webp)",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: '#6366f1',
      order: '1'
    }
  }
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    document.body.style.backgroundColor = themes[mode].background;
  }, [mode]);
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