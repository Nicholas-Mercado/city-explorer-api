'use strict';

const axios = require('axios');

async function getWeather(request, response) {
  try{
    let lat =request.query.lat;  
    let lon =request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;
  let weatherArray = await axios.get(url);
  
  const weatherArr = weatherArray.data.data.map(day => new Forecast(day));
  response.send(weatherArr);
  } catch(error){
    response.status(500).send('Weather currently unavailable')

  }
}

class Forecast {
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;
    this.low = day.low_temp;
    this.high = day.high_temp

  }
}

module.exports = getWeather;