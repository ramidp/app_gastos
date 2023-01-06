import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebaseConfig'
import {collection, doc, getDoc} from 'firebase/firestore'

const useObtenerUnGasto = (id) => {
    
    const [gasto, establecerGasto] = useState('')
    const navegacion = useNavigate()

    useEffect (() => {

        // Para usar async y await, no se puede usar en useEffect, por ende se crea una funcion dentro y luego llamamos la función debajo.
        const obtenerGasto = async () => {
            const documento = await getDoc(doc(db, 'gastos', id));

            if(documento.exists) {
                establecerGasto(documento)
            } else {
                navegacion('/lista')
            }

        }
        obtenerGasto()
        



    },[navegacion, id]) // Que se ejecute solo 1 vez.

    return [gasto];
}
 
export default useObtenerUnGasto;