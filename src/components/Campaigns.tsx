import { Suspense, useState } from "react";
import { useCampaigns } from "../api/hooks";
import type { Campaign } from "../types";
import { CampaignChart } from "./CampaignChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CampaignsContentProps {
  selectedCampaign: Campaign | null;
  onCampaignSelect: (campaign: Campaign | null) => void;
}

function CampaignsContent({ selectedCampaign, onCampaignSelect }: CampaignsContentProps) {
  const { data: campaigns } = useCampaigns();

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="space-y-6">
        <div className="py-8 text-center text-gray-500">
          <p>No campaigns found. Create your first campaign above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campaign Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Campaign:</label>
        <Select
          value={selectedCampaign?.id || "none"}
          onValueChange={(value: string) => {
            if (value === "" || value === "none") {
              onCampaignSelect(null);
            } else {
              const campaign = campaigns.find((c) => c.id === value);
              onCampaignSelect(campaign || null);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a campaign to view its analytics..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No campaign selected</SelectItem>
            {campaigns.map((campaign) => {
              const totalInstalls = campaign.installs.reduce((sum, dayData) => sum + dayData.value, 0);
              return (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name} ({totalInstalls.toLocaleString()} installs)
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Chart */}
      <CampaignChart campaign={selectedCampaign} />

      {/* Campaigns Grid */}
    </div>
  );
}

function CampaignsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Select skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Chart skeleton */}
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-1/2 rounded bg-gray-200"></div>
          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full rounded bg-gray-200"></div>
        </CardContent>
      </Card>

      {/* Campaigns grid skeleton */}
      <div>
        <div className="mb-4 h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200"></div>
                    <div className="grid grid-cols-2 gap-1">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <div key={j} className="h-3 rounded bg-gray-200"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<CampaignsSkeleton />}>
          <CampaignsContent selectedCampaign={selectedCampaign} onCampaignSelect={setSelectedCampaign} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
