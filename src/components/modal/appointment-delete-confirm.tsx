import React, { FunctionComponent } from "react";
import { Modal, useSnackbar } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { deleteAppointment } from "@/client/services/appointment";
import { format } from "date-fns";
interface props {
  dateTime: string;
  id: string;
  onDelete: () => void;
}

const AppointmentDeleteConfirmModal: FunctionComponent<props> = ({
  dateTime,
  id,
  onDelete,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
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
            deleteAppointment({ id })
              .then(() => {
                openSnackbar({
                  text: "Đã hủy lịch hẹn",
                  type: "success",
                });
                onDelete();
              })
              .catch(() => {
                openSnackbar({
                  text: "Lỗi hủy lịch hẹn",
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
      description={`Bạn có chắc chắn muốn hủy lịch hẹn vào ngày "${format(dateTime, "dd-MM-yyyy / HH:mm")}"`}
    />
  );
};

export default AppointmentDeleteConfirmModal;
