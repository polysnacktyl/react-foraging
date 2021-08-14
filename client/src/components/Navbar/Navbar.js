import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../utils/authContext";
import LogOutBtn from '../auth/LogOutButton'
import './style.css';

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className='nav-links'>
      <Link to="/">home</Link>

      {loggedIn === false && (
        <>
          <Link to="/login">log in</Link>
          <Link to="/register">register</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to='/gallery'>gallery</Link>
          <Link to='/map'>map</Link>
          <LogOutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;