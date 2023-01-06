import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {db} from '../firebase/firebaseConfig'
import {endOfMonth, startOfMonth, getUnixTime} from 'date-fns'
import {useAuth} from '../context/AuthContext'

const useObtenerGastosDelMes = () => {
    
    const [gastos, establecerGastos] = useState([]) 
    const {usuario} = useAuth();

    

    useEffect(() => {
        const inicioDeMes = getUnixTime(startOfMonth(new Date()))
        const finDeMes = getUnixTime(endOfMonth(new Date()))

        
        if (usuario) {
            
            const consulta = query(
                collection(db, 'gastos'), // Accede a la base de datos y colecion 'gastos'
                orderBy('fecha', 'desc'), // Ordena fecha descendientemente
                where('fecha', '>=', inicioDeMes), // Que traiga gastos superiores al inicio de mes 
                where('fecha', '<=', finDeMes), // Que traiga gastos inferiores al fin de mes
                where('uidUsuario', '==', usuario.uid) // Comprobamos que traiga GASTOS del mismo usuario y no de otros.
            )

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return {
                        ...documento.data(), id: documento.id 
                    }
                }))
            }, (error) => {console.log(error)});
            return unsuscribe;
        }

    }, [usuario]); // Solo 1 vez. Se agrega usuario en las dependencias.

    return gastos; // Va sin corchetes, sino creamos arrays dentro de arrays.
}
 
export default useObtenerGastosDelMes;