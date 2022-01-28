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
    deleteMessages: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const {
  sendNewMessages,
  visualizeInitialMessages,
  setActiveUser,
  deleteMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
