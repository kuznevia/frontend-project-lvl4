import React from 'react';
import ModalAdding from './ModalAdding.jsx';
import ModalRemoving from './ModalRemoving.jsx';
import ModalRenaming from './ModalRenaming.jsx';

const Modal = ({
  type,
  handleRename,
  inputClassNames,
  text,
  handleInputChange,
}) => {
  switch (type) {
    case 'add':
      return <ModalAdding />;
    case 'rename':
      return (
        <ModalRenaming
          handleRename={handleRename}
          inputClassNames={inputClassNames}
          text={text}
          handleInputChange={handleInputChange}
        />
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
