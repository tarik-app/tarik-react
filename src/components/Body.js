import React from 'react'
import './Body.css'
// import image from '../assets/images'
function Body() {
  return(
    <div className='container'>
      <div>
        <h1>LEARN HISTORY</h1>
        <h2>Get quizzed about sites</h2>
        <button className='play'>Play Now</button>
        <button className='learn'>Learn More</button>
      </div>
      <div>
        <img src={require('../assets/images/site1.jpg')} alt='historical sites' width='318' height='421'/>
      </div>
    </div>
    
  )
}

export default Body;