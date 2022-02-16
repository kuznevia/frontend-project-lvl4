import React from 'react';
import AddChannelForm from '../modal/AddChannelForm.jsx';
import DeleteChannelForm from '../modal/DeleteChannelForm.jsx';
import RenameChannelForm from '../modal/RenameChannelForm.jsx';

const Modal = ({ type }) => {
  switch (type) {
    case 'add':
      return <AddChannelForm />;
    case 'rename':
      return <RenameChannelForm />;
    case 'remove':
      return <DeleteChannelForm />;
    case false:
      return null;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default Modal;
