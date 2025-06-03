import HorizontalDivider from "@/components/horizontal-divider";
import { LoadingSpinner } from "./loading-spinner";
import { NoData } from "./no-data";
import { CustomerRecord } from "@/types";
import { useModalLoader } from "@/provider/ModalProvider";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideTrash2 } from "lucide-react";
import { customerRecordList, loadingState } from "@/state";

type CustomerRecordListProps = {
  customerRecords: CustomerRecord[];
};

export default function CustomerRecordList({
  customerRecords,
}: CustomerRecordListProps) {
  const { showModal } = useModalLoader();

  const setcustomerRecords = useSetAtom(customerRecordList);
  const isLoading = useAtomValue(loadingState);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4 gap-y-8 pb-[120px]">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (!customerRecords || customerRecords.length === 0) && (
          <NoData />
        )}
        {!isLoading &&
          customerRecords?.map((customerRecord) => (
            <div key={customerRecord.id} className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between pb-2">
                <div>
                  <h1 className="text-base font-[550]">
                    {customerRecord.date}
                  </h1>
                  <span className="italic text-2xs text-subtitle">
                    {customerRecord.doctor}
                  </span>
                  <h2 className="text-xs ">
                    Khách hàng: {customerRecord.doctor}
                  </h2>
                </div>
                <div className="flex flex-col self-start items-center">
                  <LucideTrash2
                    className="scale-90 mt-1.5 text-danger"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </form>
  );
}
