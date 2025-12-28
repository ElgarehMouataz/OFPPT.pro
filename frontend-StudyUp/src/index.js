import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Annee from './Annee';
import Filliere from './Fillieres';
import Module from './Modules';
import Resources from './Resources';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
{path: "/", element:<App/>},
{path: "/Annees", element:<Annee/>},
{path: "/Annees/:anneeId/Fillieres", element:<Filliere/>},
{path: "/Annees/:anneeId/Fillieres/:filliereId/Modules", element:<Module/>},
{path: "/Annees/:anneeId/Fillieres/:filliereId/Modules/:moduleId/Resources", element:<Resources/>}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
