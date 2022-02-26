import React from 'react';

const MessageListing = ({ filteredMessages }) => {
  if (filteredMessages.length === 0) {
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

MessageListing.defaultProps = {
  filteredMessages: null,
};

export default MessageListing;
