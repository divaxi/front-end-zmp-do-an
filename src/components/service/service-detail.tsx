import { useAtomValue } from "jotai";
import { serviceDetailState } from "@/state";
import { Button } from "../ui/button";

export default function ServiceDetail() {
  const { data: serviceDetail, isLoading } = useAtomValue(serviceDetailState)();

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          {!isLoading && serviceDetail && (
            <div className="w-full flex flex-col">
              <img
                src={serviceDetail.image}
                alt={serviceDetail.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2 border-l-4 border-primary pl-3">
                  <h2 className="text-primary font-semibold">
                    {serviceDetail.title}
                  </h2>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-primary">
                    Mô tả dịch vụ
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {serviceDetail.description}{" "}
                  </p>
                </div>
                <Button className="text-white font-bold text-base mt-12 ">
                  Đặt lịch ngay
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
