import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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
