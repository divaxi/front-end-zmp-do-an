import useSWR from "swr";
import {
  ReceptionsControllerCheckinV1Data,
  ReceptionsControllerFindByAppointmentV1Data,
} from "../api";
import { ReceptionsService } from "../api";

const fetchReceptionByAppointment = async (
  query: ReceptionsControllerFindByAppointmentV1Data
) => {
  return await ReceptionsService.receptionsControllerFindByAppointmentV1(query);
};
export const useReceptionByAppointment = ({
  appointmentId,
}: ReceptionsControllerFindByAppointmentV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["reception-by-appointment", appointmentId],
    () => fetchReceptionByAppointment({ appointmentId })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const postCheckinReception = async (
  data: ReceptionsControllerCheckinV1Data
) => {
  const res = await ReceptionsService.receptionsControllerCheckinV1(data);
  return res;
};
