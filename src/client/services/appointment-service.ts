import { AppointmentservicesService } from "../api/sdk.gen";
import useSWR from "swr";
import { AppointmentServicesControllerFindAppointmentByStaffV1Data } from "../api";

const fetchAppointmentService = async (
  query: AppointmentServicesControllerFindAppointmentByStaffV1Data
) => {
  return await AppointmentservicesService.appointmentServicesControllerFindAppointmentByStaffV1(
    query
  );
};
export const useAppointmentService = ({ staffId }: { staffId?: string }) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["appointment-service-bystaff", staffId],
    () => {
      if (!staffId) return;
      return fetchAppointmentService({ staffId });
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
