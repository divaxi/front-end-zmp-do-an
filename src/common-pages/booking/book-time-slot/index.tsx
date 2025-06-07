import { useScheduleByDay } from "@/client/services/schedule";
import Button from "@/components/button";
import { scheduleList } from "@/state";
import { format, startOfDay } from "date-fns";
import { useAtom } from "jotai";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Page, Icon, DatePicker, useSnackbar } from "zmp-ui";
import { Schedule } from "@/client/api";

export default function BookTimeSlotPage() {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { openSnackbar } = useSnackbar();
  const [schedule, setSchedule] = useAtom(scheduleList);

  // State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Schedule | null>(null);

  // Derived state
  const serviceName = location?.state?.serviceName;

  // Data fetching
  const { data, isLoading, error } = useScheduleByDay({
    date: startOfDay(selectedDate).toISOString(),
  });

  // Effects
  useEffect(() => {
    if (!data) return;
    setSchedule(data);
  }, [data, setSchedule]);

  useEffect(() => {
    if (error) {
      openSnackbar({
        type: "error",
        text: "Không thể tải lịch. Vui lòng thử lại sau.",
      });
    }
  }, [error, openSnackbar]);

  // Event handlers
  const handleEditService = useCallback(() => {
    navigate("/booking");
  }, [navigate]);

  const handleTimeSelect = useCallback((time: Schedule) => {
    setSelectedTime(time);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedTime) {
      openSnackbar({
        type: "warning",
        text: "Vui lòng chọn thời gian",
      });
      return;
    }
    navigate(`/booking/book-confirm/${serviceId}/${selectedTime.id}`);
  }, [selectedTime, serviceId, navigate, openSnackbar]);

  // Render helpers
  const renderTimeSlots = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-500 mt-8">Đang tải lịch...</div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 mt-8">
          Có lỗi xảy ra khi tải lịch
        </div>
      );
    }

    if (!schedule || schedule.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-8">
          Không có lịch trống cho ngày này.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-3">
        {schedule.map((time) => (
          <button
            key={time.id}
            onClick={() => handleTimeSelect(time)}
            className={`rounded p-2 text-center text-sm cursor-pointer border transition-colors ${
              selectedTime?.startTime === time.startTime?.toString()
                ? "bg-[#0891B2] text-white border-[#0891B2] font-medium"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
            aria-selected={
              selectedTime?.startTime === time.startTime?.toString()
            }
          >
            {format(new Date(time.startTime), "HH:mm")}
          </button>
        ))}
      </div>
    );
  };

  return (
    <Page className="flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 m-4 mb-0 flex flex-col space-y-2 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Dịch vụ: <strong className="text-gray-800">{serviceName}</strong>
          </span>
          <button
            onClick={handleEditService}
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            aria-label="Chỉnh sửa dịch vụ"
          >
            <Icon icon="zi-edit" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col p-4 overflow-y-auto">
        <div className="bg-white rounded-lg p-4 mb-4">
          <DatePicker
            label="Chọn ngày"
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </div>

        {renderTimeSlots()}
      </div>

      {/* Footer */}
      <div className="p-4 bottom-200 bg-gray-100 border-t border-gray-200">
        <Button
          type="button"
          primary
          className="w-full bg-primary hover:bg-primary-dark active:bg-primary-dark transition-colors duration-200"
          onClick={handleContinue}
          disabled={!selectedTime}
        >
          Tiếp tục
        </Button>
      </div>
    </Page>
  );
}
