import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { format, parseISO } from "date-fns";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HourPickerProps {
  name: string;
  label?: React.ReactNode;
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  onTimeChange?: (time: string) => void;
  selectedDate?: string;
}

const HourPicker: React.FC<HourPickerProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
  onTimeChange,
  selectedDate,
}) => {
  // Tạo mảng các block thời gian 30 phút
  const timeBlocks = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute}`,
      label: `${hour.toString().padStart(2, "0")}:${minute}`,
    };
  });

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const time = field.value ? format(parseISO(field.value), "HH:mm") : "";

        const handleTimeChange = (value: string) => {
          const [hours, minutes] = value.split(":").map(Number);
          const newDate = selectedDate ? new Date(selectedDate) : new Date();
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          field.onChange(newDate.toISOString());
          onTimeChange?.(value);
        };

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              value={time}
              onValueChange={handleTimeChange}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                {timeBlocks.map((block) => (
                  <SelectItem key={block.value} value={block.value}>
                    {block.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default HourPicker;
