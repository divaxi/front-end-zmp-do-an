import { AppointmentsService } from "../api/sdk.gen";
import useSWR from "swr";
import { AppointmentsControllerFindAllV1Data } from "../api";

const fetchAppointment = async (query: AppointmentsControllerFindAllV1Data) => {
  return await AppointmentsService.appointmentsControllerFindAllV1(query);
};
export const useAppointment = ({
  limit,
  page,
  status,
  startTime,
  endTime,
  userId,
}: AppointmentsControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["appointments", limit, page, status, startTime, endTime, userId],
    () => fetchAppointment({ limit, page, status, startTime, endTime, userId })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
