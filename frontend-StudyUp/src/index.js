import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Annee from './screens/Annee';
import Filliere from './screens/Fillieres';
import Module from './screens/Modules';
import Resources from './screens/Resources';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { Routes,Route,BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element= {<App />}/>
        <Route path="/Annees" element= {<Annee />}/>
        <Route path="/Annees/:anneeId/Fillieres" element= {<Filliere />} />
        <Route path="/Annees/:anneeId/Fillieres/:filliereId/Modules" element= {<Module />}/>
        <Route path="/Annees/:anneeId/Fillieres/:filliereId/Modules/:moduleId/Resources" element= {<Resources />}/>
      </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
