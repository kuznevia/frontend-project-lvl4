import React from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const ChannelDropDown = ({
  setCurrent,
  removeChannel,
  activeClasses,
  key,
  id,
  itemName,
  removable,
}) => {
  if (!removable) {
    return <Button onClick={setCurrent} variant={activeClasses} key={key} id={id}>{itemName}</Button>;
  }

  const handleDelete = () => {
    removeChannel({ id });
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button onClick={setCurrent} variant={activeClasses} key={key} id={id}>{itemName}</Button>

      <Dropdown.Toggle split variant={activeClasses} id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDelete}> Delete</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelDropDown;
