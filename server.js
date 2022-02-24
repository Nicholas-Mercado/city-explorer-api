'use strict';

console.log('I am Alive!!');

require('dotenv').config();
const express = require('express');
const app = express();
let data = require('./data/weather.json');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const axios = require('axios');
app.use(cors());

app.get('/weather', async (request, response) =>{
  try{
    let lat =request.query.lat;  
    let lon =request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;
    // console.log("test:", url);
  let weatherArray = await axios.get(url);
  //  console.log(weatherArray);
  
  const weatherArr = weatherArray.data.data.map(day => new Forecast(day));
  // console.log(lat,lon,weatherArr);
  response.send(weatherArr);
  } catch(error){
    response.status(500).send('Weather currently unavailable')

  }
});

app.get('*',(request, response) =>{
  response.send('ERROR')
})

app.use((error, request, response, next) =>{
  response.status(500).send(error.message)
})

class Forecast {
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;
    // Add low and high temp
    this.low = day.low_temp;
    this.high = day.high_temp

  }
}

app.listen(PORT,() => console.log(`listen test on port ${PORT}`))




