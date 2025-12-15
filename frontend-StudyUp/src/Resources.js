import { useState, useEffect } from "react";
import Choix from "./Choix.js";
import Modules from "./Modules.js"; 
const choixs = ["Cours","CC", "EFM",'EFF']
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Resources({module,filliere,annee}) {


  const [showChoix, setChoix] = useState(false);
  const [Return, setReturn] = useState(false);
  const [selectedChoix, setSelectedChoix] = useState(null);
  useEffect(() => {
  }, []);

  if (showChoix) {
    return <Choix choix={selectedChoix} module={module} filliere={filliere} annee={annee} />;
  }
    if (Return) {
      return <Modules filliere={filliere} annee={annee} module={module}/>;
    }
  return (
    <>
      <div className="banner"></div>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {choixs.map((e,i) => (
            
          <button
           className="buttonstyle"
            key={e}
            style={{...buttonColors[i % 3]}} 
            onClick={() =>{setSelectedChoix(i);setChoix(true)}}
          >{e}
          </button>
        ))}
        <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>
      </div>
    </>
  );
}
