import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  name: string;
  label?: React.ReactNode;
  control: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
  placeholder,
  rows = 4,
}) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className="w-full">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            {...field}
            value={field.value || ""}
            onChange={field.onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full min-h-[5rem] resize-none
              ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
            `}
            rows={rows}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextArea;
