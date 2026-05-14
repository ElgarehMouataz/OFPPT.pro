import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner';
import ShowEmptyMessage from "../components/showEmptyMessage";
import { useTheme } from "../contexts/ThemeContext";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Filliere() {
  const [Filliere, setFilliere] = useState([]);
  const [yearInfo, setYearInfo] = useState(null);
  const location = useLocation();
  const { anneeCode } = useParams();
  const state = location.state;
  const { colors } = useTheme();
  
  useEffect(() => {
    // If we have state, use it. Otherwise, fetch the year info to get the name
    if (state) {
      setYearInfo(state);
    } else {
      fetch("https://podo.b1.ma/api/public/years")
        .then(res => res.json())
        .then(res => {
          const found = res.data.find(y => String(y.id) === String(anneeCode));
          if (found) setYearInfo(found);
        })
        .catch(() => console.log("erreur fetch years"));
    }

    // Use anneeCode directly from URL since it represents the year ID
    fetch(`https://podo.b1.ma/api/public/years/${anneeCode}/filieres`)
      .then(res => res.json())
      .then(res => setFilliere(res.data))
      .catch(() => console.log("erreur fetch filieres"));
  }, [state, anneeCode]);
  
  const displayYearName = yearInfo?.name || "Année";
  const displayYearCode = yearInfo?.code || "";

  return (
    <main key="filliere-main-view">
      <Helmet>
        <title>OFPPT {displayYearName}</title>
        <meta 
          name="description" 
          content={Filliere.map(e => {
            const name = e.name || e.title;
            const code = e.code ? " " + e.code : "";
            return "ofppt " + name + code;
          }).join(", ")} 
        />
        <meta property="og:title" content={`OFPPT ${displayYearName} - Filières`} />
        <meta property="og:description" content={`Découvrez les filières pour ${displayYearName}.`} />
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
          {displayYearName} {displayYearCode}
        </h1>
        
        <ShowEmptyMessage dataList={Filliere} />
        
        {Filliere.length > 0 && (
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
              to={`/Annees/${anneeCode}/Fillieres/${e.code}/Modules`} 
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
