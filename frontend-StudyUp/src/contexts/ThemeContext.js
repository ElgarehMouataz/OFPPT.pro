
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
        backgroundColor:'#008acaff',

    }
  },
  dark: {
    background: "#010514ff",
    buttonstyle:{
        backgroundColor: '#314eb7ff',
        color: 'white',
        },
    text: "#ffffffff",
    icon:{backgroundImage:"url(/images/lightMode.webp)",
        backgroundSize:"50%",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundColor:'#314EB7',
        order:'1'

    }
  },
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