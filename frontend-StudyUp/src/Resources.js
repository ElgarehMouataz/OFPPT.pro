import { useState, useEffect } from "react";
import Choix from "./Choix.js";
const choixs = ["Cours","CC", "EFM",'EFF']
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Resources({module,filliere}) {
  const [showChoix, setChoix] = useState(false);
  const [selectedChoix, setSelectedChoix] = useState(null);
  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
  }, []);

  if (showChoix) {
    return <Choix choix={selectedChoix} module={module} filliere={filliere}/>;
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
      </div>
    </>
  );
}
