import React, { useEffect } from "react";
import { Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import {
  // deleteCustomerRecord,
  useCustomerRecord,
} from "@/client/services/customer-record";
import { useAtom, useAtomValue } from "jotai";
import { authState, customerRecordList } from "@/state";
import { format } from "date-fns";
import { NoData } from "@/components/no-data";
// import { TrashIcon } from "lucide-react";
interface EmptyHealthRecordProps {
  onAddRecord?: () => void;
}

export default function EmptyHealthRecord({
  onAddRecord,
}: EmptyHealthRecordProps) {
  const auth = useAtomValue(authState)?.auth;
  const [customerRecords, setCustomerRecords] = useAtom(customerRecordList);
  const { data } = useCustomerRecord({
    userId: auth?.user.id as number,
  });

  const navigate = useNavigate();

  const handleAddRecord = () => {
    if (onAddRecord) {
      onAddRecord();
    } else {
      navigate("/profile/personal-info/detail");
    }
  };

  const handleUpdateRecord = (id: string) => {
    navigate(`/profile/personal-info/detail/${id}`);
  };

  useEffect(() => {
    if (!data) return;
    setCustomerRecords(data);
  }, [data, setCustomerRecords]);

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="mb-6 mt-4  flex flex-col">
        {customerRecords?.length === 0 && <NoData />}
        {customerRecords && customerRecords?.length > 0 && (
          <div>
            {customerRecords.map((item) => (
              <div
                className="flex flex-col items-start justify-start gap-4 mb-4 p-3 border border-borderr border-solid shadow-md rounded-md "
                key={item.id}
                onClick={() => handleUpdateRecord(item.id)}
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-center text-primary text-xl font-semibold">
                    {item.fullName}
                  </h1>
                  {/* <Button */}
                  {/*   variant="tertiary" */}
                  {/*   size="medium" */}
                  {/*   className="text-danger" */}
                  {/*   onClick={() => { */}
                  {/*     try{ */}
                  {/**/}
                  {/*     }catch{ */}
                  {/**/}
                  {/*     } */}
                  {/*   }} */}
                  {/* > */}
                  {/*   <TrashIcon></TrashIcon> */}
                  {/* </Button> */}
                </div>
                <p className="text-center text-subtitle text-sm">
                  Ngày sinh: {format(new Date(item.DOB), "dd/MM/yyyy")}
                </p>
              </div>
            ))}
          </div>
        )}
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
