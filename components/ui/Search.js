import React from 'react';
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
    return( 
        <form 
            css={ css `position: relative;` }
        >
            <InputText 
                type="text" 
                placeholder="Buscar Productos"
            />
            <Button type="button">Buscar</Button>
        </form>
    );
}

export default Search;