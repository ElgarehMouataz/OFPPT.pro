import  {useTheme}  from "../contexts/ThemeContext.js";
import { useEffect } from "react";
export default function Banner() {
  useEffect(() => {
  const img = new Image();
  img.src = "/images/hero.jpg";
}, []);

     const { colors, mode,toggleTheme } = useTheme()
    return (
      <div className="banner">
        <button className="togglecontainer"  onClick={toggleTheme} style={{backgroundColor: colors.background, color: colors.text, border:'none', padding:"2px"}} role="theme switch">
          <div className="themeToggle" style={{...colors.icon}}></div>
          {mode === "light" ? "dark" : "light"} mode</button>
        </div>
    )
  }