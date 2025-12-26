import { useState, useEffect } from "react";
import {Helmet} from 'react-helmet'
import Filliere from "./Fillieres.js";
export default function Annee() {
  const [showFilliere, setShowFilliere] = useState(false);
  const [annee, setAnnee] = useState([]);
  const [selectedAnnee, setSelectedAnnee] = useState(null);
  useEffect(() => {
    async function fetchData() {
    const reponse = await fetch("https://podo.b1.ma/api/public/years");
    const data = await reponse.json();
    setAnnee(data.data);
     
        document.title="Choix de l’année d’étude – OFPPT";
        <Helmet>
        <meta name="description" content="Sélectionnez votre année d’étude à l’OFPPT afin d’accéder aux formations et programmes disponibles selon votre niveau." />
    </Helmet>

  }
  fetchData();
   }, []);
  if (showFilliere) {
    return <Filliere annee={selectedAnnee}/>;
  }
  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année: 
      </h1>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          {annee.map((e,i) => (
            <button className="buttonstyle"
              style = {{animationDelay: `${i * 0.1}s`}}
              key={e.id}
              onClick={() => {setSelectedAnnee(e.id);setShowFilliere(true); }}>
              {e.name}
            </button>
          ))}
        </div>
    </>
  );
}
