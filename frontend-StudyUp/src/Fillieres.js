import { useState, useEffect } from "react";
import {Helmet} from 'react-helmet'
import Annee from "./Annee.js";
import Modules from "./Modules.js";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Filliere({annee}) {

  const [showModules, setShowModules] = useState(false);
  const [Return, setReturn] = useState(false);
  const [Filliere, setFilliere] = useState([]);
  const [selectedFilliere, setSelectedFilliere] = useState(null);
  useEffect(() => {
    async function fetchData() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/years/${annee}/filieres`);
    const data = await reponse.json();
    setFilliere(data.data);
  }
  fetchData();
  
        document.title="Choix de fillieres d’étude – OFPPT";
        <Helmet>
        <meta name="description" content="Sélectionnez votre fillieres d’étude à l’OFPPT afin d’accéder aux formations et programmes disponibles selon votre niveau." />
  </Helmet>
  }, []);
  if (showModules) {
    return <Modules annee={annee} filliere={selectedFilliere} />;
  }
  if (Return) {
    return <Annee />;
  }
  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre filliere :
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Filliere.map((e,i) => (
          <button
            className="buttonstyle"
            key={e.id}
            style={{...buttonColors[i % 3] ,animationDelay: `${i * 0.1}s`}}
            onClick={() => {setSelectedFilliere(e.id);setShowModules(true)}}
          >
            {e.name}
          </button>
        ))}
        {Filliere.length !==0 ? <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button> : null}
      </div>
    </>
  );
}
