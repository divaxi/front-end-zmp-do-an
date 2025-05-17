import { DefaultService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchBookieService = async () => {
  return await DefaultService.getByDomainCmsDichVuPaging({
    domain: "demo",
    page: 1,
    size: 9999,
  });
};

export const useBookieService = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "bookie-service",
    fetchBookieService
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
