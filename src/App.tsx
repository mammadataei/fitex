import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Overview } from "@/components/Overview";
import { OverviewSkeleton } from "@/components/OverviewSkeleton";
import { Suspense } from "react";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        <ErrorBoundary>
          <Suspense fallback={<OverviewSkeleton />}>
            <Overview />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
