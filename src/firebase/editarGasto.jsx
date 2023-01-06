import {db} from './firebaseConfig'
import {collection, addDoc, doc, updateDoc} from 'firebase/firestore'
import  {fromUnixTime} from 'date-fns'

// Creamos un Documento dentro de una Colección que creamos.
// Nos pasamos varias propiedades para utilizar en la creación de Documentos en la base de datos de Firestore

const editarGasto = async ({categoria, fecha, descripcion, cantidad, id}) => {

    const documento = doc(db, 'gastos', id)
    
    return await updateDoc(documento, {
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha
    }
    )
}

export default editarGasto