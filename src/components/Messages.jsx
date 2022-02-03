import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

const Messages = ({ sendMessage }) => {
  const [inputText, setInputText] = useState('');
  const messages = useSelector((state) => state.messages.messages);
  const activeUser = useSelector((state) => state.messages.activeUser);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);

  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText === '') {
      console.log('empty');
      return;
    }
    sendMessage({
      text: filter.clean(inputText),
      user: activeUser,
      channelId: activeChannelId,
    });
    setInputText('');
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
          .map(({ user, text, id }) => (
            <div key={id}>
              <span className="font-weight-bold">
                {user}
                :
                {' '}
              </span>
              {text}
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    renderMessages();
  }, []);

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
            <input value={inputText} aria-label="Новое сообщение" onChange={handleInputChange} />
            <button type="submit" className="btn btn-outline-primary">{i18next.t('send')}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
