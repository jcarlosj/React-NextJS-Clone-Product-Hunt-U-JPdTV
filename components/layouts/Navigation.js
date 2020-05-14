import React, { useContext } from 'react';

/** Dependencies */
import Link from 'next/link';
import styled from '@emotion/styled';

/** Context */
import { FirebaseContext } from '../../firebase';

/** Define Style Component */
const Nav = styled .nav `
    padding-left: 2rem;

    a {
        color: var( --gray-two )
        font-family: 'PT Sans', sans-serif;
        font-size: 1.8rem;
        margin-left: 2rem;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

/** Define Component */
const Navigation = () => {

    const /** Destructuring properties 'FirebaseContext' */
        { user } = useContext( FirebaseContext );

    return( 
        <Nav>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/popular"><a>Populares</a></Link>
            { user && <Link href="/new-product"><a>Nuevo Producto</a></Link> }
        </Nav>
    );
}

export default Navigation;