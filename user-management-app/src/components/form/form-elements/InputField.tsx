import React from "react";


interface InputFieldProps {
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  type: "text" | "email" | "number" | "password" | "tel";
  className?: string;
  value?: string | number;
  error?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number,
  width?: string,
  inputMode?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      className,
      icon,
      error,
      name,
      value,
      width = "w-full",
      onChange,
      maxLength,
      inputMode,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">

        {label && (
          <label
            className={`text-sm font-medium mb-1 leading-5 ${error ? "text-red-600" : "text-gray-700"
              }`}
          >
            {label} *
          </label>
        )}

        <div
          className={`flex flex-1 gap-2 items-center px-3 py-2 bg-gray-50 border ${error ? "border-red-600" : "border-gray-300"
            } ${className} mt-1 focus-within:border-blue-500 ${width}`}
        >
          {icon && <img src={`${icon}`} width={24} height={24} alt={name} />}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={`bg-transparent outline-none w-full text-sm  focus:border-blue-500`}
            {...rest}
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default InputField;
