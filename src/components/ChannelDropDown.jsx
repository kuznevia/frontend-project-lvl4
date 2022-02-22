import React from 'react';
import {
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal, setChannelID } from '../slices/modalSlice.js';

const ChannelDropDown = ({
  setCurrent,
  activeClasses,
  id,
  itemName,
  removable,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDropdownRemove = () => {
    dispatch(openModal({ activeModal: 'remove' }));
    dispatch(setChannelID({ id }));
  };

  const handleDropdownRename = () => {
    dispatch(openModal({ activeModal: 'rename' }));
    dispatch(setChannelID({ id }));
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
        <span className="d-none">{t('modalLabels.manageChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDropdownRemove}>{t('actions.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleDropdownRename}>{t('actions.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelDropDown;
