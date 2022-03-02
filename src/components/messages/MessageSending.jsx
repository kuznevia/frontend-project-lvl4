import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';
import { AuthContext } from '../../contexts/AuthProvider.jsx';

const MessageSending = ({ activeChannelId }) => {
  const { sendMessage } = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      messageBox: '',
    },
    onSubmit: async ({ messageBox }, actions) => {
      if (messageBox === '') {
        return;
      }
      try {
        await sendMessage({
          text: filter.clean(messageBox),
          user,
          channelId: activeChannelId,
        });
        actions.resetForm({
          values: {
            messageBox: '',
          },
        });
        actions.setSubmitting(false);
      } catch (error) {
        rollbar.error(error);
        toast.error(t('errors.connectionFailed'));
      }
      inputRef.current.focus();
    },
  });

  return (
    <form className="py-1 border rounded-2" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
      <div className="input-group has-validation">
        <input id="messageBox" name="messageBox" className="border-0 p-0 px-2 form-control" ref={inputRef} value={formik.values.messageBox} aria-label="Новое сообщение" onChange={formik.handleChange} placeholder="Введите сообщение..." disabled={formik.isSubmitting} />
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
