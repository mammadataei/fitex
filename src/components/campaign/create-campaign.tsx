import { useCreateCampaign } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCampaignValidation } from "@/hooks/useCampaignValidation";
import { generateRandomInstallData } from "@/lib/utils";
import type { Campaign } from "@/types";
import { useState } from "react";

export default function CreateCampaign() {
  const [campaignName, setCampaignName] = useState("");

  const createCampaignMutation = useCreateCampaign();
  const { error, validate, clearError, isValid } = useCampaignValidation();

  const handleNameChange = (value: string) => {
    setCampaignName(value);
    if (value.trim()) {
      validate(value);
    } else {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(campaignName)) {
      return;
    }

    try {
      const campaignData: Omit<Campaign, "id"> = {
        name: campaignName.trim(),
        installs: generateRandomInstallData(),
      };

      await createCampaignMutation.mutateAsync(campaignData);

      // Reset form on success
      setCampaignName("");
      clearError();
    } catch (err) {
      console.error("Failed to create campaign:", err);
      // Let the mutation handle errors
    }
  };

  const isNameValid = isValid(campaignName);
  const isSubmitDisabled = !campaignName.trim() || !!error || createCampaignMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
        <CardDescription>Create a new marketing campaign.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaignName" className="text-sm font-medium">
              Campaign Name *
            </Label>
            <Input
              id="campaignName"
              type="text"
              value={campaignName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter a unique campaign name"
              className={error ? "border-red-500" : ""}
              maxLength={50}
              autoComplete="off"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            {isNameValid && <p className="text-xs text-green-600">✓ Campaign name is available</p>}
            <p className="text-xs text-gray-500">Campaign names must be unique (2-50 characters)</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitDisabled}>
              {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
            </Button>
          </div>

          {/* Error Message */}
          {createCampaignMutation.isError && (
            <div className="text-sm text-red-500">Failed to create campaign. Please try again.</div>
          )}

          {/* Success Message */}
          {createCampaignMutation.isSuccess && (
            <div className="text-sm text-green-500">Campaign created successfully!</div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
