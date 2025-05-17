import { DefaultService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchHomeDoctors = async () => {
  return await DefaultService.getByDomainCmsdoctorPaging({
    domain: "demo",
    page: 1,
    size: 9999,
  });
};
export const useHomeDoctors = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "home-doctors",
    fetchHomeDoctors
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
