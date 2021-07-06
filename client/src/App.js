import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Gallery from './components/Gallery/Gallery';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <div className="App">
      <CloudinaryContext>
        <Router>
          <Navbar />
          <Route exact path='/'><Home /></Route>
          <Route exact path='/home'><Home /></Route>
          <Route exact path='/gallery'><Gallery /></Route>
          <Route exact path='/detail/:id'><Detail /></Route>
        </Router>
      </CloudinaryContext>
    </div>
  );
}

export default App;
