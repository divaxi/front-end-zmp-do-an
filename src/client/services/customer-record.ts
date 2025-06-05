import { CustomerrecordsService } from "../api/sdk.gen";
import useSWR from "swr";
import {
  CustomerRecordsControllerCreateV1Data,
  CustomerRecordsControllerFindByUserV1Data,
  CustomerRecordsControllerRemoveV1Data,
  CustomerRecordsControllerUpdateV1Data,
} from "../api";

const fetchCustomerRecord = async (
  query: CustomerRecordsControllerFindByUserV1Data
) => {
  return await CustomerrecordsService.customerRecordsControllerFindByUserV1(
    query
  );
};
export const useCustomerRecord = ({
  userId,
}: CustomerRecordsControllerFindByUserV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["customer-records", userId],
    () => fetchCustomerRecord({ userId })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const postCreateCustomerRecord = async (
  data: CustomerRecordsControllerCreateV1Data
) => {
  const res =
    await CustomerrecordsService.customerRecordsControllerCreateV1(data);
  return res;
};

export const postUpdateCustomerRecord = async (
  data: CustomerRecordsControllerUpdateV1Data
) => {
  const res =
    await CustomerrecordsService.customerRecordsControllerUpdateV1(data);
  return res;
};

export const deleteCustomerRecord = async (
  id: CustomerRecordsControllerRemoveV1Data
) => {
  await CustomerrecordsService.customerRecordsControllerRemoveV1(id);
};
