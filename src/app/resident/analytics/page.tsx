'use client'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartData = [
  { month: "January", guests: 186 },
  { month: "February", guests: 305 },
  { month: "March", guests: 237 },
  { month: "April", guests: 173 },
  { month: "May", guests: 209 },
  { month: "June", guests: 214 },
];

const chartConfig = {
  guests: {
    label: "Guests",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>
            <div className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Visits (YTD)</CardTitle>
                            <CardDescription>Total number of guest visits this year.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">1,324</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tips Paid (YTD)</CardTitle>
                            <CardDescription>Total amount tipped to guards.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">₦45,200</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Visit Duration</CardTitle>
                            <CardDescription>Average time guests spend on premises.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">2.5 hrs</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Debt-Blocked Visits</CardTitle>
                            <CardDescription>Visits blocked due to outstanding estate dues.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-destructive">2</p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Guest Visits</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <YAxis />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Bar dataKey="guests" fill="var(--color-guests)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
