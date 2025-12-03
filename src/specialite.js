import { useState, useEffect } from "react";
import Exames from "./examen.js";

const annee = ["Developpement", "Logistique",'Comptabilite']

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
};
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Specialite() {
  const [showExames, setShowExames] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#0034A4";
  }, []);

  if (showExames) {
    return <Exames />;
  }

  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e,i) => (
          <button
            key={e}
            style={{...buttonstyle , ...buttonColors[i]}}
            onClick={() => setShowExames(true)}
          >
            {e} année
          </button>
        ))}
      </div>
    </>
  );
}
