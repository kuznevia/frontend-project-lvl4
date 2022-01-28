import React, { useState } from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import { toast } from 'react-toastify';

const ModalVindowAdd = ({ addChannel }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setAlert(false);
  };

  const handleShow = () => setShow(true);

  const handleAdd = () => {
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
    setText('');
    setShow(false);
    toast.success(i18next.t('channelAdded'));
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <>
      <button type="button" className="btn btn-link border border-primary m-0 p-0 px-1" onClick={handleShow}>
        +
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{i18next.t('addNewChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className={inputClassNames} value={text} onChange={handleInputChange} />
          {alert && <span className="text-danger">{alert}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {i18next.t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            {i18next.t('add')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalVindowAdd;
