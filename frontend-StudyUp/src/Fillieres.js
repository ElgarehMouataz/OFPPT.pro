import { useState, useEffect } from "react";
import {Helmet} from "react-helmet-async";
import styled from "styled-components"
import { Link ,useParams,useNavigate } from "react-router-dom";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Filliere({annee}) {
  const [Filliere, setFilliere] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const navigate = useNavigate();
  const {anneeId} = useParams();
  const Spinner = styled.div`
  opacity :0;
  border: 16px solid #5373e9ff;
  border-top: 16px #d6d6d6d3  solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  animation: spin 2s linear infinite, appear .3s ease-in forwards; 
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
    @keyframes appear {
    to {
      opacity: 1;
}
`;
  useEffect(() => {
    async function fetchData() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/years/${anneeId}/filieres`);
    const data = await reponse.json();
    setFilliere(data.data);
  }
  fetchData();
  }, [annee]);
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
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre filliere :
      </h1>
      
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Filliere.length===0 && !showEmptyMessage && <Spinner/>}
        {Filliere.map((e,i) => (
          <Link to={`/Annees/${anneeId}/Fillieres/${e.id}/Modules`}>
          <button
            className="buttonstyle"
            key={e.id}
            style={{...buttonColors[i % 3],animationDelay:`${i * 0.1}s`}}
          >
            {e.name}
          </button>
          </Link>
        ))}
        {showEmptyMessage && Filliere.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center"> 
          <h2 style={{color:"#001c83ff", marginTop:'40px', fontFamily:'jura', textAlign:'center'}}>
            Aucune Information disponible pour cette option.
          </h2>
          <button className="buttonstyle"  onClick={() => navigate(-1)}>Retourner</button>
        </div >
)}
        {Filliere.length !==0 && <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>}
      </div>
      </div>
  );
}
