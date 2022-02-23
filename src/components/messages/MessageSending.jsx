import React, { useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';

const MessageSending = ({ activeChannelId }) => {
  const [inputText, setInputText] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const { sendMessage } = useContext(ApiContext);
  const inputRef = useRef(null);
  const activeUser = useSelector((state) => state.messages.activeUser);

  const { t } = useTranslation();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputText === '') {
      return;
    }
    setInputDisabled(true);
    await sendMessage({
      text: filter.clean(inputText),
      user: activeUser,
      channelId: activeChannelId,
    });
    setInputDisabled(false);
    setInputText('');
    inputRef.current.focus();
  };

  return (
    <form className="py-1 border rounded-2" onSubmit={handleFormSubmit}>
      <div className="input-group has-validation">
        <input id="message-input-box" className="border-0 p-0 px-2 form-control" ref={inputRef} value={inputText} aria-label="Новое сообщение" onChange={handleInputChange} placeholder="Введите сообщение..." disabled={inputDisabled} />
        <div className="input-group-append">
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="d-none">{t('actions.send')}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageSending;
