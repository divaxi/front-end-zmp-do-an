import Layout from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import HomePage from "./pages/home";
import ProfilePage from "@/common-pages/profile";
import BookServicePage from "@/common-pages/booking/book-service";
import BookProviderPage from "@/common-pages/booking/book-provider";
import BookTimeSlotPage from "@/common-pages/booking/book-time-slot";
import PersonalInfoPage from "@/common-pages/personal-infor";
import LinkHealthRecordPage from "@/common-pages/personal-infor/link-record";
import DetailInfoPage from "@/common-pages/personal-infor/detail-infor";

import PaymentPage from "@/components/payment-list";
import ServiceDetailPage from "@/components/service/service-detail";
import NewsDetailPage from "@/components/news/news-detail";
import AppointmentPage from "@/components/appointment-list";
import ServicePage from "@/components/service/service-tabs";
import TreatmentPage from "@/components/treatment-list";
import NewsTabsPage from "@/components/news/news-tabs";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/appointment",
          element: <AppointmentPage />,
          handle: {
            title: "Lịch hẹn",
          },
        },
        {
          path: "/services",
          element: <ServicePage />,
          handle: {
            title: "Dịch vụ",
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/booking",
          element: <BookServicePage />,
          handle: {
            title: "Chọn dịch vụ",
          },
        },
        {
          path: "/booking/provider/:serviceId",
          element: <BookProviderPage />,
          handle: {
            title: "Chọn bác sĩ",
          },
        },
        {
          // This route expects query parameters: ?serviceId=...&providerId=...
          path: "/booking/time-slot", // <-- Add the new route
          element: <BookTimeSlotPage />,
          handle: {
            title: "Chọn thời gian",
          },
        },
        {
          path: "/profile/personal-info",
          element: <PersonalInfoPage />,
          handle: {
            title: "Thông tin cá nhân",
            back: true, // Hiển thị nút quay lại
          },
        },
        {
          path: "/profile/health-records/link",
          element: <LinkHealthRecordPage />,
          handle: {
            title: "Liên kết hồ sơ",
            back: true,
          },
        },
        {
          path: "/profile/personal-info/detail/:id?",
          element: <DetailInfoPage />,
          handle: {
            title: ({ params }) =>
              params.id ? "Chỉnh sửa hồ sơ" : "Thêm hồ sơ mới",
            back: true,
          },
        },
        {
          path: "/service-detail/:id",
          element: <ServiceDetailPage />,
          handle: {
            title: "Chi tiết dịch vụ",
          },
        },
        {
          path: "/news-detail/:id",
          element: <NewsDetailPage />,
          handle: {
            title: "Chi tiết tin",
          },
        },
        {
          path: "/payment", // <-- Add the new route
          element: <PaymentPage />,
          handle: {
            title: "Thanh toán",
          },
        },
        {
          path: "/treatment", // <-- Add the new route
          element: <TreatmentPage />,
          handle: {
            title: "Thủ thuật điều trị",
          },
        },
        {
          path: "/news", // <-- Add the new route
          element: <NewsTabsPage />,
          handle: {
            title: "Tin tức",
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);
