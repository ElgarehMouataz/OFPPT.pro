import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ShowEmptyMessage from "../components/showEmptyMessage";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner';
import { useTheme } from "../contexts/ThemeContext";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Modules() {
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const [filiereInfo, setFiliereInfo] = useState(null);
  const location = useLocation();
  const state = location.state;
  const { anneeCode, filliereCode } = useParams();
  const { colors } = useTheme();
  
  useEffect(() => {
    // Determine the filiere ID to use
    if (state && state.id) {
      setFiliereInfo(state);
      fetchModules(state.id);
    } else {
      // If state is missing, we must fetch the filieres for the year and find the correct one by code
      fetch(`https://podo.b1.ma/api/public/years/${anneeCode}/filieres`)
        .then(res => res.json())
        .then(res => {
          const found = res.data.find(f => String(f.code) === String(filliereCode));
          if (found) {
            setFiliereInfo(found);
            fetchModules(found.id);
          }
        })
        .catch(() => console.log('erreur fetch filieres'));
    }
  }, [state, anneeCode, filliereCode]);

  const fetchModules = (filiereId) => {
    fetch(`https://podo.b1.ma/api/public/filieres/${filiereId}/modules`)
      .then(res => res.json())
      .then(res => setModules(res.data))
      .catch(() => console.log('erreur fetch modules'));
    fetch(`https://podo.b1.ma/api/public/filieres/${filiereId}/effs`)
      .then(res => res.json())
      .then(res => setEFF(res.data))
      .catch(() => console.log('erreur fetch effs'));
  };
  
  const displayFiliereName = filiereInfo?.name || filiereInfo?.title || "Filiere";
  const displayFiliereCode = filiereInfo?.code || "";

  return (
    <main>
      <Helmet>
        <title>OFPPT {displayFiliereName} {displayFiliereCode}</title>
        <meta 
          name="description" 
          content={Modules.concat(EFF).map(e => {
            const name = e.name || e.title;
            const code = e.code ? " " + e.code : "";
            return "ofppt " + name + code;
          }).join(", ")} 
        />
        <meta property="og:title" content={`OFPPT ${displayFiliereName} ${displayFiliereCode} - Modules`} />
        <meta property="og:description" content={`Consultez les modules pour la filière ${displayFiliereName}.`} />
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
          {displayFiliereName} {displayFiliereCode}
        </h1>
        
        <ShowEmptyMessage dataList={Modules.concat(EFF)} />
        
        {Modules.length > 0 && (
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
                  to={`/Annees/${anneeCode}/Fillieres/${filliereCode}/Modules/${e.code}/Resources`} 
                  state={e} 
                  style={{
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
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
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Buttons element={e} index={i} />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
