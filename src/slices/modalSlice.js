// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: 'none',
  show: false,
  channelId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModal: (state, action) => {
      const { activeModal, show, channelId } = action.payload;
      state.activeModal = activeModal;
      state.show = show;
      state.channelId = channelId;
    },
  },
});

export const { setActiveModal } = modalSlice.actions;

export default modalSlice.reducer;
