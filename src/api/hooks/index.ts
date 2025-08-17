/**
 * I would normally use a code generator tool like kubb or Orval,
 * to generate this hooks using an OpenAPI specification.
 */
import type { Campaign } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { campaignService, overviewService } from "../services";

export const useOverviewData = () => {
  return useSuspenseQuery({
    queryKey: ["overview"],
    queryFn: overviewService.getOverviewData,
  });
};

export const useCampaigns = () => {
  return useSuspenseQuery({
    queryKey: ["campaigns"],
    queryFn: campaignService.getCampaigns,
  });
};

// Non-suspense hook for validation purposes
export const useCampaignsForValidation = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: campaignService.getCampaigns,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (campaign: Omit<Campaign, "id">) => campaignService.createCampaign(campaign),
    onSuccess: () => {
      // Invalidate campaigns query to refetch data
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
