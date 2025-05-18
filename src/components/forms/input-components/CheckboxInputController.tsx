import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxProps {
  name: string;
  label?: string;
  control: Control<FieldValues | any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  onClick?: (e: { target: { checked: boolean } }) => void;
}

const CheckBoxField: React.FC<CheckboxProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
  onClick,
}) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value ?? false}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              if (onClick) onClick({ target: { checked: checked as boolean } });
            }}
            disabled={disabled}
          />
        </FormControl>
        {label && (
          <div className="space-y-1 leading-none">
            <Label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
          </div>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CheckBoxField;
