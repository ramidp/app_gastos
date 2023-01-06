import React, {createContext, useContext,useEffect,useState} from 'react';
import {auth} from "./../firebase/firebaseConfig"
import {onAuthStateChanged} from 'firebase/auth'

// Creando un estado global para probar si el usuario inició sesión o no!

const AuthContext = createContext();

// Hook para acceder al contexto

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [usuario, cambiarUsuario] = useState(); // Este estado es para que compruebe y cambie el estado del usuario. Si esta logueado = true, si no = false.
    const [cargando, cambiarCargando] = useState(true); // Este estado es para ver cuando termine de cargar la comprobacion (Por defecto queremos que cargue true)

    // Efecto para ejecutar la comprobacion SOLO una vez (Al comienzo de cuando se carga el Provider que esta en el index.jsx)
    useEffect(() => {
        // Comprobamos si ahy un usuario
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
    });

    return cancelarSuscripcion;
});

// Le ponemos un condicional (invertido porque usamos !) a los children (Es decir toda la pagina) donde si cargando es true, significa que el usuario esta logueado, en caso contrario, 

    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {cargando == false && children} 
            </AuthContext.Provider>
     );
}

export {AuthProvider, AuthContext, useAuth}