import React from 'react';
import {Header, Titulo} from "../elements/Header"
import Helmet from 'react-helmet'
import BotonRegresar from '../elements/BotonRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosMesCategoria from '../hooks/useObtenerGastosMesCategoria'
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from '../elements/ElementosDeLista'
import IconoCategoria from '../elements/IconoCategoria'
import convertirAMoneda from '../functions/convertirAMoneda'


const GastosPorCategoria = () => {

  const gastosPorCategoria = useObtenerGastosMesCategoria();

    return ( 
    <>
      <Helmet>  
        <title>Gastos Mensuales por Categoria</title>
      </Helmet>

      <Header>
          <BotonRegresar/>
          <Titulo>Gastos Mensuales por Categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return (
            <div key={index}>
            {!elemento.cantidad == 0 && // Aca creamos un condicional para que SOLO muestre las categorias que tiene $1 o más.
            <ElementoListaCategorias>
              <Categoria> 
                <IconoCategoria nombre={elemento.categoria}/> 
                {elemento.categoria}
                </Categoria>
              <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          }
          </div>
          )
        })}
      </ListaDeCategorias>

      <BarraTotalGastado/>
    </>
     );
}
 
export default GastosPorCategoria;