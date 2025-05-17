import HorizontalDivider from "@/components/horizontal-divider";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import { Appointment } from "@/types";
import StatusComponent from "./status-component";
import { APPOINTMENT_STATUS_TEXT } from "@/constants/appointment";
import { useModalLoader } from "@/provider/ModalProvider";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

type AppointmentListProps = {
  appointments: Appointment[];
  isLoading: boolean;
};

export default function AppointmentList({
  appointments,
  isLoading,
}: AppointmentListProps) {
  const { showModal } = useModalLoader();
  return (
    <div className="flex flex-col p-4 gap-y-8">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (!appointments || appointments.length === 0) && <NoData />}
      {!isLoading &&
        appointments?.map((appointment) => (
          <div key={appointment.id} className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between pb-2">
              <div>
                <h1 className="text-base font-[550]">{appointment.date}</h1>
                <span className="italic text-2xs text-subtitle">
                  {appointment.doctor}
                </span>
                <h2 className="text-xs ">Khách hàng: {appointment.doctor}</h2>
              </div>
              <div className="self-start">
                <StatusComponent
                  status={appointment.status as Status}
                  isStaff
                  onChange={(newStatus) => console.log(newStatus)}
                />
              </div>
            </div>
            <HorizontalDivider />
          </div>
        ))}
    </div>
  );
}
