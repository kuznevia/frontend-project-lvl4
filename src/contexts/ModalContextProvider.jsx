import React, { useState } from 'react';

export const ModalContext = React.createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [modalChannelId, setModalChannelId] = useState(null);

  const handleShowRemove = (id) => {
    setShowRemove(true);
    setModalChannelId(id);
  };

  const handleShowRename = (id) => {
    setShowRename(true);
    setModalChannelId(id);
  };

  const handleCloseRemove = () => {
    setShowRemove(false);
  };

  const handleCloseRename = () => {
    setShowRename(false);
  };

  return (
    <ModalContext.Provider value={{
      showRemove,
      showRename,
      modalChannelId,
      handleShowRemove,
      handleShowRename,
      handleCloseRemove,
      handleCloseRename,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
};
