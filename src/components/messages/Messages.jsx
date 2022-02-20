import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import MessageSending from './MessageSending.jsx';
import MessageListing from './MessageListing.jsx';

const Messages = () => {
  const messages = useSelector((state) => state.messages.messages);
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);
  const { t } = useTranslation();

  useEffect(() => {
    filter.loadDictionary('en');
  }, []);

  useEffect(() => {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
  });

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
        <div id="chat-box" className="overflow-auto px-5">
          <MessageListing messages={messages} filteredMessages={filteredMessages} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageSending activeChannelId={activeChannelId} />
        </div>
      </div>
    </>
  );
};

export default Messages;
