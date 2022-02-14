import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from '../contexts/ModalContextProvider.jsx';
import { ApiContext } from '../contexts/ApiContextProvider.jsx';

const ModalRemoving = () => {
  const { showRemove, handleCloseRemove, modalChannelId } = useContext(ModalContext);
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();

  const handleDelete = () => {
    removeChannel({ id: modalChannelId });
    handleCloseRemove();
    toast.success(t('channelRemoved'));
  };

  return (
    <Modal show={showRemove} onHide={handleCloseRemove}>
      <Modal.Header>
        <Modal.Title>{t('deleteСhannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('youSure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseRemove}>
          {t('cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoving;
