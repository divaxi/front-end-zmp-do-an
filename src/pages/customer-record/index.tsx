import React, { useEffect } from "react";
import CustomerRecordList from "@/components/customer-record-list";
import { useAtom, useSetAtom } from "jotai";
import { customerRecordList, loadingState } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerRecordPage: React.FC = () => {
  const [customerRecords, setCustomerRecord] = useAtom(customerRecordList);
  // const fetchedData = useAtomValue(customerRecordsState);
  const navigate = useNavigate();
  const setLoading = useSetAtom(loadingState);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [customerRecords, setCustomerRecord, setLoading]);

  return (
    <div className="relative">
      <CustomerRecordList customerRecords={customerRecords} />
      <div className="fixed bottom-24 right-3 flex flex-col items-center gap-2 z-10">
        <h1 className="text-primary font-semibold text-sm">Thêm hồ sơ</h1>
        <PlusCircleIcon
          className="w-12 h-12 bg-primary rounded-full text-white shadow-lg cursor-pointer"
          onClick={() => navigate("/customer-record/create")}
        />
      </div>
    </div>
  );
};

export default CustomerRecordPage;
