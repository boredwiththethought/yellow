import type { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  direction?: "up" | "down" | "left" | "right";
}

export const ArrowIcon = ({ direction = "right", ...props }: ArrowIconProps) => {
  const rotations = {
    up: -90,
    down: 90,
    left: 180,
    right: 0
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
      {...props}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
