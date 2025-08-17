import { useState, useCallback, useMemo } from 'react';
import { useCampaignsForValidation } from '@/api';
import { validateCampaignName } from '@/lib/validation';

export const useCampaignValidation = () => {
    const [error, setError] = useState<string>('');
    const { data: existingCampaigns = [] } = useCampaignsForValidation();

    const validate = useCallback((name: string): boolean => {
        const errorMessage = validateCampaignName(name, existingCampaigns);
        setError(errorMessage || '');
        return !errorMessage;
    }, [existingCampaigns]);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    const isValid = useMemo(() => (name: string) => {
        return name.trim() && !error;
    }, [error]);

    return {
        error,
        validate,
        clearError,
        isValid,
        existingCampaigns
    };
};
