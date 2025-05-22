"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { age: "0-4", male: 800, female: 820 },
  { age: "5-9", male: 760, female: 780 },
  { age: "10-14", male: 740, female: 750 },
  { age: "15-19", male: 720, female: 730 },
  { age: "20-24", male: 700, female: 710 },
  { age: "25-29", male: 690, female: 700 },
  { age: "30-34", male: 670, female: 690 },
  { age: "35-39", male: 650, female: 670 },
  { age: "40-44", male: 620, female: 650 },
  { age: "45-49", male: 600, female: 630 },
  { age: "50-54", male: 580, female: 610 },
  { age: "55-59", male: 550, female: 580 },
  { age: "60-64", male: 500, female: 540 },
  { age: "65-69", male: 440, female: 480 },
  { age: "70-74", male: 380, female: 420 },
  { age: "75-79", male: 300, female: 360 },
  { age: "80-84", male: 220, female: 280 },
  { age: "85-89", male: 150, female: 200 },
  { age: "90-94", male: 80, female: 120 },
  { age: "95-99", male: 40, female: 70 },
]

const maxValue = 10 + Math.max(...chartData.map(item => Math.max(item.male, item.female)))

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const barSize = 32;


export function AgePopulation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Population by age</CardTitle>
        <CardDescription>F.Y. 2024-2025</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <ChartContainer config={chartConfig} className="w-[calc(50%-20px)]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -60,
            }}
          >
            <XAxis
              type="number"
              dataKey="male"
              reversed
              domain={[0, maxValue]}
            />
            <YAxis
              dataKey="age"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={false}
              tickFormatter={(value) => value.slice(0, 3)}
              reversed
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" className="background-1" />}
            />
            <Bar dataKey="male" fill="var(--color-male)" radius={5} barSize={barSize}/>
          </BarChart>
        </ChartContainer>

        <div className="flex flex-col w-[38px] h-fit ml-2 h-full justify-between items-center gap-2 pt-1 pb-9">
          {[...chartData].reverse().map((data, index) => (
            <span key={index} className="text-xs text-secondary">
              {data.age}
            </span>
          ))}
        </div>

        <ChartContainer config={chartConfig} className="w-[calc(50%-20px)]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -50,
            }}
          >
            <XAxis
              type="number"
              dataKey="female"
              domain={[0, maxValue]}
            />
            <YAxis
              dataKey="age"
              type="category"
              tick={false}
              tickLine={false}
              axisLine={false}
              reversed
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" className="background-1" />}
            />
            <Bar dataKey="female" fill="var(--color-female)" radius={5} barSize={barSize}/>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the age distribution for the last fiscal year
        </div>
      </CardFooter>
    </Card>
  )
}