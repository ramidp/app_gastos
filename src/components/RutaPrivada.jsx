import React from 'react';
import {useAuth} from '../context/AuthContext'
import {Navigate} from 'react-router-dom'


// Vamos a devolver componentes en caso de que el usuario haya iniciado sesion, en caso contrario REDIRECCIONAMOS

// Traemos children para tomar los ELEMENTOS hijo de todo lo que esta dentro de RutaPrivada (Ver index.jsx)
// Ademas se le agrega un if donde comprobamos si hay usuario (true), en caso de que haya, devolvemos la ruta {children} en caso de que no, redirecciona (useNavigate/Navigate, comando de React Router)

// Navigate se usa para subclases donde no se pueden usar Hooks, en caso de que se puedan usar, mejor usar useNavigate()

const RutaPrivada = ({children}) => {
    
    const {usuario} = useAuth()

    if(usuario) {
        return children
    } else {
            return <Navigate replace to="/iniciar-sesion"/>
    }
}
 
export default RutaPrivada;