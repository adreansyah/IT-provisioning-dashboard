import { ReactNode, ButtonHTMLAttributes } from "react";

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = "rounded-md font-medium flex items-center justify-center transition focus:outline-none";

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    danger: "bg-red-400 text-white hover:bg-red-500",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    className = "",
    type = "button",
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
