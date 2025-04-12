import LoadingSpinner from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";

interface PageLoaderProps {
  type?: "milestone" | "todo" | "restaurant";
}

const PageLoader = ({ type = "milestone" }: PageLoaderProps) => {
  if (type === "milestone") {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="pl-10 pr-4 py-3 relative">
              <div className="timeline-dot bg-muted"></div>
              <div className="love-card">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-3 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-20 w-full mt-2 rounded-lg" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (type === "todo") {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="love-card">
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 mt-1 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (type === "restaurant") {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="love-card flex items-start gap-3">
              <Skeleton className="h-20 w-20 rounded-lg" />
              <div className="flex-1 pt-1">
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="flex gap-1 mb-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  return <LoadingSpinner size="lg" />;
};

export default PageLoader;
