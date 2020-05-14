import React, { useContext } from 'react';
import Link from 'next/link';

/** Dependencies */
import styled from '@emotion/styled';
import { css } from '@emotion/core';

/** Context */
import { FirebaseContext } from '../../firebase';

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

    const /** Destructuring properties 'FirebaseContext' */
        { user, firebase } = useContext( FirebaseContext );

    return( 
        <header
            css={ css `
                border-bottom: 2px solid var( --gray-three );
                padding: 1rem 0;
            ` }
        >
            <ContainerHeader>
                <div
                    css={ css `
                        display: flex;
                        align-items: center;
                    `}
                >
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
                    { user
                        ?   <>
                                <p
                                    css={ css `
                                        margin-right: 2rem;
                                    `}
                                >Hola: { user .displayName }</p>
                                <Button 
                                    bgColor="true"
                                    onClick={ () => firebase .signOutUser() }
                                >Cerrar sesión</Button>
                            </>
                        :   <>
                                <Link href="/login">
                                    <Button 
                                        bgColor="true"
                                    >Login</Button>
                                </Link>
                                <Link href="/create-account">
                                    <Button>Crear cuenta</Button>
                                </Link>
                            </>
                    }
                </div>
            </ContainerHeader>
        </header>
    );
}

export default Header;