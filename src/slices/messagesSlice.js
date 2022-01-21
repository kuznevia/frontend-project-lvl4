import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendNewMessages: (state, action) => {
      state.messages.push(action.payload.message);
    },
    visualizeInitialMessages: (state, action) => {
      action.payload.messsages.forEach((message) => state.messages.push(message));
    },
  },
});

export const { sendNewMessages, visualizeInitialMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
