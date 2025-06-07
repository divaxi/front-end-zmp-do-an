import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface ColumnChartProps {
  data: {
    name: string;
    value: number;
  }[];
  title?: string;
}

export function ColumnChart({ data, title }: ColumnChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Giá trị",
          theme: {
            light: "hsl(var(--primary))",
            dark: "hsl(var(--primary))",
          },
        },
      }}
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        width={500}
        height={300}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="value"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <ChartTooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              labelFormatter={(value) => value}
            />
          )}
        />
      </BarChart>
    </ChartContainer>
  );
}
