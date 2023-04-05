import anecdoteService from '../services/anecdotes';
import { createSlice } from '@reduxjs/toolkit';
import { showVoteNotification } from './notificationReducer';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteIndex = state.findIndex((a) => a.id === id);
      if (anecdoteIndex !== -1) {
        const updatedAnecdote = {
          ...state[anecdoteIndex],
          votes: state[anecdoteIndex].votes + 1,
        };
        const newState = [...state];
        newState[anecdoteIndex] = updatedAnecdote;
        return newState;
      }
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id);
    dispatch(addVote(id));
  };
};

export default anecdoteSlice.reducer;
