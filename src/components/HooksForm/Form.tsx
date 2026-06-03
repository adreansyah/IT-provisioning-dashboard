'use client';

import { FormProvider, useForm, UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";
import { ReactNode, FormHTMLAttributes } from "react";

// Utility type for deep formatting values
type FormatValue<T> = T extends string
    ? string
    : T extends Array<infer U>
    ? FormatValue<U>[]
    : T extends Record<string, any>
    ? { [K in keyof T]: FormatValue<T[K]> }
    : T;

// Generic form data type
interface FormProps<TFieldValues extends FieldValues = FieldValues>
    extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    onError?: (errors: any) => void | null;
    onSubmit?: (data: FormatValue<TFieldValues>, form: UseFormReturn<TFieldValues>) => void | Promise<void>;
    children: ReactNode;
    defaultValues?: DefaultValues<TFieldValues>;
    form?: UseFormReturn<TFieldValues> | null;
}

const formatValue = <T,>(value: T): FormatValue<T> => {
    if (typeof value === 'object' && value !== null) {
        const formattedValue: any = Array.isArray(value) ? [...value] : { ...value };
        for (const key in formattedValue) {
            formattedValue[key] = formatValue(formattedValue[key]);
        }
        return formattedValue as FormatValue<T>;
    }
    if (typeof value === 'string') return value.trim() as FormatValue<T>;
    return value as FormatValue<T>;
};

const Form = <TFieldValues extends FieldValues = FieldValues>({
    onError = () => null,
    onSubmit,
    children,
    defaultValues = {} as DefaultValues<TFieldValues>,
    form: formProps = null,
    ...props
}: FormProps<TFieldValues>) => {
    const defaultForm = useForm<TFieldValues>({ defaultValues });
    const form = formProps || defaultForm;

    const handleSubmit = (data: TFieldValues) => {
        const formattedData = {} as Record<string, any>;
        Object.keys(data).forEach((key) => {
            formattedData[key] = formatValue(data[key]);
        });

        if (onSubmit) {
            return onSubmit(formattedData as FormatValue<TFieldValues>, form);
        }
    };

    return (
        <FormProvider {...form}>
            <form
                {...props}
                onSubmit={form.handleSubmit(handleSubmit, onError)}
                autoComplete="off"
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;