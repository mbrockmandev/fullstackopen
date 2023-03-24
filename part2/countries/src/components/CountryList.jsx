import React from 'react';
import CountryDetail from './CountryDetail';

const CountryList = ({ countries, selectedCountries, onButtonClick }) => {
  return (
    <div className='listContainer'>
      {countries.map((country, index) => (
        <div key={`${country.fifa}_${country.cca3}`}>
          <div className='listName'>
            {country.name.common}
            <button
              className='listBtn btn btn-primary'
              onClick={() => {
                onButtonClick(index);
              }}>
              Show Detail
            </button>
          </div>
          {selectedCountries[index] === true ? (
            <CountryDetail country={countries[index]} />
          ) : null}
          <br />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
