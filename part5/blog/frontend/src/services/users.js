import axios from 'axios';
const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  const res = axios.post(baseUrl, credentials);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, login };
