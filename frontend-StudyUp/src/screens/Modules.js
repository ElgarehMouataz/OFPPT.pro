import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import  {useTheme }  from "../contexts/ThemeContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Modules() {
  const [Modules, setModules] = useState([]);
  const [EFF, setEFF] = useState([]);
 
  const { anneeId, filliereId } = useParams();
   const { colors} = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
fetch(`https://podo.b1.ma/api/public/filieres/${filliereId}/modules`).then(res =>res.json()).then(res=>setModules(res.data)).catch(console.log({Modules}));
fetch(`https://podo.b1.ma/api/public/filieres/${filliereId}/effs`).then(res =>res.json()).then(res=>setEFF(res.data)).catch(console.log({EFF}));

  }, [filliereId]);
  return (
    <>
      <Helmet>
        <title>StudyUp - Modules</title>
        <meta name="description" content={Modules.concat(EFF).map(e => e.name + " " + e.code).join(", ")} />
      </Helmet>
      <Banner />
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura'  }}>
        Preparation module:
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
      <ShowEmptyMessage dataList={Modules.concat(EFF)} />
        {Modules.map((e,i)=>{return(
          <Link key={e.id} to={`/Annees/${anneeId}/Fillieres/${filliereId}/Modules/${e.id}/Resources`} state={e} style={{textDecoration:"none"}}>
          <Buttons element={e} index={i} />
          </Link>
          )
        })}
        {EFF.map((e,i)=>{return (
           <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} >
          <Buttons element={e} index={i} />
          </a>
        )})}
      </div>
    </>
  );
}