import { configureStore } from '@reduxjs/toolkit';

import anecdotesReducer from './reducers/AnecdotesReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
  },
});

export default store;
