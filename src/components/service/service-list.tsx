import { useAtomValue } from "jotai";
import { servicesState } from "@/state";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  tabIndex?: string;
}

const ServiceList: FC<Props> = ({ tabIndex }) => {
  const services = useAtomValue(servicesState);
  const navigate = useNavigate();
  return (
    <div key={tabIndex} className="grid grid-cols-2 gap-3 w-full pt-2">
      {" "}
      {/* Sửa grid-col-2 thành grid-cols-2 và thêm gap */}
      {services?.map((service) => (
        <div
          key={service.id}
          className="w-full p-2  border border-[var(--normalBorder)] rounded-lg" // Thêm padding và border cho rõ ràng
          onClick={() => navigate(`/service-detail/1`)}
        >
          <img
            src={service.image}
            alt={service.label}
            className="w-full h-[120px] object-cover rounded bg-skeleton"
          />
          {/* Sử dụng service.name nếu có */}
          <span className=" text-xs text-subtitle">
            {" "}
            {/* Điều chỉnh kích thước text */}
            {service.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
