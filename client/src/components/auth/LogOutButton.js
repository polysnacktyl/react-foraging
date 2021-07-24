import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../utils/authContext';
import { Context } from '../../utils/Reducer';
import '../Navbar/style.css';

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  const { dispatch } = useContext(Context);

  async function logOut() {
    await axios.get('http://localhost:3000/auth/logout');
    // await axios.get('https://the-future.herokuapp.com/auth/logout');
    await getLoggedIn();

    dispatch({
      type: 'logout'
    })
    window.localStorage.setItem('user', null);
  }

  return <button onClick={logOut}>log out</button>;
}

export default LogOutBtn;