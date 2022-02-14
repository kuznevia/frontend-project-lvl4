import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import Modal from '../modal/Modal.jsx';
import ChannelDropDown from './ChannelDropDown.jsx';

const Channels = () => {
  const channelsList = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelsClassNames = cn('light', 'w-100', 'rounded-0', 'text-start');
  const activeChannelClassnames = cn('primary', 'w-100', 'rounded-0', 'text-start');

  const setCurrent = (e) => {
    dispatch(setCurrentChannel(Number(e.target.id)));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 px-4">
        <span>{t('channels')}</span>
        <Modal type="add" />
        <Modal type="remove" />
        <Modal type="rename" />
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
