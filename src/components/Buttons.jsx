import { useTheme } from "../contexts/ThemeContext";

export default function Buttons({ element, index }) {
  const { colors } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: colors.cardBackground,
        border: colors.cardBorder,
        backdropFilter: colors.backdropFilter,
        WebkitBackdropFilter: colors.backdropFilter,
        borderRadius: "16px",
        padding: "24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: colors.boxShadow,
        width: "100%",
        boxSizing: "border-box",
        minHeight: "100%",
        flex: 1,
        gap: "20px",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = colors.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = colors.boxShadow;
      }}
    >  
      <h2 style={{ 
        ...colors.titleHighlight,
        margin: 0,
        fontSize: "1.15rem",
        fontWeight: "700",
        lineHeight: "1.5",
        minHeight: "4em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center"  
      }}>
        {element.name || element.title} {element.code ? `${"- "+element.code}` : ""}
      </h2>
      
      <button
        className="buttonstyle"
        style={{ 
          ...colors.buttonstyle, 
          animationDelay: `${index * 0.1}s`,
          width: "100%",
          maxWidth: "240px",
          padding: "12px 24px",
          fontSize: "1.05rem",
          cursor: "pointer",
          border: "none",
          borderRadius: "12px",
          transition: "transform 0.2s ease, filter 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.filter = "brightness(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "brightness(1)";
        }}
      >
        <h3 style={{ margin: 0 }}>Voir plus</h3>
        {element.title && <img src="/images/download.png" alt="download icon" width="24" height="24" />}
      </button>
      
      {element.totalHours && (
        <h4 style={{ 
          color: colors.text,
          margin: 0,
          fontSize: "0.95rem",
          fontWeight: "500"
        }}>
          Masse horaire: {element.totalHours}
        </h4>
      )}
    </div>
  );
}
