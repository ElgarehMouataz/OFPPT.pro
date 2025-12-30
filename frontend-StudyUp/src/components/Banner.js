import  {useTheme}  from "../contexts/ThemeContext.js";
export default function Banner() {
     const { colors, mode,toggleTheme } = useTheme()
    return (
      <div className="banner">
        <div className="togglecontainer" style={{backgroundColor: colors.background, color: colors.text}}>
        <button className="toggleButton" style={{...colors.icon}} onClick={toggleTheme}></button>
        {mode === "light" ? "dark" : "light"} mode
        </div>
        </div>
    )
  }