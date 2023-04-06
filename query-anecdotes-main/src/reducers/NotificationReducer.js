import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    visible: false,
    duration: 0,
  },
  reducers: {
    show(state, action) {
      state.visible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    hide(state) {
      state.visible = false;
      state.message = '';
      state.duration = 0;
    },
  },
});

export const { show, hide } = notificationSlice.actions;

export default notificationSlice.reducer;
