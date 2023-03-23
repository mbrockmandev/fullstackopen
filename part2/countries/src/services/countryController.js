import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1';

// gets all country results from API. testing only.
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

// search name / official name fields for given query
const getWithQuery = (query) => {
  const request = axios.get(`${baseUrl}/name/${query}`);
  return request.then((response) => response.data);
};

export default { getAll, getWithQuery };
