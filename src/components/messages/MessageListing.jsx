import React from 'react';

const MessageListing = ({ messages, filteredMessages }) => {
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

export default MessageListing;
