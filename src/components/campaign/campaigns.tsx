import { Suspense, useState } from "react";
import { useCampaigns } from "../../api/hooks";
import type { Campaign } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CampaignChart } from "./campaign-chart";
import { CampaignsSkeleton } from "./campaign-skeleton";

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

      <CampaignChart campaign={selectedCampaign} />
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
