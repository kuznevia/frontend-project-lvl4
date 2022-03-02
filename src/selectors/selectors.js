import { createSelector } from '@reduxjs/toolkit';

export const modalSelectors = (state) => state.modal;
export const messagesSelectors = (state) => state.messages;
export const channelsSelectors = (state) => state.channels;

export const selectModalType = (state) => modalSelectors(state).modalType;
export const selectModalOpenedStatus = (state) => modalSelectors(state).isOpened;
export const selectChangingChannelId = (state) => modalSelectors(state).changingChannelId;
export const selectMessages = (state) => messagesSelectors(state).messages;
export const selectChannels = (state) => channelsSelectors(state).channels;
export const selectActiveChannelId = (state) => channelsSelectors(state).currentChannelId;
export const selectActiveUser = (state) => messagesSelectors(state).activeUser;
export const selectChannelId = (state) => channelsSelectors(state).currentChannelId;
export const selectactiveChannel = createSelector(selectChannels, selectActiveChannelId,
  (channels, activeChannelId) => channels.find((channel) => channel.id === activeChannelId));
export const selectFilteredMessages = createSelector(selectMessages, selectActiveChannelId,
  (messages,
    activeChannelId) => messages.filter((message) => message.channelId === activeChannelId));
