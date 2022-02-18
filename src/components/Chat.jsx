import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import Spinner from 'react-bootstrap/Spinner';
import { setInitialChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { visualizeInitialMessages, setActiveUser } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { AuthContext } from '../contexts/AuthProvider.jsx';
import Modal from './Modal.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const rollbar = useRollbar();
  const { logout } = useContext(AuthContext);
  const currentModalType = useSelector((state) => state.modal.activeModal);

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
      dispatch(setInitialChannels(channels));
      dispatch(visualizeInitialMessages(messages));
      dispatch(setCurrentChannel(currentChannelId));
      setLoaded(true);
    } catch (e) {
      if (e.message === 'Network Error') {
        toast.error(t('connectionFailed'));
        return;
      }
      if (e.response.status === 401) {
        rollbar.warning(t('notCorrectNameOrPassword'));
        logout();
        return;
      }
      toast.error(t('connectionFailed'));
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);

  if (loaded === false) {
    return (
      <div className="row d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Modal type={currentModalType} />
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
