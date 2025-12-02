import { useEffect } from "react";
const annee = ["Premiere", "Deuxieme", "Troisieme"];
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
}

export default function Filliere() {
    useEffect(() => {
    document.body.style.backgroundColor = "#112655";});
  return (
    <>
    <div className="banner"></div>
    <h1 style={{color:"white",marginLeft:'10px',marginTop:'40px',fontFamily:'jura'}}>Choisir votre annee:</h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {annee.map((e) => (<button style={buttonstyle} key={e}>{e} annee</button>))}
      </div>
    </>
  );
}
