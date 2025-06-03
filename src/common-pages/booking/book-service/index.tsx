import React from "react";
import ServiceCategoryCard from "@/components/booking/service-card"; // Import component mới
import { Page } from "zmp-ui";
import { useServices } from "@/client/services/service";

// Dữ liệu mẫu (bạn sẽ lấy từ API hoặc state)
export default function BookServicePage() {
  const { data: serviceCategories } = useServices({ limit: 6, page: 1 });
  return (
    <Page className="p-4 bg-gray-50">
      <h1 className="text-lg font-semibold mb-4">Chọn loại dịch vụ</h1>
      {serviceCategories?.data?.map((category) => (
        <ServiceCategoryCard
          key={category.id}
          title={category.serviceName || ""}
          description={category.description || ""}
        />
      ))}
      {/* Có thể thêm các thành phần khác của trang ở đây */}
    </Page>
  );
}
