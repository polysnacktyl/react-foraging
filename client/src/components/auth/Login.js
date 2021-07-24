import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from '../../utils/Reducer';

import AuthContext from '../../utils/authContext';
import './style.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const { dispatch } = useContext(Context);


  async function login(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });
      console.log(data);

      await getLoggedIn();

      dispatch({
        type: 'login',
        payload: { user: data._id }
      })

      window.localStorage.setItem('user', JSON.stringify(data._id))

      history.push("/gallery");

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='content-container'>
      <div className='login-form'>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          /><br></br>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /><br></br>
          <button type="submit">log in</button>
          
        </form>
      </div>
    </div>

  );
}

export default Login;
