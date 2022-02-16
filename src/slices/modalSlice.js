// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: 'none',
  isOpened: false,
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
