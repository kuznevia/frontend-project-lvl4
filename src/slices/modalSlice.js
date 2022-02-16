// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: 'none',
  isOpened: false,
  changingChannelId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { activeModal } = action.payload;
      state.activeModal = activeModal;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.activeModal = 'none';
      state.isOpened = false;
    },
    setChannelID: (state, action) => {
      const { id } = action.payload;
      state.changingChannelId = id;
    },
  },
});

export const { openModal, closeModal, setChannelID } = modalSlice.actions;

export default modalSlice.reducer;
