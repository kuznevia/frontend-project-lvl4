import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import ModalVindow from './Modal.jsx';

const Channels = ({ addChannel }) => {
  const channelsList = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsClassNames = cn('mt-3', 'btn-light');
  const activeChannelClassnames = cn('mt-3', 'btn', 'btn-primary');

  const setCurrent = (e) => {
    dispatch(setCurrentChannel(Number(e.target.id)));
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light pt-5 h-100 border-right">
      <div className="d-flex justify-content-around align-items-center w-100">
        <p className="m-0 p-0">Channels</p>
        <ModalVindow addChannel={addChannel} />
      </div>
      <div className="d-flex flex-column">
        {channelsList.map((item) => <button type="button" onClick={setCurrent} className={activeChannelId === item.id ? activeChannelClassnames : channelsClassNames} key={item.id} id={item.id}>{item.name}</button>)}
      </div>
    </div>
  );
};

export default Channels;
