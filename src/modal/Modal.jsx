import React from 'react';
import ModalAdding from './ModalAdding.jsx';
import ModalRemoving from './ModalRemoving.jsx';
import ModalRenaming from './ModalRenaming.jsx';

const Modal = ({ type }) => {
  switch (type) {
    case 'add':
      return <ModalAdding />;
    case 'rename':
      return (
        <ModalRenaming />
      );
    case 'remove':
      return <ModalRemoving />;
    case 'none':
      return null;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default Modal;
