import { useOverviewData } from "@/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DayData } from "@/types";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  installs: {
    label: "Installs",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Transform data to keep installs and revenue separate for different scales
const transformData = (installs: DayData[], revenue: DayData[]) => {
  return installs.map((install) => {
    const revenueData = revenue.find((r) => r.day === install.day);
    return {
      day: install.day,
      installs: install.value,
      revenue: revenueData?.value || 0,
    };
  });
};

export function Overview() {
  const { data: overviewData } = useOverviewData();

  const chartData = transformData(overviewData.installs, overviewData.revenue);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Weekly installs and revenue data</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
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
                <linearGradient id="fillInstalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-installs)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-installs)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
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
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
                    indicator="dot"
                  />
                }
              />
              <Area
                yAxisId="left"
                dataKey="installs"
                type="natural"
                fill="url(#fillInstalls)"
                stroke="var(--color-installs)"
                strokeWidth={2}
              />
              <Area
                yAxisId="right"
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
