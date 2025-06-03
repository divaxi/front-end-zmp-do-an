import React from "react";
import { Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import emptyRecordIcon from "@/static/empty_image.png"; // Đảm bảo bạn có file SVG này

interface EmptyHealthRecordProps {
  onAddRecord?: () => void;
}

export default function EmptyHealthRecord({
  onAddRecord,
}: EmptyHealthRecordProps) {
  const navigate = useNavigate();

  const handleAddRecord = () => {
    if (onAddRecord) {
      onAddRecord();
    } else {
      navigate("/profile/personal-info/detail");
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="mb-6 mt-4 mx-10 flex flex-col items-center justify-center">
        <img
          src={emptyRecordIcon}
          alt="Chưa có hồ sơ"
          className="object-contain"
        />

        <p className="text-center text-gray-600 text-sm mb-8 w-full">
          Chưa có hồ sơ. Vui lòng thêm hồ sơ
        </p>
      </div>

      <Button
        fullWidth
        onClick={handleAddRecord}
        className="mb-3 bg-[#0095FF] text-white rounded-md h-10 flex items-center justify-center"
      >
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Thêm hồ sơ</span>
        </div>
      </Button>
    </div>
  );
}
