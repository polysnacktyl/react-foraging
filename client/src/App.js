import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CloudinaryContext } from 'cloudinary-react';
// import ProtectedRoute from './auth0/protected-route';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Gallery from './components/Gallery/Gallery';
import Detail from './components/Detail/Detail';
import UserContext from './utils/userContext';
// import ModalMega from './components/Modal/ModalMega';
// import Upload from './components/Upload/Upload';

const App = () => {
  const { user } = useAuth0();
  return (
    <UserContext.Provider value={{ user }}>
      <CloudinaryContext>
        <div className="App">
          <Router>
            <Navbar />
            <Route exact path='/'><Home /></Route>
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/detail/:id' component={Detail} />
          </Router>
        </div>
      </CloudinaryContext>
    </UserContext.Provider>
  );

}

export default App;
