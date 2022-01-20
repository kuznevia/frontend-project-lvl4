import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AuthContext from '../AuthContext';
import { addChannels } from '../slices/chatsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = ({ sendMessage }) => {
  const { authentificated } = useContext(AuthContext);
  const dispatch = useDispatch();

  if (!authentificated) {
    window.location.replace('/login');
  }

  const url = '/api/v1/data';

  const initialRequest = async () => {
    const token = localStorage.getItem('slack-chat');
    const authAxios = axios.create({
      baseUrl: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await authAxios.get(url);
      const { channels } = response.data;
      dispatch(addChannels(channels));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);

  return (
    <div className="container-xxl shadow mx-5 h-100">
      <div className="row h-100 g-0">
        <div className="col-md-2">
          <Channels />
        </div>
        <div className="col-md-10">
          <Messages sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;