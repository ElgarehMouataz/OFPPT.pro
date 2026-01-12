import  {useTheme}  from "../contexts/ThemeContext.js";
export default function Buttons({element,index}) {
   const {colors} = useTheme()
    return (
      <div style={(element.code || element.title) && {border: "1px solid ",borderColor:colors.text, borderRadius:"10px",margin:"10px",padding:"10px",textAlign:"center"}}>  
        <h3>{element.code}</h3>
            <button
              className="buttonstyle"
              style={{ ...colors.buttonstyle,animationDelay: `${index * 0.1}s` }}
              key={element.id}>
              {element.name || element.title}<br />
              {element.title && <img src="/images/download.png" alt="download icon"></img>}
            </button>
            <h4 style={element.totalHours?{color:colors.text}:{display:"none"}}>Masse horraire: {element.totalHours}</h4>
            </div>
    )
  }