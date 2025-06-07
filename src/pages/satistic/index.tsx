import React from "react";
import { StatisticTabs } from "@/components/statistic/statistic-tabs";
import { useSatisticByTime } from "@/client/services/statistic";
import {
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  subYears,
  format,
  parseISO,
} from "date-fns";
import { vi } from "date-fns/locale";

type StatisticTab = "day" | "month" | "year";

interface StatisticData {
  day: { name: string; value: number }[];
  month: { name: string; value: number }[];
  year: { name: string; value: number }[];
}

interface StatisticItem {
  count: number;
  day?: string | number;
  month?: string | number;
  year?: string | number;
}

const useDateRange = (activeTab: StatisticTab) => {
  const now = new Date();

  const dateRanges = {
    day: {
      start: startOfWeek(now, { weekStartsOn: 1, locale: vi }),
      end: endOfWeek(now, { weekStartsOn: 1, locale: vi }),
    },
    month: {
      start: startOfYear(now),
      end: endOfYear(now),
    },
    year: {
      start: startOfYear(subYears(now, 3)),
      end: endOfYear(now),
    },
  };

  return dateRanges[activeTab];
};

const useStatisticData = (activeTab: StatisticTab) => {
  const { start, end } = useDateRange(activeTab);

  const { data: statisticData, isLoading } = useSatisticByTime({
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    enumerateBy: activeTab,
  });

  const formatData = (data: StatisticItem[] | undefined): StatisticData => {
    if (!data) return { day: [], month: [], year: [] };

    const formatDay = (dayValue: string | number | undefined) => {
      if (!dayValue) return "";
      if (typeof dayValue === "number") {
        const date = new Date();
        date.setDate(dayValue);
        return format(date, "EEEE", { locale: vi });
      }
      try {
        return format(parseISO(dayValue), "EEEE", { locale: vi });
      } catch {
        return String(dayValue);
      }
    };

    const formatMonth = (monthValue: string | number | undefined) => {
      if (!monthValue) return "";
      if (typeof monthValue === "number") {
        const date = new Date();
        date.setMonth(monthValue - 1);
        return format(date, "MMMM", { locale: vi });
      }
      try {
        return format(parseISO(monthValue), "MMMM", { locale: vi });
      } catch {
        return String(monthValue);
      }
    };

    const formatYear = (yearValue: string | number | undefined) => {
      if (!yearValue) return "";
      if (typeof yearValue === "number") return String(yearValue);
      try {
        return format(parseISO(yearValue), "yyyy", { locale: vi });
      } catch {
        return String(yearValue);
      }
    };

    return {
      day: data.map((item) => ({
        name: formatDay(item.day),
        value: item.count || 0,
      })),
      month: data.map((item) => ({
        name: formatMonth(item.month),
        value: item.count || 0,
      })),
      year: data.map((item) => ({
        name: formatYear(item.year),
        value: item.count || 0,
      })),
    };
  };

  return {
    data: formatData(statisticData?.data),
    isLoading,
  };
};

const StatisticPage: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState<StatisticTab>("day");
  const { data, isLoading } = useStatisticData(activeTab);

  return (
    <div className="container mx-auto py-6 px-4">
      <StatisticTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        data={data}
      />
    </div>
  );
};

export default StatisticPage;
