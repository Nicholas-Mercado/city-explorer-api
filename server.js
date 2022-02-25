'use strict';

console.log('I am Alive!! yes this is the new server');

require('dotenv').config();
const express = require('express');
const app = express();
const weather = require('./modules/weather.js');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

app.use(cors());

// import modules
app.get('/weather', weatherHandler);

//hot fix to get movies working while I debug the new weather*******
const getMovies = require('./movies.js');
app.get('/movies', getMovies);
// ********************************************

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
