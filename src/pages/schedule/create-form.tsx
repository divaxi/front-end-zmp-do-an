import React from "react";
import { useNavigate } from "react-router-dom";

import ScheduleCreate from "@/components/forms/schedule-create";
import type { ScheduleFormValues } from "@/components/forms/schedule-create";
import { useModalLoader } from "@/provider/ModalProvider";
import CustomerRecordCreateModal from "@/components/modal/customer-record-create";
import { useSnackbar } from "zmp-ui";
import { useAtomValue, useSetAtom } from "jotai";
import { authState, loadingState } from "@/state";
import { postCreateSchedule } from "@/client/services/schedule";

const ScheduleCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { showModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  const setLoading = useSetAtom(loadingState);
  const staffId = useAtomValue(authState)?.staff?.id;

  const handleSubmit = async (data: ScheduleFormValues) => {
    try {
      showModal(
        <CustomerRecordCreateModal
          execute={async () => {
            setLoading(true);
            try {
              await postCreateSchedule({
                requestBody: {
                  staff: { id: staffId as string },
                  endTime: data.endTime,
                  startTime: data.startTime,
                  note: data?.note as string | undefined,
                },
              });
              openSnackbar({
                type: "success",
                text: "Tạo lịch làm việc thành công",
              });
            } catch (error) {
              openSnackbar({
                type: "error",
                text: "Lỗi tạo lịch làm việc",
              });
            } finally {
              setLoading(false);
              navigate("/schedule");
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
          <ScheduleCreate
            defaultValues={{ date: new Date().toISOString() }}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleCreatePage;
