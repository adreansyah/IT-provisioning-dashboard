'use client';

import { Controller, useFormContext, FieldValues, Path, FieldError } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, { DatePickerProps as ReactDatePickerPropsBase } from "react-datepicker";
import { Calendar } from 'lucide-react';
import validationRule from '@/lib/ValidationRule';

// Utility function to get nested object values safely
const get = <T,>(obj: any, path: string | string[], def?: T): T | undefined => {
  const pathString = typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.');

  return pathString
    .split('.')
    .filter(Boolean)
    .every(step => ((obj = obj[step]) !== undefined)) ? obj : def;
};

interface DatePickerProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ReactDatePickerPropsBase, 'selected' | 'onChange' | 'name'> {
  validation?: string[];
  validationMessage?: string[];
  name: Path<TFieldValues>;
  defaultValue?: any;
  onChange?: (date: Date | null) => void;
}

const DatePicker = <TFieldValues extends FieldValues = FieldValues>({
  validation = [],
  validationMessage = [],
  name,
  defaultValue = null,
  onChange,
  ...props
}: DatePickerProps<TFieldValues>) => {
  const { control, setValue, trigger, watch, getValues } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={validationRule({ rule: validation, validationMessage }, getValues, name)}
      render={({ field: { ref, ...fieldInput }, formState: { errors } }) => {
        const fieldError = get<FieldError>(errors, name);
        const watchedValue = watch(name) as Date | null;
        return (
          <div className="w-full flex flex-col gap-1">
            <ReactDatePicker
              // {...restProps}
              ref={ref}
              className={`border border-gray-300 flex text-base text-gray-500 focus:outline-none w-full h-10 !px-8 rounded-md ${fieldError && "border-red-400 bg-red-100"
                }`}
              selected={watchedValue}
              {...fieldInput}
              onChange={(date: Date | null) => {
                setValue(name, date as any);
                trigger(name);
                // onChange?.(date);
              }}
              placeholderText='Select Date'
              autoComplete="off"
              showIcon={true}
              icon={
                <Calendar className="!h-6 cursor-pointer w-auto px-2 text-gray-400" />
              }
              toggleCalendarOnIconClick
            />
            {fieldError && (
              <div style={{ display: 'block' }} className="text-red-500 text-sm">
                {fieldError.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default DatePicker;