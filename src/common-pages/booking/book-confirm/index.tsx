import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Page } from "zmp-ui";
import ProfileInfo from "./profile-info";
import SelectedInfo from "./selected-info";
import clsx from "clsx";
import { useModalLoader } from "@/provider/ModalProvider";
import ConfirmModal from "./confirm-modal";

export default function BookConfirmPage() {
  const [isReady, setReady] = useState(false);
  const { showModal } = useModalLoader();
  return (
    <Page>
      <ProfileInfo onReadyChange={setReady} />
      <SelectedInfo />
      <div className="mt-auto p-4">
        <Button
          className={clsx(
            "w-full bg-primary hover:brightness-75 text-white",
            isReady ? "bg-primary hover:brightness-75" : "bg-inactive"
          )}
          onClick={() => {
            showModal(<ConfirmModal />);
          }}
        >
          Xác nhận đặt lịch
        </Button>
      </div>
    </Page>
  );
}
