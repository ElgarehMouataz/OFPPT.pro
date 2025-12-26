import { useState, useEffect } from "react";
import {Helmet} from "react-helmet-async";
import Filliere from "./Fillieres.js";
export default function Annee() {
  const [showFilliere, setShowFilliere] = useState(false);
  const [annee, setAnnee] = useState([]);
  const [selectedAnnee, setSelectedAnnee] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    async function fetchData() {
    const reponse = await fetch("https://podo.b1.ma/api/public/years");
    const data = await reponse.json();
    setAnnee(data.data);

  }
  fetchData();
   }, []);
  if (showFilliere) {
    return(<div key="filliere-view"> <Filliere annee={selectedAnnee}/>  </div> );
  }
  return (
    <div key="annee-view">
       {mounted && (
    <Helmet>
      <title>StudyUp - Année</title>
      <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
    </Helmet>
       )}
      <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année: 
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e,i) => (
          <button className="buttonstyle"
            style={{animationDelay:`${i * 0.1}s`}}
            key={e.id}
            onClick={() => {setSelectedAnnee(e.id);setShowFilliere(true); }}>
            {e.name}
          </button>
        ))}
      </div>
    </div>
  );
}
