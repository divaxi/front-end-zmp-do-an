import React, { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { loadingState, scheduleList } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScheduleList from "@/components/schedule-list";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useAtom(scheduleList);
  // const fetchedData = useAtomValue(schedulesState);
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingState);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    // if (
    //   schedules.length === 0 &&
    //   // fetchedData.length !== schedules.length
    // ) {
    //   // setCustomerRecord(fetchedData);
    // }
    return () => clearTimeout(timeout);
  }, [schedules, setSchedule, setLoading]);

  return (
    <div className="relative">
      <ScheduleList schedules={schedules} />
      <div className="fixed bottom-24 right-3 flex flex-col items-center gap-2 z-10">
        <h1 className="text-primary font-semibold text-sm">Đặt lịch ngay</h1>
        <PlusCircleIcon
          className="w-12 h-12 bg-primary rounded-full text-white shadow-lg cursor-pointer"
          onClick={() => navigate("/schedule/create")}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
