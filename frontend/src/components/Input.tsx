import { RefObject } from "react";

export interface InputProps {
  placeholder: string;
  label: string;
  supportingText: string;
  icon?: React.ReactNode;
  reference: RefObject<HTMLInputElement | null>;
  type: string;
  required: boolean;
  validate: () => string | null;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  supportingText,
  icon,
  reference,
  type,
  required,
  validate,
}) => {
  const errorMessage = validate();

  return (
    <div className="flex flex-col items-start gap-[5px] self-stretch py-[5px]">
      <label
        className="text-primary-600 flex items-center justify-center gap-[10px] px-[10px] text-[19px] font-normal"
        htmlFor="input"
      >
        {label}
      </label>

      <div
        className={`flex h-[46px] items-center gap-3 self-stretch rounded-[5px] border ${errorMessage ? "border-red-500" : "border-secondary-800"} focus-within:border-primary-600 transition-all duration-300 ease-in-out`}
      >
        <div className="relative left-2">{icon}</div>

        <input
          id="input"
          type={type}
          placeholder={placeholder}
          required={required}
          className="text-text-light-950 dark:text-text-dark-100 placeholder:text-text-light-950 dark:placeholder:text-text-dark-200 p-[8px 20px 8px 16px] h-[46px] w-full bg-transparent focus:outline-none"
          ref={reference}
        />
      </div>
      {errorMessage && (
        <div className="text-xs font-medium text-red-500">{errorMessage}</div>
      )}
      <div className="text-text-light-950 dark:text-text-dark-100 flex items-center gap-2 self-stretch text-xs font-medium">
        {supportingText}
      </div>
    </div>
  );
};

export default Input;
