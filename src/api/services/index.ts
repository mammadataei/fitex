import type { OverviewData, Campaign } from "@/types";

const API_BASE = "http://5c3db915a9d04f0014a98a79.mockapi.io";

export const overviewService = {
    async getOverviewData(): Promise<OverviewData> {
        const response = await fetch(`${API_BASE}/overview`);
        if (!response.ok) {
            throw new Error("Failed to fetch overview data");
        }
        return response.json();
    },
};

export const campaignService = {
    async getCampaigns(): Promise<Campaign[]> {
        const response = await fetch(`${API_BASE}/campaigns`);
        if (!response.ok) {
            throw new Error("Failed to fetch campaigns");
        }
        return response.json();
    },
};
