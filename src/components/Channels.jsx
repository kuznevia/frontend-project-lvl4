import React, { useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalSlice.js';
import ChannelDropDown from './ChannelDropDown.jsx';

const Channels = () => {
  const channelsList = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelsClassNames = cn('light', 'w-100', 'rounded-0', 'text-start');
  const activeChannelClassnames = cn('primary', 'w-100', 'rounded-0', 'text-start');

  const openAddModal = () => {
    dispatch(openModal({ activeModal: 'add' }));
  };

  const setCurrent = (e) => {
    dispatch(setCurrentChannel(Number(e.target.id)));
  };

  useEffect(() => {
    const messageInput = document.getElementById('message-input-box');
    messageInput.focus();
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 px-4">
        <span>{t('chatLabels.channels')}</span>
        <button type="button" className="btn btn-group-vertical p-0 text-primary" onClick={openAddModal}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="d-none">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channelsList.map((item) => (
          <li key={item.id} id={item.id} className="nav-item w-100">
            <ChannelDropDown
              setCurrent={setCurrent}
              activeClasses={activeChannelId === item.id
                ? activeChannelClassnames : channelsClassNames}
              key={item.id}
              id={item.id}
              itemName={item.name}
              removable={item.removable}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
