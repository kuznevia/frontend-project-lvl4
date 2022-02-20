import React, { useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';
import { closeModal } from '../../slices/modalSlice.js';

const RenameChannelForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const isOpened = useSelector((state) => state.modal.isOpened);
  const id = useSelector((state) => state.modal.changingChannelId);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const { renameChannel } = useContext(ApiContext);
  const dispatch = useDispatch();

  const channelsList = useSelector((state) => state.channels.channels);

  const onEntered = () => {
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRename = (e) => {
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
    toast.success(t('channelRenamed'));
    renameChannel({ name: text, id });
    dispatch(closeModal());
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <Modal
      onSubmit={handleRename}
      show={isOpened}
      onHide={handleClose}
      onEntered={onEntered}
    >
      <Modal.Header>
        <Modal.Title>{t('setNewChannelName')}</Modal.Title>
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
          <div className="d-flex justify-content-end mt-1">
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
  );
};

export default RenameChannelForm;
