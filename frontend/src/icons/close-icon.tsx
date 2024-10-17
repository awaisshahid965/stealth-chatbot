import React from "react";
import { IconsProps } from "./icons.types";

const CloseIcon: React.FC<IconsProps> = ({
    width = 25,
    height = 25,
    color = "#fff",
  }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
};

export default CloseIcon;
