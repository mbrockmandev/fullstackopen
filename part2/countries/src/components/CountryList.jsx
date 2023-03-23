import React from 'react';

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={`${country.fifa}_${country.cca3}`}>
          <h4>{country.name.common}</h4>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
