import HorizontalDivider from "@/components/horizontal-divider";
import clsx from "clsx";
import { FC } from "react";
import { useAppointment } from "@/client/services/appointment";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import {
  APPOINTMENT_STATUS_TEXT,
  APPOINTMENT_STATUS_COLOR,
} from "@/constants/appointment";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

const StatusComponent: FC<{ status: Status }> = ({ status }) => {
  const statusText = APPOINTMENT_STATUS_TEXT[status];
  const statusColor = APPOINTMENT_STATUS_COLOR[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs text-white"
      )}
      style={{ backgroundColor: statusColor }}
    >
      {statusText}
    </span>
  );
};

export default function AppointmentList() {
  const { data: appointments, isLoading } = useAppointment();
  return (
    <>
      <div className="flex flex-col p-4 gap-y-8">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (!appointments || appointments.Total === 0) && (
          <NoData />
        )}
        {!isLoading &&
          appointments?.Value?.map((appointment) => (
            <div key={appointment.Id} className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between pb-2">
                <div>
                  <h1 className="text-base font-[550]">
                    {appointment.NgayHen}
                  </h1>
                  <span className="italic text-2xs text-subtitle">
                    {appointment.TenBacSi}
                  </span>
                </div>
                <div className="self-start">
                  <StatusComponent status={appointment.TrangThai as Status} />
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </>
  );
}
