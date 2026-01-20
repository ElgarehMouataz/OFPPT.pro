
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    background: "#F5F7FA",
    buttonstyle:{
        backgroundColor: '#314EB7',
        color: '#F5F7FA',
        },
    text: "#1F3C88",
    icon:{backgroundImage:"url(/images/darkMode.webp)",
         backgroundSize:"50%",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundColor:'#3759d1',

    }
  },
  dark: {
  background: "#0a0e27",
  buttonstyle: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
  },
  text: "#e0e7ff",
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