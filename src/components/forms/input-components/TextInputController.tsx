import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextFieldProps<T extends FieldValues> {
  name: string;
  label?: React.ReactNode;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
}

const TextFieldController = <T extends FieldValues>({
  name,
  label,
  control,
  rules,
  disabled,
  prefix,
  suffix,
  placeholder,
}: TextFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className="w-full">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div className="relative">
            {prefix && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {prefix}
              </div>
            )}
            <Input
              {...field}
              value={field.value || ""}
              onChange={field.onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={`
                w-full px-3 py-2
                ${prefix ? "pl-10" : ""}
                ${suffix ? "pr-10" : ""}
                ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              `}
            />
            {suffix && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {suffix}
              </div>
            )}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextFieldController;
