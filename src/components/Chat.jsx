import React, { useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { renderInitialChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { visualizeInitialMessages, setActiveUser } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { logout } = useContext(AuthContext);

  dispatch(setActiveUser(localStorage.getItem('username')));

  const url = '/api/v1/data';

  const initialRequest = async () => {
    const token = localStorage.getItem('token');
    const authAxios = axios.create({
      baseUrl: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await authAxios.get(url);
      const { channels, messages, currentChannelId } = response.data;
      dispatch(renderInitialChannels(channels));
      dispatch(visualizeInitialMessages(messages));
      dispatch(setCurrentChannel(currentChannelId));
    } catch (e) {
      if (e.response.status === 401) {
        rollbar.warning(t('notCorrectNameOrPassword'));
        logout();
      }
      toast.error(t('connectionFailed'));
      throw e;
    }
  };

  initialRequest();

  return (
    <>
      <div className="container shadow my-4 overflow-hidden h-100 rounded">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-right pt-3 px-0 bg-light">
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <Messages />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
