import CustomerRecordCreate from "@/components/forms/customer-record-create";
import { Page } from "zmp-ui";

export default function DetailInfoPage() {
  return (
    <Page>
      <CustomerRecordCreate onSubmit={(data) => console.log(data)} />
    </Page>
  );
}
