import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Row from '../functional/Row.jsx';

class RowContainer extends Component {
  //Parent component of Row, holds reference to days and fetches weather data
  constructor(props) {
    super(props);
    this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //Array mapped to js date method, used to create dynamic date array
    this.dayActive = this.days[new Date().getDay()]; //holds the current day index
    this.state = {
      days: this.createDaySeq(),
      data: [],
      city: undefined,
      icons: {
        rain:
          "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
        cloudy:
          "https://cdn2.iconfinder.com/data/icons/weather-34/512/Cloud_1-512.png",
        clear:
          "https://cdn1.iconfinder.com/data/icons/weather-elements/512/Weather_SunAbstract.png",
        snow:
          "https://cdn3.iconfinder.com/data/icons/picons-weather/57/23_snow_blizzard-512.png",
        wind:
          "https://cdn4.iconfinder.com/data/icons/weather-conditions/512/cloud_wind-512.png"
      }
    }; //holds the dynamic generated days array, the link to icon urls as well as an empty placeholder for our response data

    this.createDaySeq = this.createDaySeq.bind(this);
    this.parseIcons = this.parseIcons.bind(this);
  }

  parseIcons(icon) {
    //maps the responses icons/description to each icon in the icons object, retrieving the img url to be injected into Row compononent
    Object.keys(this.state.icons).forEach(x => {
      if (icon.indexOf(x) !== -1) {
        icon = x;
      }
    });
    const iconUrl = this.state.icons[icon];
    return iconUrl ? iconUrl : this.state.icons["cloudy"]; //fix for misc icon names such as foggy etc. use cloudy symbol
  }

  componentWillMount() {
    //fetch weather data
    fetch(this.props.url)
      .then(res => {
        return res.json();
      })
      .then(resData => {
        //fill this.state.data array with parsed response data that is relevant
        let stateData = this.state.data;
        resData.daily.data.forEach(cast => {
          let forecastItem = {
            icon: this.parseIcons(cast.icon),
            temp: {
              fahr: cast.temperatureHigh.toFixed(0),
              cel: ((cast.temperatureHigh - 32) * 5 / 9).toFixed(0)
            }
          };
          stateData.push(forecastItem);
        });
        this.setState(this.state);
      }).catch(err => {
      alert("Error: ", err);
    })
  }
  createDaySeq() {
    //creates a dynamic date array using the current day(this.dayActive) as starting indexpoint
    let seq = [];
    let d = new Date().getDay();
    for (let i = d; seq.length <= 7; i++) {
      if (i === 7) {
        //reset array if last element was reached
        i = 0;
      }
      seq.push(this.days[i]);
    }
    return seq;
  }

  render() {
    return (
      <div>
        <Row fields={this.state.data} days={this.state.days} />
      </div>
    );
  }
}

//PropTypes

Row.propTypes = {
  url: PropTypes.string
}




export default RowContainer;