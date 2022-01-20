import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../AuthContext';
import { addChannels } from '../slices/chatsSlice.js';

const Chat = () => {
  const { authentificated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chats.chats);

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
    <div className="container-xxl bg-danger mx-5">
      <div className="row">
        <div className="col-md-2">
         asdasd
        </div>
        <div className="col-md-10">
         asdasd
        </div>
      </div>
    </div>
  );
};

export default Chat;
