import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
  text,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-primary border-r-transparent",
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}

interface LoadingCardProps {
  text?: string;
  className?: string;
}

export function LoadingCard({ text, className }: LoadingCardProps) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
