import React, { useEffect, useReducer } from "react";
import AppRouter from "./AppRouter";
import axios from "axios";
import { AuthContextProvider } from "./utils/authContext";
import { Reducer, initialState, Context } from './utils/Reducer';

axios.defaults.withCredentials = true;

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'login',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  return (

    <Context.Provider value={{ state, dispatch }}>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </Context.Provider>

  );
}

export default App;