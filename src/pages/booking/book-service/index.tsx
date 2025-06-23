import React, { useEffect } from "react";
import ServiceCategoryCard from "@/components/booking/service-card"; // Import component mới
import { Page } from "zmp-ui";
import { useServices } from "@/client/services/service";
import { useAtom } from "jotai";
import { serviceList } from "@/state";

export default function BookServicePage() {
  const [services, setServices] = useAtom(serviceList);
  const { data } = useServices({ limit: 6, page: 1 });

  useEffect(() => {
    if (data && data.data.length > 0) {
      setServices(data.data);
    }
  }, [data, setServices]);

  return (
    <Page className="p-4 bg-gray-50">
      <h1 className="text-lg font-semibold mb-4">Chọn loại dịch vụ</h1>
      {services?.map((category) => (
        <ServiceCategoryCard
          key={category.id}
          title={category.serviceName || ""}
          description={category.description || ""}
          serviceId={category.id}
        />
      ))}
    </Page>
  );
}
