import React, { useState } from 'react';

export const ModalContext = React.createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [modalChannelId, setModalChannelId] = useState(null);

  const handleShowAdd = () => setShowAdd(true);

  const handleCloseAdd = () => setShowAdd(false);

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
      showAdd,
      showRemove,
      showRename,
      modalChannelId,
      handleShowAdd,
      handleShowRemove,
      handleShowRename,
      handleCloseAdd,
      handleCloseRemove,
      handleCloseRename,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
};
