import type { Campaign } from "../../types";

const CAMPAIGNS_STORAGE_KEY = "fitex-campaigns";

// Local storage utilities
export const campaignStorage = {
  getCampaigns(): Campaign[] {
    try {
      const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  setCampaigns(campaigns: Campaign[]): void {
    try {
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
    } catch (error) {
      console.error("Failed to save campaigns to localStorage:", error);
    }
  },

  addCampaign(campaign: Campaign): Campaign[] {
    const campaigns = this.getCampaigns();
    const updatedCampaigns = [...campaigns, campaign];
    this.setCampaigns(updatedCampaigns);
    return updatedCampaigns;
  },
};
