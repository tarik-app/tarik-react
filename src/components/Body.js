import React from 'react'
import './Body.css'

function Body() {
  return(
    <main>
      <section className='presentation'>
        <div className='introduction'>
          <div className='intro-text'>
            <h1>LEARN HISTORY</h1>
            <p>Get quizzed about sites</p>
          </div>
          <div className='cta'>
            <button className='cta-select'>Play Now</button>
            <button className='learn'>Learn More</button>
          </div>
        </div>
        <div className='cover'>
          <img className='sites' src={require('../assets/images/site1.jpg')} alt='historical sites'/>
        </div>
      </section>
    </main>
  )
}

export default Body;