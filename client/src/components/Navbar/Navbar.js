import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
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

                <LoginButton />
                
                <LogoutButton />

            </div>
        </div>
    )
};

export default Navbar;