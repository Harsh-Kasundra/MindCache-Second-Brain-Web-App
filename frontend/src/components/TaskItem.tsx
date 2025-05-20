import React from "react";

interface TaskItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ text, completed, onToggle }) => {
  return (
    <div className="border-primary-800/30 bg-background-light flex items-center rounded-lg border p-3 dark:bg-black">
      <input
        type="checkbox"
        className="border-primary-800 text-primary-600 focus:ring-primary-600 h-5 w-5 rounded"
        checked={completed}
        onChange={onToggle}
      />
      <span
        className={`dark:text-text-dark-100 text-text-light-950 ml-3 ${
          completed ? "line-through opacity-50" : ""
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default TaskItem;
