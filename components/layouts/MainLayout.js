import React from 'react';
import Link from 'next/link';

/** Components */
import Header from './Header';

const MainLayout = props => {
    return( 
        <>
            <Header />
            
            <main>
                { props .children }
            </main> 
        </>
    );
}

export default MainLayout;