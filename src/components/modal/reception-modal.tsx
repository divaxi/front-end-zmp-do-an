import React, { FunctionComponent } from "react";
import { Modal } from "zmp-ui";
import { useModalLoader } from "@/provider/ModalProvider";
import { Appointment } from "@/client/api";
import { format } from "date-fns";
import {
  postCheckinReception,
  useReceptionByAppointment,
} from "@/client/services/reception";
import { useSnackbar } from "zmp-ui";
import { APPOINTMENT_STATUS } from "@/constants/appointment";

const ReceptionModal: FunctionComponent<{ appointment: Appointment }> = ({
  appointment,
}) => {
  const { modalOpen, hideModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  const { data: reception } = useReceptionByAppointment({
    appointmentId: appointment.id,
  });
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
            if (appointment.status !== APPOINTMENT_STATUS.scheduled) {
              openSnackbar({
                text: "Cuộc hẹn đã được đón tiếp",
                type: "error",
              });
            }
            if (
              appointment.status === APPOINTMENT_STATUS.scheduled &&
              reception?.id
            ) {
              postCheckinReception({
                id: reception?.id,
                appointmentId: appointment.id,
              })
                .then(() =>
                  openSnackbar({
                    text: "Đã đón tiếp",
                    type: "success",
                  })
                )
                .catch(() =>
                  openSnackbar({
                    text: "Lỗi xảy ra, vui lòng thử lại",
                    type: "error",
                  })
                );
            }
            hideModal();
          },
        },
        {
          text: "Cancel",
          close: true,
        },
      ]}
      description={`
        Khách hàng: ${appointment?.customerRecord.fullName} (${appointment?.customerRecord.sex})
        Ngày sinh: ${format(appointment?.customerRecord.DOB, "dd-MM-yyyy")}
        Giờ hẹn: ${format(appointment?.specificTime, "HH:mm")}
        Checkin: ${reception?.checkinTime ? format(reception?.checkinTime, "HH:mm") : "Chưa đón"}
      `}
    />
  );
};

export default ReceptionModal;
