import  {useTheme}  from "../contexts/ThemeContext";
export default function Banner() {

     const { colors, mode,toggleTheme } = useTheme()
    return (
      <div className="banner" style={{ 
        position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        {/* Subtle gradient overlay for the banner */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: mode === "dark" ? "linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.8))" : "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.8))",
          pointerEvents: "none"
        }}></div>

        <button 
          className="togglecontainer"  
          onClick={toggleTheme} 
          style={{
            backgroundColor: colors.cardBackground, 
            color: colors.text, 
            border: colors.cardBorder, 
            backdropFilter: colors.backdropFilter,
            WebkitBackdropFilter: colors.backdropFilter,
            padding: "8px 16px",
            borderRadius: "30px",
            boxShadow: colors.boxShadow,
            position: "absolute",
            top: "20px",
            right: "20px",
            margin: 0,
            cursor: "pointer",
            transition: "transform 0.2s, filter 0.2s, box-shadow 0.2s",
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = colors.hoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = colors.boxShadow;
          }}
        >
          <div className="themeToggle" style={{
            ...colors.icon, 
            width: "24px", 
            height: "24px", 
            padding: 0, 
            marginRight: "8px",
            borderRadius: "50%"
          }}></div>
          <span style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
            {mode === "light" ? "Dark" : "Light"}
          </span>
        </button>
      </div>
    )
  }
