import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Page, useParams } from "zmp-ui";
import ProfileInfo from "./profile-info";
import SelectedInfo from "./selected-info";
import clsx from "clsx";
import { useModalLoader } from "@/provider/ModalProvider";
import ConfirmModal from "./confirm-modal";
import { CustomerRecord } from "@/client/api";
import { useAtomValue } from "jotai";
import { scheduleList } from "@/state";
import { serviceList } from "@/state";
import { useNavigate } from "react-router-dom";
export default function BookConfirmPage() {
  const { serviceId, scheduleId } = useParams();

  const selectedService = useAtomValue(serviceList)?.find(
    (s) => s.id === serviceId
  );
  const selectedSchedule = useAtomValue(scheduleList)?.find(
    (s) => s.id === scheduleId
  );

  const [isReady, setReady] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<CustomerRecord | null>(
    null
  );

  const { showModal } = useModalLoader();
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!selectedProfile || !selectedService || !selectedSchedule) {
      return;
    }

    showModal(
      <ConfirmModal
        appointment={{
          customerRecord: { id: selectedProfile.id },
          service: { id: selectedService.id },
          schedule: { id: selectedSchedule.id },
          specificTime: selectedSchedule.startTime,
        }}
        navigate={()=>{
          navigate("/");
        }}
      />
    );
  };

  return (
    <Page>
      <ProfileInfo
        onReadyChange={setReady}
        selectedProfile={selectedProfile}
        onProfileChange={setSelectedProfile}
      />
      <SelectedInfo
        selectedService={selectedService}
        selectedSchedule={selectedSchedule}
      />
      <div className="mt-auto p-4">
        <Button
          className={clsx(
            "w-full bg-primary hover:brightness-75 text-white",
            isReady ? "bg-primary hover:brightness-75" : "bg-inactive"
          )}
          onClick={handleConfirm}
        >
          Xác nhận đặt lịch
        </Button>
      </div>
    </Page>
  );
}
