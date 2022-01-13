import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      action.payload.forEach((chat) => state.chats.push(chat));
    },
  },
});

export const { addChannels } = chatsSlice.actions;

export default chatsSlice.reducer;
