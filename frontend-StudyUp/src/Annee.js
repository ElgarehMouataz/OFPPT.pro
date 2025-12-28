import { useState, useEffect } from "react";
import {Helmet} from "react-helmet-async";
import { Link } from "react-router-dom";
export default function Annee() {
  const [annee, setAnnee] = useState([]);


    
  useEffect(() => {
    async function fetchData() {
    const reponse = await fetch("https://podo.b1.ma/api/public/years");
    const data = await reponse.json();
    setAnnee(data.data);

  }
  fetchData();
   }, []);
  /*if (showFilliere) {
    return(<div key="filliere-view"> <Filliere annee={selectedAnnee}/>  </div> );
  }*/
  return (
    <div key="annee-view">

    <Helmet>
      <title>StudyUp - Année</title>
      <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
    </Helmet>
      <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année: 
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e,i) => (
          <Link to={`Annees/${e.id}/Fillieres`}>
            <button className="buttonstyle"
              style={{animationDelay:`${i * 0.1}s`}}
              key={e.id}>
              {e.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
