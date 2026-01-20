import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Buttons from '../components/Buttons.js'
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Banner from '../components/Banner.js';
import { useTheme } from "../contexts/ThemeContext.js"

export default function Resources() {
  const [Courses, setCourses] = useState([]);
  const [CCs, setCCs] = useState([]);
  const [EFMS, setEFMs] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { colors } = useTheme();

  useEffect(() => {
    fetch(`https://podo.b1.ma/api/public/modules/${state.id}/courses`)
      .then(res => res.json())
      .then(res => setCourses(res.data))
      .catch(() => console.log('erreur fetch'));
    fetch(`https://podo.b1.ma/api/public/modules/${state.id}/ccs`)
      .then(res => res.json())
      .then(res => setCCs(res.data))
      .catch(() => console.log('erreur fetch'));
    fetch(`https://podo.b1.ma/api/public/modules/${state.id}/efms`)
      .then(res => res.json())
      .then(res => setEFMs(res.data))
      .catch(() => console.log('erreur fetch'));
  }, [state.id]);

  return (
    <>
      <Helmet>
        <title>OFPPT {state.name} {state.code}</title>
        <meta 
          name="description" 
          content={CCs.concat(EFMS).concat(Courses).map(e => {
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
        <h2 style={{ 
          color: colors.text, 
          marginTop: '40px',
          marginBottom: '20px',
          fontFamily: 'jura',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          {state.name} {state.code}
        </h2>
        
        <ShowEmptyMessage dataList={CCs.concat(EFMS).concat(Courses)} />
        
        {Courses.length > 0 && (
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
                    display: "block"
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
                    display: "block"
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