'use strict';

let cache = require('./cache.js');
const axios = require('axios');
// added async
async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + latitude;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${latitude}&lon=${longitude}`;
  
  if (cache[key] && (Date.now() - (cache[key].timestamp < 1000 * 60 * 60 * 24))) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}
// moved to bottom
module.exports = getWeather;