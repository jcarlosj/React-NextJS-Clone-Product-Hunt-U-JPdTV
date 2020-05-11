import React from 'react';

const MainLayout = props => {
    return( 
        <>
            <h1>Header</h1>
            <main>
                { props .children }
            </main> 
        </>
    );
}

export default MainLayout;