import { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";

interface props {
  execute: () => void;
}

const CustomerRecordCreateModal: FunctionComponent<props> = ({ execute }) => {
  const { modalOpen, hideModal } = useModalLoader();

  return (
    <Modal
      visible={modalOpen}
      title="Tạo hồ sơ"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Xác nhận",
          highLight: true,
          className: "logout-text",
          onClick: () => {
            hideModal();
            execute();
          },
        },
        {
          text: "Hủy",
          close: true,
        },
      ]}
      description={`Bạn có chắc chắn thông tin hồ sơ`}
    />
  );
};

export default CustomerRecordCreateModal;
