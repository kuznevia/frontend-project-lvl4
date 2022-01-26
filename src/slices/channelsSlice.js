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
  },
});

export const { renderInitialChannels, setCurrentChannel, addNewChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
