import { z } from 'zod';
import type { Campaign } from '@/types';

// Campaign name validation schema with uniqueness check
export const createCampaignNameSchema = (existingCampaigns: Campaign[] = []) =>
    z.string()
        .trim()
        .min(2, 'Campaign name must be at least 2 characters')
        .max(50, 'Campaign name must be less than 50 characters')
        .refine(
            (name) => {
                const nameExists = existingCampaigns.some(
                    campaign => campaign.name.toLowerCase() === name.toLowerCase()
                );
                return !nameExists;
            },
            'A campaign with this name already exists. Please choose a different name.'
        );

// Base schema without uniqueness (for when you don't have existing campaigns)
export const baseCampaignNameSchema = z
    .string()
    .trim()
    .min(2, 'Campaign name must be at least 2 characters')
    .max(50, 'Campaign name must be less than 50 characters');

// Simple validation function that returns error message or null
export const validateCampaignName = (
    name: string,
    existingCampaigns: Campaign[] = []
): string | null => {
    const result = createCampaignNameSchema(existingCampaigns).safeParse(name);
    return result.success ? null : result.error.issues[0]?.message || 'Invalid campaign name';
};
