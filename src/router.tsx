import Layout from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import HomePage from "./pages/home";
import ProfilePage from "@/common-pages/profile";
import BookServicePage from "@/common-pages/booking/book-service";
import BookProviderPage from "@/common-pages/booking/book-provider";
import BookTimeSlotPage from "@/common-pages/booking/book-time-slot";
import PersonalInfoPage from "@/common-pages/personal-infor";
import DetailInfoPage from "@/common-pages/personal-infor/detail-infor";
import { ProtectedRoute } from "@/components/protected-route";

import PaymentPage from "@/components/payment-list";
import ServiceDetailPage from "@/components/service/service-detail";
import NewsDetailPage from "@/components/news/news-detail";
import AppointmentPage from "./pages/appointment/index-customer";
import AppointmentStaffPage from "./pages/appointment/index-staff";
import ServicePage from "@/components/service/service-tabs";
import TreatmentPage from "@/components/treatment-list";
import BookConfirmPage from "@/common-pages/booking/book-confirm";
import CustomerRecordPage from "./pages/customer-record";
import CustomerRecordCreatePage from "./pages/customer-record/create-form";
import ScheduleCreatePage from "./pages/schedule/create-form";
import ScheduleUpdatePage from "./pages/schedule/update-form";
import SchedulePage from "./pages/schedule";
import CustomerRecordUpdatePage from "./pages/customer-record/update-form";
import ChatbotPage from "./pages/chatbot";
import StatisticPage from "./pages/satistic";

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
          element: (
            <ProtectedRoute>
              <AppointmentPage />
            </ProtectedRoute>
          ),
          handle: {
            title: "Lịch hẹn",
          },
        },
        {
          path: "/appointment-staff",
          element: (
            <ProtectedRoute>
              <AppointmentStaffPage />
            </ProtectedRoute>
          ),
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
          path: "/booking/time-slot/:serviceId",
          element: <BookTimeSlotPage />,
          handle: {
            title: "Chọn thời gian",
          },
        },
        {
          path: "/booking/book-confirm/:serviceId/:scheduleId",
          element: <BookConfirmPage />,
          handle: {
            title: "Xác nhận thông tin",
          },
        },
        {
          path: "/profile/personal-info",
          element: <PersonalInfoPage />,
          handle: {
            title: "Thông tin cá nhân",
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
          path: "/payment",
          element: <PaymentPage />,
          handle: {
            title: "Thanh toán",
          },
        },
        {
          path: "/treatment",
          element: <TreatmentPage />,
          handle: {
            title: "Thủ thuật điều trị",
          },
        },
        {
          path: "/customer-record",
          element: <CustomerRecordPage />,
          handle: {
            title: "Hồ sơ",
          },
        },
        {
          path: "/customer-record/create",
          element: <CustomerRecordCreatePage />,
          handle: {
            title: "Thêm hồ sơ",
          },
        },
        {
          path: "/customer-record/update/:id",
          element: <CustomerRecordUpdatePage />,
          handle: {
            title: "Cập nhật hồ sơ",
          },
        },
        {
          path: "/schedule",
          element: <SchedulePage />,
          handle: {
            title: "Lịch làm việc",
          },
        },
        {
          path: "/schedule/create",
          element: <ScheduleCreatePage />,
          handle: {
            title: "Thêm lịch làm việc",
          },
        },
        {
          path: "/schedule/update/:id",
          element: <ScheduleUpdatePage />,
          handle: {
            title: "Cập nhật lịch làm việc",
          },
        },
        {
          path: "/chatbot",
          element: (
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          ),
          handle: {
            title: "Chatbot",
          },
        },
        {
          path: "/statistic",
          element: (
            <ProtectedRoute>
              <StatisticPage />
            </ProtectedRoute>
          ),
          handle: {
            title: "Thống kê",
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);
