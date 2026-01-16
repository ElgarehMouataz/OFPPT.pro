import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import  {useTheme }  from "../contexts/ThemeContext.js";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Modules() {
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { anneeCode } = useParams();
   const { colors} = useTheme();
  useEffect(() => {
fetch(`https://podo.b1.ma/api/public/filieres/${state.id}/modules`).then(res =>res.json()).then(res=>setModules(res.data)).catch(console.log('erreur fetch'));
fetch(`https://podo.b1.ma/api/public/filieres/${state.id}/effs`).then(res =>res.json()).then(res=>setEFF(res.data)).catch(console.log('erreur fetch'));

  }, [state]);
  return (
    <>
      <Helmet>
        <title>{state.name} {state.code}</title>
        <meta name="description" content={Modules.concat(EFF).map(e => e.name + " " + e.code).join(", ")} />
      </Helmet>
      <Banner />
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura'  }}>
        {state.name} {state.code}
      </h1>
      <div className='d-flex justify-content-center'>
        <div className="d-flex flex-wrap justify-content-center w-75">
      <ShowEmptyMessage dataList={Modules.concat(EFF)} />
       {Modules.length > 0 && <> <hr style={{width:"100%",color: colors.text}}/> <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>Modules :</h2></>}
        {Modules.map((e,i)=>{return(
          <Link key={e.id} to={`/Annees/${anneeCode}/Fillieres/${state.code}/Modules/${e.code}/Resources`} state={e} style={{textDecoration:"none"}}>
          <Buttons element={e} index={i} />
          </Link>
          )
        })}
        {EFF.length > 0 && <><hr style={{width:"100%",color: colors.text}}/><h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>EFFS :</h2></>}
        {EFF.map((e,i)=>{return (
           <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} state={e} >
          <Buttons element={e} index={i} />
          </a>
        )})}
      </div>
      </div>
    </>
  );
}