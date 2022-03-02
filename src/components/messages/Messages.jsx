import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import MessageSending from './MessageSending.jsx';
import MessageListing from './MessageListing.jsx';
import { selectFilteredMessages, selectChannelId, selectactiveChannel } from '../../selectors/selectors.js';

const Messages = () => {
  const activeChannelId = useSelector(selectChannelId);
  const filteredMessages = useSelector(selectFilteredMessages);
  const activeChannel = useSelector(selectactiveChannel);

  const { t } = useTranslation();

  useEffect(() => {
    filter.loadDictionary('en');
  }, []);

  const activeChannelName = () => {
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
            {t('chatLabels.messages')}
          </span>
        </div>
        <div id="chat-box" className="overflow-auto px-5">
          <MessageListing filteredMessages={filteredMessages} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageSending activeChannelId={activeChannelId} />
        </div>
      </div>
    </>
  );
};

export default Messages;
