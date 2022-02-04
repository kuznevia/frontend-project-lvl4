import React, { useState } from 'react';
import i18next from 'i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';

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
    toast.success(i18next.t('channelAdded'));
    setText('');
    setShow(false);
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', 'mb-2', {
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
          <form onSubmit={handleAdd} className="form-group">
            <input name="name" id="name" className={inputClassNames} value={text} onChange={handleInputChange} />
            <label htmlFor="name" hidden>{i18next.t('channelName')}</label>
            {alert && <span className="text-danger">{alert}</span>}
            <div className="d-flex justify-content-end">
              <Button className="mr-2" type="button" variant="secondary" onClick={handleClose}>
                {i18next.t('cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {i18next.t('add')}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ModalVindowAdd;
