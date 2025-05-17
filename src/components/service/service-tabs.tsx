// import { useMemo } from "react";
// import { useAtomValue } from "jotai";
// import { servicesState } from "@/state";
// import AppTabs, { TabsItemsProp } from "../custom-tabs";
import ServiceList from "./service-list";

export default function ServiceTabs() {
  // const serviceCategory = useAtomValue(servicesState);
  // const tabItems: TabsItemsProp = useMemo(() => {
  //   if (!serviceCategory) return [];
  //   return serviceCategory.map((tab, idx) => ({
  //     label: tab.label,
  //     content: <ServiceList tabIndex={idx.toString()} />,
  //   }));
  // }, [serviceCategory]);
  return (
    <>
      <div className="flex flex-col p-4 gap-y-8">
        <ServiceList />
      </div>
    </>
  );
}
