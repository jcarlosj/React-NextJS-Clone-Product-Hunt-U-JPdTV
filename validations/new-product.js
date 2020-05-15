/** Reglas de validación exclusivas para el formulario de creación de cuenta */
const validateNewProduct = dataForm => {
    let errors = {};

    /** Valida campo 'name' del formulario */
    if( ! dataForm .name ) {
        errors .name = 'El nombre del representante es requerido';
    }

    /** Valida campo 'companyName' del formulario */
    if( ! dataForm .companyName ) {
        errors .companyName = 'El nombre de la empresa es requerido';
    }

    /** Valida campo 'briefCompanyDescription' del formulario */
    if( ! dataForm .briefCompanyDescription ) {
        errors .briefCompanyDescription = 'Debes agregar una breve descripción de la empresa';
    }

    /** Valida campo 'productName' del formulario */
    if( ! dataForm .productName ) {
        errors .productName = 'El nombre del producto es requerido';
    }

    /** Valida campo 'productUrl' del formulario */
    if( ! dataForm .productUrl ) {
        errors .productUrl = 'La URL del producto es requerido';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test( dataForm .productUrl ) ) {
        errors .productUrl = 'El formato de la URL no es valida';
    }

    /** Valida campo 'productDescription' del formulario */
    if( ! dataForm .productDescription ) {
        errors .productDescription = 'Debes agregar la descripción de tu producto';
    }

    return errors;
}

export default validateNewProduct;