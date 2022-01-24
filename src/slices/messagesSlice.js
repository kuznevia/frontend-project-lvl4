import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  activeUser: null,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendNewMessages: (state, action) => {
      state.messages.push(action.payload.message);
    },
    visualizeInitialMessages: (state, action) => {
      state.messages = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

export const { sendNewMessages, visualizeInitialMessages, setActiveUser } = messagesSlice.actions;

export default messagesSlice.reducer;
