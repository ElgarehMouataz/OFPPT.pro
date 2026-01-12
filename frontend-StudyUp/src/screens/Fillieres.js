import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Buttons from "../components/Buttons"
import Banner from '../components/Banner.js';
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import  {useTheme }  from "../contexts/ThemeContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";
export default function Filliere() {
  const [Filliere, setFilliere] = useState([]);
  const navigate = useNavigate();
  const { anneeId } = useParams();
   const { colors} = useTheme();
  useEffect(() => {
  fetch(`https://podo.b1.ma/api/public/years/${anneeId}/filieres`).then(res =>res.json()).then(res=>setFilliere(res.data)).catch(console.log({Filliere}));
  }, [anneeId]);
  return (
    <div key="filliere-main-view">
      <Helmet >
        <title></title>
        <meta name="description" content={Filliere.map(e => e.name + " " + e.code)} />
      </Helmet>
      <Banner/>
      <h1 style={{ color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>
        Choisir votre filliere :
      </h1>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <ShowEmptyMessage dataList={Filliere} />
        {Filliere.map((e, i) => (
          <Link to={`/Annees/${anneeId}/Fillieres/${e.id}/Modules`} state={e} style={{textDecoration:"none"}}>
           <Buttons element={e} index={i} />
          </Link>
        ))}
        {Filliere.length !== 0 && <button className="buttonstyle" style={{...colors.buttonstyle}} onClick={() => navigate(-1)}>Retourner</button>}
      </div>
    </div>
  );
}