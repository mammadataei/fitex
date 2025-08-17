import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import type { Campaign } from "@/types";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  installs: {
    label: "Installs",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface CampaignChartProps {
  campaign: Campaign | null;
}

export function CampaignChart({ campaign }: CampaignChartProps) {
  if (!campaign) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Installs</CardTitle>
          <CardDescription>Select a campaign to view its weekly install data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-gray-500">
            <p>No campaign selected</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = campaign.installs.map((dayData) => ({
    day: dayData.day,
    installs: dayData.value,
  }));

  const totalInstalls = campaign.installs.reduce((sum, dayData) => sum + dayData.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign.name} - Weekly Installs</CardTitle>
        <CardDescription>Total installs: {totalInstalls.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="fillCampaignInstalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-installs)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-installs)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1, 3)}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="installs"
              type="natural"
              fill="url(#fillCampaignInstalls)"
              stroke="var(--color-installs)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
