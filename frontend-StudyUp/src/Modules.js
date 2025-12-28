import { useState, useEffect } from "react";
import Resources from "./Resources.js";
import Filliere from './Fillieres.js'
import {Helmet} from "react-helmet-async";
import styled from "styled-components"


export default function Modules({filliere,annee}) {

  const [showResources, setResources] = useState(false);
  const [Return, setReturn] = useState(false);
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [mounted, setMounted] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
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
    setMounted(true)
    async function fetchDataModules() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/filieres/${filliere}/modules`);
    const data = await reponse.json();
    setModules(data.data);

  }

  async function fetchDataEFF() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/filieres/${filliere}/effs`);
    const data = await reponse.json();
    setEFF(data.data);
  }
  fetchDataModules();
  fetchDataEFF();
  }, [filliere]);
    useEffect(() => {
  const timer = setTimeout(() => {
    if (Modules.length === 0) {
      setShowEmptyMessage(true);
    }
  }, 5000);
  return () => clearTimeout(timer);
}, [Modules]);
  function buttonMakers(p){
    return(
     <>
        {p.map((e,i) => {
          const buttonInsides=(
          <button
            className="buttonstyle"
            style={{animationDelay:`${i * 0.1}s`}}
            key={e.id}
            onClick={() => {setSelectedModule(e.id);e.name && setResources(true)}}
          >
            {e.name || e.title}
            {e.title && <img src="./images/download.png" alt="download icon"></img> }
          </button>
  );

          return (
          <>
            {e.title ? <a href={`https://podo.b1.ma/storage/${e.file_path}`} download>{buttonInsides}</a> : buttonInsides}
          </>
        );
        })}
    </>
  )}
  if (showResources) {
    return <Resources filliere={filliere} annee={annee} module={selectedModule}/>;
  }
   if (Return) {
    return <Filliere annee={annee} filliere={filliere}/>;
  }
  return (
    <>
     {mounted && (
    <Helmet>
          <title>StudyUp - Modules</title>
          <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
        </Helmet>
     )}
  <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Preparation module:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Modules.length===0 && !showEmptyMessage && <Spinner/>}
    {buttonMakers(Modules)} {buttonMakers(EFF)}
    {showEmptyMessage && Modules.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center"> 
          <h2 style={{color:"#001c83ff", marginTop:'40px', fontFamily:'jura', textAlign:'center'}}>
            Aucune Information disponible pour cette option.
          </h2>
          <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>
        </div >
)}
    {Modules.length !==0 && <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>}
    </div>
    </>
  );
}
