import Campaigns from "@/components/Campaigns";
import CreateCampaign from "@/components/CreateCampaign";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Overview } from "@/components/Overview";
import { OverviewSkeleton } from "@/components/OverviewSkeleton";
import { Suspense } from "react";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Fitex Dashboard</h1>
          <p className="text-muted-foreground">Campaign management and analytics platform</p>
        </div>

        <div className="space-y-8">
          {/* Overview Section */}
          <section>
            <ErrorBoundary>
              <Suspense fallback={<OverviewSkeleton />}>
                <Overview />
              </Suspense>
            </ErrorBoundary>
          </section>

          {/* Create Campaign Section */}
          <section>
            <CreateCampaign />
          </section>

          {/* Campaigns Section */}
          <section>
            <ErrorBoundary>
              <Campaigns />
            </ErrorBoundary>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
