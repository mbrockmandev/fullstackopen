import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      // const { content, duration } = action.payload;
      // return content;
      return action.payload;
    },
    showVoteNotification(state, action) {
      return `You voted for: ${action.payload}`;
    },
    showAddNewNotification(state, action) {
      return `You added: ${action.payload}`;
    },
    hideNotification() {
      return '';
    },
  },
});

export const {
  showVoteNotification,
  showAddNewNotification,
  hideNotification,
} = notificationSlice.actions;

export const showNotification = (content, duration) => (dispatch) => {
  dispatch(notificationSlice.actions.setNotification({ content, duration }));
  setTimeout(() => {
    dispatch(notificationSlice.actions.hideNotification());
  }, duration * 1000);
};

export default notificationSlice.reducer;
