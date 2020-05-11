import React from 'react';
import Link from 'next/link';

/** Components */
import Search from '../ui/Search';
import Navigation from './Navigation';

/** Define Component */
const Header = () => {
    return( 
        <header>
            <div>
                <div>
                    <p>PH</p>
                    <Search />
                    <Navigation />
                </div>
                <div>
                    <p>Hola: Eva Sofía</p>
                    <button type="button">Cerrar sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear cuenta</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;