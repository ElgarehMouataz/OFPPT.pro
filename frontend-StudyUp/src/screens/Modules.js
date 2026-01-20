import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import { useTheme } from "../contexts/ThemeContext.js";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Modules() {
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { anneeCode } = useParams();
  const { colors } = useTheme();
  
  useEffect(() => {
    fetch(`https://podo.b1.ma/api/public/filieres/${state.id}/modules`)
      .then(res => res.json())
      .then(res => setModules(res.data))
      .catch(() => console.log('erreur fetch'));
    fetch(`https://podo.b1.ma/api/public/filieres/${state.id}/effs`)
      .then(res => res.json())
      .then(res => setEFF(res.data))
      .catch(() => console.log('erreur fetch'));
  }, [state]);
  
  return (
    <>
      <Helmet>
        <title>OFPPT {state.name} {state.code}</title>
        <meta 
          name="description" 
          content={Modules.concat(EFF).map(e => {
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
        
        <ShowEmptyMessage dataList={Modules.concat(EFF)} />
        
        {Modules.length > 0 && (
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
              Modules :
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "20px",
              paddingBottom: "40px"
            }}>
              {Modules.map((e, i) => (
                <Link 
                  key={e.id} 
                  to={`/Annees/${anneeCode}/Fillieres/${state.code}/Modules/${e.code}/Resources`} 
                  state={e} 
                  style={{
                    textDecoration: "none",
                    height: "100%",
                    display: "block"
                  }}
                >
                  <Buttons element={e} index={i} />
                </Link>
              ))}
            </div>
          </>
        )}
        
        {EFF.length > 0 && (
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
              EFFS :
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "20px",
              paddingBottom: "40px"
            }}>
              {EFF.map((e, i) => (
                <a 
                  href={`https://podo.b1.ma/storage/${e.file_path}`} 
                  download={e.title} 
                  key={e.id} 
                  style={{
                    textDecoration: "none",
                    height: "100%",
                    display: "block"
                  }}
                >
                  <Buttons element={e} index={i} />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}