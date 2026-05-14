import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { Routes,Route,BrowserRouter} from "react-router-dom";
import ThemeProvider from "./contexts/ThemeContext";
import Spinner from './components/Spinner';

const App = React.lazy(() => import('./App'));
const Annee = React.lazy(() => import('./screens/Annee'));
const Filliere = React.lazy(() => import('./screens/Fillieres'));
const Module = React.lazy(() => import('./screens/Modules'));
const Resources = React.lazy(() => import('./screens/Resources'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><Spinner /></div>}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/Annees" element={<Annee />} />
              <Route path="/Annees/:anneeCode/Fillieres" element={<Filliere />} />
              <Route path="/Annees/:anneeCode/Fillieres/:filliereCode/Modules" element={<Module />} />
              <Route path="/Annees/:anneeCode/Fillieres/:filliereCode/Modules/:moduleCode/Resources" element={<Resources />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

