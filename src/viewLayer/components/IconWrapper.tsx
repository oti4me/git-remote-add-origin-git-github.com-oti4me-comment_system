import { type ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  onClick?: () => void;
  hasBackground?: boolean;
  className?: string;
}

export const IconWrapper = ({
  children,
  onClick,
  hasBackground = true,
  className = "",
}: IconWrapperProps) => {
  const baseStyles = [
    "flex items-center justify-center gap-1",
    "rounded-full px-3 py-1",
    "transition-colors duration-200",
    "cursor-pointer",
    "hover:bg-opacity-80",
    className,
  ];

  if (hasBackground) {
    baseStyles.push("bg-gray-200");
  }

  return (
    <div
      onClick={onClick}
      className={baseStyles.join(" ")}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
};
