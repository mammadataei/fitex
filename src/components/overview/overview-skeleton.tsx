import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full space-y-4">
            {/* Chart area skeleton */}
            <div className="relative h-[330px] w-full">
              {/* Y-axis labels */}
              <div className="absolute top-0 left-0 flex h-full flex-col justify-between py-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>

              {/* Right Y-axis labels */}
              <div className="absolute top-0 right-0 flex h-full flex-col justify-between py-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>

              {/* Chart content area */}
              <div className="mx-12 h-full">
                {/* Animated chart lines */}
                <div className="flex h-full items-end justify-between px-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      {/* Chart bar representation */}
                      <div className="relative">
                        <Skeleton
                          className="w-8"
                          style={{
                            height: `${Math.random() * 200 + 50}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between px-4 pt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <Skeleton key={day} className="h-3 w-6" style={{ animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Legend skeleton */}
            <div className="mt-12 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
