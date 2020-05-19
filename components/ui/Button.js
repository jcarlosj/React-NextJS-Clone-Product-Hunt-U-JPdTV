import React from 'react';
import styled from '@emotion/styled'

/** Define Style Component */
const Button = styled .a `
    background-color: ${ props => props .bgColor ? '#DA552F' : 'white' };
    border: 1px solid #D1D1D1;
    color: ${ props => props .bgColor ? 'white' : 'black' };
    display: block;
    font-weight: 700;
    margin: 2rem auto;
    padding: .8rem 2rem;
    text-align: center;
    text-transform: uppercase;

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Button;