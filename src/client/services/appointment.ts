import { format, startOfYear } from "date-fns";
import { AppointmentsService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchAppointment = async () => {
  return await AppointmentsService.appointmentsControllerFindAllV1({
    page: 1,
    limit: 10,
    endTime: format(new Date(), "yyyy-MM-dd"),
    startTime: format(startOfYear(new Date()), "yyyy-MM-dd"),
  });
};
export const useAppointment = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "appointment",
    fetchAppointment
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
