import { useState,useEffect,useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons"
import  {useTheme}  from "../contexts/ThemeContext.js";
export default function Annee() {
  const [annee, setAnnee] = useState([]);
  const { colors, mode, setMode,toggleTheme } = useTheme();
  useEffect(() => {
      fetch("https://podo.b1.ma/api/public/years").then(res =>res.json()).then(res=>setAnnee(res.data)).catch(console.log({annee}))
      document.body.style.backgroundColor = colors.background;
  }, [annee]);
  return (
    <div key="annee-view">

      <Helmet>
        <title>StudyUp - Année</title>
        <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
      </Helmet>
      <div className="banner"></div>
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        Choisir votre année:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e, i) => (
          <Link to={`Annees/${e.id}/Fillieres`}>
            <Buttons element={e} index={i} />
          </Link>
        ))}
        <button className="buttonstyle" style={{...colors.buttonstyle}} onClick={toggleTheme}>change theme</button>
      </div>
    </div>
  );
}
