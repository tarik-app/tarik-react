import React, { Component } from "react";
import axios from "axios";


// let endpoint = "ws://localhost:8080";
// ws://localhost:8080/ws

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: false,
      latitude: 0,
      longitude: 0,
      locations : []
    }
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    this.socket = new WebSocket("ws://172.29.112.211:8080/ws")
    console.log(this.socket)
    
    this.socket.onopen = () => {
      console.log("Succesfully Connected")
      this.socket.send("Hi from the Client!")
    }

    this.socket.onclose = (event) => {
      console.log("Socket connection closed: ", event)
    }

    this.socket.onmessage = (msg) => {
      console.log("onmessage:")
      // parses the recieved JSON data
      // console.log(JSON.parse(msg.data))
      // console.log(JSON.parse(msg.data)[0])
      let json_arr = JSON.parse(msg.data)
      // console.log(json_arr[0])
      if (json_arr !== null || json_arr !== undefined) {
        console.log(json_arr)
        // let places = json_arr.map((item) => {
        //     return item["query"]
        //   })
        // console.log(places)
      }

      // list of json objects in an array
      if (msg.data[0]['query']) {
        // console.log('is null')
        // let locate = JSON.parse(msg.data).map((item) => {
        //   return item.query
        // })
        // console.log(locate)
        // this.setState({location : locate})
        console.log(typeof msg.data)
        console.log(msg.data)
      }
    }
    
    this.socket.onerror = (error) => {
      console.log("Socket Error: ", error)
    }

  }

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(this.showPosition);
  } else { 
    return "Geolocation is not supported by this browser.";
  }
}


  // a way is to check if the socket is open or not before sending.
  isOpen(ws) {
    return ws.readyState === ws.OPEN
  }


showPosition = (position) => {
  // console.log(position.coords.latitude)
  // console.log(position.coords.longitude)
  this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude})
  // return "Latitude: " + position.coords.latitude + 
  // "<br>Longitude: " + position.coords.longitude;

  if (!this.isOpen(this.socket)) {
    console.log('socket not open')
    return; //check if socket is open before sending
  }
  // console.log('socket open')
  this.socket.send("hi everyone this is Redi sending lati and long from client to server:)")
  console.log('socket open')
  this.socket.send(JSON.stringify({
    latit: position.coords.latitude,
    longi: position.coords.longitude
    }))    
}











 async getPlace() {
  // window.WebSocket = window.WebSocket || window.MozWebSocket;
  // let socket = new WebSocket("ws://localhost:8080/ws", 'echo-protocol')
  console.log(this.socket)
  
    // try{
    //   const res = await axios.get(endpoint+'/ws')
    //   console.log(res)
    //   this.setState({ name: res.data.Name, ID: res.data.ID, colors: res.data.Colors})
    //   // console.log(this.state.data)
      
    // } catch(err) {
    //     console.log('-- Error fetching --')
    //     console.log(err.message)
    //     // You may want to display an error to the screen here. 
    //   }
  }

  // handle the game button
  handleSubmit(e) {
    this.setState({isLoading : true})
    e.preventDefault();
    this.getPlace()
  }

  // handles the display
  displayName() {
    // return [this.state.ID, this.state.data, this.state.colors]
    return [this.state.latitude, this.state.longitude]
  }

  render() {
    // console.log(this.getPlace())
    return(
    <div>
      <form onSubmit={e => this.handleSubmit(e)}>
        <button className='submit-btn' type="submit">Generate Game</button>
      </form>
      {/* <p>{this.displayName()}</p> */}
      <button onClick={() => this.getLocation()}>Try It</button>
      <p>Latitude: {this.state.latitude}</p>
      <p>Longitude: {this.state.longitude}</p>
      {this.state.locations}
    </div>
    )
  }

}

export default Game;
