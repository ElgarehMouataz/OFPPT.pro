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
import  ThemeProvider  from "./contexts/ThemeContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element= {<App />}/>
        <Route path="/Choix-Annees" element= {<Annee />}/>
        <Route path="/Choix-Annees/:anneeCode/Choix-Fillieres" element= {<Filliere />} />
        <Route path="/Choix-Annees/:anneeCode/Choix-Fillieres/:filliereCode/Choix-Modules" element= {<Module />}/>
        <Route path="/Choix-Annees/:anneeCode/Choix-Fillieres/:filliereCode/Choix-Modules/:moduleCode/Choix-Resources" element= {<Resources />}/>
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
reportWebVitals();
