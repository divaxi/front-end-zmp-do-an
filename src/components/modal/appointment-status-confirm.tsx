import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { APPOINTMENT_STATUS_TEXT } from "@/constants/appointment";

interface props {
  status: keyof typeof APPOINTMENT_STATUS_TEXT;
  execute: () => void;
}

const AppointmentStatusConfirmModal: FunctionComponent<props> = ({
  status,
  execute,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  return (
    <Modal
      visible={modalOpen}
      title="Thay đổi trạng thái"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Xác nhận",
          highLight: true,
          className: "logout-text",
          onClick: () => {
            execute();
            hideModal();
          },
        },
        {
          text: "Hủy",
          close: true,
        },
      ]}
      description={`Bạn có chắc chắn thay đổi trạng thái cuộc hẹn thành "${APPOINTMENT_STATUS_TEXT[status]}"`}
    />
  );
};

export default AppointmentStatusConfirmModal;
