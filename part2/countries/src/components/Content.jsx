import React from 'react';
import CountryDetail from './CountryDetail';
import CountryList from './CountryList';

const Content = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryDetail />;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return <CountryList countries={countries} />;
  }
  if (countries.length > 10) {
    return <h4>Too many matches, please change your query.</h4>;
  }

  return <div>Content</div>;
};

export default Content;
