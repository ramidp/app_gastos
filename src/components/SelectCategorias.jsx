import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import IconoCategoria from '../elements/IconoCategoria'
import {ReactComponent as IconoFlechaAbajo} from '../images/down.svg'


// Como se crea un menu oculto que se desbloquea con click:
// creamos un useState que se llama mostrar/cambiarMostrar. Le damos valor false, para que aparezca escondido.
// Este valor lo usamos con condicional en el menu ({mostrarSelect && y encerramos el menu como se ve en la linea 22})
// Y luego ponemos un onClick en el menu donde le ponemos una funcion que retorna el valor OPUESTO. Es decir, si clickeamos pasa false a true y si volvemos a clickear pasa true a false.

// currentTarget sirve para cuando el Elemento que le queremos dar click, esta DENTRO de otro Elemento. Es una forma de targetear un sub-elemento.

const SelectCategorias = ({categoria, cambiarCategoria}) => {

    const [mostrarSelect, cambiarMostrarSelect] = useState(false);

    const handleClick = (e) => {
        cambiarCategoria(e.currentTarget.id)
        // cambiarCategoria(e.currentTarget.dataset.valor)
    }

    const categorias = [
        {id: 'comida', texto: 'Comida'},
        {id: 'cuentas y pagos', texto: 'Cuentas y pagos'},
        {id: 'hogar', texto: 'Hogar'},
        {id: 'transporte', texto: 'Transporte'},
        {id: 'ropa', texto: 'Ropa'},
        {id: 'salud e higiene', texto: 'Salud e Higiene'},
        {id: 'compras', texto: 'Compras'},
        {id: 'diversion', texto: 'Diversion'}
    ]

    return ( 
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <OpcionSeleccionada>
                {categoria}
                <IconoFlechaAbajo/>
            </OpcionSeleccionada>

            {mostrarSelect && 
            <Opciones>
                    {categorias.map((categoria) => 
                        <Opcion key={categoria.id} 
                                data-valor={categoria.id} // para acceder a este dato, se usa 'data' - y el nombre que querramos. En este caso 'valor' para luego poder acceder a él.
                                id={categoria.id} // Esta es otra forma de acceder a las categorias sin usar "data-XXX" ni "dataset" (Como lo explica Falcon, ver linea 20)
                                onClick={handleClick}>
                                <IconoCategoria nombre={categoria.id} // el nombre es igual al id de la categoria y de esta forma, en el archivo IconoCategoria.jsx puede leer el switch y usar el icono correspondiente.
                                /> 
                                {categoria.texto}
                        </Opcion>
                    )}
            </Opciones>
            }
        </ContenedorSelect>
     );
}
 
export default SelectCategorias;

const ContenedorSelect = styled.div`
    background: ${theme.grisClaro}; 
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: 40%;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
 
const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;
 
const Opciones = styled.div`
    background: ${theme.grisClaro};
    position: absolute;
    top: 5.62rem; /* 90px */
    left: 0;
    width: 100%;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;
 
const Opcion = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: ${theme.grisClaro2};
    }
`;