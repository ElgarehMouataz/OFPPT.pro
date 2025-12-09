import { useState, useEffect } from "react";
import EFM from "./EFM.js";


const buttonstyle = {
  margin: "30px",
  padding: "10px",
  borderRadius: "15px",
  backgroundColor: "#314EB7",
  color: "white",
  border: "none",
  width:'305px',
  height:'108px',
  fontSize:'24px',
  fontFamily:'jura',
};

export default function Examen({filliere}) {
  const [showEFM, setEFM] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#112655";
    async function fetchData() {
    const reponse = await fetch(`https://podo.b1.ma/api/public/filieres/${filliere}/modules`);
    const data = await reponse.json();
    setModules(data.data);
  }
  fetchData();
  }, []);

  if (showEFM) {
    return <EFM module={selectedModule}/>;
  }

  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Preparation examen:
      </h1>

      <div className='d-flex flex-column align-items-center justify-content-center'>
        {modules.map((e) => (
          <button
            key={e.id}
            style={buttonstyle}
            onClick={() => {setSelectedModule(e.id);setEFM(true)}}
          >
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
