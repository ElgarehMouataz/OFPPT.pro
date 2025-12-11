import { useState, useEffect } from "react";
import Resources from "./Resources.js";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]

export default function Choix({choix,module,filliere,annee}) {
  const [Return, setReturn] = useState(false);
  const [List, setList] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
    const APIS=[`https://podo.b1.ma/api/public/modules/${module}/courses`,
                `https://podo.b1.ma/api/public/modules/${module}/ccs`,
                `https://podo.b1.ma/api/public/modules/${module}/efms`,
                `https://podo.b1.ma/api/public/filieres/${filliere}/effs`
]
    async function fetchData() {
    const reponse = await fetch(APIS[choix]);    
    const data = await reponse.json();
    setList(data.data);
  }
  fetchData();
  }, []);
    if (Return) {
      return <Resources module={module} filliere={filliere} annee={annee}/>;
    }
        return (   
    <>
      <div className="banner"></div>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {List.map((e,i) => (
          <button
          className="buttonstyle"
            key={e.id}
            style={{...buttonColors[i % 3]}}
            onClick={() => {setSelectedList(e.id)}}
          >
            <div>
            {e.title}
            </div>
            <img src='./images/download.png'></img>
          </button>
        ))}
        <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>
      </div>
    </>
    
  )};