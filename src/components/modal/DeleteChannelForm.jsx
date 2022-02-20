import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';
import { closeModal } from '../../slices/modalSlice.js';

const DeleteChannelForm = () => {
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const id = useSelector((state) => state.modal.changingChannelId);
  const dispatch = useDispatch();

  const handleDelete = () => {
    toast.success(t('channelRemoved'));
    removeChannel({ id });
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{t('deleteСhannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('youSure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelForm;
