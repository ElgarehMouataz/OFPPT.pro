import { useTheme } from "../contexts/ThemeContext.js";

export default function Buttons({ element, index }) {
  const { colors } = useTheme();
  
  return (
    <div 
      style={{
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
        color: colors.text,
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: "600",
        lineHeight: "1.4"
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
          cursor: "pointer"
        }}
      >
        <h5>Voir plus</h5>
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