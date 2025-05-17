import { DefaultService } from "../api/sdk.gen";
import useSWR from "swr";

const fetchNewsCategory = async () => {
  return await DefaultService.getByDomainNewsCategory({
    domain: "demo",
    page: 1,
    size: 9999,
  });
};

const fetchNewsBanners = async () => {
  return await DefaultService.getByDomainBookieBanners({
    domain: "demo",
    page: 1,
    pageSize: 999,
  });
};

export const useNewsBanners = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "news-banners",
    fetchNewsBanners
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useNewsCategory = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "news-category",
    fetchNewsCategory
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
