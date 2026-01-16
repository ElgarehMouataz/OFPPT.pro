import { useState,useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import  {useTheme }  from "../contexts/ThemeContext.js";
export default function Annee() {
  const [annee, setAnnee] = useState([]);
  const { colors} = useTheme();
  useEffect(() => {
      fetch("https://podo.b1.ma/api/public/years").then(res =>res.json()).then(res=>setAnnee(res.data)).catch(console.log())
  }, []);
  return (
    <div key="annee-view">

      <Helmet>
        <title>StudyUp - Année</title>
        <meta name="description" content={annee.map(e => e.name + " " + e.code).join(", ")} />
      </Helmet>
      <Banner />
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
      </h1>
      <div className='d-flex justify-content-center'>
        <div className="d-flex flex-wrap justify-content-center w-75">
        {annee.map((e, i) => (
          <Link to={`Annees/${e.id}/Fillieres`} state={e} style={{textDecoration:"none"}} key={e.id} state={e}>  
            <Buttons element={e} index={i} />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}
