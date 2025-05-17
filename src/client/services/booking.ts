import { getTodayAtMidnightString } from "@/utils/date";
import { DefaultService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchBookingServices = async () => {
  return await DefaultService.getByDomainBookieService({
    domain: "demo",
  });
};

const fetchBookingProvider = async (
  providerId: string,
  viewDetail: boolean = true
) => {
  return await DefaultService.getByDomainBookieProvider({
    domain: "demo",
    strProviderId: providerId,
    viewDetail: viewDetail,
  });
};
const fetchBookingTimeSchedule = async (providerId: string) => {
  return await DefaultService.getByDomainSchedule({
    domain: "demo",
    idProvider: providerId,
    date: getTodayAtMidnightString(),
  });
};

// const fetchBookingTime = async () => {
//   return await DefaultService.getByDomainBookie({
//     domain: "demo",
//     strProviderId,
//     viewDetail: true,
//   });
// };
//
export const useBookingServices = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "booking-services",
    fetchBookingServices
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useBookingProvider = (providerId: string, viewDetail = true) => {
  const shouldFetch = !!providerId;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? ["booking-provider", providerId, viewDetail] : null,
    () => fetchBookingProvider(providerId, viewDetail)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useBookingTimeSchedule = (providerId: string) => {
  const shouldFetch = !!providerId;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? ["schedule-provider", providerId] : null,
    () => fetchBookingTimeSchedule(providerId)
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
