import  {useTheme}  from "../contexts/ThemeContext.js";
export default function Buttons({element,index}) {
   const {colors} = useTheme()
    return (
      <>
            <button
              className="buttonstyle"
              style={{ ...colors.buttonstyle,animationDelay: `${index * 0.1}s` }}
              key={element.id}>
              {element.name || element.title}
              {element.title && <img src="/images/download.png" alt="download icon"></img>}
            </button>
            </>
    )
  }