import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from '../components/Spinner.js'
import Buttons from "../components/Buttons"
import { Link, useParams, useNavigate } from "react-router-dom";
export default function Filliere() {
  const [Filliere, setFilliere] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const navigate = useNavigate();
  const { anneeId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const reponse = await fetch(`https://podo.b1.ma/api/public/years/${anneeId}/filieres`);
      const data = await reponse.json();
      setFilliere(data.data);
    }
    fetchData();
  }, [anneeId]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Filliere.length === 0) {
        setShowEmptyMessage(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [Filliere]);
  return (
    <div key="filliere-main-view">
      <Helmet >
        <title>StudyUp - Fillieres</title>
        <meta name="description" content="Choisissez votre filliere d'étude pour accéder aux ressources académiques sur StudyUp." />
      </Helmet>
      <div className="banner"></div>
      <h1 style={{ color: "#001c83ff", marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        Choisir votre filliere :
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Filliere.length === 0 && !showEmptyMessage && <Spinner />}
        {Filliere.map((e, i) => (
          <Link to={`/Annees/${anneeId}/Fillieres/${e.id}/Modules`}>
           <Buttons element={e} index={i} />
          </Link>
        ))}
        {showEmptyMessage && Filliere.length === 0 && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 style={{ color: "#001c83ff", marginTop: '40px', fontFamily: 'jura', textAlign: 'center' }}>
              Aucune Information disponible pour cette option.
            </h2>
            <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>
          </div >
        )}
        {Filliere.length !== 0 && <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>}
      </div>
    </div>
  );
}
