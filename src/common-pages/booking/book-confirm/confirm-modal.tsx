import { FunctionComponent } from "react";
import { Modal, useSnackbar } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";

const ConfirmModal: FunctionComponent = () => {
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
            openSnackbar({
              position: "top",
              type: "success",
              text: "Đặt lịch hẹn thành công",
              duration: 2000,
            });
            hideModal();
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
