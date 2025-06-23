import type { SWRConfiguration } from "swr";

export const optionsSWR: SWRConfiguration = {
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
  focusThrottleInterval: 10000,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  shouldRetryOnError: false,
  refreshInterval: 60000,
  suspense: false,
};
