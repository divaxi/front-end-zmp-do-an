import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/client/services/service";
import { useAtom } from "jotai";
import { serviceList } from "@/state";

interface Props {
  tabIndex?: string;
}

const ServiceList: FC<Props> = ({ tabIndex }) => {
  const { data } = useServices({ limit: 20, page: 1 });
  const [services, setServices] = useAtom(serviceList);

  useEffect(() => {
    if (!data?.data) return;
    setServices(data?.data);
  }, [data, setServices]);

  const navigate = useNavigate();

  return (
    <div key={tabIndex} className="grid grid-cols-2 gap-3 w-full pt-2">
      {" "}
      {services?.map((service) => (
        <div
          key={service.id}
          className="w-full p-2  border border-[var(--normalBorder)] rounded-lg"
          onClick={() => navigate(`/service-detail/${service.id}`)}
        >
          <img
            src={service.image?.path}
            alt={service.serviceName}
            className="w-full h-[120px] object-cover rounded bg-skeleton"
          />
          <span className=" text-xs text-subtitle"> {service.serviceName}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
