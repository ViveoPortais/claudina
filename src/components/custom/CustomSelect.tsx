"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ElementRef, forwardRef } from "react";
import { InputLoading } from "./InputLoading";

interface IOption {
  id: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  options: IOption[];
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  customClass?: string;
  isLoading?: boolean;
  params?: any;
  disabled?: boolean;
}

const CustomSelect = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  CustomSelectProps
>(
  (
    {
      name,
      label,
      options,
      value,
      onChange,
      onBlur,
      customClass,
      isLoading,
      params,
      disabled,
      ...props
    },
    ref
  ) => {
    if (isLoading) return <InputLoading />;

    const handleValueChange = (newValue: string) => {
      if (onChange) {
        onChange({
          target: {
            name,
            value: newValue,
          },
        });
      }
    };

    return (
      <Select
        name={name}
        value={value}
        onValueChange={handleValueChange}
        {...props}
        disabled={disabled}
      >
        <div className="w-full">
          <label className="w-full text-start mb-1 text-sm font-bold uppercase trackin-wide text-main-blue">
            {label}
          </label>
          <SelectTrigger
            ref={ref}
            onBlur={(e) => {
              if (onBlur) {
                onBlur({
                  target: {
                    name,
                    value: e.currentTarget.value,
                  },
                });
              }
            }}
            className={`md:col-span-3 py-6 md:px-4 md:py-8 ${customClass} focus:outline-none focus:ring-transparent`}
          >
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
        </div>

        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem key={option.id} value={option.id} className="py-4">
                {option.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export { CustomSelect };
