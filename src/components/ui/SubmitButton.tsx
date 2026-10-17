import type { ReactNode } from "react";
import { cn } from "../../lib/utils/tailwindClasses";

interface SubmitButtonProps {
  disabled: boolean;
  children: ReactNode;
  className?: string;
}
export function SubmitButton({
  disabled,
  children,
  className,
}: SubmitButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "disabled:bg-blue-500/70 disabled:cursor-not-allowed  bg-blue-500 hover:bg-blue-500/70 p-2 rounded-2xl text-white cursor-pointer",
        className,
      )}
      type="submit"
    >
      {children}
    </button>
  );
}
