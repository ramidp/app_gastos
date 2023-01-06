import React from 'react';
import {ReactComponent as IconoCerrarSesion} from '../images/log-out.svg'
import Boton from './Boton'
import {auth} from '../firebase/firebaseConfig'
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

// signOut es el comando de firebase para cerrar sesion
// No olvidar que hay que usar async y await ---- y luego try y catch para que haga lo que pedimos y si hay un error "catchee" el error.
// useNavigate es el comando de React Router para movernos a otras paginas, entonces combinamos ambas para que cierre sesion y para que nos envie a la pagina de iniciar-sesion nuevamente

const BotonCerrarSesion = () => {

    const navegacion = useNavigate()

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            navegacion('/iniciar-sesion')
        } catch (error){
            console.log(error)
        }
    }

    return ( 
        <Boton 
        iconoGrande 
        as="button"
        onClick={cerrarSesion}>
            <IconoCerrarSesion/>
        </Boton>
     );
}
 
export default BotonCerrarSesion;