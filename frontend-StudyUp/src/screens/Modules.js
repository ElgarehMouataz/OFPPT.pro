import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from '../components/Spinner.js'
import Buttons from "../components/Buttons"
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Modules() {
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const { anneeId, filliereId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchDataModules() {
      const reponse = await fetch(`https://podo.b1.ma/api/public/filieres/${filliereId}/modules`);
      const data = await reponse.json();
      setModules(data.data);

    }

    async function fetchDataEFF() {
      const reponse = await fetch(`https://podo.b1.ma/api/public/filieres/${filliereId}/effs`);
      const data = await reponse.json();
      setEFF(data.data);
    }
    fetchDataModules();
    fetchDataEFF();
  }, [filliereId]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Modules.length === 0) {
        setShowEmptyMessage(true);
      } 
    }, 5000);
    return () => clearTimeout(timer);
  }, [Modules]);
  return (
    <>
      <Helmet>
        <title>StudyUp - Modules</title>
        <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
      </Helmet>
      <div className="banner"></div>
      <h1 style={{ color: "#001c83ff", marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        Preparation module:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Modules.length === 0 && !showEmptyMessage && <Spinner />}
        {Modules.map((e,i)=>{return(
          <Link to={`/Annees/${anneeId}/Fillieres/${filliereId}/Modules/${e.id}/Resources`}>
          <Buttons element={e} index={i} />
          </Link>
          )
        })}
        {EFF.map((e,i)=>{return (
           <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id}>
          <Buttons element={e} index={i} />
          </a>
        )})}
        {showEmptyMessage && Modules.length === 0 && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 style={{ color: "#001c83ff", marginTop: '40px', fontFamily: 'jura', textAlign: 'center' }}>
              Aucune Information disponible pour cette option.
            </h2>
            <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>
          </div >
        )}
        {Modules.length !== 0 && <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>}
      </div>
    </>
  );
}
