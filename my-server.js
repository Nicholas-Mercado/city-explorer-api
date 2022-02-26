'use strict';

console.log('I am Alive!!');

require('dotenv').config();
const express = require('express');
const app = express();
let data = require('./data/weather.json');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

app.use(cors());

// import modules
const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

app.get('/weather', getWeather);
app.get('/movies', getMovies);







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
    this.low = day.low_temp;
    this.high = day.high_temp

  }
}



app.listen(PORT,() => console.log(`listen test on port ${PORT}`))




