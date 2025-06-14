import { useAtomValue } from "jotai";
import { authState, serviceList } from "@/state";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const serviceDetail = useAtomValue(serviceList).find(
    (service) => service.id === id
  );
  const staff = useAtomValue(authState)?.staff;

  return (
    <div className="h-full flex flex-col">
      <div className="w-full">
        <img
          src={serviceDetail?.image?.path}
          alt={serviceDetail?.serviceName}
          className="w-full h-[180px] object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-l-4 border-primary pl-3">
            <h2 className="text-primary font-semibold">
              {serviceDetail?.serviceName}
            </h2>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-primary">Mô tả dịch vụ</h3>
            <p className="text-sm text-muted-foreground">
              {serviceDetail?.description}
            </p>
          </div>
        </div>

        {!staff && (
          <Button
            onClick={() =>
              navigate(`/booking/time-slot/${serviceDetail?.id}`, {
                state: {
                  serviceName: serviceDetail?.serviceName,
                },
              })
            }
            className="text-white font-bold text-base mt-8"
          >
            Đặt lịch ngay
          </Button>
        )}
      </div>
    </div>
  );
}
