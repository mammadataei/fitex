export interface DayData {
    day: string;
    value: number;
}

export interface OverviewData {
    installs: DayData[];
    revenue: DayData[];
}

export interface Campaign {
    id: string;
    name: string;
    installs: DayData[];
}
