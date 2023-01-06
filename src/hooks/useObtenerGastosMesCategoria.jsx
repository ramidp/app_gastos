import ca from 'date-fns/esm/locale/ca/index.js';
import React, { useState, useEffect } from 'react';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes'


const useObtenerGastosMesCategoria = () => {
    
    const [gastosCategoria, cambiarGastosCategoria] = useState([])
    const gastos = useObtenerGastosDelMes()
    

    useEffect(() => {

        // reduce = nos devuelve un objeto que va a contener la suma de CADA CATEGORIA, con 2 parametros (callback -con 2 parametros Resultante y Actual- se ejecuta por cada elemnto) y otro elemento (en este caso un objeto)
        const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
            const categoriaActual = objetoActual.categoria;
            const cantidadActual = objetoActual.cantidad;
    
            objetoResultante[categoriaActual] += cantidadActual;
    
            return objetoResultante
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0
        });
    
        // Esto nos permite usar el objeto CATEGORIA (Que configuramos arriba) del arreglo de sumaDeGastos. 
        // Luego hacemos un mapeo donde la categoria es el elemento y la cantidad es sumaDeGastos con propiedad elemento (Categoria)
        // Por ultimo ponemos este mapeo/arreglo nuevo en cambiarGastosCategoria que será el arreglo de gastosCategoria
        cambiarGastosCategoria(Object.keys(sumaDeGastos).map((elemento) => {
            return {
                categoria: elemento,
                cantidad: sumaDeGastos[elemento],
            }
        })); // 

    },[gastos, cambiarGastosCategoria]);

    return gastosCategoria;
}
 
export default useObtenerGastosMesCategoria
