import { configureStore } from '@reduxjs/toolkit';

import chatsReducer from './chatsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
  },
});
