import { createSlice } from '@reduxjs/toolkit';
import { getAnecdotes, createAnecdote } from '../requests';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    voteForAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : updatedAnecdote));
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
    const newAnecdote = await createAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const { setAnecdotes, addAnecdote, voteForAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;

// const anecdotesReducer = (state = initialState, action) => {
//   console.log(action);
//   switch (action.type) {
//     case 'GETALL':
//       try {
//         console.log('got here!');
//         const data = getAnecdotes();
//         console.log('DATA:', data);
//         return { loading: false, data, error: null };
//       } catch (error) {
//         return { loading: false, data: [], error: error.message };
//       }
//     case 'ADD':
//       try {
//         const newAnecdote = createAnecdote(action.payload);
//         return { loading: false, data: state.data.concat(newAnecdote) };
//       } catch (error) {
//         return { loading: false, data: state.data, error: error.message };
//       }
//     case 'VOTE':
//       try {
//         const updatedAnecdote = updateAnecdote(action.payload);
//         const updatedData = state.data.map((a) =>
//           a.id === updatedAnecdote.id ? updatedAnecdote : a,
//         );
//         return { loading: false, data: updatedData, error: null };
//       } catch (error) {
//         return { loading: false, data: state.data, error: error.message };
//       }
//     default:
//       return state;
//   }
// };

// export default anecdotesReducer;
