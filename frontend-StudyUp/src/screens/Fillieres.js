import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import  {useTheme }  from "../contexts/ThemeContext.js";
import { Link, useLocation} from "react-router-dom";
export default function Filliere() {
  const [Filliere, setFilliere] = useState([]);
  const location = useLocation();
  const state = location.state;
   const { colors} = useTheme();
  useEffect(() => {
  fetch(`https://podo.b1.ma/api/public/years/${state.id}/filieres`).then(res =>res.json()).then(res=>setFilliere(res.data)).catch(console.log("erreur fetch"));
  }, [state]);
  return (
    <div key="filliere-main-view">
      <Helmet >
        <title>{state.name}</title>
        <meta   name="description" 
  content={Filliere.map(e => {const name = e.name || e.title;const code = e.code ? " " + e.code : "";return "ofppt " + name + code;}).join(", ")} />
      </Helmet>
      <Banner/>
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        {state.name} {state.code}
      </h1>
      <div className='d-flex justify-content-center'>
        <div className="d-flex flex-wrap justify-content-center w-75">
        <ShowEmptyMessage dataList={Filliere} />
        {Filliere.length > 0 && <> <hr style={{width:"100%"}}/> <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>Fillieres :</h2></>}
        {Filliere.map((e, i) => (
          <Link to={`/Annees/${state.id}/Fillieres/${e.code}/Modules`} state={e} style={{textDecoration:"none"}} key={e.id}>
           <Buttons element={e} index={i} />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}