import { ServicesControllerFindAllV1Data } from "../api";
import { ServicesService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchServices = async (query: ServicesControllerFindAllV1Data) => {
  return await ServicesService.servicesControllerFindAllV1(query);
};

export const useServices = ({
  limit,
  page,
}: ServicesControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["services", limit, page],
    () => fetchServices({ limit, page })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
