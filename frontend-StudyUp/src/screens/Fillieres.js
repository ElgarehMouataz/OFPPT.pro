import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import { useTheme } from "../contexts/ThemeContext.js";
import { Link, useLocation } from "react-router-dom";

export default function Filliere() {
  const [Filliere, setFilliere] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { colors } = useTheme();
  
  useEffect(() => {
    fetch(`https://podo.b1.ma/api/public/years/${state.id}/filieres`)
      .then(res => res.json())
      .then(res => setFilliere(res.data))
      .catch(() => console.log("erreur fetch"));
  }, [state]);
  
  return (
    <div key="filliere-main-view">
      <Helmet>
        <title>OFPPT {state.name}</title>
        <meta 
          name="description" 
          content={Filliere.map(e => {
            const name = e.name || e.title;
            const code = e.code ? " " + e.code : "";
            return "ofppt " + name + code;
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
          {state.name} {state.code}
        </h1>
        
        <ShowEmptyMessage dataList={Filliere} />
        
        {Filliere.length > 0 && (
          <>
            <hr style={{ 
              width: "100%",
              border: 'none',
              borderTop: `2px solid ${colors.text}`,
              margin: '30px 0'
            }} />
            <h2 style={{ 
              color: colors.text, 
              marginBottom: '30px',
              fontFamily: 'jura',
              textDecoration: 'underline', 
              fontWeight: "bold",
              fontSize: 'clamp(1.25rem, 3vw, 2rem)'
            }}>
              Fillieres :
            </h2>
          </>
        )}
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: "20px",
          paddingBottom: "40px"
        }}>
          {Filliere.map((e, i) => (
            <Link 
              to={`/Annees/${state.id}/Fillieres/${e.code}/Modules`} 
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