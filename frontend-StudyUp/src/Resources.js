import { useState, useEffect } from "react";
import Modules from "./Modules.js";
import {Helmet} from "react-helmet-async";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]

export default function Resources({module,filliere,annee}) {
  const [Return, setReturn] = useState(false);
  const [List, setList] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    const APIS=[`https://podo.b1.ma/api/public/modules/${module}/courses`,
                `https://podo.b1.ma/api/public/modules/${module}/ccs`,
                `https://podo.b1.ma/api/public/modules/${module}/efms`,
]
    async function fetchData() {
    const reponse = await Promise.all(APIS.map((api)=>fetch(api)));
    const data = await Promise.all(reponse.map((rep)=>rep.json()));
    const cleandata= await data.flatMap((item)=>item.data)
    setList(cleandata);
  }
  fetchData();
  }, [module]);
    if (Return) {
      return <Modules module={module} filliere={filliere} annee={annee}/>;  
    }
        return (
    <>
     {mounted && (
    <Helmet>
          <title>StudyUp - Resources</title>
          <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
        </Helmet>
     )}
      <div className="banner"></div>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {List.map((e,i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id}>
          <button
          className="buttonstyle"
            key={e.id}
            style={{...buttonColors[i % 3],animationDelay:`${i * 0.1}s`}}
          >
            <div>
            {e.title}
            </div>
            <img src='./images/download.png' alt="download icon"></img>
          </button>
          </a>
        ))}
        {List.length !==0 && <button className="buttonstyle" onClick={() => {setReturn(true)}}>Retourner</button>}
      </div>
    </>
    
  )};