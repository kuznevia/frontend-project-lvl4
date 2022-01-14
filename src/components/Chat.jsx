import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../AuthContext';
import { addChannels } from '../slices/chatsSlice.js';

const Chat = () => {
  const { authToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chats.chats);
  console.log(chatList);

  if (!authToken) {
    window.location.replace('/login');
  }

  const url = '/api/v1/data';

  const initialRequest = async () => {
    const authAxios = axios.create({
      baseUrl: url,
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    <div>
      <ul>
        {chatList.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
};

export default Chat;
