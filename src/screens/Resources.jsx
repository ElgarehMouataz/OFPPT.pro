import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import Buttons from '../components/Buttons'
import ShowEmptyMessage from "../components/showEmptyMessage";
import Banner from '../components/Banner';
import { useTheme } from "../contexts/ThemeContext"

export default function Resources() {
  const [Courses, setCourses] = useState([]);
  const [CCs, setCCs] = useState([]);
  const [EFMS, setEFMs] = useState([]);
  const [moduleInfo, setModuleInfo] = useState(null);
  const location = useLocation();
  const state = location.state;
  const { anneeCode, filliereCode, moduleCode } = useParams();
  const { colors } = useTheme();

  useEffect(() => {
    if (state && state.id) {
      setModuleInfo(state);
      fetchResources(state.id);
    } else {
      // Step 1: Find the filiere ID
      fetch(`https://podo.b1.ma/api/public/years/${anneeCode}/filieres`)
        .then(res => res.json())
        .then(res => {
          const filiere = res.data.find(f => String(f.code) === String(filliereCode));
          if (filiere) {
            // Step 2: Find the module ID
            fetch(`https://podo.b1.ma/api/public/filieres/${filiere.id}/modules`)
              .then(mRes => mRes.json())
              .then(mRes => {
                const mod = mRes.data.find(m => String(m.code) === String(moduleCode));
                if (mod) {
                  setModuleInfo(mod);
                  fetchResources(mod.id);
                }
              })
              .catch(() => console.log('erreur fetch modules'));
          }
        })
        .catch(() => console.log('erreur fetch filieres'));
    }
  }, [state, anneeCode, filliereCode, moduleCode]);

  const fetchResources = (moduleId) => {
    fetch(`https://podo.b1.ma/api/public/modules/${moduleId}/courses`)
      .then(res => res.json())
      .then(res => setCourses(res.data))
      .catch(() => console.log('erreur fetch courses'));
    fetch(`https://podo.b1.ma/api/public/modules/${moduleId}/ccs`)
      .then(res => res.json())
      .then(res => setCCs(res.data))
      .catch(() => console.log('erreur fetch ccs'));
    fetch(`https://podo.b1.ma/api/public/modules/${moduleId}/efms`)
      .then(res => res.json())
      .then(res => setEFMs(res.data))
      .catch(() => console.log('erreur fetch efms'));
  };

  const displayModuleName = moduleInfo?.name || moduleInfo?.title || "Module";
  const displayModuleCode = moduleInfo?.code || "";

  return (
    <main>
      <Helmet>
        <title>OFPPT {displayModuleName} {displayModuleCode}</title>
        <meta 
          name="description" 
          content={CCs.concat(EFMS).concat(Courses).map(e => {
            const name = e.name || e.title;
            const code = e.code ? " " + e.code : "";
            return "ofppt " + name + code;
          }).join(", ")} 
        />
        <meta property="og:title" content={`OFPPT ${displayModuleName} ${displayModuleCode} - Ressources`} />
        <meta property="og:description" content={`Ressources, cours, et examens pour le module ${displayModuleName}.`} />
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
          {displayModuleName} {displayModuleCode}
        </h1>
        
        <ShowEmptyMessage dataList={CCs.concat(EFMS).concat(Courses)} />
        
        {Courses.length > 0 && (
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
              Cours et TP :
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "20px",
              paddingBottom: "40px"
            }}>
              {Courses.map((e, i) => (
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
        
        {CCs.length > 0 && (
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
              Contrôles Continus :
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "20px",
              paddingBottom: "40px"
            }}>
              {CCs.map((e, i) => (
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
        
        {EFMS.length > 0 && (
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
              EFMs :
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "20px",
              paddingBottom: "40px"
            }}>
              {EFMS.map((e, i) => (
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
