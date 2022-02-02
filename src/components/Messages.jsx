import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

const Messages = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const messages = useSelector((state) => state.messages.messages);
  const activeUser = useSelector((state) => state.messages.activeUser);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  console.log(messages);

  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      console.log('empty');
      return;
    }
    sendMessage({
      message: filter.clean(text),
      user: activeUser,
      channelId: activeChannelId,
    });
    setText('');
  };

  const renderMessages = () => {
    if (!messages) {
      return null;
    }
    if (messages.length === 0) {
      return null;
    }

    return (
      <div>
        {filteredMessages
          .map((el) => (
            <div key={el.id}>
              <span className="font-weight-bold">
                {el.user}
                :
                {' '}
              </span>
              {el.message}
            </div>
          ))}
      </div>
    );
  };

  const activeChannelName = () => {
    const [activeChannel] = useSelector((state) => state.channels.channels
      .filter((channel) => channel.id === activeChannelId));
    if (activeChannel === undefined) {
      return null;
    }
    return activeChannel.name;
  };

  const messageCount = filteredMessages.length;

  return (
    <>
      <div className="bg-white d-flex flex-column h-100">
        <div className="bg-light mb-5 w-100">
          <p>{activeChannelName()}</p>
          <span>
            {messageCount}
            {' '}
            {i18next.t('messages')}
          </span>
        </div>
        <div className="bg-white overflow-auto px-5">
          {renderMessages()}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleFormSubmit}>
            <input value={text} onChange={handleInputChange} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
