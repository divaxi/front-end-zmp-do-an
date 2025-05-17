import { DefaultService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchAppointment = async () => {
  return await DefaultService.getByDomainBookieAppointmentPhantrang({
    domain: "demo",
    page: 1,
    pageSize: 10,
    typeOfAppointment: -1,
    existMobile: 2,
    providerId: "00000000-0000-0000-0000-000000000000",
    _from: "2025-04-23 00:00:33",
    to: "2025-04-23 23:59:33",
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
