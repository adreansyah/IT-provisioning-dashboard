import { debounce, get } from "lodash";
import {
    Controller,
    useFormContext,
    FieldValues,
    FieldPath,
} from "react-hook-form";
import { useEffect, useRef } from "react";
import validationRule from "@/lib/ValidationRule";

type TransformType = {
    output?: (val: any) => any;
    input?: (val: any) => any;
};

type InputProps<T extends FieldValues> = {
    name: FieldPath<T>;
    defaultValue?: any;
    placeholder?: string;
    className?: string;
    type?: string;
    prefix?: any;
    suffix?: any;
    info?: string;
    validation?: any[];
    validationMessage?: any[];
    transform?: TransformType;
    isDebounce?: boolean;
    onChangeDebounced?: (val: any) => void;
    disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const defaultTransform: TransformType = {
    output: (val) => val,
    input: (val) => val,
};

const Input = <T extends FieldValues>({
    validation = [],
    validationMessage = [],
    prefix = null,
    suffix = null,
    name,
    defaultValue = "",
    placeholder = "",
    className = "",
    type = "text",
    info = "",
    transform = defaultTransform,
    isDebounce = false,
    onChangeDebounced = () => { },
    disabled = false,
    ...props
}: InputProps<T>) => {
    const { control, getValues } = useFormContext<T>();
    const transformer = { ...defaultTransform, ...transform };
    const debouncedOnChange = useRef(debounce(onChangeDebounced, 500)).current;

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            defaultValue={defaultValue}        
            rules={validationRule(
                { rule: validation, validationMessage },
                getValues,
                name
            )}
            render={({
                field: { ref, onChange, value, ...fieldInput },
                formState: { errors },
            }) => {
                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = transformer.output?.(e);
                    onChange(newValue); // Update RHF state

                    if (isDebounce) {
                        debouncedOnChange(newValue); // Debounced call
                    } else {
                        onChangeDebounced(newValue);
                    }
                };

                return (
                    <div className="flex flex-col">
                        <div
                            className={`${get(errors, name) ? "border border-red-400 bg-red-100" : ""
                                } flex ${disabled ? "bg-[#e5e7eb]" : ""} items-center border border-gray-300 h-10 rounded-md shadow-sm justify-between`}
                        >
                            {prefix}
                            <input
                                {...fieldInput}
                                ref={ref}
                                type={type}
                                disabled={disabled}
                                onChange={handleChange}
                                value={transformer.input?.(value)}
                                placeholder={placeholder}
                                className={`focus:outline-0 flex-1 ${className} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""
                                    }`}
                                {...props}
                            />
                            <div className="cursor-pointer">{suffix}</div>
                        </div>
                        <div>
                            {get(errors, name) ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[name]?.message?.toString()}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-400 pt-1">{info}</p>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default Input;
