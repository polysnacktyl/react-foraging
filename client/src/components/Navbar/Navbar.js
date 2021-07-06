import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='nav-links'>
                <NavLink exact activeClassName='active' to='/'>
                    home
                </NavLink>
                <NavLink exact activeClassName='active' to='/gallery'>
                    gallery
                </NavLink>

            </div>
        </div>
    )
};

export default Navbar;