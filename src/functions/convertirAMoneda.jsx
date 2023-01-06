// Funcion para transformar numeros en formatos, en este caso USD, ponerle 2 digitos post coma.

const DarleFormatoCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'en-US',
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    ).format(cantidad);
}
 
export default DarleFormatoCantidad;