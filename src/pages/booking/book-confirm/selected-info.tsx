/* eslint-disable react/prop-types */
import { Clock, HandHelping, CalendarClock } from "lucide-react";
import { format } from "date-fns";
import { Schedule, Service } from "@/client/api";

interface props {
  selectedService: Service;
  selectedSchedule: Schedule;
}

const SelectedInfo: React.FC<props> = ({
  selectedService,
  selectedSchedule,
}) => {
  if (!selectedService || !selectedSchedule) return null;

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4 border-t mt-4">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Thông tin lịch hẹn đã chọn:
        </h3>
        <div className="bg-blue-50 p-3 rounded-md text-sm shadow space-y-2">
          <div className="flex items-center text-gray-600">
            <CalendarClock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-medium">Ngày:</span>{" "}
            {format(selectedSchedule?.startTime, "dd/MM/yyyy")}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">Thời gian:</span>{" "}
            {format(selectedSchedule?.startTime, "HH:mm")}
          </div>
          <div className="flex items-center text-gray-600">
            <HandHelping className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{selectedService.serviceName}</span>
          </div>
          <div className="flex items-start text-gray-700">
            {/* <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm">
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedInfo;
