import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../utils/authContext';
import { Context } from '../../utils/Reducer';
import '../Navbar/style.css';

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  const { dispatch } = useContext(Context);
  const history = useHistory();
  const urlBase = process.env.REACT_APP_API_URL;

  async function logOut() {
    await axios.get(`${urlBase}/auth/logout`);
    await getLoggedIn();

    dispatch({
      type: 'logout'
    })

    window.localStorage.setItem('user', null);

    history.push('/');
  }

  return <button onClick={logOut}>log out</button>;
}

export default LogOutBtn;