import { useState, useEffect } from "react";
import Resources from "./Resources.js";
import Filliere from './Fillieres.js'



export default function Modules({filliere,annee}) {

  const [showResources, setResources] = useState(false);
  const [Return, setReturn] = useState(false);
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  useEffect(() => {
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
  }, []);
  function buttonMakers(p,x){
    return(
     <>
        {p.map((e) => (
          <button
            className="buttonstyle"
            key={e.id}
            onClick={() => {setSelectedModule(e.id);setResources(true)}}
          >
            {e.name || e.title}
          </button>
        ))}
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
  <div className="banner"></div>
      <h1 style={{color:"#001c83ff", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Preparation module:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
    {buttonMakers(Modules)} {buttonMakers(EFF)}
    <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>
    </div>
    </>
  );
}
