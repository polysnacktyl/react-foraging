import React from "react";
import AppRouter from "./AppRouter";
import axios from "axios";
import { AuthContextProvider } from "./utils/authContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;