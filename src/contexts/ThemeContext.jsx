
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    background: "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)",
    cardBackground: "rgba(255, 255, 255, 0.6)",
    cardBorder: "1px solid rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    buttonstyle: {
      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      color: '#ffffff',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    text: "#1e293b",
    titleHighlight: {
      background: "rgba(99, 102, 241, 0.1)",
      color: "#3730a3",
      padding: "8px 16px",
      borderRadius: "8px",
      border: "1px solid rgba(99, 102, 241, 0.2)"
    },
    boxShadow: "0 8px 32px rgba(30, 41, 59, 0.08)",
    hoverShadow: "0 12px 40px rgba(99, 102, 241, 0.2)",
    icon: {
      backgroundImage: "url(/images/darkMode.webp)",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }
  },
  dark: {
    background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
    cardBackground: "rgba(30, 41, 59, 0.4)",
    cardBorder: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    buttonstyle: {
      background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
      color: '#ffffff',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    text: "#f8fafc",
    titleHighlight: {
      background: "rgba(129, 140, 248, 0.15)",
      color: "#e0e7ff",
      padding: "8px 16px",
      borderRadius: "8px",
      border: "1px solid rgba(129, 140, 248, 0.2)"
    },
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    hoverShadow: "0 12px 40px rgba(129, 140, 248, 0.25)",
    icon: {
      backgroundImage: "url(/images/lightMode.webp)",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      order: '1'
    }
  }
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    // Inject dynamic gradient animation if not present
    if (!document.getElementById('dynamic-bg-style')) {
      const style = document.createElement('style');
      style.id = 'dynamic-bg-style';
      style.innerHTML = `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        body {
          background-size: 400% 400% !important;
          animation: gradientMove 15s ease infinite !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.style.background = themes[mode].background;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.transition = "background 0.5s ease";
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
