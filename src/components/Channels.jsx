import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const chatList = useSelector((state) => state.chats.chats);

  return (
    <div className="bg-light pt-5 h-100 border-right">
      Channels
      <ul>
        {chatList.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
};

export default Channels;
