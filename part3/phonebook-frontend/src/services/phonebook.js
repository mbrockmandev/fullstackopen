import axios from 'axios';
const baseUrl = '/api/people';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data.error));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data.error));
};

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data.error));
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data.error));
};

export default { getAll, create, update, remove };
