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
import Button from '../ui/Button';

/** Define Component */
const Header = () => {

    const userExists = false;

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
                <div
                    css={ css `
                        display: flex;
                        align-items: center;
                    `}
                >
                    { userExists
                        ?   <>
                                <p
                                    css={ css `
                                        margin-right: 2rem;
                                    `}
                                >Hola: Eva Sofía</p>
                                <Button 
                                    bgColor="true"
                                >Cerrar sesión</Button>
                            </>
                        :   <>
                                <Link href="/">
                                    <a>
                                        <Button 
                                            bgColor="true"
                                        >Login</Button>
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a>
                                        <Button>Crear cuenta</Button>
                                    </a>
                                </Link>
                            </>
                    }
                </div>
            </ContainerHeader>
        </header>
    );
}

export default Header;