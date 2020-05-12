import React from 'react';
import Link from 'next/link';

/** Define Component */
const Navigation = () => {
    return( 
        <nav>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/"><a>Populares</a></Link>
            <Link href="/"><a>Nuevo Producto</a></Link>
        </nav>
    );
}

export default Navigation;