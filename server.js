'use strict';

console.log('I am Alive!!');

require('dotenv').config();
const express = require('express');
const app = express();
let data = require('./data/weather.json');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
app.use(cors());

app.get('/weather', (request, response) =>{
  try{
  let searchQuery = request.query.searchQuery;
  let  cityObj = data.find(city => city.city_name === searchQuery);
  const weatherArr = cityObj.data.map(day => new Forecast(day));
  response.send(weatherArr);
  } catch(error){
    throw new Error('Weather currently unavailable')

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
    this.date = day.datetime,
    this.description = day.weather.description
  }
}

app.listen(PORT,() => console.log(`listen test on port ${PORT}`))




