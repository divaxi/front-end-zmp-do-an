import { useAtomValue } from "jotai";
import HorizontalDivider from "@/components/horizontal-divider";
import { paymentsState } from "@/state";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentList() {
  const payments = useAtomValue(paymentsState);
  return (
    <>
      <div className="flex flex-col p-4 gap-y-8">
        <Card className="flex flex-col bg-skeleton rounded-md w-full border-none justify-between">
          <CardContent className="flex flex-col justify-between w-full p-4 gap-2">
            <div className="flex flex-row justify-between">
              <span>Tổng tiền</span>
              <span className="text-primary">
                {payments
                  .reduce((total, payment) => total + payment.amount, 0)
                  .toLocaleString()}
                ₫
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Số tiền thu</span>
              <span className="text-primary">
                {payments
                  .reduce((total, payment) => total + payment.amount, 0)
                  .toLocaleString()}
                ₫
              </span>
            </div>
          </CardContent>
        </Card>
        {payments?.map((payment) => (
          <div key={payment.id} className="flex flex-col gap-2">
            <h1 className="text-base font-[550]">
              {payment.date} {payment.source}
            </h1>
            <span className="italic text-2xs text-subtitle">
              {payment.description}
            </span>
            <div className="flex flex-row justify-between text-small font-normal text-primary pb-2">
              <span>{payment.status}</span>
              <span>{payment.amount}</span>
            </div>
            <HorizontalDivider />
          </div>
        ))}
      </div>
    </>
  );
}
