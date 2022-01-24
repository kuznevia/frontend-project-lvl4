import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      action.payload.forEach((channel) => state.channels.push(channel));
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { addChannels, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
