'use strict';

let cache = require('./cache.js');
const axios = require('axios');
const res = require('express/lib/response');

async function getMovies(request, response)  {
  let searchQuery = request.query.searchQuery;

// create a key
const key = searchQuery + 'movies';
if(cache[key] && (Date.now() - (cache[key].timestamp < 1000 * 60 * 60 * 24))){

  console.log('Cache Hit, Movies present!')
  response.status(200).send(cache[key].data)
} else {
  console.log('Cache Miss, movies Not Here');

  let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  let MovieObject = await axios.get(url);
  let movieData = MovieObject.data.results.map(movie => new Movies(movie.title,movie.release_date, movie.overview));

  cache[key] = {
    data: movieData,
    timestamp: Date.now()
  }
  response.send(movieData);
}

}

class Movies {
  constructor(title, release_date, overview) {
    this.title = title;
    this.release_date = release_date;
    this.overview = overview;
  }
}

module.exports = getMovies;