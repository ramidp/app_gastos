import React, {useState} from 'react';
import Helmet from 'react-helmet'
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import Boton from '../elements/Boton'
import {Formulario, Input, ContenedorBoton} from "../elements/ElementosFormulario"
import {ReactComponent as SvgLogin} from '../images/registro.svg'
import styled from 'styled-components';
import {auth} from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'; 
import Alerta from '../elements/Alerta'

//El boton tiene propiedades (Ver Boton.jsx) por lo cual si le agregamos al elemento la propiedad, cambia el estilo.
// Con la propiedad "as="buton""" en vez de que sea un anchor(link), le cambiamos el elemento a button
// as="xx" se puede usar para cambiarle el tipo de elemento a cualquier cosa.

const RegistroUsuarios = () => {

    const [correo, establecerCorreo] = useState('')
    const [password, establecerPassword] = useState('')
    const [password2, establecerPassword2] = useState('') //Elemento vacio
    const navegacion = useNavigate();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({}) //Objeto vacio

    // En vez de poner en cada onChange el target.value, se usa un switch con los 3 para usar la misma funcion.

    const handleChange = (e) => {
       switch(e.target.name) {
        case 'email':
            establecerCorreo(e.target.value)
            break;
        case 'password':
            establecerPassword(e.target.value)
            break;
        case 'password2':
            establecerPassword2(e.target.value)
            break;
       }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});
        // Comprobamos del lado del cliente que el correo sea valido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/ // Expresion regular de correo 
        // Paso 1 de Comprobacion (Que no haya campos vacios)
        if(correo == '' || password == '' || password2 == '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
             tipo: "error",
             mensaje: "Por favor de rellenar todos los datos"
            })
            return;
        }
        // Paso 2 de Comprobacion (Que sea valido el correo)
        if(!expresionRegular.test(correo) ) {
           cambiarEstadoAlerta(true);
           cambiarAlerta({
            tipo: "error",
            mensaje: "Por favor ingresa un correo electronico válido"
           })
           return; // Este return es importante para que salga de la función en caso de que se cumpla el if.
        }
        // Paso 3 de Comprobacion (Que sean iguales las contraseñas)
        if (password !== password2) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
             tipo: "error",
             mensaje: "Por favor de revisar que las contraseñas sean iguales"
            })
            return;
        // Paso 4 (En caso de que todo se dé correctamente, se crea el usuario en la base de Firebase)
        }
        try {
            await createUserWithEmailAndPassword(auth, correo, password);
            navegacion('/');
        } 
        // Mensajes de errores para la autenticación del usuario en Firebase (Revisar la pagina de Auth de Firebase)
        catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch (error.code){
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electronico proporcionado'
                    break;
                case 'auth/invalid-password':
                    mensaje = 'La contraseña debe ser de al menos 6 caracteres'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electronico no es valido'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta'
                    break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje})
        }
    }
    return ( 
        <>
        <Helmet>
            <title>Crear Cuenta</title>
        </Helmet>
        <Header>
            <ContenedorHeader>
                <Titulo>Crear Cuenta</Titulo>
                <div>
                    <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
            <Input
                type="password"
                name="password2"
                placeholder="Repetir Contraseña"
                value={password2}
                onChange={handleChange}
            />
            <ContenedorBoton>
                <Boton as="button" primario type="submit">Crear Cuenta</Boton> 
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
        max-height: 6.25rem; /* 100px */
        margin-bottom: 1.25rem; /* 20px; */
`

export default RegistroUsuarios;