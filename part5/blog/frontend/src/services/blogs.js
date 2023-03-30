import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = (id, newBlog) => {
  const req = axios.put(`${baseUrl}/${id}`, newBlog);
  return req.then((res) => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update };
