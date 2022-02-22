import React, { useState, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';
import { closeModal } from '../../slices/modalSlice.js';

const AddChannelForm = () => {
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { addChannel } = useContext(ApiContext);
  const isOpened = useSelector((state) => state.modal.isOpened);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onEntered = () => {
    inputRef.current.focus();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert({ type: 'emptyName' });
      return;
    }
    const checkUniqueNames = channelsList.filter((channel) => channel.name === text);
    if (checkUniqueNames.length > 0) {
      setAlert({ type: 'uniqueName' });
      return;
    }
    addChannel({ name: text });
    toast.success(t('toastLabels.channelAdded'));
    dispatch(closeModal());
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', 'mb-2', 'form-control', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <Modal onSubmit={handleAdd} show={isOpened} onHide={handleClose} onEntered={onEntered}>
      <Modal.Header>
        <Modal.Title>{t('modalLabels.addNewChannel')}</Modal.Title>
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
          <label htmlFor="name" hidden>{t('modalLabels.channelName')}</label>
          {alert && <span className="text-danger">{t(`errors.${alert.type}`)}</span>}
          <div className="d-flex justify-content-end">
            <Button className="mr-2" type="button" variant="secondary" onClick={handleClose}>
              {t('actions.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('actions.send')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelForm;
