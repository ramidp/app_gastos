import {db} from './firebaseConfig'
import {collection, addDoc} from 'firebase/firestore'

// Creamos un Documento dentro de una Colección que creamos.
// Nos pasamos varias propiedades para utilizar en la creación de Documentos en la base de datos de Firestore

const agregarGasto = ({categoria, fecha, descripcion, cantidad, uidUsuario}) => {

    addDoc(collection(db, 'gastos'),{
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha,
        uidUsuario: uidUsuario
    })
}

export default agregarGasto