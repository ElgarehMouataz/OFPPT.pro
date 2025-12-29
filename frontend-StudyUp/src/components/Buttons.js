export default function Buttons({element,index}) {
    return (
      <>
            <button
              className="buttonstyle"
              style={{ animationDelay: `${index * 0.1}s` }}
              key={element.id}
            >
              {element.name || element.title}<br/>
              {element.title && <img src="/images/download.png" alt="download icon"></img>}
            </button>
            </>
    )
  }