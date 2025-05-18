import HorizontalDivider from "@/components/horizontal-divider";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import { Schedule } from "@/types";
import { useModalLoader } from "@/provider/ModalProvider";
import { useSetAtom } from "jotai";
import { LucideTrash2 } from "lucide-react";
import { scheduleList } from "@/state";

type ScheduleListProps = {
  schedules: Schedule[];
  isLoading: boolean;
  isStaff?: boolean;
};

export default function ScheduleList({
  schedules,
  isLoading,
  isStaff,
}: ScheduleListProps) {
  const { showModal } = useModalLoader();

  const setschedules = useSetAtom(scheduleList);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4 gap-y-8 pb-[120px]">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (!schedules || schedules.length === 0) && <NoData />}
        {!isLoading &&
          schedules?.map((schedule) => (
            <div key={schedule.id} className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between pb-2">
                <div>
                  <h1 className="text-base font-[550]">{schedule.date}</h1>
                  <span className="italic text-2xs text-subtitle">
                    {schedule.doctor}
                  </span>
                  <h2 className="text-xs ">Khách hàng: {schedule.doctor}</h2>
                </div>
                <div className="flex flex-col self-start items-center">
                  {!isStaff && schedule.status === "ThemMoi" && (
                    <LucideTrash2
                      className="scale-90 mt-1.5 text-danger"
                      onClick={() => {}}
                    />
                  )}
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </form>
  );
}
