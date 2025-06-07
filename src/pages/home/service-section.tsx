import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/client/services/service";

export default function ServiceSection() {
  const navigate = useNavigate();
  const { data: services } = useServices({ limit: 6, page: 1 });
  return (
    <div className="px-4 pb-4 pt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold">Dịch vụ</h2>
        <Button
          variant="ghost"
          className="text-primary text-xs px-1 py-0 h-auto"
          onClick={() => navigate(`/services`)}
        >
          Xem thêm
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {services?.data.map((service) => (
          <div
            key={service.id}
            className="flex flex-col min-w-[150px] border border-[var(--normalBorder)] rounded-md shadow-sm p-2"
            // onClick={() => navigate(`/service-detail/${service.id}`)}
          >
            <img
              src={service.image?.path}
              alt={service.serviceName}
              className="w-full h-[100px] object-cover rounded-md bg-skeleton"
            />
            <p className="text-sm text-subtitle mt-2 line-clamp-2">
              {service.serviceName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
