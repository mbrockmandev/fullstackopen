import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

const getCredentials = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/getCredentials`, config);
  return res.data;
};

export default { login, getCredentials };
