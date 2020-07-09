import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom' 

function Navbar() {
  return(
      <nav>
        <ul className='nav-links'>
          <li><a className='nav-link' href='/'>Home</a></li>
          <li><a className='nav-link' href='/'>Game</a></li>
          <li><a className='nav-link' href='/'>About</a></li>
          <Link to="/game">Game</Link>
        </ul>
      </nav>
  )
}

export default Navbar;