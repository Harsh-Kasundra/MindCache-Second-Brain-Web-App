import React from "react";
import { svgprops } from "./types";

const NotesIcon = ({ width, height }: svgprops) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      ></path>
    </svg>
  );
};

export default NotesIcon;
