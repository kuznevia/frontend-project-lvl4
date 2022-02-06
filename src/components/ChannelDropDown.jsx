import React, { useState, useRef } from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';

const ChannelDropDown = ({
  setCurrent,
  removeChannel,
  renameChannel,
  activeClasses,
  id,
  itemName,
  removable,
}) => {
  if (!removable) {
    return <Button onClick={setCurrent} variant={activeClasses} key={id} id={id}>{itemName}</Button>;
  }

  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleShowRemove = () => setShowRemove(true);

  const handleShowRename = () => setShowRename(true);

  const handleCloseRemove = () => {
    setShowRemove(false);
  };

  const handleCloseRename = () => {
    setShowRename(false);
  };

  const onEntered = () => {
    inputRef.current.focus();
  };

  const handleDelete = () => {
    removeChannel({ id });
    toast.success(i18next.t('channelRemoved'));
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
    renameChannel({ name: text, id });
    setText('');
    setShowRename(false);
    toast.success(i18next.t('channelRenamed'));
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <Dropdown as={ButtonGroup}>
      <Button onClick={setCurrent} variant={activeClasses}>{itemName}</Button>

      <Dropdown.Toggle role="button" split variant={activeClasses} id="dropdown-split-basic">
        <span className="d-none">{i18next.t('manageChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleShowRemove}>{i18next.t('delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleShowRename}>{i18next.t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
      <Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header>
          <Modal.Title>{i18next.t('deleteСhannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {i18next.t('youSure')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            {i18next.t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {i18next.t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal onSubmit={handleRename} show={showRename} onHide={handleCloseRename} onEntered={onEntered}>
        <Modal.Header>
          <Modal.Title>{i18next.t('setNewChannelName')}</Modal.Title>
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
            <label htmlFor="name" hidden>{i18next.t('channelName')}</label>
            {alert && <span className="text-danger">{alert}</span>}
            <div className="d-flex justify-content-end mt-1">
              <Button className="mr-2" type="button" variant="secondary" onClick={handleCloseRename}>
                {i18next.t('cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {i18next.t('send')}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Dropdown>
  );
};

export default ChannelDropDown;
