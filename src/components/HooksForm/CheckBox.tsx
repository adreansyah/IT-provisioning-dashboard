import { get } from "lodash";
import {
    Controller,
    useFormContext,
    FieldValues,
    FieldPath,
} from "react-hook-form";
import { Check } from "lucide-react";
import validationRule from "@/lib/ValidationRule";

type CheckboxProps<T extends FieldValues> = {
    name: FieldPath<T>;
    label?: string;
    description?: string;
    defaultValue?: any;
    className?: string;
    labelClassName?: string;
    checkboxClassName?: string;
    info?: string;
    validation?: any[];
    validationMessage?: any[];
    disabled?: boolean;
    variant?: 'default' | 'card' | 'switch';
    size?: 'sm' | 'md' | 'lg';
    onChange?: (checked: boolean) => void;
    // Array checkbox props
    value?: any; // The value to add/remove from array
    isArrayField?: boolean; // Whether this checkbox manages an array field
} ;

const Checkbox = <T extends FieldValues>({
    name,
    label,
    description,
    defaultValue = false,
    className = "",
    labelClassName = "",
    checkboxClassName = "",
    info = "",
    validation = [],
    validationMessage = [],
    disabled = false,
    variant = 'default',
    size,
    onChange = () => { },
    value, // For array checkboxes
    isArrayField = false,
    ...props
}: CheckboxProps<T>) => {
    const { control, getValues } = useFormContext<T>();

    // Size variants
    const sizeClasses = {
        sm: {
            checkbox: 'w-4 h-4',
            label: 'text-sm',
            description: 'text-xs',
            icon: 12
        },
        md: {
            checkbox: 'w-5 h-5',
            label: 'text-sm',
            description: 'text-sm',
            icon: 14
        },
        lg: {
            checkbox: 'w-6 h-6',
            label: 'text-base',
            description: 'text-sm',
            icon: 16
        }
    };

    const currentSize = size ? sizeClasses[size] : sizeClasses['md'];

    // Variant styles
    const getVariantClasses = (checked: boolean, hasError: boolean) => {
        const baseClasses = `
            ${currentSize.checkbox} 
            ${checkboxClassName}
            transition-all duration-200 
            flex items-center justify-center
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `;

        switch (variant) {
            case 'card':
                return `
                    ${baseClasses}
                    rounded-lg border-2
                    ${hasError
                        ? 'border-red-400 bg-red-50'
                        : checked
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    }
                `;
            case 'switch':
                return `
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200
                    ${hasError
                        ? 'bg-red-400'
                        : checked
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                    }
                `;
            default:
                return `
                    ${baseClasses}
                    rounded border-2
                    ${hasError
                        ? 'border-red-400 bg-red-50'
                        : checked
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'border-gray-300 bg-white hover:border-blue-400'
                    }
                `;
        }
    };

    const getContainerClasses = () => {
        switch (variant) {
            case 'card':
                return `
                    group relative p-4 rounded-xl border border-gray-200 
                    hover:border-blue-300 hover:bg-blue-50/30 
                    transition-all duration-200 cursor-pointer
                    ${disabled ? 'opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-transparent' : ''}
                `;
            default:
                return `
                    flex items-start space-x-3 cursor-pointer
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `;
        }
    };

    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            defaultValue={isArrayField ? [] : defaultValue}
            rules={validationRule(
                { rule: validation, validationMessage },
                getValues,
                name
            )}
            render={({
                field: { onChange: fieldOnChange, value: fieldValue, ...fieldInput },
                formState: { errors },
            }) => {
                const hasError = !!get(errors, name);

                // For array fields, check if the value exists in the array
                // For boolean fields, use the field value directly
                const isChecked = isArrayField
                    ? Array.isArray(fieldValue) && fieldValue.includes(value)
                    : Boolean(fieldValue);

                const handleChange :any = () => {
                    if (disabled) return;

                    let newValue: any;

                    if (isArrayField && value !== undefined) {
                        // Handle array checkbox logic
                        const currentArray = Array.isArray(fieldValue) ? fieldValue : [];

                        if (isChecked) {
                            // Remove value from array
                            newValue = currentArray.filter((item: any) => item !== value);
                        } else {
                            // Add value to array
                            newValue = [...currentArray, value];
                        }
                    } else {
                        // Handle boolean checkbox logic
                        newValue = !isChecked;
                    }

                    fieldOnChange(newValue);
                    onChange(isArrayField ? !isChecked : newValue);
                };

                const handleKeyDown:any = (e: React.KeyboardEvent) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleChange();
                    }
                };

                if (variant === 'switch') {
                    return (
                        <div className={`flex flex-col ${className}`}>
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    {label && (
                                        <label className={`${currentSize.label} font-medium text-gray-900 ${labelClassName}`}>
                                            {label}
                                        </label>
                                    )}
                                    {description && (
                                        <p className={`${currentSize.description} text-gray-500 mt-1`}>
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isChecked}
                                    onClick={handleChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={disabled}
                                    className={getVariantClasses(isChecked, hasError)}
                                    {...props}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                                            ${isChecked ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>
                            {hasError ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[name]?.message?.toString()}
                                </p>
                            ) : info ? (
                                <p className="text-xs text-gray-400 pt-1">{info}</p>
                            ) : null}
                        </div>
                    );
                }

                if (variant === 'card') {
                    return (
                        <div className={`flex flex-col ${className}`}>
                            <label className={getContainerClasses()}>
                                <input
                                    {...fieldInput}
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    className="sr-only"
                                    {...props}
                                />
                                <div className="flex items-start space-x-4 w-full">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className={getVariantClasses(isChecked, hasError)}>
                                            {isChecked && <Check size={currentSize.icon} strokeWidth={2.5} />}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {label && (
                                            <div className={`${currentSize.label} font-medium text-gray-900 ${labelClassName}`}>
                                                {label}
                                            </div>
                                        )}
                                        {description && (
                                            <div className={`${currentSize.description} text-gray-500 mt-1`}>
                                                {description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>
                            {hasError ? (
                                <p className="text-xs text-red-400 pt-1">
                                    {errors?.[name]?.message?.toString()}
                                </p>
                            ) : info ? (
                                <p className="text-xs text-gray-400 pt-1">{info}</p>
                            ) : null}
                        </div>
                    );
                }

                // Default variant
                return (
                    <div className={`flex flex-col ${className}`}>
                        <label className={getContainerClasses()}>
                            <input
                                {...fieldInput}
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                                disabled={disabled}
                                className="sr-only"
                                {...props}
                            />
                            <div className="relative flex-shrink-0">
                                <div className={getVariantClasses(isChecked, hasError)}>
                                    {isChecked && <Check size={currentSize.icon} strokeWidth={2.5} />}
                                </div>
                            </div>
                            {(label || description) && (
                                <div className="flex-1">
                                    {label && (
                                        <div className={`${currentSize.label} font-medium text-gray-900 ${labelClassName}`}>
                                            {label}
                                        </div>
                                    )}
                                    {description && (
                                        <div className={`${currentSize.description} text-gray-500 mt-1`}>
                                            {description}
                                        </div>
                                    )}
                                </div>
                            )}
                        </label>
                        {hasError ? (
                            <p className="text-xs text-red-400 pt-1">
                                {errors?.[name]?.message?.toString()}
                            </p>
                        ) : info ? (
                            <p className="text-xs text-gray-400 pt-1">{info}</p>
                        ) : null}
                    </div>
                );
            }}
        />
    );
};

export default Checkbox;