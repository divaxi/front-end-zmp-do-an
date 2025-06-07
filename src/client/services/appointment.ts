import { AppointmentsService, CustomerrecordsService } from "../api/sdk.gen";
import useSWR from "swr";
import {
  AppointmentsControllerFindAllByCustomerV1Data,
  AppointmentsControllerFindAllByStaffV1Data,
  AppointmentsControllerRemoveV1Data,
  AppointmentsControllerUpdateV1Data,
  AppointmentsControllerCreateV1Data,
} from "../api";

const fetchAppointment = async (
  query: AppointmentsControllerFindAllByCustomerV1Data
) => {
  return await AppointmentsService.appointmentsControllerFindAllByCustomerV1(
    query
  );
};
export const useAppointment = ({
  limit,
  page,
  status,
  startTime,
  endTime,
  userId,
}: AppointmentsControllerFindAllByCustomerV1Data) => {
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

export const fetchAppointmentByStaff = async (
  query: AppointmentsControllerFindAllByStaffV1Data
) => {
  return await AppointmentsService.appointmentsControllerFindAllByStaffV1(
    query
  );
};

export const useAppointmentByStaff = ({
  limit,
  page,
  staffId,
}: AppointmentsControllerFindAllByStaffV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["appointments", limit, page, staffId],
    () => fetchAppointmentByStaff({ limit, page, staffId })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const postCreateAppointment = async (
  data: AppointmentsControllerCreateV1Data
) => {
  const res = await AppointmentsService.appointmentsControllerCreateV1(data);
  return res;
};

export const postUpdateAppointment = async (
  data: AppointmentsControllerUpdateV1Data
) => {
  const res = await AppointmentsService.appointmentsControllerUpdateV1(data);
  return res;
};

export const deleteAppointment = async (
  id: AppointmentsControllerRemoveV1Data
) => {
  await AppointmentsService.appointmentsControllerRemoveV1(id);
};
