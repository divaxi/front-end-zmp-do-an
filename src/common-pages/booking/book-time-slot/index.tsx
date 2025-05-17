import { useBookingTimeSchedule } from "@/client/services/booking";
import { formatMinutesToHourString } from "@/utils/date";
import React, { useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Page, Icon, Button } from "zmp-ui";

// --- Component ---

export default function BookTimeSlotPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const serviceName = location?.state?.serviceName;
  const providerName = location?.state?.providerName;

  const serviceId = searchParams.get("serviceId");
  const providerId = searchParams.get("providerId");
  const { data: availableTimes, isLoading } = useBookingTimeSchedule(
    providerId || ""
  );

  // For now, hardcode the date. In a real app, you"d use a date picker.
  const [selectedDate] = useState<string>("2025-03-15"); // YYYY-MM-DD format
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const handleEditService = () => {
    navigate("/booking");
  };

  const handleEditProvider = () => {
    // Navigate back to provider selection for the current service
    navigate(`/booking/provider/${serviceId}`);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedTime) {
      console.log("Booking details:", {
        serviceId,
        providerId,
        date: selectedDate,
        time: selectedTime,
      });
      // Navigate to the next step (e.g., confirmation page)
      // Pass data via state or query params as needed
      navigate(
        `/booking/confirmation?serviceId=${serviceId}&providerId=${providerId}&date=${selectedDate}&time=${selectedTime}`
      );
    } else {
      // Optionally show a message to select a time
      console.log("Please select a time slot.");
    }
  };

  // Helper to format the date for display (e.g., "Thứ Hai, ngày 15/03/2025")
  const formatDateDisplay = (dateString: string): string => {
    try {
      const dateObj = new Date(dateString + "T00:00:00"); // Add time part to avoid timezone issues
      const dayOfWeek = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ][dateObj.getDay()];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      return `${dayOfWeek}, ngày ${day}/${month}/${year}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString; // Fallback to original string
    }
  };

  return (
    <Page className="flex flex-col bg-gray-100">
      {/* Header with selected Service and Provider */}
      <div className="bg-white rounded-lg shadow p-4 m-4 mb-0 flex flex-col space-y-2 sticky top-0 z-10 border-b border-gray-100">
        {/* Service */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Dịch vụ: <strong className="text-gray-800">{serviceName}</strong>
          </span>
          <button
            onClick={handleEditService}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <Icon icon="zi-edit" className="w-5 h-5" />
          </button>
        </div>
        {/* Provider */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Bác sĩ: <strong className="text-gray-800">{providerName}</strong>
          </span>
          <button
            onClick={handleEditProvider}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <Icon icon="zi-edit" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {/* Date Display/Selector (Placeholder) */}
        {/* In a real app, replace this with a Calendar component */}
        <div className="bg-gray-600 text-white rounded-lg p-2 text-sm text-center mx-auto my-4 max-w-xs shadow">
          {formatDateDisplay(selectedDate)}
        </div>

        {/* Time Slot Grid */}
        {isLoading ? (
          <div className="text-center text-gray-500 mt-8">Đang tải lịch...</div>
        ) : !availableTimes || availableTimes?.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {availableTimes?.map((time) => (
              <button
                key={time.Id}
                onClick={() =>
                  handleTimeSelect(time.FromTime?.toString() || "")
                }
                className={`rounded p-2 text-center text-sm cursor-pointer border transition-colors ${
                  selectedTime === time.FromTime?.toString()
                    ? "bg-[#0891B2] text-white border-[#0891B2] font-medium" // Teal color for selected
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {formatMinutesToHourString(time.FromTime || 0)}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Không có lịch trống cho ngày này.
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-4 sticky bottom-0 bg-gray-100 border-t border-gray-200">
        <Button
          fullWidth
          onClick={handleContinue}
          disabled={!selectedTime || isLoading}
          className={`bg-[#86D1D7] hover:bg-[#6ABEC3] text-white font-medium ${!selectedTime || isLoading ? "opacity-50 cursor-not-allowed" : ""}`} // Custom color similar to image
          style={
            {
              "--zmp-button-bg-color": "#86D1D7",
              "--zmp-button-hover-bg-color": "#6ABEC3",
            } as React.CSSProperties
          } // Override ZMP UI default primary
        >
          Tiếp tục
        </Button>
      </div>
    </Page>
  );
}
