import React, { useState } from 'react';
import Router from 'next/router';

/** Dependencies */
import styled from '@emotion/styled';
import { css } from '@emotion/core';

/** Define Style Components */
const 
    InputText = styled .input `
        border: 1px solid var( --gray-three );
        min-width: 300px;
        padding: 1rem;
    `,
    Button = styled .button `
        background-color: white;
        background-image: url( './static/images/search.png' );
        background-repeat: no-repeat;
        background-size: 4rem;
        border: none;
        display: block;
        height: 3rem;
        position: absolute;
        right: 1rem;
        text-indent: -9999px;
        top: 1px;
        width: 3rem;

        &:hover {
            cursor: pointer
        }
    `;

/** Define Component */
const Search = () => {

    /** Define State */
    const [ searchTerm, setSearchTerm ] = useState( '' );

    /** Search product */
    const handleSubmitSearchProduct = event => {
        event .preventDefault();

        /** Valida que exista un 'String' en el campo */
        if( searchTerm .trim() === '' ) return;

        console .log( 'Buscando...', searchTerm );

        /** Redirecciona y pasa datos al Page 'Search' */
        Router .push({
            pathname: '/search',
            query: { q: searchTerm }
        });
    }

    return( 
        <form 
            css={ css `position: relative;` }
            onSubmit={ handleSubmitSearchProduct }
        >
            <InputText 
                type="text" 
                placeholder="Buscar Productos"
                onChange={ event => setSearchTerm( event .target .value ) }
            />
            <Button type="submit">Buscar</Button>
        </form>
    );
}

export default Search;