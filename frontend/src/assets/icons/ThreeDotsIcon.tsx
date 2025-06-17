import React from "react";
import { svgprops } from "./types";

const ThreeDotsIcon = ({ height, width }: svgprops) => {
  return (
    <svg
      className="rotate-90"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      height={height}
      width={width}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M5 12h.01M12 12h.01M19 12h.01"
      />
    </svg>
  );
};

export default ThreeDotsIcon;
