import  {useTheme}  from "../contexts/ThemeContext.js";
export default function Buttons({element,index}) {
   const {colors} = useTheme()
    return (
      <div key={element.id} style={(element.code || element.title) && {border: "1px solid ",borderColor:colors.text, borderRadius:"10px",margin:"10px",padding:"10px",textAlign:"center"}}>  
        <h2>{element.code}</h2>
            <button
              className="buttonstyle"
              style={{ ...colors.buttonstyle,animationDelay: `${index * 0.1}s` }}>
              {element.name || element.title}<br />
              {element.title && <img src="/images/download.png" alt="download icon"></img>}
            </button>
            <h4 style={element.totalHours?{color:colors.text}:{display:"none"}}>Masse horraire: {element.totalHours}</h4>
            </div>
    )
  }