/** Reglas de validación exclusivas para el formulario de creación de cuenta */
const validateLogIn = dataForm => {
    let errors = {};

    /** Valida campo 'email' del formulario */
    if( ! dataForm .email ) {
        errors .email = 'El email es requerido';
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( dataForm .email ) ) {
        errors.email = "Email no es válido"
    }

    /** Valida campo 'password' del formulario */
    if( ! dataForm .password ) {
        errors .password = 'La contraseña es requerida';
    } else if( dataForm .password .length < 6 ) {
        errors .password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
}

export default validateLogIn;