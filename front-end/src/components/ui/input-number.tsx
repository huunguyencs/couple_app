import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useEffect, useState } from "react";

const formatNumberInput = (value: number): string => {
  if (!value) return "0";
  return Intl.NumberFormat("vi-VN").format(value);
};

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  decimals?: number;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ value, onChange, className, decimals = 2, ...props }, ref) => {
    const [inputShowing, setInputShowing] = useState(formatNumberInput(value));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      if (rawValue === "") {
        onChange(0);
        return;
      }
      const cleanValue = Number(rawValue.replace(/[^0-9]/g, ""));
      const formattedValue = formatNumberInput(cleanValue);
      setInputShowing(formattedValue);
      onChange(cleanValue);
    };

    useEffect(() => {
      setInputShowing(formatNumberInput(value));
    }, [value]);

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={inputShowing}
        onChange={handleChange}
        className={cn("font-mono", className)}
        {...props}
      />
    );
  }
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
