import { useState, useEffect } from "react";
import Exames from "./examen.js";

const buttonstyle = {
  margin: "30px",
  padding: "10px",
  borderRadius: "15px",
  color: "white",
  border: "none",
  width:'305px',
  height:'108px',
  fontSize:'24px',
  fontFamily:'jura',
};
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Specialite({annee}) {
  const [showExames, setShowExames] = useState(false);
  const [specialite, setSpecialite] = useState([]);
  const [selectedSpecialite, setSelecteSpecialite] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0034A4";
    async function fetchData() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/years/${annee}/filieres`);
    const data = await reponse.json();
    setSpecialite(data.data);
  }
  fetchData();
  }, []);

  if (showExames) {
    return <Exames filliere={selectedSpecialite}/>;
  }

  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Choisir votre année:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {specialite.map((e,i) => (
          <button
            key={e.id}
            style={{...buttonstyle,...buttonColors[i % 3]}}
            onClick={() => {setSelecteSpecialite(e.id);setShowExames(true)}}
          >
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
