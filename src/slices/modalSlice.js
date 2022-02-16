// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: false,
  channelId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModal: (state, action) => {
      const { activeModal, channelId } = action.payload;
      state.activeModal = activeModal;
      state.channelId = channelId;
    },
  },
});

export const { setActiveModal } = modalSlice.actions;

export default modalSlice.reducer;
