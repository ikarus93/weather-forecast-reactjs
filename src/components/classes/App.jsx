import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RowContainer from './RowContainer.jsx';

class App extends Component {
  contructor(props) {}

  componentWillMount() {
    //Fetches location data of user, uses loading property to track loading process and render asynchronous interface dynamically
    this.setState({ loading: true });

    if (navigator.geolocation) {
      console.log("also here")
      navigator.geolocation.getCurrentPosition(pos => {
              console.log("also ")

        if (pos) {
          this.setState({
            url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/API_KEY/${
            pos.coords.latitude
          },${pos.coords.longitude}`,
            loading: false
          });
        } else {
          this.setState({
            loading: false,
            geolocationError: true
          });
        }
      });
    } else {
      this.setState({ geolocationError: true, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    if (this.state.geodataError) {
      return <p>Your browser does not support the HTML 5 Geolocation API</p>;
    }
    return (
      <div className="app">
        <RowContainer url={this.state.url} />
      </div>
    );
  }
}

const wrapper = document.getElementById("main");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

export default App;
