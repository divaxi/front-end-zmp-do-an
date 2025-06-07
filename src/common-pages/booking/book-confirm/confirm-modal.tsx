import { FunctionComponent } from "react";
import { Modal, useSnackbar } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { AppointmentsControllerCreateV1Data } from "@/client/api";
import { postCreateAppointment } from "@/client/services/appointment";
interface Props {
  appointment: AppointmentsControllerCreateV1Data["requestBody"];
  navigate: () => void;
}

const ConfirmModal: FunctionComponent<Props> = ({ appointment, navigate }) => {
  const { modalOpen, hideModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  return (
    <Modal
      visible={modalOpen}
      title="Xác nhận đặt lịch"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Xác nhận",
          highLight: true,
          className: "confirm-book",
          onClick: () => {
            postCreateAppointment({ requestBody: appointment })
              .then((res) => {
                openSnackbar({
                  position: "bottom",
                  type: "success",
                  text: "Đặt lịch hẹn thành công",
                  duration: 2000,
                });
              })
              .catch(() => {
                openSnackbar({
                  position: "bottom",
                  type: "error",
                  text: "Đặt lịch hẹn thất bại",
                  duration: 2000,
                });
              });
            hideModal();
            navigate();
          },
        },
        {
          text: "Hủy",
          close: true,
        },
      ]}
      description="Bạn có chắc chắn thông tin lịch hẹn không, nếu chưa xin hãy kiểm tra lại."
    />
  );
};

export default ConfirmModal;
