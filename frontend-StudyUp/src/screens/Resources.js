import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation} from "react-router-dom";
import Buttons from '../components/Buttons.js'
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Banner from '../components/Banner.js';
import  {useTheme }  from "../contexts/ThemeContext.js"
export default function Resources() {
  const [Courses, setCourses] = useState([]);
  const [CCs, setCCs] = useState([]);
  const [EFMS, setEFMs] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { colors} = useTheme();

  useEffect(() => {
fetch(`https://podo.b1.ma/api/public/modules/${state.id}/courses`).then(res =>res.json()).then(res=>setCourses(res.data)).catch(console.log('erreur fetch'));
fetch(`https://podo.b1.ma/api/public/modules/${state.id}/ccs`).then(res =>res.json()).then(res=>setCCs(res.data)).catch(console.log('erreur fetch'));
fetch(`https://podo.b1.ma/api/public/modules/${state.id}/efms`).then(res =>res.json()).then(res=>setEFMs(res.data)).catch(console.log('erreur fetch'));
  }, [state.id]);
  return (
    <>
      <Helmet>
        <title>{state.name} {state.code}</title>
        <meta name="description" content={CCs.concat(EFMS).concat(Courses).map(e => e.name||e.title + (e.code ? " " + e.code : "")).join(", ")} />
      </Helmet>
      <Banner />
      <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>{state.name} {state.code}</h2>
      <div className='d-flex justify-content-center'>
        <div className="d-flex flex-wrap justify-content-center w-75  ">
         <ShowEmptyMessage dataList={CCs.concat(EFMS).concat(Courses)} />
          {Courses.length > 0 && <> <hr style={{width:"100%",color: colors.text}}/> <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>Cours et TP :</h2></>}
        {Courses.map((e, i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} style={{textDecoration:"none"}}>
           <Buttons element={e} index={i} />
          </a>
        ))}
        {CCs.length > 0 && <> <hr style={{width:"100%",color: colors.text}}/> <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>Courses :</h2></>}
         {CCs.map((e, i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} style={{textDecoration:"none"}}>
           <Buttons element={e} index={i} />
          </a>
        ))}
        {EFMS.length > 0 && <> <hr style={{width:"100%",color: colors.text}}/> <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' ,textDecoration: 'underline', fontWeight:"bold"}}>Courses :</h2></>}
         {EFMS.map((e, i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} style={{textDecoration:"none"}}>
           <Buttons element={e} index={i} />
          </a>
        ))}
      </div>
      </div>
    </>
  )
};