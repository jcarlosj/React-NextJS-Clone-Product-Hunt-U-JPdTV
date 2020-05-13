import React, { useState, useEffect } from 'react';

/** Hook personalizado para validar formularios */
const useValidateForm = ( initialState, validate, fn ) => {

    /** Define State */
    const 
        [ dataForm, setDataForm ] = useState( initialState ),       // Para los datos del formulario
        [ errors, setErrors ] = useState({}),                       // Para los errores
        [ submit, setSubmit ] = useState( false );                  // Para autorizar el envio de los datos

    /** Hace seguimiento a cambios  */
    useEffect( () => {
        /** Valida si puede enviarse los datos del formulario */
        if( submit ) {
            const noErrors = Object .keys( errors ) .length === 0;

            /** Valida si NO hay errores registrados */
            if( noErrors ) {
                fn();       // Funcion que se ejecutara para realizar una accion determinada con los datos del formulario
            }
            setSubmit( false );
        }

    }, [ errors ] );

    /** Registra en el State los cambios ingresados en los campos del formulario */
    const handleChange = event => {
        setDataForm({
            ...dataForm,
            [ event .target .name ]: event .target .value
        });
    }

    /** Envio de datos del Formulario */
    const handleSubmit = event => {
        event .preventDefault();

        const errorsValidate = validate( dataForm );
        setErrors( errorsValidate );
        setSubmit( true );
    }

    return {
        dataForm,       //  State
        errors,         //  State
        submit,         //  State
        handleChange,   //  Funcionalidad
        handleSubmit    //  Funcionalidad
    };
}

export default useValidateForm;