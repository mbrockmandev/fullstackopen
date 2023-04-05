import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (content) => {
  const obj = { content, id: getId(), votes: 0 };
  const res = await axios.post(baseUrl, obj);
  return res.data;
};

const vote = async (id) => {
  const allAnecdotes = await axios.get(baseUrl);
  const anecdoteBeforeVote = allAnecdotes.data.find((a) => a.id === id);
  const anecdoteAfterVote = {
    ...anecdoteBeforeVote,
    votes: anecdoteBeforeVote.votes + 1,
  };
  const res = await axios.put(`${baseUrl}/${id}`, anecdoteAfterVote);
  return res.data;
};

export default { getAll, createNew, vote };
