import React, { useState } from 'react';
import {deleteDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/firebaseConfig'


const borrarGasto = async (id) => {
        await deleteDoc(doc(db, 'gastos', id));
}
 
export default borrarGasto;