import React from "react";
import { useNavigate } from "react-router-dom";

import CustomerRecordCreate from "@/components/forms/customer-record-create";
import type { CustomerRecordFormValues } from "@/components/forms/customer-record-create";
import { useModalLoader } from "@/provider/ModalProvider";
import CustomerRecordCreateModal from "@/components/modal/customer-record-create";
import { useSnackbar } from "zmp-ui";
import { useSetAtom } from "jotai";
import { loadingState } from "@/state";

const CustomerRecordCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { showModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  const setLoading = useSetAtom(loadingState);

  const handleSubmit = async (data: CustomerRecordFormValues) => {
    try {
      console.log("Form data:", data);
      showModal(
        <CustomerRecordCreateModal
          execute={async () => {
            try {
              setLoading(true);
              // ⏳ Mô phỏng độ trễ 1.2 giây
              await new Promise((resolve) => setTimeout(resolve, 1200));

              const response = await fetch("/api/customer-record", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                throw new Error("Failed to create customer record");
              }

              const result = await response.json();
              console.log("API response:", result);

              openSnackbar({
                type: "success",
                text: "Tạo hồ sơ thành công",
                duration: 2000,
              });
              navigate("/customer-record");
            } catch (err) {
              openSnackbar({
                type: "error",
                text: "Có lỗi khi tạo hồ sơ",
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
      console.error("Error creating customer record:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg  p-6">
          <CustomerRecordCreate onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CustomerRecordCreatePage;
