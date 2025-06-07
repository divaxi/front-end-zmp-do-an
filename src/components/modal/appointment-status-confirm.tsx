import React, { FunctionComponent } from "react";
import { Modal, useSnackbar } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { APPOINTMENT_STATUS_TEXT } from "@/constants/appointment";
import { postUpdateAppointment } from "@/client/services/appointment";
import { Appointment } from "@/client/api";

interface props {
  newStatus: keyof typeof APPOINTMENT_STATUS_TEXT;
  appointment: Appointment;
  execute: () => void;
}

const AppointmentStatusConfirmModal: FunctionComponent<props> = ({
  newStatus,
  appointment,
  execute,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  console.log(newStatus);
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
          onClick: () => {
            postUpdateAppointment({
              id: appointment.id,
              requestBody: {
                status: newStatus,
              },
            })
              .then(() => {
                execute();
                openSnackbar({
                  text: "Thay đổi trạng thái thành công",
                  type: "success",
                });
              })
              .catch(() => {
                openSnackbar({
                  text: "Lỗi xảy ra, vui lòng thử lại",
                  type: "error",
                });
              });
            hideModal();
          },
        },
        {
          text: "Hủy",
          close: true,
        },
      ]}
      description={`Bạn có chắc chắn thay đổi trạng thái cuộc hẹn thành "${APPOINTMENT_STATUS_TEXT[newStatus]}"`}
    />
  );
};

export default AppointmentStatusConfirmModal;
