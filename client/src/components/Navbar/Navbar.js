import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../utils/authContext";
import LogOutBtn from '../auth/LogOutButton'
import './style.css';

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className='nav-links'>
      <Link to="/">Home</Link>

      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to='/gallery'> Gallery </Link>
          <LogOutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;