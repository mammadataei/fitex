import { useSuspenseQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { overviewService, campaignService } from "../services";
import type { Campaign } from "@/types";

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
        mutationFn: (campaign: Omit<Campaign, "id">) =>
            campaignService.createCampaign(campaign),
        onSuccess: () => {
            // Invalidate campaigns query to refetch data
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
    });
};
