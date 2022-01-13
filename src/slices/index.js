import { configureStore } from '@reduxjs/toolkit';

import chatsReducer from './chatsSlice.js';

export default configureStore({
  reducer: {
    chats: chatsReducer,
  },
});
