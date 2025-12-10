import { useState, useEffect } from "react";
import Choix from "./Choix.js";

const choixs = ["Cours","CC", "EFM",'EFF']

const buttonstyle = {
  margin: "30px",
  padding: "10px",
  borderRadius: "15px",
  color: "white",
  border: "none",
  width:'305px',
  height:'108px',
  fontSize:'24px',
  fontFamily:'jura',
  backgroundImage: 'url(/images/download.png)',
  backgroundSize:'13%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
};
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function EFM({module,filliere}) {
  const [showFilliere, setFilliere] = useState(false);
  const [selectedChoix, setSelectedChoix] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0034A4";
  }, []);

  if (showFilliere) {
    return <Choix choix={selectedChoix} module={module} filliere={filliere}/>;
  }

  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {choixs.map((e,i) => (
            
          <button
            key={e}
            style={{...buttonstyle,...buttonColors[i % 3]}} 
            onClick={() =>{setSelectedChoix(i);setFilliere(true)}}
          >{e}
          </button>
        ))}
      </div>
    </>
  );
}
