import { Controller, useFormContext, FieldValues } from "react-hook-form";
import Select from "react-tailwindcss-select";
import { get } from "lodash";
import { ReactNode } from "react";
import validationRule from "@/lib/ValidationRule";

type SelectFieldProps = {
    name?: any;
    options?: any;
    validation?: any[];
    validationMessage?: any[];
    shouldUnregister?: boolean;
    defaultValue?: any;
    info?: ReactNode;
    onChange?: (value: any, helpers: any) => void;
    isDisabled?: boolean;
};

const SelectField = <T extends FieldValues>({
    name,
    options,
    validation = [],
    validationMessage = [],
    shouldUnregister = false,
    defaultValue = "",
    info = null,
    onChange,
    ...props
}: SelectFieldProps) => {
    const { control, setValue, trigger, getValues, ...form } = useFormContext<T>();

    return (
        <Controller
            shouldUnregister={shouldUnregister}
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={validationRule({ rule: validation, validationMessage }, getValues, name)}
            render={({ field: { ref, value, ...field }, formState: { errors } }: any) => {
                const isMultiple = Array.isArray(value);

                const formattedValue = isMultiple
                    ? options.filter((o: any) => value.includes(o.value)).sort((a: any, b: any) => value.indexOf(a.value) - value.indexOf(b.value))
                    : options.find((o: any) => o.value.toString() === value?.toString()) ?? null;

                return (
                    <div>
                        <Select
                            ref={ref}
                            {...field}
                            {...props}
                            name={name}
                            options={options}
                            value={formattedValue}
                            onChange={(selected: any) => {
                                if (Array.isArray(selected)) {
                                    const mapped: any = selected.length > 0 ? selected.map((s) => s.value) : null;
                                    setValue(name, mapped, { shouldValidate: true });
                                } else {
                                    setValue(name, selected?.value ?? null, { shouldValidate: true });
                                }
                                trigger(name);
                                onChange?.(selected, { setValue, trigger, ...form });
                            }}
                            classNames={{
                                menu: "border-1 border-gray-300 py-2 absolute bg-white w-full z-50 rounded-md shadow-lg",
                                menuButton: ({ isDisabled }: any) =>
                                    `${get(errors, name) ? "border-red-400 bg-red-100" : ""} flex h-10 px-2 text-md ${isDisabled ? "bg-gray-200" : ""
                                    } text-gray-400 border-gray-200 rounded-md border justify-between shadow-sm transition-all duration-300 focus:outline-none`,
                                listItem: ({ isSelected }: any) =>
                                    `block transition my-1 text-left duration-200 px-2 py-2 cursor-pointer truncate rounded ${isSelected
                                        ? "text-white mx-2 bg-cyan-500"
                                        : "text-gray-500 mx-2 hover:bg-cyan-500 hover:text-white"
                                    }`,
                            }}
                        />
                        {get(errors, name) ? (
                            <p className="text-xs text-red-400 pt-1">
                                {errors?.[name]?.message?.toString()}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400 pt-1">{info}</p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default SelectField;
