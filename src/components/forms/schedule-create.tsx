import React from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DateInputController from "./input-components/DateInputController";
import TextAreaInputController from "./input-components/TextAreaInputController";
import HourPicker from "./input-components/HourPicker";

const scheduleSchema = z
  .object({
    date: z.string({
      required_error: "Vui lòng chọn ngày",
    }),
    startTime: z.string({
      required_error: "Vui lòng chọn thời gian bắt đầu",
    }),
    endTime: z.string({
      required_error: "Vui lòng chọn thời gian kết thúc",
    }),
    note: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end > start;
    },
    {
      message: "Thời gian kết thúc phải sau thời gian bắt đầu",
      path: ["endTime"],
    }
  );

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export type { ScheduleFormValues };

interface ScheduleCreateProps {
  onSubmit: (data: ScheduleFormValues) => void;
  defaultValues?: Partial<ScheduleFormValues>;
}

const ScheduleCreate: React.FC<ScheduleCreateProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: undefined,
      startTime: undefined,
      endTime: undefined,
      note: null,
      ...defaultValues,
    },
  });

  const handleDateChange = (date: string) => {
    const startTime = form.getValues("startTime");
    const endTime = form.getValues("endTime");

    if (startTime) {
      const newStartTime = new Date(startTime);
      const selectedDate = new Date(date);
      newStartTime.setFullYear(selectedDate.getFullYear());
      newStartTime.setMonth(selectedDate.getMonth());
      newStartTime.setDate(selectedDate.getDate());
      form.setValue("startTime", newStartTime.toISOString());
    }

    if (endTime) {
      const newEndTime = new Date(endTime);
      const selectedDate = new Date(date);
      newEndTime.setFullYear(selectedDate.getFullYear());
      newEndTime.setMonth(selectedDate.getMonth());
      newEndTime.setDate(selectedDate.getDate());
      form.setValue("endTime", newEndTime.toISOString());
    }
  };

  const handleTimeChange = (name: "startTime" | "endTime", time: string) => {
    const date = form.getValues("date");
    if (!date) return;

    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    form.setValue(name, newDate.toISOString());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DateInputController
          name="date"
          label="Ngày làm việc"
          control={form.control as unknown as Control<FieldValues>}
          rules={{ required: "Vui lòng chọn ngày" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HourPicker
            name="startTime"
            label="Thời gian bắt đầu"
            control={form.control as unknown as Control<FieldValues>}
            rules={{ required: "Vui lòng chọn thời gian bắt đầu" }}
            disabled={!form.watch("date")}
            onTimeChange={(time) => handleTimeChange("startTime", time)}
            selectedDate={form.watch("date")}
          />
          <HourPicker
            name="endTime"
            label="Thời gian kết thúc"
            control={form.control as unknown as Control<FieldValues>}
            rules={{ required: "Vui lòng chọn thời gian kết thúc" }}
            disabled={!form.watch("date")}
            onTimeChange={(time) => handleTimeChange("endTime", time)}
            selectedDate={form.watch("date")}
          />
        </div>

        <TextAreaInputController
          name="note"
          label="Ghi chú"
          control={form.control as unknown as Control<FieldValues>}
          placeholder="Nhập ghi chú (nếu có)"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto text-white bg-primary font-semibold"
          >
            Lưu thông tin
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleCreate;
