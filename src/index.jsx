import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader'
import Contenedor from './elements/Contenedor'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EditarGasto from './components/EditarGasto'
import GastosPorCategoria from './components/GastosPorCategoria'
import InicioSesion from './components/InicioSesion'
import ListaDeGastos from './components/ListaDeGastos'
import RegistroUsuarios from './components/RegistroUsuarios'
import Helmet from "react-helmet"
import logo from './images/logo.png'
import Fondo from './elements/Fondos'
import {AuthProvider} from './context/AuthContext'
import RutaPrivada from './components/RutaPrivada'
import {TotalGastadoProvider} from './context/TotalGastadoMesContext'

WebFont.load ({
  google: {
    families: ['Work Sans:400,500,700']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={logo} type="image/x-icon"/>
    </Helmet>
  <AuthProvider>
    <TotalGastadoProvider>
        <BrowserRouter>
            <Contenedor>
                <Routes>
                  <Route path="/iniciar-sesion" element={<InicioSesion/>} />
                  <Route path="/crear-cuenta" element={<RegistroUsuarios/>} />

                  <Route path="/categorias" element={
                    <RutaPrivada>
                      <GastosPorCategoria/>
                    </RutaPrivada>
                  }/>

                  <Route path="/lista" element={
                    <RutaPrivada >
                      <ListaDeGastos/>
                    </RutaPrivada>
                  }/>

                  <Route path="/editar/:id" element={
                    <RutaPrivada>
                      <EditarGasto/>
                    </RutaPrivada>
                  }/>

                  {/* <Route path="/" element={<App/>}/> */}

                  <Route path="/" element={
                    <RutaPrivada>
                      <App/>
                    </RutaPrivada>
                  }/>

                </Routes>
            </Contenedor>
        </BrowserRouter>
    </TotalGastadoProvider>
  </AuthProvider>
  <Fondo/>
  </>
);
