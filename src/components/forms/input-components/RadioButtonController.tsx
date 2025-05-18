import React from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioButtonGroupProps {
  name: string;
  label?: React.ReactNode;
  control?: Control<FieldValues>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  disabled?: boolean;
  options: { value: string | number; displayName: string }[];
  onClick?: React.MouseEventHandler<HTMLLabelElement> | undefined;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  label,
  control,
  options,
  rules,
  onClick,
  disabled,
}) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className="w-full">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-row gap-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`${name}-${option.value}`}
                  disabled={disabled}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  onClick={onClick}
                  className="cursor-pointer"
                >
                  {option.displayName}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default RadioButtonGroup;
