import React, { ReactNode } from "react";
interface CustomBackgroundProps {
    children: ReactNode;
}

const AuthBackground: React.FC<CustomBackgroundProps> = ({ children }) => {
    return (
        <div
            className="fixed inset-0 bg-background-light"
            style={{
                opacity: 0.8,
                backgroundImage:
                    "linear-gradient(#ffa25780 1px, transparent 1px), linear-gradient(to right, #ffa25780 1px, #edefef 1px)",
                backgroundSize: "50px 50px",
            }}
        >
            <div className="h-full overflow-y-auto">{children}</div>
        </div>
    );
};

export default AuthBackground;
