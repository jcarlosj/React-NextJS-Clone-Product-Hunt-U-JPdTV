import React from 'react';

/** Components */
import Search from '../ui/Search';

/** Define Component */
const Header = () => {
    return( 
        <header>
            <div>
                <div>
                    <p>PH</p>
                    <Search />
                    {/* Navegacion */}
                </div>
                <div>
                    {/* Menu de administracion */}
                </div>
            </div>
        </header>
    );
}

export default Header;