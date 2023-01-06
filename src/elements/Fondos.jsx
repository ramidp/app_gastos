import React from 'react';
import styled from 'styled-components'
import {ReactComponent as Puntos} from '../images/puntos.svg' // Cargamos puntos.svg como un Componente de ReactComponent.

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;

// Usamos () para darle estilo a un componente, en este caso Puntos que es el svg que convertimos como componente con el codigo de arriba.
 
// Se le da estilo a Puntos de esta forma y se lo llama PuntosArriba
const PuntosArriba = styled(Puntos)` 
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
// Se le da OTRO estilo a Puntos y se lo llama PuntosAbajo
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
    return ( 
        <>
            <PuntosArriba/>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
            preserveAspectRatio="none">
            <path d="M0,192L21.8,176C43.6,160,87,128,131,128C174.5,128,218,160,262,165.3C305.5,171,349,149,393,128C436.4,107,480,85,524,85.3C567.3,85,611,107,655,122.7C698.2,139,742,149,785,128C829.1,107,873,53,916,69.3C960,85,1004,171,1047,202.7C1090.9,235,1135,213,1178,186.7C1221.8,160,1265,128,1309,138.7C1352.7,149,1396,203,1418,229.3L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
            </Svg>
            <PuntosAbajo/>
        </>
     );
}
 
export default Fondo;
