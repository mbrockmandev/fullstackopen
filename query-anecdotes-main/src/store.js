import { configureStore } from '@reduxjs/toolkit';

import anecdotesReducer from './reducers/AnecdotesReducer';
import NotificationReducer from './reducers/NotificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: NotificationReducer,
  },
});

export default store;
