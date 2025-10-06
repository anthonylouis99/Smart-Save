import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "neutral";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const variantClasses = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-colors duration-300",
  secondary:
    "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--secondary-foreground)] hover:opacity-90 transition-colors duration-300",
  danger:
    " text-[var(--danger-foreground)] border-[var(--danger-foreground)] hover:border-red-700 transition-colors duration-300",
  neutral:
    "border bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300",
};

const Button: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  variant = "primary",
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded focus:outline-none",
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
