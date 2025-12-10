import { useState, useEffect } from "react";
const buttonColors=[
    {backgroundColor: "#001664"},
    {backgroundColor: "#001251"},
    {backgroundColor: "#000C37"},
]
export default function Choix({choix,module,filliere}) {
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
  console.log(List)
  console.log(module)
  console.log(APIS[choix])
  }, []);
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
      </div>
    </>
    
  )};