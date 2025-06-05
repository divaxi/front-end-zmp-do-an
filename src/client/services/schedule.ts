import { SchedulesService } from "../api/sdk.gen";
import useSWR from "swr";
import {
  SchedulesControllerCreateV1Data,
  SchedulesControllerFindAllV1Data,
  SchedulesControllerRemoveV1Data,
  SchedulesControllerUpdateV1Data,
} from "../api";

const fetchSchedules = async (query: SchedulesControllerFindAllV1Data) => {
  return await SchedulesService.schedulesControllerFindAllV1(query);
};
export const useSchedules = ({
  staffId,
  page,
  limit,
}: SchedulesControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["staff-schedule", staffId, page, limit],
    () => fetchSchedules({ staffId, page, limit })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const postCreateSchedule = async (
  data: SchedulesControllerCreateV1Data
) => {
  const res = await SchedulesService.schedulesControllerCreateV1(data);
  return res;
};

export const postUpdateSchedule = async (
  data: SchedulesControllerUpdateV1Data
) => {
  const res = await SchedulesService.schedulesControllerUpdateV1(data);
  return res;
};

export const deleteSchedule = async (id: SchedulesControllerRemoveV1Data) => {
  await SchedulesService.schedulesControllerRemoveV1(id);
};
