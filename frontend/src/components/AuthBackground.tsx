import React, { ReactNode } from "react";
interface CustomBackgroundProps {
  children: ReactNode;
}

const AuthBackground: React.FC<CustomBackgroundProps> = ({ children }) => {
  return (
    <div
      className="bg-background-light fixed inset-0 dark:bg-black"
      style={{
        opacity: 1,
        backgroundImage:
          "linear-gradient(#ff620035 0.1px, transparent 1px), linear-gradient(to right, #ff620035 0.3px,transparent 0px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div className="h-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default AuthBackground;
