import React from 'react';

const CountryDetail = ({ country }) => {
  const { name, area, flags, capital, languages } = country;
  const flag = flags['png'];

  return (
    <div>
      <h2>{name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h4>languages spoken:</h4>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div className='img-container'>
        <img
          src={flag}
          alt=''></img>
      </div>
    </div>
  );
};

export default CountryDetail;
