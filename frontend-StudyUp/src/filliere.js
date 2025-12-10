import { useState, useEffect } from "react";
import Modules from "./Modules.js";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Filliere({annee}) {
  const [showModules, setShowModules] = useState(false);
  const [Filliere, setFilliere] = useState([]);
  const [selectedFilliere, setSelectedFilliere] = useState(null);
  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
    async function fetchData() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/years/${annee}/filieres`);
    const data = await reponse.json();
    setFilliere(data.data);
  }
  fetchData();
  }, []);
  if (showModules) {
    return <Modules filliere={selectedFilliere}/>;
  }
  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre filliere :
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Filliere.map((e,i) => (
          <button
            className="buttonstyle"
            key={e.id}
            style={{...buttonColors[i % 3]}}
            onClick={() => {setSelectedFilliere(e.id);setShowModules(true)}}
          >
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
