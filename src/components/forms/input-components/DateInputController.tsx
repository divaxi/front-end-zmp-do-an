import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectProps {
  name: string;
  label?: React.ReactNode;
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
}

const DateSelect: React.FC<DateSelectProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const date = field.value ? parseISO(field.value) : null;

        const handleDateSelect = (selectedDate: Date | undefined) => {
          if (selectedDate) {
            field.onChange(selectedDate.toISOString());
          }
        };

        return (
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                      disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                    disabled={disabled}
                  >
                    {field.value ? (
                      format(parseISO(field.value), "PPP")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={handleDateSelect}
                  disabled={disabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateSelect;
