import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { useBookieService } from "@/client/services/service";
import { useAtom } from "jotai";
import { servicesState } from "@/state";

export default function ServiceSection() {
  const navigate = useNavigate();
  // const { data: services } = useBookieService();
  const services = useAtom(servicesState);
  return (
    <div className="px-4 pb-4">
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
        {services[0].map((service) => (
          <div
            key={service.id}
            className="flex flex-col min-w-[150px] border border-[var(--normalBorder)] rounded-md shadow-sm p-2"
            onClick={() => navigate(`/service-detail/${service.id}`)}
          >
            <img
              src={service.image}
              alt={service.label}
              className="w-full h-[100px] object-cover rounded-md bg-skeleton"
            />
            <p className="text-sm text-subtitle mt-2 line-clamp-2">
              {service.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
