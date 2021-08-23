import axios from 'axios';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../utils/authContext";
import './style.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      await axios.post("https://react-forager.herokuapp.com/auth/", registerData);
      // await axios.post(
      // "https://the-future.herokuapp.com/auth/",registerData);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='content-container'>
      <div className='register-form'>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Email"
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          /><br></br>
          <input
            type="password"
            placeholder="Password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /><br></br>
          <input
            type="password"
            placeholder="Verify your password"
            autoComplete='off'
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          /><br></br>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
