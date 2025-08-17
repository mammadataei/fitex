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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DayData } from "@/types";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  const [chartView, setChartView] = useState<"area" | "bar">("area");

  const chartData = transformData(overviewData.installs, overviewData.revenue);

  const renderChart = () => {
    if (chartView === "bar") {
      return (
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
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
          <Bar yAxisId="left" dataKey="installs" fill="var(--color-installs)" stackId="a" />
          <Bar yAxisId="right" dataKey="revenue" fill="var(--color-revenue)" stackId="a" />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      );
    }

    return (
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
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Weekly installs and revenue data</CardDescription>
            </div>
            <Select value={chartView} onValueChange={(value) => setChartView(value as "area" | "bar")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Chart view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Stacked Bar Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            {renderChart()}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
