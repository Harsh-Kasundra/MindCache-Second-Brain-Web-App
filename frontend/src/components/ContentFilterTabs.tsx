import { useState } from "react";

const filters = [
  "All Content",
  "Instagram",
  "Twitter",
  "Youtube",
  "Medium",
  "Text",
];

const ContentFilterTabs = ({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) => {
  const [active, setActive] = useState("All Content");

  const handleClick = (option: string) => {
    setActive(option);
    onFilterChange(option);
  };

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filters.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={`border-primary-800/30 flex-shrink-0 rounded-lg border px-4 py-2 whitespace-nowrap transition ${
            active === option
              ? "bg-primary-600 text-text-dark-100"
              : "dark:bg-secondary-950 bg-secondary-200 dark:text-text-dark-100 text-text-light-950 hover:bg-[#a84c00]/20"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ContentFilterTabs;
