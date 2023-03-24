import React, { useEffect, useState } from 'react';
import weatherController from '../services/weatherController';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherIconUrl, setWeatherIconUrl] = useState(null);
  const { name, area, flags, capital, languages, latlng } = country;
  const flag = flags['png'];
  const lat = latlng[0];
  const lon = latlng[1];

  useEffect(() => {
    const getWeather = async () => {
      const newWeather = await weatherController.getCurrentWeather(lat, lon);
      console.log('weather:', newWeather);
      setWeather(newWeather);
      setWeatherIcon(newWeather.weather[0].icon);
    };

    getWeather();
  }, [lat, lon, weatherIcon]);

  return (
    <div className='detailContainer'>
      <div className='textLeft'>
        <h2>{name.common}</h2>
        <p>capital: {capital}</p>
        <p>area: {area}</p>
        <h4>languages spoken:</h4>
        <ul>
          {Object.values(languages).map((language) => (
            <ul key={language}>{language}</ul>
          ))}
        </ul>
      </div>
      <div className='img-container'>
        <img
          src={flag}
          alt=''
        />
      </div>
      <br />
      {weather && (
        <div className='weatherContainer'>
          <div className='weatherContent'>
            <h3>Weather in {capital}</h3>
            <h4>temperature: {(weather.main.temp - 273).toFixed(1)} Celsius</h4>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt=''
            />
            <h4>Wind: {weather.wind.speed} m/s</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
