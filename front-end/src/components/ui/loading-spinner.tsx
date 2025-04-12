import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-full py-8 ${className}`}
    >
      <Loader2 className={`animate-spin text-primary ${sizeClass[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
