import React from 'react';
import CountryDetail from './CountryDetail';
import CountryList from './CountryList';

const Content = ({ countries, selectedCountries, onButtonClick }) => {
  if (!countries) return null;

  if (countries.length === 1) {
    const country = countries[0];
    return <CountryDetail country={country} />;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <CountryList
        countries={countries}
        selectedCountries={selectedCountries}
        onButtonClick={onButtonClick}
      />
    );
  }
  if (countries.length > 10) {
    return <h4>Too many matches, please change your query.</h4>;
  }

  return <div>Content</div>;
};

export default Content;
