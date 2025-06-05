import React, { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authState, loadingState, scheduleList, staffState } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScheduleList from "@/components/schedule-list";
import { useSchedules } from "@/client/services/schedule";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useAtom(scheduleList);
  const staff = useAtomValue(authState)?.staff;
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingState);

  const { data } = useSchedules({ staffId: staff?.id as string });

  useEffect(() => {
    if (!data) return;
    setSchedule(data.data);
  }, [data, setSchedule, setLoading]);

  return (
    <div className="relative">
      <ScheduleList schedules={schedules} />
      <div className="fixed bottom-24 right-3 flex flex-col items-center gap-2 z-10">
        <h1 className="text-primary font-semibold text-sm">Thêm lịch</h1>
        <PlusCircleIcon
          className="w-12 h-12 bg-primary rounded-full text-white shadow-lg cursor-pointer"
          onClick={() => navigate("/schedule/create")}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
