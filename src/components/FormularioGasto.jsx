import React, {useEffect, useState} from 'react';
import {ContenedorBoton, ContenedorFiltros, Input, InputGrande, Formulario} from '../elements/ElementosFormulario'
import Boton from '../elements/Boton'
import {ReactComponent as IconoPlus} from '../images/plus.svg'
import SelectCategorias from './SelectCategorias'
import Calendario from '../components/DayPicker'
import agregarGasto from '../firebase/agregarGasto'
import { fromUnixTime, getUnixTime} from 'date-fns' // Transforma fechas en segundos y fromUnixTime transforma al reves (formatos Unix en Fechas)
import {useAuth} from '../context/AuthContext'
import Alerta from '../elements/Alerta'
import {useNavigate} from 'react-router-dom'
import editarGasto from '../firebase/editarGasto'

const FormularioGasto = ({gasto}) => {


    
    // Creamos una expresion regular para que SOLO podamos escribir numeros ',' y '.', en el casillero de cantidad que es donde se escriben solo numeros.
    // Usamos un replace para que no permita escribir letras y solo la expresion regular

    const expresionRegularNumeros = /[^0-9.,]/g
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date())
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
    const [alerta, cambiarAlerta] = useState({});
    const {usuario} = useAuth()

    const navegacion = useNavigate();

    useEffect(() => {

        
        // Comprobamos si hay algun gasto
        // De ser asi establecemos todo el state con los valores del gasto
        if(gasto) {
            // Tenemos que comprobar que el gasto sea de su usuario.
            // Para eso comprobamos con uidUsuario vs el del gasto.
            if (gasto.data().uidUsuario === usuario.uid){
                cambiarCategoria(gasto.data().categoria)
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion)
                cambiarInputCantidad(gasto.data().cantidad)
            } else {
                navegacion('/')
            }
        }

    },[gasto, usuario]) // Se ejecuta una sola vez



    const handleChange = (e) => {
        if (e.target.name === "descripcion") {
            cambiarInputDescripcion(e.target.value);
        } else if (e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(expresionRegularNumeros, ''))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let cantidadDecimales = parseFloat(inputCantidad).toFixed(2); // Es para convertir el String de cantidad en Float con punto y asi agregar decimales.

        // Comprobamos que haya una descripcion y valor (Para que no agregue cosas a la base en vacio)
        // Falcon hace una 2da condicion/comprobacion en caso de que en CANTIDAD se agregue un caracter que no es un numero, pero como ya hay un impedimento para eso YO no la puse.

        // Falcon crea un .then para limpiar los campos POSTERIOR a que cree el documento en Firestore. No me tomaba el .then, por ende cree una funcion que LIMPIA todo y se agrega en el IF, cuando las condiciones
        // son validas
        const limpiarCampos = () => {
            cambiarCategoria('hogar');
                cambiarInputDescripcion('');
                cambiarInputCantidad('');
                cambiarFecha(new Date());
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente'})
        }

        if (inputDescripcion !== '' && inputCantidad !== ''){
            if (gasto){
                editarGasto({
                    id: gasto.id,
                    categoria: categoria,
                    descripcion: inputDescripcion,
                    cantidad: cantidadDecimales,
                    fecha: getUnixTime(fecha)
                })
                navegacion('/lista');
                } else {
                    agregarGasto({
                        uidUsuario: usuario.uid,
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidadDecimales, // cantidad con Decimales que transformamos en Float con 2 decimales.
                        fecha: getUnixTime(fecha) // Fecha con unixTime usado
                    })
                }
                limpiarCampos()
            }
        else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Llenar los campos vacios por favor'})
        }

    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                categoria={categoria}
                cambiarCategoria={cambiarCategoria}/>
                <Calendario 
                fecha={fecha}
                cambiarFecha={cambiarFecha}/>
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="$0.00"
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                
                    <Boton as="button" primario conIcono type="submit">
                    {gasto  ? 'Editar Gasto' : 'Agregar Gasto'}
                        <IconoPlus/>
                    </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
        </Formulario>
     );
}


 
export default FormularioGasto;