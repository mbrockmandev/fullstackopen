import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

// API for a specific location:
// const example = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

const getCurrentWeather = (lat, lon) => {
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log('get weather url:', url);
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { getCurrentWeather };
