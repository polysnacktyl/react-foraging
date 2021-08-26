import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
const AuthContext = createContext();
const urlBase = process.env.REACT_APP_API_URL;

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  

  async function getLoggedIn() {
    const loggedInRes = await axios.get(`${urlBase}/auth/loggedIn`);
    setLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
