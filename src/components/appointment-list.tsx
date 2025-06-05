import HorizontalDivider from "@/components/horizontal-divider";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import StatusComponent from "./status-component";
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_TEXT,
} from "@/constants/appointment";
import { useModalLoader } from "@/provider/ModalProvider";
import { useForm } from "react-hook-form";
import AppointmentStatusConfirmModal from "./modal/appointment-status-confirm";
import { useAtomValue, useSetAtom } from "jotai";
import { appointmentList, loadingState } from "@/state";
import { CheckIcon, LucideTrash2 } from "lucide-react";
import AppointmentDeleteConfirmModal from "./modal/appointment-delete-confirm";
import ReceptionModal from "./modal/reception-modal";
import { AppointmentsControllerFindAllV1Response } from "@/client/api";
import { format } from "date-fns";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

type AppointmentListProps = {
  appointments?: AppointmentsControllerFindAllV1Response["data"];
  isStaff?: boolean;
};

export default function AppointmentList({
  appointments,
  isStaff,
}: AppointmentListProps) {
  const { showModal } = useModalLoader();
  const isLoading = useAtomValue(loadingState);

  const { control, setValue } = useForm<Record<string, { status: Status }>>({
    defaultValues: appointments?.reduce(
      (acc, appt) => {
        acc[appt.id] = { status: appt.status as Status };
        return acc;
      },
      {} as Record<string, { status: Status }>
    ),
  });
  const setAppointments = useSetAtom(appointmentList);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4 gap-y-8 pb-[120px]">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (!appointments || appointments.length === 0) && (
          <NoData />
        )}
        {!isLoading &&
          appointments?.map((appointment) => (
            <div key={appointment.id} className="flex flex-col gap-3 w-full">
              <div className="flex flex-row justify-between pb-2">
                <div>
                  <h1 className="text-base font-[550]">
                    {format(appointment.specificTime, "dd-MM-yyyy")}
                  </h1>
                  <span className="italic text-2xs text-subtitle">
                    {appointment.note}
                  </span>

                  <h2 className="text-xs ">
                    Khách hàng: {appointment.customerRecord.fullName}
                  </h2>
                  {/* <span className="text-2xs text-subtitle">
                    {appointment?.checkinTime || "Chưa checkin"}
                  </span> */}
                </div>
                <div className="flex flex-col self-start items-center">
                  <StatusComponent
                    control={control}
                    name={`${appointment.id}.status`}
                    isStaff={isStaff}
                    id={appointment.id}
                    status={appointment.status}
                    onChange={(newStatus) => {
                      showModal(
                        <AppointmentStatusConfirmModal
                          status={newStatus}
                          execute={() => {
                            setValue(`${appointment.id}.status`, newStatus);
                          }}
                        />
                      );
                    }}
                  />
                  {appointment.status === APPOINTMENT_STATUS.scheduled && (
                    <>
                      {!isStaff ? (
                        <LucideTrash2
                          className="scale-90 mt-1.5 text-danger"
                          onClick={() => {
                            showModal(
                              <AppointmentDeleteConfirmModal
                                dateTime={appointment.specificTime}
                                execute={() => {
                                  setAppointments(
                                    appointments.filter(
                                      (d) => d.id !== appointment.id
                                    )
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      ) : (
                        <CheckIcon
                          className="scale-120 mt-2 text-white bg-green-400 rounded-md "
                          onClick={() => {
                            showModal(<ReceptionModal />);
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </form>
  );
}
