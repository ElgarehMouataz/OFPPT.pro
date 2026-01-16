import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useLocation ,state} from "react-router-dom";
import Buttons from '../components/Buttons.js'
import ShowEmptyMessage from "../components/showEmptyMessage.js";
import Banner from '../components/Banner.js';
import  {useTheme }  from "../contexts/ThemeContext.js"
export default function Resources() {
  const [List, setList] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { moduleId } = useParams();
  const { colors} = useTheme();

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
  return (
    <>
      <Helmet>
        <title>{state.name} {state.code}</title>
        <meta name="description" content={List.map(e => e.name + " " + e.code).join(", ")} />
      </Helmet>
      <Banner />
      <h2 style={{ width: "100%" ,color: colors.text, marginLeft: '10px', marginTop: '40px', fontFamily: 'jura' }}>{state.name} {state.code}</h2>
      <div className='d-flex justify-content-center'>
        <div className="d-flex flex-wrap justify-content-center w-75  ">
         <ShowEmptyMessage dataList={List} />
        {List.map((e, i) => (
          <a href={`https://podo.b1.ma/storage/${e.file_path}`} download={e.title} key={e.id} style={{textDecoration:"none"}}>
           <Buttons element={e} index={i} />
          </a>
        ))}
      </div>
      </div>
    </>
  )
};