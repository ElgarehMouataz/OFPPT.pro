import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons"
export default function Annee() {
  const [annee, setAnnee] = useState([]);



  useEffect(() => {
      fetch("https://podo.b1.ma/api/public/years").then(res =>res.json()).then(res=>setAnnee(res.data)).catch(console.log({annee}))
  }, [annee]);
  return (
    <div key="annee-view">

      <Helmet>
        <title>StudyUp - Année</title>
        <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
      </Helmet>
      <div className="banner"></div>
      <h1 style={{ color: "#001c83ff", marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        Choisir votre année:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e, i) => (
          <Link to={`Annees/${e.id}/Fillieres`}>
            <Buttons element={e} index={i} />
          </Link>
        ))}
      </div>
    </div>
  );
}
