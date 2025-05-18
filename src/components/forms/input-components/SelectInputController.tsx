import React from "react";
import {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
} from "react-hook-form";

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

interface SelectFieldProps {
  name: string;
  label?: string | React.ReactNode;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  loading?: boolean;
  options: { value: string | number; displayName: string }[];
  setSubLocation?: (value: {
    value: string | number;
    displayName: string;
  }) => void;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  control,
  setValue,
  options,
  rules,
  disabled,
  loading,
  setSubLocation,
  placeholder = "Chọn một lựa chọn",
}) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className="w-full">
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          disabled={disabled || loading}
          onValueChange={(value) => {
            const selectedOption = options.find((opt) => opt.value === value);
            if (selectedOption) {
              setValue(name, selectedOption);
              if (setSubLocation) {
                setSubLocation(selectedOption);
              }
            }
          }}
          value={field.value?.value?.toString()}
        >
          <FormControl>
            <SelectTrigger
              className={`
                w-full
                ${disabled || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              `}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value.toString()}
                value={option.value.toString()}
              >
                {option.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default SelectField;
