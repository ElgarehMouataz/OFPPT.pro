import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import { useTheme } from "../contexts/ThemeContext.js";

export default function Annee() {
  const [annee, setAnnee] = useState([]);
  const { colors } = useTheme();
  
  useEffect(() => {
    fetch("https://podo.b1.ma/api/public/years")
      .then(res => res.json())
      .then(res => setAnnee(res.data))
      .catch(() => console.log("erreur fetch"));
  }, []);
  
  return (
    <div key="annee-view">
      <Helmet>
        <title>OFPPT Année</title>
        <meta 
          name="description" 
          content={annee.map(e => {
            const name = e.name || e.title;
            const code = e.code ? " " + e.code : "";
            return "OFPPT " + name + code;
          }).join(", ")} 
        />
      </Helmet>
      <Banner />
      
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{ 
          color: colors.text, 
          marginTop: '40px',
          marginBottom: '20px',
          fontFamily: 'jura',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          Années
        </h1>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: "20px",
          paddingBottom: "40px"
        }}>
          {annee.map((e, i) => (
            <Link 
              to={`/Annees/${e.id}/Fillieres`} 
              state={e} 
              style={{
                textDecoration: "none",
                height: "100%",
                display: "block"
              }} 
              key={e.id}
            >
              <Buttons element={e} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}