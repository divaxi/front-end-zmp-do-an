import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomerRecordCreate from "@/components/forms/customer-record-create";
import type { CustomerRecordFormValues } from "@/components/forms/customer-record-create";
import { useModalLoader } from "@/provider/ModalProvider";
import CustomerRecordCreateModal from "@/components/modal/customer-record-create";
import { useSnackbar } from "zmp-ui";
import { useSetAtom } from "jotai";
import { loadingState } from "@/state";

const CustomerRecordUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showModal } = useModalLoader();
  const { openSnackbar } = useSnackbar();
  const setLoading = useSetAtom(loadingState);
  const [initialData, setInitialData] =
    useState<CustomerRecordFormValues | null>(null);

  useEffect(() => {
    const fetchCustomerRecord = async () => {
      try {
        setLoading(true);
        // ⏳ Mô phỏng độ trễ 1.2 giây
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const response = await fetch(`/api/customer-record/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer record");
        }

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching customer record:", error);
        openSnackbar({
          type: "error",
          text: "Không thể tải thông tin bệnh nhân",
          duration: 2000,
        });
        navigate("/customer-record");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerRecord();
    }
  }, [id, navigate, openSnackbar, setLoading]);

  const handleSubmit = async (data: CustomerRecordFormValues) => {
    try {
      showModal(
        <CustomerRecordCreateModal
          execute={async () => {
            try {
              setLoading(true);
              // ⏳ Mô phỏng độ trễ 1.2 giây
              await new Promise((resolve) => setTimeout(resolve, 1200));

              const response = await fetch(`/api/customer-record/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                throw new Error("Failed to update customer record");
              }

              const result = await response.json();
              console.log("API response:", result);

              openSnackbar({
                type: "success",
                text: "Cập nhật hồ sơ thành công",
                duration: 2000,
              });
              navigate("/customer-record");
            } catch (err) {
              openSnackbar({
                type: "error",
                text: "Có lỗi khi cập nhật hồ sơ",
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
      console.error("Error updating customer record:", error);
    }
  };

  if (!initialData) {
    return (
      <div className="container mx-auto py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6">
          <CustomerRecordCreate
            onSubmit={handleSubmit}
            // defaultValues={initialData}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerRecordUpdatePage;
