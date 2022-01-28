import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    renderInitialChannels: (state, action) => {
      action.payload.forEach((channel) => state.channels.push(channel));
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addNewChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels.push(channel);
    },
    deleteChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    channelRename: (state, action) => {
      const { id, name } = action.payload;
      const renamingChannel = state.channels.find((channel) => channel.id === id);
      renamingChannel.name = name;
    },
  },
});

export const {
  renderInitialChannels,
  setCurrentChannel,
  addNewChannel,
  deleteChannel,
  channelRename,
} = channelsSlice.actions;

export default channelsSlice.reducer;
