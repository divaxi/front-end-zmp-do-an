import { format } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { CheckIcon, EyeIcon, LucideTrash2 } from "lucide-react";
import { AppointmentsControllerFindAllByStaffV1Response } from "@/client/api";
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_TEXT,
} from "@/constants/appointment";
import { appointmentList, loadingState } from "@/state";
import { useModalLoader } from "@/provider/ModalProvider";
import HorizontalDivider from "@/components/horizontal-divider";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import StatusComponent from "./status-component";
import AppointmentStatusConfirmModal from "./modal/appointment-status-confirm";
import AppointmentDeleteConfirmModal from "./modal/appointment-delete-confirm";
import ReceptionModal from "./modal/reception-modal";
import AppointmentDetailModal from "./modal/appointment-detail-modal";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

type AppointmentListProps = {
  appointments?: AppointmentsControllerFindAllByStaffV1Response["data"];
  isStaff?: boolean;
};

type AppointmentFormValues = Record<string, { status: Status }>;

const AppointmentHeader = ({
  appointment,
}: {
  appointment: AppointmentsControllerFindAllByStaffV1Response["data"][0];
}) => (
  <div>
    <h1 className="text-base font-[550]">
      {format(appointment.specificTime, "dd-MM-yyyy")}
    </h1>
    <span className="italic text-2xs text-subtitle">
      {appointment.service.serviceName}
    </span>
    <h2 className="text-xs">
      Khách hàng: {appointment.customerRecord.fullName}
    </h2>
    <h2 className="text-xs">
      Thời gian: {format(appointment.schedule.startTime, "HH:mm")}
    </h2>
  </div>
);

const AppointmentActions = ({
  appointment,
  isStaff,
  onDelete,
}: {
  appointment: AppointmentsControllerFindAllByStaffV1Response["data"][0];
  isStaff?: boolean;
  onDelete: () => void;
}) => {
  const { showModal } = useModalLoader();

  return (
    <div className="flex items-center gap-3 pt-4">
      {!isStaff ? (
        appointment.status === APPOINTMENT_STATUS.scheduled && (
          <LucideTrash2
            className="scale-90 text-danger cursor-pointer"
            onClick={onDelete}
          />
        )
      ) : (
        <CheckIcon
          className="scale-120 text-white bg-green-400 rounded-md cursor-pointer"
          onClick={() =>
            showModal(<ReceptionModal appointment={appointment} />)
          }
        />
      )}
      <EyeIcon
        className="scale-120 text-primary text-bold border border-primary border-2 rounded-md cursor-pointer"
        onClick={() =>
          showModal(<AppointmentDetailModal appointment={appointment} />)
        }
      />
    </div>
  );
};

export default function AppointmentList({
  appointments,
  isStaff,
}: AppointmentListProps) {
  const { showModal } = useModalLoader();
  const isLoading = useAtomValue(loadingState);
  const setAppointments = useSetAtom(appointmentList);

  const { control, setValue } = useForm<AppointmentFormValues>({
    defaultValues: appointments?.reduce((acc, appt) => {
      acc[appt.id] = { status: appt.status as Status };
      return acc;
    }, {} as AppointmentFormValues),
  });

  const handleStatusChange = (
    appointment: AppointmentsControllerFindAllByStaffV1Response["data"][0],
    newStatus: Status
  ) => {
    showModal(
      <AppointmentStatusConfirmModal
        newStatus={newStatus}
        appointment={appointment}
        execute={() => setValue(`${appointment.id}.status`, newStatus)}
      />
    );
  };

  const handleDelete = (
    appointment: AppointmentsControllerFindAllByStaffV1Response["data"][0]
  ) => {
    showModal(
      <AppointmentDeleteConfirmModal
        dateTime={appointment.specificTime}
        execute={() => {
          setAppointments(
            appointments?.filter((d) => d.id !== appointment.id) ?? []
          );
        }}
      />
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4 gap-y-8 pb-[120px]">
        <h2 className="text-sm italic text-subtitle">
          Hôm nay {format(new Date(), "dd-MM-yyyy")}
        </h2>

        {isLoading && <LoadingSpinner />}

        {!isLoading && (!appointments || appointments.length === 0) && (
          <NoData />
        )}

        {!isLoading &&
          appointments?.map((appointment) => (
            <div key={appointment.id} className="flex flex-col gap-3 w-full">
              <div className="flex flex-row justify-between pb-2">
                <AppointmentHeader appointment={appointment} />

                <div className="flex flex-col self-start items-center">
                  <StatusComponent
                    control={control}
                    name={`${appointment.id}.status`}
                    isStaff={isStaff}
                    id={appointment.id}
                    status={appointment.status}
                    onChange={(newStatus) =>
                      handleStatusChange(appointment, newStatus)
                    }
                  />
                  <AppointmentActions
                    appointment={appointment}
                    isStaff={isStaff}
                    onDelete={() => handleDelete(appointment)}
                  />
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </form>
  );
}
