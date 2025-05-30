import { svgprops } from "./types";

const TodoListIcon = ({ height, width }: svgprops) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="dark:text-text-dark-100 text-text-light-950"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      ></path>
    </svg>
  );
};

export default TodoListIcon;
