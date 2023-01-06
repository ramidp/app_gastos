import React from 'react';
import {Header, Titulo, ContenedorBotones, ContenedorHeader} from "../elements/Header"
import Helmet from 'react-helmet'
import BotonRegresar from '../elements/BotonRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import {useParams} from 'react-router-dom'// Con este accedemos al parametro que tenemos en la barra de direccion (el ID del gasto en este caso)
import useObtenerUnGasto from '../hooks/useObtenerUnGasto';


const EditarGasto = () => {

    const {id} = useParams() // Obtenemos el ID del gasto
    const [gasto] = useObtenerUnGasto(id);

    return ( 
        <>
        <Helmet>
          <title>Editar Gasto</title>
        </Helmet>
  
        <Header>
              <BotonRegresar ruta="/lista"/>
            <Titulo>Editar Gasto</Titulo>
        </Header>

        <FormularioGasto gasto={gasto}/>

        <BarraTotalGastado/>
      </>
  
     );
}
 
export default EditarGasto;