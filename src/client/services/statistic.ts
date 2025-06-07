import useSWR from "swr";
import {
  SatisticControllerCountOrderByTimeV1Data,
  SatisticService,
} from "../api";

const fetchSatisticByTime = async (
  query: SatisticControllerCountOrderByTimeV1Data
) => {
  return await SatisticService.satisticControllerCountOrderByTimeV1(query);
};
export const useSatisticByTime = ({
  startDate,
  endDate,
  enumerateBy,
}: SatisticControllerCountOrderByTimeV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["statistic", startDate, endDate, enumerateBy],
    () => fetchSatisticByTime({ startDate, endDate, enumerateBy })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
