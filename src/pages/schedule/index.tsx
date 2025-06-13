import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authState, loadingState, scheduleList } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScheduleList from "@/components/schedule-list";
import { useSchedules } from "@/client/services/schedule";
import PaginationComponent from "@/components/pagination";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useAtom(scheduleList);
  const [page, setPage] = useState<number>(1);

  const staff = useAtomValue(authState)?.staff;
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingState);


  const { data } = useSchedules({ staffId: staff?.id as string, page, limit:6 });

  useEffect(() => {
    if (!data) return;
    setSchedule(data.data);
  }, [data, setSchedule, setLoading]);

  return (
    <div className="relative">
      <ScheduleList schedules={schedules} />
      <PaginationComponent page={page} onPageChange={setPage} hasNextPage={data?.hasNextPage||false}/>
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
