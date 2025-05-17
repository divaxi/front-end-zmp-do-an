import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";

interface props {
  dateTime: string;
  execute: () => void;
}

const AppointmentDeleteConfirmModal: FunctionComponent<props> = ({
  dateTime,
  execute,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  return (
    <Modal
      visible={modalOpen}
      title="Hủy lịch hẹn"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Xác nhận",
          highLight: true,
          style: {
            color: "red",
          },
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
      description={`Bạn có chắc chắn muốn hủy lịch hẹn vào ngày "${dateTime}"`}
    />
  );
};

export default AppointmentDeleteConfirmModal;
