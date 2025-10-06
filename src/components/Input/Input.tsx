import React, { type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string; 
  inputClassName?: string; 
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  wrapperClassName = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={` w-full  rounded-md ${wrapperClassName}`}>
      {label && (
        <label className="block mb-1 font-medium">
          {label}
        </label>
      )}

      <div
        className={`
          relative
          flex
          items-center
          border
          rounded-md
          px-3
          py-2
          w-full
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        {leftIcon && <div className="mr-2 text-gray-400">{leftIcon}</div>}

        <input
          {...props}
          className={`
            flex-1
            w-full
            outline-none
            text-sm
            text-[var(--card-text)]
            focus:bg-transparent
            placeholder:[var(--card-text)]
            ${leftIcon ? "pl-1" : ""}
            ${rightIcon ? "pr-1" : ""}
            ${inputClassName}
          `}
        />

        {rightIcon && <div className="ml-2 text-gray-400">{rightIcon}</div>}
      </div>

      {error && <p className="text-[var(--card-text)] text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
