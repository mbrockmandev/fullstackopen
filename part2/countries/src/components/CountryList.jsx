import React from 'react';
import CountryDetail from './CountryDetail';

const CountryList = ({ countries, selectedCountries, onButtonClick }) => {
  return (
    <div>
      {countries.map((country, index) => (
        <div key={`${country.fifa}_${country.cca3}`}>
          <h4>
            {country.name.common}
            <button
              className='btn btn-primary'
              onClick={() => {
                onButtonClick(index);
              }}>
              Show Detail
            </button>
          </h4>
          {selectedCountries[index] === true ? (
            <CountryDetail country={countries[index]} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CountryList;
