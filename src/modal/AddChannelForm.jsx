import React, { useState, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import { ApiContext } from '../contexts/ApiContextProvider.jsx';
import { setActiveModal } from '../slices/modalSlice.js';

const AddChannelForm = () => {
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { addChannel } = useContext(ApiContext);
  const show = useSelector((state) => state.modal.show);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    dispatch(setActiveModal({ activeModal: 'none', show: false, channelId: null }));
  };

  const onEntered = () => {
    inputRef.current.focus();
  };

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
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', 'mb-2', 'form-control', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
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
  );
};

export default AddChannelForm;
