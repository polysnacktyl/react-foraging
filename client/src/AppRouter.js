import React, { useContext } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AuthContext from './utils/authContext';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from './views/Home';
import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';
import Detail from './components/Detail/Detail';


function AppRouter() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Route exact path="/"><Home /></Route>
            {loggedIn === false && (
                <>
                    <Route exact path="/register"><Register /></Route>
                    <Route exact path="/login"><Login /></Route>
                </>
            )}
            {loggedIn === true && (
                <>
                    <Route exact path='/gallery'><Gallery /></Route>
                    <Route exact path='/detail/:id'><Detail /></Route>
                </>
            )}
        </Router>
    );
}

export default AppRouter;
