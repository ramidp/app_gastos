import React, {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig'
import { useAuth } from '../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit, startAfter} from 'firebase/firestore';

// Vamos a crear un Hook.

//Son 2 arreglos, El de useState y el del Return.

const useObtenerGastos = () => {

    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([])
    const [ultimoGasto, cambiarUltimoGasto] = useState(null)
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false)


    const obtenerMasGastos= () => {

        const consulta2 = query(
            collection(db, 'gastos'),
            where('uidUsuario', "==", usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto), // Aca se configura que empiece POSTERIOR al ultimoGasto. ultimoGasto es un setState, que se carga en el useEffect para que nos determine los primeros 10 gastos. Esto se usa en el boton Cargar Mas
        );

        onSnapshot(consulta2, (snapshot) => {
            if(snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);

                cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return {...gasto.data(), id: gasto.id}
                })))

            } else {
                cambiarHayMasPorCargar(false);
            }
        }, error => {console.log(error)});
    }

    useEffect(() => {

        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', "==", usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
        );
        // Creamos una consulta con varios parametros.
        // Where = Nos filtra la informacion acorde al usuario. orderBy = ordena por fecha descendentemente y limit = limita la cantidad, en este caso de gastos.
        // Esto se puede usar en el onSnapshot en vez de "db" y de esta forma usamos la base con algunos parametros (orderBy, limit, where)

        // Esta constante la creamos para que "desescriba" el usuario para que no haya errores de renderizado de componentes.
        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            if(snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]); // length - 1 es el indice del ULTIMO (Indice arranca con 0 y length arranca con 1, por eso se le resta 1)
                cambiarHayMasPorCargar(true);
            } else {
                cambiarHayMasPorCargar(false);
            }

            // Hacemos un mapeo de CADA objeto que corresponde al usuario en cuestión.
            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        });

        return unsuscribe;
    },[usuario]); // Se ejecuta solo 1 vez

    

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;