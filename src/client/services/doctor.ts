import { StaffsControllerFindAllV1Data } from "../api";
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
