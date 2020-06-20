import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Body from './components/Body'
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='logo-container'>
          <img src={require('../src/assets/images/logo192.png')} alt='tarik-logo' height='40' widht='40'/>
          <h4 className='logo'> Tarik </h4>
        </div>
        <Navbar />
      </header>
      <Body />
      {/* <Game /> */}
    </div>
  );
}

export default App;
