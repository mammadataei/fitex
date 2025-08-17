import Campaigns from "@/components/campaign/campaigns";
import CreateCampaign from "@/components/campaign/create-campaign";
import { ErrorBoundary } from "@/components/error-boundary";
import { Overview } from "@/components/overview/overview";
import { OverviewSkeleton } from "@/components/overview/overview-skeleton";
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
          <section>
            <ErrorBoundary>
              <Suspense fallback={<OverviewSkeleton />}>
                <Overview />
              </Suspense>
            </ErrorBoundary>
          </section>

          <section>
            <CreateCampaign />
          </section>

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
