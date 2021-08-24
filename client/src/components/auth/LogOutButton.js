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

  async function logOut() {
    await axios.get('https://react-forager.herokuapp.com/auth/logout');
    // await axios.get('https://the-future.herokuapp.com/auth/logout');
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