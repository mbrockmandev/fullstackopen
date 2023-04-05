import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
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
export default notificationSlice.reducer;
