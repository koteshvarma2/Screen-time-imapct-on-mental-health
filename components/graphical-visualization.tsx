"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  PieChartIcon,
  ScatterChartIcon as Scatter3D,
  Calendar,
  Clock,
  Brain,
  Activity,
} from "lucide-react"

interface GraphicalVisualizationProps {
  isOpen: boolean
  onClose: () => void
  data: any
}

export function GraphicalVisualization({ isOpen, onClose, data }: GraphicalVisualizationProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for visualization
  const dailyTrends = [
    { date: "Jan 1", screenTime: 8.5, mood: 7, anxiety: 3, sleep: 7.5 },
    { date: "Jan 2", screenTime: 9.2, mood: 6, anxiety: 4, sleep: 6.8 },
    { date: "Jan 3", screenTime: 7.1, mood: 8, anxiety: 2, sleep: 8.2 },
    { date: "Jan 4", screenTime: 10.3, mood: 5, anxiety: 6, sleep: 6.0 },
    { date: "Jan 5", screenTime: 6.8, mood: 8, anxiety: 2, sleep: 8.5 },
    { date: "Jan 6", screenTime: 11.2, mood: 4, anxiety: 7, sleep: 5.5 },
    { date: "Jan 7", screenTime: 5.9, mood: 9, anxiety: 1, sleep: 9.0 },
  ]

  const appUsageData = [
    { name: "Social Media", hours: 3.2, impact: -2, color: "#ef4444" },
    { name: "Productivity", hours: 2.8, impact: 3, color: "#22c55e" },
    { name: "Entertainment", hours: 2.1, impact: -1, color: "#f59e0b" },
    { name: "Health & Fitness", hours: 0.8, impact: 4, color: "#06b6d4" },
    { name: "Games", hours: 1.6, impact: -3, color: "#8b5cf6" },
  ]

  const correlationData = [
    { screenTime: 5.5, mood: 9, anxiety: 1 },
    { screenTime: 6.8, mood: 8, anxiety: 2 },
    { screenTime: 7.1, mood: 8, anxiety: 2 },
    { screenTime: 8.5, mood: 7, anxiety: 3 },
    { screenTime: 9.2, mood: 6, anxiety: 4 },
    { screenTime: 10.3, mood: 5, anxiety: 6 },
    { screenTime: 11.2, mood: 4, anxiety: 7 },
  ]

  const hourlyUsage = [
    { hour: "6AM", usage: 0.1 },
    { hour: "8AM", usage: 0.8 },
    { hour: "10AM", usage: 1.2 },
    { hour: "12PM", usage: 1.8 },
    { hour: "2PM", usage: 2.1 },
    { hour: "4PM", usage: 1.9 },
    { hour: "6PM", usage: 2.3 },
    { hour: "8PM", usage: 2.8 },
    { hour: "10PM", usage: 1.5 },
    { hour: "12AM", usage: 0.3 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-none max-h-none m-0 rounded-none sm:w-screen sm:h-screen md:w-[90vw] md:h-[90vh] md:max-w-[90vw] md:max-h-[90vh] md:rounded-lg lg:w-[80vw] lg:h-[85vh] lg:max-w-[80vw] lg:max-h-[85vh] lg:rounded-xl overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20 border-2 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Graphical Data Visualization
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <Calendar className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="apps" className="gap-2">
              <PieChartIcon className="h-4 w-4" />
              App Analysis
            </TabsTrigger>
            <TabsTrigger value="correlations" className="gap-2">
              <Scatter3D className="h-4 w-4" />
              Correlations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Daily Screen Time vs Mood
                  </CardTitle>
                  <CardDescription>Relationship between device usage and emotional well-being</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="screenTime" stroke="#8884d8" name="Screen Time (hrs)" />
                      <Line type="monotone" dataKey="mood" stroke="#82ca9d" name="Mood (1-10)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hourly Usage Pattern
                  </CardTitle>
                  <CardDescription>When you use devices most throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights from Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-700 mb-2">Peak Usage Time</h4>
                    <p className="text-sm text-blue-600">8-10 PM shows highest screen time activity</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-2">Best Mood Days</h4>
                    <p className="text-sm text-green-600">Lower screen time correlates with better mood</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-700 mb-2">Sleep Impact</h4>
                    <p className="text-sm text-amber-600">High evening usage affects sleep quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Trends Over Time</CardTitle>
                <CardDescription>Track how your mental health metrics change with screen time patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dailyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mood" stroke="#22c55e" name="Mood" strokeWidth={2} />
                    <Line type="monotone" dataKey="anxiety" stroke="#ef4444" name="Anxiety" strokeWidth={2} />
                    <Line type="monotone" dataKey="sleep" stroke="#3b82f6" name="Sleep Hours" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekdays Average</span>
                      <Badge variant="outline">8.2 hrs</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekend Average</span>
                      <Badge variant="outline">9.8 hrs</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Day</span>
                      <Badge className="bg-green-500">Sunday (5.9 hrs)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Worst Day</span>
                      <Badge variant="destructive">Saturday (11.2 hrs)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Screen Time Trend</span>
                      <Badge variant="outline" className="text-red-600">
                        ↗ +12%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mood Trend</span>
                      <Badge variant="outline" className="text-green-600">
                        ↗ +8%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sleep Quality</span>
                      <Badge variant="outline" className="text-blue-600">
                        ↗ +15%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Anxiety Levels</span>
                      <Badge variant="outline" className="text-green-600">
                        ↘ -22%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apps" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Usage Distribution</CardTitle>
                  <CardDescription>Time spent across different app categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={appUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="hours"
                      >
                        {appUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Impact by App</CardTitle>
                  <CardDescription>How different apps affect your well-being</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={appUsageData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="impact" fill={(entry) => (entry.impact > 0 ? "#22c55e" : "#ef4444")} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>App Category Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appUsageData.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: app.color }}></div>
                        <div>
                          <h4 className="font-semibold">{app.name}</h4>
                          <p className="text-sm text-muted-foreground">{app.hours} hours daily</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={app.impact > 0 ? "default" : "destructive"}>
                          {app.impact > 0 ? "+" : ""}
                          {app.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="correlations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Screen Time vs Mental Health Correlations
                </CardTitle>
                <CardDescription>Statistical relationships between usage and well-being metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={correlationData}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="screenTime" name="Screen Time" unit="hrs" />
                    <YAxis type="number" dataKey="mood" name="Mood" unit="" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Mood vs Screen Time" data={correlationData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Correlation Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Screen Time ↔ Mood</span>
                      <Badge variant="destructive">-0.89 (Strong Negative)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Screen Time ↔ Sleep</span>
                      <Badge variant="destructive">-0.76 (Strong Negative)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Screen Time ↔ Anxiety</span>
                      <Badge variant="destructive">+0.82 (Strong Positive)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sleep ↔ Mood</span>
                      <Badge className="bg-green-500">+0.71 (Strong Positive)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-700 text-sm">Critical Alert</h4>
                      <p className="text-xs text-red-600">
                        High screen time strongly predicts poor mental health outcomes
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-700 text-sm">Sleep Connection</h4>
                      <p className="text-xs text-blue-600">Better sleep quality significantly improves mood scores</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-700 text-sm">Positive Pattern</h4>
                      <p className="text-xs text-green-600">
                        Days with less than 6 hours screen time show 40% better mood
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close Visualization
          </Button>
          <Button onClick={() => window.print()}>Print Charts</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
