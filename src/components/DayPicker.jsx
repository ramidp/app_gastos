import React, {useState} from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale' // Aca usamos un comando para cambiarle el idioma a ESPAÑOL(es)
import styled from 'styled-components';
import theme from '../theme'

// Aca estamos usando el format de date-fns para utilizar la fecha que ya tenemos en el 
// state y darle un formato para que lo muestre. (Recordar que tiene un New Date, por ende mostrará el día actual)


// En caso de que fecha sea indefinido, se le otorga un valor (fecha = new Date())

const Calendario = ({fecha, cambiarFecha}) => {

    const [visible, cambiarVisible] = useState(false)

    const formatFecha = (fecha = new Date()) => {
        return (
        format(fecha,`dd 'de' MMMM 'de' yyyy`, {locale: es})
        )
    }

    return ( 
        <ContenedorInput >
            <input
            type="text" 
            readOnly 
            value={formatFecha(fecha)} 
            onClick={() => cambiarVisible(!visible)}
            /> 
            {visible && 
            <DayPicker 
                mode="single"
                selected={fecha}
                onSelect={cambiarFecha}
                locale={es}
            />}
        </ContenedorInput>
     );
}

const ContenedorInput = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 2rem; /* 28px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`; 

 
export default Calendario;