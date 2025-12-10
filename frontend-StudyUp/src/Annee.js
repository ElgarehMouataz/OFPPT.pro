import { useState, useEffect } from "react";
import Filliere from "./Filliere.js";
export default function Annee() {
  const [showFilliere, setShowFilliere] = useState(false);
  const [annee, setAnnee] = useState([]);
  const [selectedAnnee, setSelectedAnnee] = useState(null);
  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
    async function fetchData() {
    const reponse = await fetch("https://podo.b1.ma/api/public/years");
    const data = await reponse.json();
    setAnnee(data.data);
  }
  fetchData();
   }, []);
  if (showFilliere) {
    return <Filliere annee={selectedAnnee}/>;
  }
  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e) => (
          <button className="buttonstyle"
            key={e.id}
            onClick={() => {setSelectedAnnee(e.id);setShowFilliere(true); }}>
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
