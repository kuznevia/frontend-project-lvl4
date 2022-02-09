import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { ChatContext } from '../contexts/ChatProvider.jsx';

const Messages = () => {
  const [inputText, setInputText] = useState('');
  const messages = useSelector((state) => state.messages.messages);
  const channels = useSelector((state) => state.channels.channels);
  const activeUser = useSelector((state) => state.messages.activeUser);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const { sendMessage } = useContext(ChatContext);
  const { t } = useTranslation();

  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    filter.loadDictionary('en');
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

  const activeChannelName = () => {
    const [activeChannel] = channels.filter((channel) => channel.id === activeChannelId);
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
            {t('messages')}
          </span>
        </div>
        <div className="bg-white overflow-auto px-5">
          {renderMessages()}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleFormSubmit}>
            <input value={inputText} aria-label="Новое сообщение" onChange={handleInputChange} />
            <button type="submit" className="btn btn-outline-primary">{t('send')}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
