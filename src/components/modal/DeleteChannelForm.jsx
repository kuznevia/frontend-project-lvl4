import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { Button, Modal } from 'react-bootstrap';
import { ApiContext } from '../../contexts/ApiContextProvider.jsx';
import { closeModal } from '../../slices/modalSlice.js';
import { selectChangingChannelId, selectModalOpenedStatus } from '../../selectors/selectors.js';

const DeleteChannelForm = () => {
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const isOpened = useSelector(selectModalOpenedStatus);
  const id = useSelector(selectChangingChannelId);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await removeChannel({ id });
      toast.success(t('toastLabels.channelRemoved'));
      dispatch(closeModal());
    } catch (error) {
      rollbar.error(error);
      toast.error(t('errors.connectionFailed'));
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{t('modalLabels.deleteСhannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modalLabels.youSure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t('actions.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelForm;
