import React, { useCallback, useRef } from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { Search } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
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
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchInputController: React.FC<SearchInputProps> = ({
  name,
  label,
  control,
  rules,
  disabled,
  placeholder,
  onSearch,
}) => {
  const timeoutRef = useRef<number>();

  const debouncedSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                  w-full pr-12
                  ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                `}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => debouncedSearch(field.value)}
                disabled={disabled}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchInputController;
