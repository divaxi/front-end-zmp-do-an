import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { servicesState } from "@/state";
import AppTabs, { TabsItemsProp } from "../custom-tabs";
import NewsList from "./news-list";

export default function NewsTabs() {
  const serviceCategory = useAtomValue(servicesState);
  const tabItems: TabsItemsProp = useMemo(() => {
    if (!serviceCategory) return [];
    return serviceCategory.map((tab, idx) => ({
      label: tab.label,
      content: <NewsList tabIndex={idx.toString()} />,
    }));
  }, [serviceCategory]);
  return (
    <>
      <div className="flex flex-col p-4 gap-y-8">
        <AppTabs id="news-tabs" ariaLabel="custome-news-tabs" tabs={tabItems} />
      </div>
    </>
  );
}
