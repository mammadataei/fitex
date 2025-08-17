import type { OverviewData, Campaign } from "@/types";
import { campaignStorage } from "./campaignStorage";
import { generateUUID } from "@/lib/uuid";

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
        // First get campaigns from API
        const response = await fetch(`${API_BASE}/campaigns`);
        if (!response.ok) {
            throw new Error("Failed to fetch campaigns");
        }
        const apiCampaigns: Campaign[] = await response.json();

        // Then get user-created campaigns from localStorage
        const localCampaigns = campaignStorage.getCampaigns();

        // Combine both, with user campaigns first
        return [...localCampaigns, ...apiCampaigns];
    },

    async createCampaign(campaign: Omit<Campaign, "id">): Promise<Campaign> {
        // Check if campaign name already exists
        const existingCampaigns = await this.getCampaigns();
        const nameExists = existingCampaigns.some(
            existingCampaign => existingCampaign.name.toLowerCase() === campaign.name.toLowerCase()
        );

        if (nameExists) {
            throw new Error("A campaign with this name already exists. Please choose a different name.");
        }

        // Generate a unique UUID for the new campaign
        const newCampaign: Campaign = {
            ...campaign,
            id: generateUUID(),
        };

        // Save to localStorage
        campaignStorage.addCampaign(newCampaign);

        return newCampaign;
    },
};