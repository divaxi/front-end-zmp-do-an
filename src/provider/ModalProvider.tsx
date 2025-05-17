import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface ModalLoaderContextType {
  showModal: (modal: ReactNode) => void;
  hideModal: () => void;
  modalOpen: boolean;
}

const ModalLoaderContext = createContext<ModalLoaderContextType | undefined>(
  undefined,
);

const ModalLoaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const showModal = (modalComponent: ReactNode) => {
    setModal(modalComponent);
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
    setModal(null);
  };

  const contextValue = useMemo(
    () => ({ showModal, hideModal, modalOpen }),
    [modalOpen],
  );

  return (
    <ModalLoaderContext.Provider value={contextValue}>
      {children}
      {modal}
    </ModalLoaderContext.Provider>
  );
};

export const useModalLoader = () => {
  const context = useContext(ModalLoaderContext);
  if (!context) {
    throw new Error("useModalLoader must be used within a ModalLoaderProvider");
  }
  return context;
};

export default ModalLoaderProvider;
