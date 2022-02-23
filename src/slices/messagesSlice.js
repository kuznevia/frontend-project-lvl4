// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice.js';

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
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    });
  },
});

export const {
  sendNewMessages,
  visualizeInitialMessages,
  setActiveUser,
} = messagesSlice.actions;

export default messagesSlice.reducer;
