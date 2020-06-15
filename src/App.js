import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Body from './components/Body'
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* <Body /> */}
      <Game />
    </div>
  );
}

export default App;
