import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

/** Define Style Components */
const 
    ContainerHeader = styled .div `
        margin: 0 auto;
        max-width: 1200px;
        width: 95%;

        @media( min-width: 768px ) {
            display: flex;
            justify-content: space-between;
        }

    `,
    Logo = styled .p `
        color: var( --orange );
        font-family: 'Roboto Slab', serif;
        font-size: 4rem;
        font-weight: 700;
        line-height: 0;
        margin-right: 2rem;
    `;

/** Components */
import Search from '../ui/Search';
import Navigation from './Navigation';

/** Define Component */
const Header = () => {
    return( 
        <header
            css={ css `
                border-bottom: 2px solid var( --gray-three );
                padding: 1rem 0;
            ` }
        >
            <ContainerHeader>
                <div>
                    <Link href="/">
                        <a><Logo>PH</Logo></a>
                    </Link>
                
                    <Search />
                    <Navigation />
                </div>
                <div>
                    <p>Hola: Eva Sofía</p>
                    <button type="button">Cerrar sesión</button>
                    <Link href="/"><a>Login</a></Link>
                    <Link href="/"><a>Crear cuenta</a></Link>
                </div>
            </ContainerHeader>
        </header>
    );
}

export default Header;