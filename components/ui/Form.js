import React from 'react';
import styled from '@emotion/styled'

/** Define Style Component */
export const Form = styled .form `
    margin: 5rem auto 0 auto;
    max-width: 600px;
    width: 95%;

    label {
        flex 0 0 150px;
        font-size: 1.8rem;
    }

    input {
        flex: 1;
        padding: 1rem;
    }
`;

export const Field = styled .div `
    align-items: center;
    display: flex;
    margin-bottom: 2rem;
`;

export const Button = styled .button `
    background-color: var( --orange );
    border: none;
    color: white;
    font-family: 'PT Sans', sans-serif;
    font-size: 1.8rem;
    font-weith: 700;
    padding: 1.5rem;
    text-align: center;
    width: 100%;

    &:hover {
        cursor: pointer;
    }
`;