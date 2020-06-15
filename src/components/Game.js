import React, { Component } from "react";
import axios from "axios";


let endpoint = "http://localhost:8000";

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {data: null,
                  isLoading: false,
                ID: null,
              colors: null}
}
  
 async getPlace() {
    try{
      // const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const res = await axios.get(endpoint)
      console.log(res)
      // const json = await res.json()
      // const json = await res.data     
      // console.log(json)
      this.setState({ name: res.data.Name, ID: res.data.ID, colors: res.data.Colors})
      // console.log(this.state.data)
      
    } catch(err) {
        console.log('-- Error fetching --')
        console.log(err.message)
        // You may want to display an error to the screen here. 
      }
  }

  // handle the game button
  handleSubmit(e) {
    this.setState({isLoading : true})
    e.preventDefault();
    this.getPlace()
  }

  // handles the display
  displayName() {
    return [this.state.ID, this.state.data, this.state.colors]
  }

  render() {
    // console.log(this.getPlace())
    return(
    <div>
      <form onSubmit={e => this.handleSubmit(e)}>
        <button className='submit-btn' type="submit">Generate Game</button>
      </form>
      <p>{this.displayName()}</p>
    </div>
    )
  }

}

export default Game;
