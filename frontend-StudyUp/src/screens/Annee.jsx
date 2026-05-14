import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner';
import ShowEmptyMessage from "../components/showEmptyMessage";
import { useTheme } from "../contexts/ThemeContext";

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
    <main key="annee-view">
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
        <meta property="og:title" content="OFPPT Années de Formation" />
        <meta property="og:description" content="Découvrez les différentes années de formation OFPPT." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Banner />
      
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{ 
          color: colors.text, 
          marginTop: '50px',
          marginBottom: '25px',
          fontFamily: 'jura',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          letterSpacing: '-1px',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          ANNEE
        </h1>
        
        <ShowEmptyMessage dataList={annee} />
        
        {annee.length > 0 && (
          <>
            <hr style={{ 
              width: "80%",
              maxWidth: "600px",
              border: 'none',
              height: '4px',
              background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)",
              margin: '40px auto'
            }} />
            <h2 style={{ 
              color: colors.text, 
              marginBottom: '40px',
              fontFamily: 'jura',
              fontWeight: "700",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              letterSpacing: '0.5px'
            }}>
              Choisissez votre année :
            </h2>
          </>
        )}
        
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
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }} 
              key={e.id}
            >
              <Buttons element={e} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
