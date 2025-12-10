import { useState, useEffect } from "react";
import Resources from "./Resources.js";
export default function Modules({filliere}) {
  const [showResources, setResources] = useState(false);
  const [Modules, setModules] = useState([]);
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
  if (showResources) {
    return <Resources module={selectedModule} filliere={filliere}/>;
  }
  return (
    <>
      <div className="banner"></div>
      <h1 style={{color:"white", marginLeft:'10px', marginTop:'40px', fontFamily:'jura'}}>
        Preparation module:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {Modules.map((e) => (
          <button
            className="buttonstyle"
            key={e.id}
            onClick={() => {setSelectedModule(e.id);setResources(true)}}
          >
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
