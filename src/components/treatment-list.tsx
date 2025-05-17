import { useAtomValue } from "jotai";
import { treatmentsState } from "@/state";
import HorizontalDivider from "@/components/horizontal-divider";

export default function TreatmentList() {
  const { data: treatments, isLoading } = useAtomValue(treatmentsState)();
  return (
    <>
      <div className="flex flex-col p-4 gap-y-8">
        {" "}
        {!isLoading &&
          treatments?.map((treatment) => (
            <div key={treatment.id} className="flex flex-col gap-2">
              <h1 className="text-base font-[550]">{treatment.name}</h1>
              <span className="italic text-2xs text-subtitle">15/4/2025</span>
              <div className="flex flex-row justify-between text-small font-normal text-primary pb-2">
                <span>Tổng tiền: 100000000000</span>
                <span>Đã thu</span>
              </div>
              <HorizontalDivider />
            </div>
          ))}
      </div>
    </>
  );
}
