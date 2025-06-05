import {
  postCreateCustomerRecord,
  postUpdateCustomerRecord,
} from "@/client/services/customer-record";
import CustomerRecordCreate, {
  CustomerRecordFormValues,
} from "@/components/forms/customer-record-create";
import { customerRecordList } from "@/state";
import { useAtomValue } from "jotai";
import { Page, useParams, useSnackbar } from "zmp-ui";

export default function DetailInfoPage() {
  const { id } = useParams();
  const { openSnackbar } = useSnackbar();
  const customerRecords = useAtomValue(customerRecordList);
  const initialValue = customerRecords.find((cr) => cr.id === id);

  const buildRequestBody = (data: CustomerRecordFormValues) => ({
    fullName: data.fullName,
    DOB: data.DOB,
    sex: data.sex,
    CCCDNumber: data.CCCDNumber || undefined,
    BHYTNumber: data.BHYTNumber || undefined,
  });

  const handleOnSubmit = async (data: CustomerRecordFormValues) => {
    const requestBody = buildRequestBody(data);

    try {
      const response = id
        ? await postUpdateCustomerRecord({ id, requestBody })
        : await postCreateCustomerRecord({ requestBody });

      console.log("Success:", response);

      openSnackbar({
        type: "success",
        text: id ? "Cập nhật thành công" : "Tạo mới thành công",
      });
    } catch {
      openSnackbar({
        type: "error",
        text: "Có lỗi khi cập nhật hồ sơ",
      });
    }
  };

  return (
    <Page>
      <CustomerRecordCreate
        defaultValues={initialValue}
        onSubmit={handleOnSubmit}
      />
    </Page>
  );
}
