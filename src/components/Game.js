import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom' 

let endpoint = "http://localhost:8000/location";

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: false,
      latitude: 0,
      longitude: 0,
      locations : [],
      place_names : []
    }
  }

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.showPosition);
      } else { 
        console.log('what the heck')
        return "Geolocation is not supported by this browser.";
      }
    }


    async onSubmit() {
      // let { task } = this.state;
      let coords = JSON.stringify({
        latit: this.state.latitude,
        longi: this.state.longitude
      })
      
      await axios({
        method: 'post',
        url: endpoint,
        data: coords,
        headers: {'Content-Type': 'application/json' }
        })
        .then((response) => {
          //handle success
          console.log(response.data);
          let data = response.data
          // loops through the response array and parses each into json data
          let parsed = data.map((json) => {
            return JSON.parse(json)
          })

          // get the place id, (unique id for each places)
          //to then use it to access the name of each place
          let places_id = parsed.map((place) => {
            return Object.keys(place.query.pages)
          })
         
          console.log(parsed)
          console.log(places_id)

          // loop over the parsed data and apply the keys to get
          //the title of th place
          let place_names = parsed.map((place, index) => {
            const title = place.query.pages[places_id[index]].title
            const desc = place.query.pages[places_id[index]].extract
            return (
              <Link 
                // to={`/description/${title}`}
                to={{
                  pathname: `/description/${title}`,
                  state: desc
                }}
                style={{margin: '2em'}} 
                >
                {title}
              </Link>
            )
          })

          //update state of place names
          this.setState({place_names: place_names})
          

        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    };

   
    showPosition = (position) => {
      // console.log(position.coords.latitude)
      // console.log(position.coords.longitude)
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude})
      // return "Latitude: " + position.coords.latitude + 
      // "<br>Longitude: " + position.coords.longitude; 
    }





//  async getPlace() {
  // window.WebSocket = window.WebSocket || window.MozWebSocket;
  // let socket = new WebSocket("ws://localhost:8080/ws", 'echo-protocol')
  // console.log(this.socket)
  
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
  // }


  render() {
    return(
    <div>
      
      <button onClick={() => this.getLocation()}>Try It</button>
      <p>Latitude: {this.state.latitude}</p>
      <p>Longitude: {this.state.longitude}</p>
      {this.state.locations}
      {this.state.place_names}
      <button onClick={() => this.onSubmit()}>Submit data</button>

    </div>  
    )
  }

}

export default Game;
