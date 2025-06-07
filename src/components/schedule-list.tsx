import HorizontalDivider from "@/components/horizontal-divider";
// import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import { useSetAtom } from "jotai";
import { LucideTrash2 } from "lucide-react";
import { scheduleList } from "@/state";
import { SchedulesControllerFindByIdV1Response } from "@/client/api";
import { format } from "date-fns";
import { deleteSchedule } from "@/client/services/schedule";
import { useSnackbar } from "zmp-ui";

type ScheduleListProps = {
  schedules: SchedulesControllerFindByIdV1Response[];
};

export default function ScheduleList({ schedules }: ScheduleListProps) {
  const setschedules = useSetAtom(scheduleList);
  const { openSnackbar } = useSnackbar();
  // const isLoading = useAtom(loadingState);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4 gap-y-8 pb-[120px]">
        <h2 className="text-subtitle italic text-sm">
          Hôm nay: {format(new Date(), "dd-MM-yyyy")}
        </h2>
        {schedules.length === 0 && <NoData />}
        {schedules.length > 0 &&
          schedules?.map((schedule) => (
            <div key={schedule.id} className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between pb-2">
                <div>
                  <h1 className="text-base text-primary font-[550]">
                    Bắt đầu: {format(schedule.startTime, "dd-MM-yyyy HH:mm")}
                  </h1>
                  <h1 className="text-base text-danger font-[550]">
                    Kết thúc: {format(schedule.endTime, "dd-MM-yyyy HH:mm")}
                  </h1>
                  <span className="italic text-2xs text-subtitle">
                    {schedule.staff.user.userName}
                  </span>
                </div>
                <div className="flex flex-col self-start items-center">
                  <LucideTrash2
                    className="scale-90 mt-1.5 text-danger"
                    onClick={() => {
                      deleteSchedule({ id: schedule.id })
                        .catch(() => {
                          openSnackbar({
                            type: "error",
                            text: "Lỗi xóa lịch làm việc",
                          });
                        })
                        .then(() => {
                          setschedules(
                            schedules.filter((sc) => schedule.id !== sc.id)
                          );
                          openSnackbar({
                            type: "success",
                            text: "Xóa lịch làm việc thành công",
                          });
                        });
                    }}
                  />
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </form>
  );
}
