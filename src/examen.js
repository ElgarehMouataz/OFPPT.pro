import { useState, useEffect } from "react";
import EFM from "./EFM.js";

const annee = ["Cours", "Exercices", "EFM"];

const buttonstyle = {
  margin: "30px",
  padding: "10px",
  borderRadius: "15px",
  backgroundColor: "#314EB7",
  color: "white",
  border: "none",
  width:'305px',
  height:'108px',
  fontSize:'24px',
  fontFamily:'jura',
};

export default function Filliere() {
  const [showSpecialite, setShowSpecialite] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
  }, []);

  if (showSpecialite) {
    return <EFM />;
  }

  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Preparation examen:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e) => (
          <button
            key={e}
            style={buttonstyle}
            onClick={() => setShowSpecialite(true)}
          >
            {e}
          </button>
        ))}
      </div>
    </>
  );
}
