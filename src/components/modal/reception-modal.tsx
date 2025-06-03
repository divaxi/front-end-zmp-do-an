import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";

const ReceptionModal: FunctionComponent = () => {
  const { modalOpen, hideModal } = useModalLoader();
  return (
    <Modal
      visible={modalOpen}
      title="Đón tiếp"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Đón tiếp",
          highLight: true,
          onClick: () => {
            hideModal();
          },
        },
        {
          text: "Cancel",
          close: true,
        },
      ]}
      description={`
Khách hàng: NGU VL (Nam) 
Ngày sinh: 21/12/2018   
Giờ hẹn: 20: 30        
  `}
    />
  );
};

export default ReceptionModal;
