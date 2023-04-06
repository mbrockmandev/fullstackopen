import { createSlice } from '@reduxjs/toolkit';
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteForAnecdote(state, action) {
      const newState = state.map((a) =>
        a.id === action.payload.id ? action.payload : a,
      );
      return newState;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const makeNewAnecdote = (content) => {
  return async (dispatch) => {
    console.log(content);
    const newAnecdote = await createAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const addVoteTo = (content) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...content, votes: content.votes + 1 };
    await updateAnecdote(updatedAnecdote);
    dispatch(voteForAnecdote(updatedAnecdote));
  };
};

export const { setAnecdotes, addAnecdote, voteForAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
