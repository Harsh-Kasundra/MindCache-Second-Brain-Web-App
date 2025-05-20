import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  Icon: React.FC<{ height: number; width: number }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon }) => {
  return (
    <div className="dark:bg-secondary-950 bg-secondary-200 border-primary-600/30 rounded-xl border p-6 text-center">
      <div className="flex justify-between">
        <div className="dark:text-text-dark-100 text-text-light-950 flex flex-col items-start gap-1">
          <div className="text-sm">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div>
          <div className="bg-primary-600/20 flex items-center justify-center rounded-xl p-3">
            <Icon height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
