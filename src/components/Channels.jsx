import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import i18next from 'i18next';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import ModalVindowAdd from './ModalAdd.jsx';
import ChannelDropDown from './ChannelDropDown.jsx';

const Channels = ({ addChannel, removeChannel, renameChannel }) => {
  const channelsList = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsClassNames = cn('light');
  const activeChannelClassnames = cn('primary');

  const setCurrent = (e) => {
    dispatch(setCurrentChannel(Number(e.target.id)));
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light pt-5 h-100 border-right">
      <div className="d-flex justify-content-around align-items-center w-100">
        <p className="m-0 p-0">{i18next.t('channels')}</p>
        <ModalVindowAdd addChannel={addChannel} />
      </div>
      <div className="d-flex flex-column">
        {channelsList.map((item) => (
          <div key={item.id} id={item.id} className="d-flex justify-content-around align-items-center w-100">
            <ChannelDropDown
              setCurrent={setCurrent}
              removeChannel={removeChannel}
              renameChannel={renameChannel}
              activeClasses={activeChannelId === item.id ? activeChannelClassnames : channelsClassNames}
              key={item.id}
              id={item.id}
              itemName={item.name}
              removable={item.removable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
