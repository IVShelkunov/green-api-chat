import { cn } from "../../lib/utils/tailwindClasses";
interface ErrorMessageProps {
  error: string | null;
  className?: string;
}
export function ErrorMessage({ error, className }: ErrorMessageProps) {
  return (
    <p
      className={cn(
        "text-xs text-red-500 text-center  wrap-break-word",
        !error && "invisible",
        className,
      )}
    >
      {error || "placeholder"}
    </p>
  );
}
