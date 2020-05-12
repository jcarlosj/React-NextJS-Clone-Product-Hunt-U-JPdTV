import React from 'react';
import { Global, css } from '@emotion/core';

/** Components */
import Header from './Header';

const MainLayout = props => {
    return( 
        <>
            <Global 
                styles={ css `
                    :root {
                        --gray-one: #3D3D3D;
                        --gray-two: #6F6F6F;
                        --orange: #DA552F;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }

                    *, *:before, *:after {
                        box-sizing: inherit;
                    } 

                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                    }

                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    a {
                        text-decoration: none;
                    }

                `}
            />
            <Header />
            
            <main>
                { props .children }
            </main> 
        </>
    );
}

export default MainLayout;