import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CampaignsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
      </div>

      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-1/2 rounded bg-gray-200"></div>
          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full rounded bg-gray-200"></div>
        </CardContent>
      </Card>
    </div>
  );
}
