import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = () => {
  return token;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const getBlogById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return res.data;
};

// const like = async (id, newBlog) => {
//   const res = await axios.put(`${baseUrl}/${id}`, newBlog);
//   return res.data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getBlogById, setToken, getToken, create, update };
