import React from 'react';
import AddChannelForm from './AddChannelForm.jsx';
import DeleteChannelForm from './DeleteChannelForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';

const Modal = ({ type }) => {
  switch (type) {
    case 'add':
      return <AddChannelForm />;
    case 'rename':
      return <RenameChannelForm />;
    case 'remove':
      return <DeleteChannelForm />;
    case 'none':
      return null;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default Modal;
