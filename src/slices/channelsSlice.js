// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialChannels: (state, action) => {
      state.channels = [];
      action.payload.forEach((channel) => state.channels.push(channel));
    },
    setCurrentChannel: (state, action) => {
      const id = action.payload;
      state.currentChannelId = id;
    },
    addNewChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels.push(channel);
    },
    deleteChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = 1;
    },
    channelRename: (state, action) => {
      const { id, name } = action.payload;
      const renamingChannel = state.channels.find((channel) => channel.id === id);
      renamingChannel.name = name;
    },
  },
});

export const {
  setInitialChannels,
  setCurrentChannel,
  addNewChannel,
  deleteChannel,
  channelRename,
} = channelsSlice.actions;

export default channelsSlice.reducer;
