import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../utils/authContext';
import '../Navbar/style.css';

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    await axios.get('http://localhost:3000/auth/logout');
    // await axios.get('https://the-future.herokuapp.com/auth/logout');
    await getLoggedIn();
    history.push('/');
  }

  return <button onClick={logOut}>log out</button>;
}

export default LogOutBtn;