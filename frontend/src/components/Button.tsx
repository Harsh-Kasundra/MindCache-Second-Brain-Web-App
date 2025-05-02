export interface ButtonProps {
    text: string;
    icon?: string;
    color: string;
    disabled?: boolean;
    onClick?: () => void;
}

const bgColors: Record<string, string> = {
    primary: "bg-primary-600",
    secondary: "bg-secondary-800",
};

import React from "react";

const Button: React.FC<ButtonProps & { loading?: boolean }> = ({
    text,
    onClick,
    color,
    loading = false,
}) => {
    return (
        <div
            className={`h-[46px] flex justify-center items-center p-[10px] gap-2 rounded-[5px] text-white self-stretch hover:cursor-pointer 
                ${bgColors[color]} 
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={!loading ? onClick : undefined}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    <span className="text-lg font-semibold">
                        Registering...
                    </span>
                </div>
            ) : (
                <span className="text-lg font-semibold">{text}</span>
            )}
        </div>
    );
};

export default Button;
