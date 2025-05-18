import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { scheduleList } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScheduleList from "@/components/schedule-list";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useAtom(scheduleList);
  // const fetchedData = useAtomValue(schedulesState);
  const navigate = useNavigate();
  useEffect(() => {
    // if (
    //   schedules.length === 0 &&
    //   // fetchedData.length !== schedules.length
    // ) {
    //   // setCustomerRecord(fetchedData);
    // }
  }, [schedules, setSchedule]);

  return (
    <div className="relative">
      <ScheduleList schedules={schedules} isLoading={schedules.length === 0} />
      <div className="fixed bottom-24 right-3 flex flex-col items-center gap-2 z-50">
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
