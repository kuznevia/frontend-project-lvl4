import React, { useState, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import { ChatContext } from '../contexts/ChatProvider.jsx';

const ModalVindowAdd = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { addChannel } = useContext(ChatContext);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setAlert(false);
    setText('');
  };

  const onEntered = () => {
    inputRef.current.focus();
  };

  const handleShow = () => setShow(true);

  const handleAdd = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Name cant be empty');
      return;
    }
    const checkUniqueNames = channelsList.filter((channel) => channel.name === text);
    if (checkUniqueNames.length > 0) {
      setAlert('Channel name has to be unique');
      return;
    }
    addChannel({ name: text });
    toast.success(t('channelAdded'));
    setText('');
    setShow(false);
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', 'mb-2', 'form-control', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <>
      <button type="button" className="btn btn-group-vertical p-0 text-primary" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="d-none">+</span>
      </button>
      <Modal onSubmit={handleAdd} show={show} onHide={handleClose} onEntered={onEntered}>
        <Modal.Header>
          <Modal.Title>{t('addNewChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group">
            <input
              name="name"
              id="name"
              className={inputClassNames}
              value={text}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <label htmlFor="name" hidden>{t('channelName')}</label>
            {alert && <span className="text-danger">{alert}</span>}
            <div className="d-flex justify-content-end">
              <Button className="mr-2" type="button" variant="secondary" onClick={handleClose}>
                {t('cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('send')}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalVindowAdd;
