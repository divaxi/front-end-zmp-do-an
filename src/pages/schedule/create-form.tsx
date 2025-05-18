import React from "react";
import { useNavigate } from "react-router-dom";

import ScheduleCreate from "@/components/forms/schedule-create";
import type { ScheduleFormValues } from "@/components/forms/schedule-create";
import { useModalLoader } from "@/provider/ModalProvider";
import CustomerRecordCreateModal from "@/components/modal/customer-record-create";
import { useSnackbar } from "zmp-ui";
import { useSetAtom } from "jotai";
import { loadingState } from "@/state";

const ScheduleCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { showModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  const setLoading = useSetAtom(loadingState);

  const handleSubmit = async (data: ScheduleFormValues) => {
    try {
      console.log("data", data);
      showModal(
        <CustomerRecordCreateModal
          execute={async () => {
            try {
              setLoading(true);
              // ⏳ Mô phỏng độ trễ 1.2 giây
              await new Promise((resolve) => setTimeout(resolve, 1200));

              const response = await fetch("/api/schedule", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                throw new Error("Failed to create schedule");
              }

              const result = await response.json();
              console.log("API response:", result);

              openSnackbar({
                type: "success",
                text: "Tạo lịch hẹn thành công",
                duration: 2000,
              });
              navigate("/schedule");
            } catch (err) {
              openSnackbar({
                type: "error",
                text: "Có lỗi khi tạo lịch hẹn",
                duration: 2000,
              });
              console.error("API error:", err);
            } finally {
              setLoading(false);
            }
          }}
        />
      );
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6">
          <ScheduleCreate onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleCreatePage;
