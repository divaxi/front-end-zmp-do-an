import React from "react";
import ServiceCategoryCard from "@/components/booking/service-card"; // Import component mới
import { Page } from "zmp-ui";
import { useBookingServices } from "@/client/services/booking";

// Dữ liệu mẫu (bạn sẽ lấy từ API hoặc state)
export default function BookServicePage() {
  const { data: serviceCategories } = useBookingServices();
  return (
    <Page className="p-4 bg-gray-50">
      <h1 className="text-lg font-semibold mb-4">Chọn loại dịch vụ</h1>
      {serviceCategories?.map((category) => (
        <ServiceCategoryCard
          key={category.Id}
          title={category.Name || ""}
          description={category.Description || ""}
          categoryId={category.ProviderStr || ""} // Truyền ID để xử lý điều hướng
        />
      ))}
      {/* Có thể thêm các thành phần khác của trang ở đây */}
    </Page>
  );
}
