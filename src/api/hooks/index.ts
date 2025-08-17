import { useSuspenseQuery } from "@tanstack/react-query";
import { overviewService, campaignService } from "../services";

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
