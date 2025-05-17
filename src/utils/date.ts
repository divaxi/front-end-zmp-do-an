import { format } from "date-fns";

export const getTodayAtMidnightString = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return format(now, "yyyy-MM-dd'T'00:00:00");
};

export const formatMinutesToHourString = (totalMinutes: number): string => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
};
