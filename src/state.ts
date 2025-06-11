import { atom } from "jotai";
import { atomFamily, unwrap } from "jotai/utils";
import {
  Appointment,
  Cart,
  Category,
  Color,
  NewsDetail,
  Payment,
  Product,
  Service,
  ServiceCategory,
  ServiceDetail,
  Treatment,
} from "@/types";
import {
  requestWithFallback,
  useSWRRequestWithFallback,
} from "@/utils/request";
import { atomWithStorage } from "jotai/utils";
import {
  ServicesControllerFindAllV1Response,
  AppointmentsControllerFindAllByStaffV1Response,
  AuthControllerLoginV1Response,
  CustomerRecordsControllerFindByUserV1Response,
  StaffsControllerFindByIdV1Response,
  SchedulesControllerFindAllV1Response,
  MessageContentDto,
} from "./client/api";

export const authState = atomWithStorage<
  | {
      auth: AuthControllerLoginV1Response | undefined;
      staff: StaffsControllerFindByIdV1Response | undefined;
    }
  | undefined
>("authState", undefined);

export const staffState = atom<StaffsControllerFindByIdV1Response | undefined>(
  undefined
);

export const loadingState = atom<boolean>(false);

export const serviceList = atom<ServicesControllerFindAllV1Response["data"]>(
  []
);

export const appointmentList = atom<
  AppointmentsControllerFindAllByStaffV1Response["data"]
>([]);

export const scheduleList = atom<SchedulesControllerFindAllV1Response["data"]>(
  []
);

export const customerRecordList =
  atom<CustomerRecordsControllerFindByUserV1Response>([]);

export const chatbotMessageList = atom<MessageContentDto[]>([
  {
    content:
      "Xin chào anh/chị! Em là trợ lý ảo của Phòng Khám Nha Khoa 🦷\nAnh/chị muốn đặt lịch hẹn, xem dịch vụ, hoặc cần tư vấn gì ạ?",
    role: "assistant",
  },
]);

export const bannersState = atom(() =>
  requestWithFallback<string[]>("/banners", [])
);

export const tabsState = atom(["Tất cả", "Nam", "Nữ", "Trẻ em"]);

export const selectedTabIndexState = atom(0);

export const paymentsState = atom(() =>
  requestWithFallback<Payment[]>("/payments", [])
);

export const appointmentsState = atom(() =>
  requestWithFallback<Appointment[]>("/appointment", [])
);

export const categoriesState = atom(() =>
  requestWithFallback<Category[]>("/categories", [])
);

export const treatmentsState = atom(() => {
  return () => useSWRRequestWithFallback<Treatment[]>("/treatment", []);
});
export const serviceCategoryState = atom(() =>
  requestWithFallback<ServiceCategory[]>("/service-category", [])
);
export const servicesState = atom(() =>
  requestWithFallback<Service[]>("/service", [])
);

export const NewsCategoryState = atom(() =>
  requestWithFallback<Service[]>("/service", [])
);

export const treatState = atom(() =>
  requestWithFallback<Category[]>("/treatment", [])
);

export const serviceDetailState = atom(() => {
  return () =>
    useSWRRequestWithFallback<ServiceDetail>(
      "/service-detail",
      {} as ServiceDetail
    );
});

export const newsDetailState = atom(() => {
  return () =>
    useSWRRequestWithFallback<NewsDetail>("/news-detail", {} as NewsDetail);
});

export const categoriesStateUpwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);

export const productsState = atom(async (get) => {
  const categories = await get(categoriesState);
  const products = await requestWithFallback<
    (Product & { categoryId: number })[]
  >("/products", []);
  return products.map((product) => ({
    ...product,
    category: categories.find(
      (category) => category.id === product.categoryId
    )!,
  }));
});

export const flashSaleProductsState = atom((get) => get(productsState));

export const recommendedProductsState = atom((get) => get(productsState));

export const sizesState = atom(["S", "M", "L", "XL"]);

export const selectedSizeState = atom<string | undefined>(undefined);

export const colorsState = atom<Color[]>([
  {
    name: "Đỏ",
    hex: "#FFC7C7",
  },
  {
    name: "Xanh dương",
    hex: "#DBEBFF",
  },
  {
    name: "Xanh lá",
    hex: "#D1F0DB",
  },
  {
    name: "Xám",
    hex: "#D9E2ED",
  },
]);

export const selectedColorState = atom<Color | undefined>(undefined);

export const productState = atomFamily((id: number) =>
  atom(async (get) => {
    const products = await get(productsState);
    return products.find((product) => product.id === id);
  })
);

export const cartState = atom<Cart>([]);

export const selectedCartItemIdsState = atom<number[]>([]);

export const checkoutItemsState = atom((get) => {
  const ids = get(selectedCartItemIdsState);
  const cart = get(cartState);
  return cart.filter((item) => ids.includes(item.id));
});

export const cartTotalState = atom((get) => {
  const items = get(checkoutItemsState);
  return {
    totalItems: items.length,
    totalAmount: items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  };
});

export const keywordState = atom("");

export const searchResultState = atom(async (get) => {
  const keyword = get(keywordState);
  const products = await get(productsState);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
});
