import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnChart } from "@/components/chart/column-chart";
import { StatisticDetails } from "@/components/statistic/statistic-details";

interface StatisticTabsProps {
  activeTab: "day" | "month" | "year";
  onTabChange: (tab: "day" | "month" | "year") => void;
  data: {
    day: { name: string; value: number }[];
    month: { name: string; value: number }[];
    year: { name: string; value: number }[];
  };
}

export function StatisticTabs({
  activeTab,
  onTabChange,
  data,
}: StatisticTabsProps) {
  const tabConfig = {
    day: { label: "Theo tuần", data: data.day },
    month: { label: "Theo tháng", data: data.month },
    year: { label: "Theo năm", data: data.year },
  } as const;

  const getTabIndex = (value: "day" | "month" | "year") => {
    return Object.keys(tabConfig).indexOf(value);
  };

  return (
    <Tabs
      value={activeTab}
      className="w-full"
      onValueChange={(value) => onTabChange(value as "day" | "month" | "year")}
    >
      <TabsList className="grid w-full grid-cols-3 relative">
        {Object.entries(tabConfig).map(([value, { label }]) => (
          <TabsTrigger
            key={value}
            value={value}
            className="text-base font-medium data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          >
            {label}
          </TabsTrigger>
        ))}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: "33.333%",
            transform: `translateX(${getTabIndex(activeTab) * 100}%)`,
          }}
        />
      </TabsList>
      {Object.entries(tabConfig).map(([value, { label, data }]) => (
        <TabsContent key={value} value={value}>
          <div className="mt-4">
            <ColumnChart data={data} />
            <StatisticDetails
              data={data}
              type={value as "day" | "month" | "year"}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
