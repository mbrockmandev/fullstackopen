import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1';

// gets all country results from API. testing only.
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

// search name / official name fields for given query
const getWithQuery = (query) => {
  if (!query) return;
  const request = axios.get(`${baseUrl}/name/${query}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw new Error('Failed to fetch data.');
    });
};

export default { getAll, getWithQuery };
