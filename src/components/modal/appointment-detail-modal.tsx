import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { Appointment } from "@/client/api";
import { APPOINTMENT_STATUS_TEXT } from "@/constants/appointment";
import { format } from "date-fns";

interface AppointmentDetailModalProps {
  appointment: Appointment;
}

const AppointmentDetailModal: FunctionComponent<
  AppointmentDetailModalProps
> = ({ appointment }) => {
  const { modalOpen, hideModal } = useModalLoader();

  return (
    <Modal
      visible={modalOpen}
      title="Chi tiết cuộc hẹn"
      onClose={() => {
        hideModal();
      }}
      actions={[
        {
          text: "Đóng",
          close: true,
        },
      ]}
      description={`
Khách hàng: ${appointment.customerRecord.fullName} (${appointment.customerRecord.sex})
Ngày sinh: ${format(appointment.customerRecord.DOB, "dd-MM-yyyy")}
Giờ hẹn: ${format(appointment.specificTime, "HH:mm")}
Trạng thái: ${APPOINTMENT_STATUS_TEXT[appointment.status]}
${appointment.note ? `Ghi chú: ${appointment.note}` : ""}
      `}
    />
  );
};

export default AppointmentDetailModal;
