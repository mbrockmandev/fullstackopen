import axios from 'axios';
const baseUrl = '/api/people';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(generateErrorMessage(err));
    });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(generateErrorMessage(err));
    });
};

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(generateErrorMessage(err));
    });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(generateErrorMessage(err));
    });
};

const generateErrorMessage = (err) => {
  const input = err.request.response;
  const startIndex = input.indexOf('ValidationError');
  const endIndex = input.indexOf('<br>', startIndex);
  const errorMessage = input.slice(startIndex, endIndex);
  return errorMessage;
};

export default { getAll, create, update, remove };
