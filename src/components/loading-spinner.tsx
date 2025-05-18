import { cn } from "@/lib/utils";
import { loadingState } from "@/state";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner({ className }: LoadingSpinnerProps) {
  const isLoading = useAtomValue(loadingState);
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}

export { LoadingSpinner };
