/*
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  male: {
    label: "male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SectorPopulation() {
  return (
    <Card className="flex flex-col gap-4 w-[100%] pt-0 pb-0 border-0 shadow-none">
      <CardHeader className="pr-0 pl-0">
        <CardTitle>Population by sector</CardTitle>
        <CardDescription>F.Y. 2024-2025</CardDescription>
      </CardHeader>
      <CardContent className="flex max-md:pr-0 max-md:pl-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" className="background-1" />}/>
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="male"
              stackId="a"
              fill="var(--color-male)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="female"
              stackId="a"
              fill="var(--color-female)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the sector distribution for the last fiscal year
        </div>
      </CardFooter>
    </Card>
  )
}
*/

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Labor force", male: 186, female: 80 },
  { month: "Unemployed", male: 305, female: 200 },
  { month: "OSC - Out of school children", male: 237, female: 120 },
  { month: "OSY - Out of school youth", male: 73, female: 190 },
  { month: "PWDs", male: 209, female: 130 },
  { month: "OFWs", male: 214, female: 140 },
  { month: "Solo-parents", male: 73, female: 190 },
  { month: "IPs - Indigenous people", male: 209, female: 130 },
  { month: "Single", male: 214, female: 140 },
  { month: "Married", male: 214, female: 140 },
]

const chartConfig = {
  male: {
    label: "male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SectorPopulation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Population by sector</CardTitle>
        <CardDescription>F.Y. 2024-2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-128">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel className="background-1"/>} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="male"
              stackId="a"
              fill="var(--color-male)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="female"
              stackId="a"
              fill="var(--color-female)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the sector distribution for the last fiscal year
        </div>
      </CardFooter>
    </Card>
  )
}
