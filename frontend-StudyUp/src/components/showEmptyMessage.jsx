import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ShowEmptyMessage({ dataList }) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [showEmptyMessageToggle, setShowEmptyMessageToggle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dataList.length === 0) {
        setShowEmptyMessageToggle(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dataList]);

  if (dataList.length === 0 && !showEmptyMessageToggle) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '300px'
      }}>
        <Spinner />
      </div>
    );
  }

  if (dataList.length === 0 && showEmptyMessageToggle) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '300px',
        gap: '20px'
      }}>
        <h2
          style={{
            color: colors.text,
            fontFamily: "jura",
            textAlign: "center",
            margin: 0
          }}
        >
          Aucune Information disponible pour ce moment.
        </h2>

        <button
          className="buttonstyle"
          style={{ 
            ...colors.buttonstyle,
            padding: '10px 30px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => navigate(-1)}
        >
          Retourner
        </button>
      </div>
    );
  }

  return null;
}
