import React, {useState} from 'react';
import Helmet from 'react-helmet'
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import Boton from '../elements/Boton'
import {Formulario, Input, ContenedorBoton} from "../elements/ElementosFormulario"
import {ReactComponent as SvgLogin} from '../images/login.svg'
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'
import Alerta from '../elements/Alerta'


const InicioSesion = () => {

    const [correo, establecerCorreo] = useState('')
    const [password, establecerPassword] = useState('')
    const navegacion = useNavigate();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({})

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            establecerCorreo(e.target.value);
        } else if (e.target.name === 'password'){
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/  
        if(correo == '' || password == '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
             tipo: "error",
             mensaje: "Por favor de rellenar todos los datos"
            })
            return;
        }
        if(!expresionRegular.test(correo) ) {
           cambiarEstadoAlerta(true);
           cambiarAlerta({
            tipo: "error",
            mensaje: "Favor de ingresar un correo válido"
           })
           return;
        }
        try {
            await signInWithEmailAndPassword(auth, correo, password);
            navegacion('/');
        } 
        catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch (error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontró ninguna cuenta con ese correo electronico'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta'
                }
        cambiarAlerta({tipo: 'error', mensaje: mensaje})
        }
    }

    return ( 
        <>
        <Helmet>
            <title>Iniciar Sesion</title>
        </Helmet>
        <Header>
            <ContenedorHeader>
                <Titulo>Iniciar Sesion</Titulo>
                <div>
                    <Boton to="/crear-cuenta">Registrarse</Boton>
                </div>
            </ContenedorHeader>
        </Header>
        <Formulario onSubmit={handleSubmit}>
            <Svg/>
            <Input
                type="email"
                name="email"
                placeholder="Correo Electronico"
                value={correo}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
            />
            <ContenedorBoton>
                <Boton as="button" primario type="submit">Iniciar Sesion</Boton> 
            </ContenedorBoton>
        </Formulario>
        <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}/>
        </>
     );
}

const Svg = styled(SvgLogin)`
        width: 100%;
        max-height: 12.5rem; /* 100px */
        margin-bottom: 1.25rem; /* 20px; */
`

export default InicioSesion;