import React, { useContext } from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../contexts/ModalContextProvider.jsx';

const ChannelDropDown = ({
  setCurrent,
  activeClasses,
  id,
  itemName,
  removable,
}) => {
  const { t } = useTranslation();
  const { handleShowRemove, handleShowRename } = useContext(ModalContext);

  const handleDropdownRemove = () => {
    handleShowRemove(id);
  };

  const handleDropdownRename = () => {
    handleShowRename(id);
  };

  if (!removable) {
    return (
      <Button onClick={setCurrent} variant={activeClasses} key={id} id={id}>
        <span className="mr-1">#</span>
        {itemName}
      </Button>
    );
  }

  return (
    <Dropdown as={ButtonGroup}>
      <Button onClick={setCurrent} variant={activeClasses} key={id} id={id}>
        <span className="mr-1">#</span>
        {itemName}
      </Button>

      <Dropdown.Toggle role="button" split variant={activeClasses} id="dropdown-split-basic">
        <span className="d-none">{t('manageChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDropdownRemove}>{t('delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleDropdownRename}>{t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelDropDown;
