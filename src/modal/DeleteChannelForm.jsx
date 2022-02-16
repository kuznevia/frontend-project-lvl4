import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { ApiContext } from '../contexts/ApiContextProvider.jsx';
import { setActiveModal } from '../slices/modalSlice.js';

const DeleteChannelForm = () => {
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.show);
  const id = useSelector((state) => state.modal.channelId);
  const dispatch = useDispatch();

  const handleDelete = () => {
    removeChannel({ id });
    dispatch(setActiveModal({ activeModal: 'none', show: false, channelId: null }));
    toast.success(t('channelRemoved'));
  };

  const handleClose = () => {
    dispatch(setActiveModal({ activeModal: 'none', show: false, channelId: null }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
