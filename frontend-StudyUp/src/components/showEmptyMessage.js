import { useTheme } from "../contexts/ThemeContext.js";
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
    return <Spinner />;
  }

  if (dataList.length === 0 && showEmptyMessageToggle) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2
          style={{
            color: colors.text,
            marginTop: "40px",
            fontFamily: "jura",
            textAlign: "center",
          }}
        >
          Aucune Information disponible pour ce moment.
        </h2>

        <button
          className="buttonstyle"
          style={{ ...colors.buttonstyle }}
          onClick={() => navigate(-1)}
        >
          Retourner
        </button>
      </div>
    );
  }
}