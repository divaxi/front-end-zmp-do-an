import {
  StaffsControllerFindAllV1Data,
  StaffsControllerFindByUserV1Data,
} from "../api";
import { StaffsService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchHomeDoctors = async (query: StaffsControllerFindAllV1Data) => {
  return await StaffsService.staffsControllerFindAllV1(query);
};
export const useHomeDoctors = ({
  limit,
  page,
}: StaffsControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["doctors", page, limit],
    () => fetchHomeDoctors({ page, limit })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const fetchThisStaff = async (query: StaffsControllerFindByUserV1Data) => {
  return await StaffsService.staffsControllerFindByUserV1(query);
};
export const useThisStaff = ({ id }: { id?: number }) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["staff", id],
    () => {
      if (!id) return;
      return fetchThisStaff({ id });
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 2,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
