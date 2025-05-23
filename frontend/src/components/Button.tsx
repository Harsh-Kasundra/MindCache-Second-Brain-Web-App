export interface ButtonProps {
  text: string;
  icon?: ReactNode;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

const bgColors: Record<string, string> = {
  primary: "bg-primary-600",
  secondary: "bg-secondary-800",
};

import React, { ReactNode } from "react";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color,
  disabled,
  icon,
}) => {
  return (
    <div
      className={`flex h-[46px] items-center justify-center gap-2 self-stretch rounded-[5px] p-[10px] text-white hover:cursor-pointer ${bgColors[color]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={disabled ? undefined : onClick}
    >
      {disabled ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <span className="text-md flex items-center gap-1 font-semibold sm:text-lg">
          {icon && <span>{icon}</span>}
          {text}
        </span>
      )}
    </div>
  );
};

export default Button;
