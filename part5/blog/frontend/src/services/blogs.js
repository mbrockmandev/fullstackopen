import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const getBlogById = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`${baseUrl}/${id}`, data, config);
  return res.data;
};

const removeBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, getBlogById, create, update, removeBlog };
