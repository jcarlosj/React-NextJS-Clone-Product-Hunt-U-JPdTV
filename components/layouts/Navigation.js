import React from 'react';
import Link from 'next/link';

/** Define Component */
const Navigation = () => {
    return( 
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/">Populares</Link>
            <Link href="/">Nuevo Producto</Link>
        </nav>
    );
}

export default Navigation;