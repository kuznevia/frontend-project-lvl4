import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Messages = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const messages = useSelector((state) => state.messages.messages);

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
      message: text,
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
        {messages
          .map((el) => (
            <div key={el.id}>{el.message}</div>
          ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white d-flex flex-column h-100">
        <div className="bg-light mb-5 w-100">
          <p>Активный канал</p>
          <span>Количество сообщений</span>
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
