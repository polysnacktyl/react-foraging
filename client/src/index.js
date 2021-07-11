import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from './auth0/auth0-provider-with-history';
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(

    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root"));


registerServiceWorker();
