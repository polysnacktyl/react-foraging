import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';


import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(

    <Router>
        <App />
    </Router>,
    document.getElementById("root"));


registerServiceWorker();
