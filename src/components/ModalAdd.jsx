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
      <button type="button" className="btn btn-link border border-primary m-0 p-0 px-1" onClick={handleShow}>
        +
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
