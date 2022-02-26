export const modalSelectors = (state) => state.modal;
export const messagesSelectors = (state) => state.messages;
export const channelsSelectors = (state) => state.channels;

export const selectModalType = (state) => modalSelectors(state).modalType;
export const selectMessages = (state) => messagesSelectors(state).messages;
export const selectChannels = (state) => channelsSelectors(state).channels;
export const selectChannelId = (state) => channelsSelectors(state).currentChannelId;
