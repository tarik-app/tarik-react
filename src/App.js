import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Body from './components/Body'
import Game from './components/Game'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import Description from './components/Description';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='logo-container'>
            <img src={require('../src/assets/images/logo192.png')} alt='tarik-logo' height='40' widht='40'/>
            <h4 className='logo'> Tarik </h4>
          </div>
          <Navbar />
        </header>
        {/* <Body /> */}
        <Route exact path='/' component={Body} />
        <Route path='/game' component={Game} />
        <Route path='/description/:title' component={Description} />
      {/* <Game /> */}
      </div>
    </Router>
  
  );
}

export default App;
