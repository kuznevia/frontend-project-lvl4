import React, { useState } from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
  Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import cn from 'classnames';

const ChannelDropDown = ({
  setCurrent,
  removeChannel,
  renameChannel,
  activeClasses,
  key,
  id,
  itemName,
  removable,
}) => {
  if (!removable) {
    return <Button onClick={setCurrent} variant={activeClasses} key={key} id={id}>{itemName}</Button>;
  }

  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(false);
  const channelsList = useSelector((state) => state.channels.channels);

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

  const handleDelete = () => {
    removeChannel({ id });
  };

  const handleRename = () => {
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
  };

  const inputClassNames = cn('w-100', 'border', 'rounded', 'p-2', {
    'border-primary': !alert,
    'border-danger': alert,
  });

  return (
    <Dropdown as={ButtonGroup}>
      <Button onClick={setCurrent} variant={activeClasses} key={key} id={id}>{itemName}</Button>

      <Dropdown.Toggle split variant={activeClasses} id="dropdown-split-basic" />

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
            {i18next.t('no')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {i18next.t('yes')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRename} onHide={handleCloseRename}>
        <Modal.Header>
          <Modal.Title>{i18next.t('setNewChannelName')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className={inputClassNames} value={text} onChange={handleInputChange} />
          {alert && <span className="text-danger">{alert}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRename}>
            {i18next.t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleRename}>
            {i18next.t('rename')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Dropdown>
  );
};

export default ChannelDropDown;
