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
      <div className="text-break mb-2">
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
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannelName()}
            </b>
          </p>
          <span className="text-muted">
            {messageCount}
            {' '}
            {t('messages')}
          </span>
        </div>
        <div className="overflow-auto px-5">
          {renderMessages()}
        </div>
        <div className="mt-auto px-5 py-3">
          <form className="py-1 border rounded-2" onSubmit={handleFormSubmit}>
            <div className="input-group has-validation">
              <input className="border-0 p-0 px-2 form-control" value={inputText} aria-label="Новое сообщение" onChange={handleInputChange} placeholder="Введите сообщение..." />
              <div className="input-group-append">
                <button type="submit" className="btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <span hidden>{t('send')}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
