import React, { ReactNode } from "react";

export interface ButtonProps {
  text: string;
  icon?: ReactNode;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const bgColors: Record<string, string> = {
  primary: "bg-primary-600",
  secondary: "bg-secondary-800",
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color,
  disabled,
  icon,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`flex h-[46px] items-center justify-center gap-2 self-stretch rounded-[5px] p-[10px] text-white ${bgColors[color]} ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"
      }`}
    >
      {disabled ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <span className="text-md flex items-center gap-2 font-semibold sm:text-lg">
          {icon && <span>{icon}</span>}
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;
