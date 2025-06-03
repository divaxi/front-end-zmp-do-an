import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { NavigateFunction } from "react-router-dom";

const AuthModal: FunctionComponent<{ navigate: NavigateFunction }> = ({
  navigate,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  return (
    <Modal
      visible={modalOpen}
      title="Thông báo"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Đăng nhập",
          highLight: true,
          onClick: () => {
            hideModal();
            navigate("/profile");
          },
        },
        {
          text: "Cancel",
          close: true,
        },
      ]}
      description={`
 Vui lòng đăng nhập để tiếp tục
  `}
    />
  );
};

export default AuthModal;
