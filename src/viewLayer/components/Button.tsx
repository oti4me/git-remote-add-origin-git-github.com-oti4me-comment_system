import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps {
  text: string;
  type?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export const Button = ({
  text,
  onClick,
  disabled,
  icon,
  type = "primary",
}: ButtonProps) => {
  const buttonStyles = {
    primary:
      "rounded-full bg-[#FF4500] px-4 py-1 text-xs font-semibold text-white hover:bg-[#FF4500]/90 disabled:cursor-not-allowed disabled:opacity-50",
    secondary:
      "rounded-full bg-transparent px-4 py-1 text-xs font-semibold text-[#D7DADC] hover:bg-[#2D2D2E]",
    tertiary:
      "bg-transparent text-xs font-semibold text-gray-400 hover:text-gray-600 cursor-pointer",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonStyles[type], "inline-flex items-center gap-2")}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};
