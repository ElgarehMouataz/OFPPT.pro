import { useTheme } from "../contexts/ThemeContext.js";

export default function Buttons({ element, index }) {
  const { colors } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: colors.cardBackground,
        border: "1px solid",
        borderColor: colors.text,
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: colors.boxShadow,
        minWidth: 0,
        height: "100%",
        gap: "15px",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >  
      <h5 style={{ 
        ...colors.titleHighlight,
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: "600",
        lineHeight: "1.4",
      }}>
        {element.name || element.title} {element.code ? `${"- "+element.code}` : ""}
      </h5>
      
      <button
        className="buttonstyle"
        style={{ 
          ...colors.buttonstyle, 
          animationDelay: `${index * 0.1}s`,
          width: "100%",
          maxWidth: "220px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          border: "none",
          borderRadius: "8px",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <h5 style={{ margin: 0 }}>{element.name? "Voir plus" : "Telecharger"}</h5>
        {element.title && <img src="/images/download.png" alt="download icon" />}
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