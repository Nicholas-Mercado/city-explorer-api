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

// import modules
const getWeather = require('./weather.js');


app.get('/weather', getWeather);




app.get('/movies', async(request, response) => {
  let searchQuery = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  let MovieObject = await axios.get(url);

  let movieData = MovieObject.data.results.map(movie => new Movies(movie.title,movie.release_date, movie.overview));
  response.send(movieData);
}
);



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

class Movies {
  constructor(title, release_date, overview) {
    this.title = title;
    this.release_date = release_date;
    this.overview = overview;
  }
}

app.listen(PORT,() => console.log(`listen test on port ${PORT}`))




