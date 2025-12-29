import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from '../components/Buttons.js'
import Spinner from '../components/Spinner.js'
export default function Resources() {
  const [List, setList] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const navigate = useNavigate();
  const { moduleId } = useParams();

  useEffect(() => {
    const APIS = [`https://podo.b1.ma/api/public/modules/${moduleId}/courses`,
    `https://podo.b1.ma/api/public/modules/${moduleId}/ccs`,
    `https://podo.b1.ma/api/public/modules/${moduleId}/efms`,
    ]
    async function fetchData() {
      const reponse = await Promise.all(APIS.map((api) => fetch(api)));
      const data = await Promise.all(reponse.map((rep) => rep.json()));
      const cleandata = await data.flatMap((item) => item.data)
      setList(cleandata);
    }
    fetchData();
  }, [moduleId]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (List.length === 0) {
        setShowEmptyMessage(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [List]);
  return (
    <>
      <Helmet>
        <title>StudyUp - Resources</title>
        <meta name="description" content="Choisissez votre année d'étude pour accéder aux ressources académiques sur StudyUp." />
      </Helmet>
      <div className="banner"></div>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {List.length === 0 && !showEmptyMessage && <Spinner />}
        {List.map((e, i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id}>
           <Buttons element={e} index={i} />
          </a>
        ))}
        {showEmptyMessage && List.length === 0 && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 style={{ color: "#001c83ff", marginTop: '40px', fontFamily: 'jura', textAlign: 'center' }}>
              Aucune Information disponible pour cette option.
            </h2>
            <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>
          </div >
        )}
        {List.length !== 0 && <button className="buttonstyle" onClick={() => navigate(-1)}>Retourner</button>}
      </div>
    </>

  )
};