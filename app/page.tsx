"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Clock, TrendingUp, TrendingDown, Brain, Heart, AlertTriangle, CheckCircle, Moon, Zap } from "lucide-react"

import {
  dailyScreenTimeData,
  appUsageData,
  weeklyTrendData,
  hourlyUsageData,
  correlationData,
  getWeeklyAverage,
  getMoodTrend,
} from "@/lib/data"
import { ImportExportDialog } from "@/components/import-export-dialog"
import { DatasetAnalysis } from "@/components/dataset-analysis"
import { ThemeToggle } from "@/components/theme-toggle"
import { AIHealthAgent } from "@/components/ai-health-agent"

export default function ScreenTimeDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [notification, setNotification] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)

  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [])

  const lastWeekData = dailyScreenTimeData.slice(-7)
  const totalScreenTime = lastWeekData.reduce((sum, day) => sum + day.totalHours, 0)
  const avgMood = getWeeklyAverage(dailyScreenTimeData, "mood")
  const avgSleep = getWeeklyAverage(dailyScreenTimeData, "sleepHours")
  const avgAnxiety = getWeeklyAverage(dailyScreenTimeData, "anxietyLevel")
  const avgFocus = getWeeklyAverage(dailyScreenTimeData, "focusScore")
  const dailyAverage = totalScreenTime / 7
  const moodTrend = getMoodTrend(dailyScreenTimeData)

  const appCategories = appUsageData.reduce(
    (acc, app) => {
      const existing = acc.find((item) => item.name === app.category)
      if (existing) {
        existing.hours += app.hours
      } else {
        acc.push({
          name: app.category,
          hours: app.hours,
          color: app.color,
        })
      }
      return acc
    },
    [] as Array<{ name: string; hours: number; color: string }>,
  )

  const handleImport = (data: any) => {
    setNotification(`Successfully imported ${data.totalRecords} records from ${data.dateRange}`)
    setAnalysisData(data)
    setShowAnalysis(true)
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
      notificationTimeoutRef.current = null
    }, 5000)
  }

  const handleExport = (format: "pdf" | "excel" | "original") => {
    setNotification(`${format.toUpperCase()} export started. Download will begin shortly.`)
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
      notificationTimeoutRef.current = null
    }, 5000)
  }

  const aiAgentData = {
    screenTime: dailyAverage,
    mood: avgMood,
    sleep: avgSleep,
    anxiety: avgAnxiety,
    focus: avgFocus,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Digital Wellness Dashboard</h1>
                <p className="text-sm text-muted-foreground">Monitor your screen time impact on mental health</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ImportExportDialog type="import" onImport={handleImport} />
              <ImportExportDialog type="export" onExport={handleExport} />
              <Badge
                variant="outline"
                className={
                  moodTrend === "improving"
                    ? "text-accent"
                    : moodTrend === "declining"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }
              >
                {moodTrend === "improving" && <TrendingUp className="h-3 w-3 mr-1" />}
                {moodTrend === "declining" && <TrendingDown className="h-3 w-3 mr-1" />}
                {moodTrend === "stable" && <CheckCircle className="h-3 w-3 mr-1" />}
                {moodTrend === "improving" ? "Improving" : moodTrend === "declining" ? "Needs Attention" : "Stable"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      {notification && (
        <div className="bg-accent/10 border-accent/20 border-b px-4 py-2">
          <div className="container mx-auto">
            <p className="text-sm text-accent">{notification}</p>
          </div>
        </div>
      )}

      {/* Dataset Analysis Overlay */}
      {showAnalysis && analysisData && (
        <DatasetAnalysis importedData={analysisData} onClose={() => setShowAnalysis(false)} />
      )}

      <AIHealthAgent userData={aiAgentData} />

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Screen Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScreenTime.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">This week</p>
              <Progress value={Math.min((dailyAverage / 12) * 100, 100)} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgMood.toFixed(1)}/10</div>
              <p className="text-xs text-muted-foreground">
                {avgMood >= 7 ? (
                  <span className="text-accent flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Good
                  </span>
                ) : (
                  <span className="text-destructive flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" /> Needs attention
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgSleep.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">
                {avgSleep >= 7.5 ? (
                  <span className="text-accent">Excellent sleep</span>
                ) : avgSleep >= 6.5 ? (
                  <span className="text-muted-foreground">Good sleep</span>
                ) : (
                  <span className="text-destructive">Poor sleep</span>
                )}
              </p>
              <Progress value={Math.min((avgSleep / 9) * 100, 100)} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgFocus.toFixed(1)}/10</div>
              <p className="text-xs text-muted-foreground">
                {avgFocus >= 7 ? (
                  <span className="text-accent">High focus</span>
                ) : avgFocus >= 5 ? (
                  <span className="text-muted-foreground">Moderate focus</span>
                ) : (
                  <span className="text-destructive">Low focus</span>
                )}
              </p>
              <Progress value={avgFocus * 10} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Screen Time vs Mood Chart */}
              <Card className="bg-black dark:bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Screen Time vs Mood Correlation</CardTitle>
                  <CardDescription className="text-gray-300">
                    Daily screen time hours compared to mood ratings (last 7 days)
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-slate-800 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lastWeekData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="day" tick={{ fill: "#1e40af", fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
                      <YAxis yAxisId="left" tick={{ fill: "#1e40af", fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#dc2626", fontSize: 12 }}
                        axisLine={{ stroke: "#ef4444" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f8fafc",
                          border: "2px solid #3b82f6",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="totalHours"
                        fill="#3b82f6"
                        name="Screen Time (hrs)"
                        label={{
                          position: "top",
                          fill: "#1e40af",
                          fontSize: 11,
                          fontWeight: "bold",
                        }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="mood"
                        stroke="#ef4444"
                        strokeWidth={4}
                        name="Mood (1-10)"
                        dot={{ fill: "#dc2626", strokeWidth: 2, r: 6 }}
                        label={{
                          position: "top",
                          fill: "#dc2626",
                          fontSize: 11,
                          fontWeight: "bold",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* App Usage Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>App Category Usage</CardTitle>
                  <CardDescription>Time spent across different app categories</CardDescription>
                </CardHeader>
                <CardContent className="dark:text-slate-300 bg-slate-800">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={appCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="hours"
                      >
                        {appCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed App Usage Analysis</CardTitle>
                <CardDescription>Individual app usage with mental health impact assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appUsageData.slice(0, 8).map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: app.color }} />
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-sm text-muted-foreground">{app.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{app.hours.toFixed(1)}h</p>
                        <Badge
                          variant={
                            app.mentalHealthImpact === "positive"
                              ? "default"
                              : app.mentalHealthImpact === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {app.mentalHealthImpact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Trends</CardTitle>
                <CardDescription>8-week analysis of screen time impact on wellbeing metrics</CardDescription>
              </CardHeader>
              <CardContent className="text-sky-400 bg-slate-800">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="screenTime"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name="Screen Time (hrs/week)"
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Mood (1-10)"
                    />
                    <Line
                      type="monotone"
                      dataKey="anxiety"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Anxiety Level (1-10)"
                    />
                    <Line
                      type="monotone"
                      dataKey="sleep"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Sleep Quality (hrs)"
                    />
                    <Line
                      type="monotone"
                      dataKey="focus"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Focus Score (1-10)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Usage Patterns</CardTitle>
                  <CardDescription>Screen time distribution throughout the day</CardDescription>
                </CardHeader>
                <CardContent className="text-sky-400 bg-slate-800">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="hsl(var(--chart-1))" name="Usage (hours)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Correlation Analysis</CardTitle>
                  <CardDescription>Statistical relationships between metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {correlationData.slice(0, 4).map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{item.metric}</p>
                          <Badge
                            variant={
                              item.significance === "high"
                                ? "destructive"
                                : item.significance === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.significance}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <Progress value={Math.abs(item.correlation) * 100} className="flex-1" />
                          <span className="text-sm font-mono">{item.correlation.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    Positive Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">
                      Your mood improves significantly on days with less than 8 hours of screen time.
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">Weekend screen time reduction correlates with better sleep quality.</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">Productivity app usage shows positive impact on focus scores.</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm">Physical activity on low screen time days boosts overall wellbeing.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm">Social media usage peaks correlate with increased anxiety levels.</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm">Screen time above 10 hours consistently impacts sleep quality.</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm">Late evening screen time affects next-day focus performance.</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm">News consumption during high-stress periods increases anxiety.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Based on your usage patterns and mental health data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      Digital Detox
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">Try a 2-hour screen-free period before bed</p>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mb-3">
                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                        <strong>Benefits:</strong> Improves sleep quality by 23%, reduces cortisol levels, enhances
                        melatonin production
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                        <strong>Implementation:</strong> Start 2 hours before bedtime, use airplane mode, try reading or
                        meditation instead
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Success Rate:</strong> 78% of users report better sleep within 1 week
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        <p className="font-medium mb-1">Reminder Options:</p>
                        <p>• 2 hours before bed: "Start winding down"</p>
                        <p>• 1 hour before bed: "Begin digital detox"</p>
                        <p>• 30 minutes before bed: "Switch to airplane mode"</p>
                        <p>• Alternative activities: Reading, meditation, journaling</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      App Limits
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">Limit social media to 2 hours daily</p>
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg mb-3">
                      <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                        <strong>Benefits:</strong> Reduces anxiety by 31%, improves focus score by 2.4 points, increases
                        real-world social interaction
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                        <strong>Implementation:</strong> Use built-in screen time controls, set app-specific limits,
                        enable break reminders
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        <strong>Recommended:</strong> Instagram: 45min, TikTok: 30min, Twitter: 30min, Facebook: 15min
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        <p className="font-medium mb-1">Setup Instructions:</p>
                        <p>• iOS: Settings → Screen Time → App Limits</p>
                        <p>• Android: Settings → Digital Wellbeing → App Timers</p>
                        <p>• Custom notifications at 75% and 100% usage</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-green-500" />
                      Mindful Breaks
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">Take 5-minute breaks every hour</p>
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg mb-3">
                      <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                        <strong>Benefits:</strong> Reduces eye strain by 40%, improves cognitive performance, prevents
                        digital fatigue
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                        <strong>Activities:</strong> 20-20-20 rule (look 20ft away for 20 seconds), deep breathing, neck
                        stretches, walk around
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        <strong>Science:</strong> Based on Pomodoro Technique - proven to boost productivity by 25%
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        <p className="font-medium mb-1">Break Schedule Options:</p>
                        <p>• Every 60 minutes: 5-minute break</p>
                        <p>• Every 90 minutes: 10-minute break</p>
                        <p>• Custom intervals with gentle notifications</p>
                        <p>• Weekend mode: Relaxed schedule</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    Quick Implementation Tips
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">Start Small:</p>
                      <p className="text-muted-foreground">
                        Begin with just one recommendation for the first week to build sustainable habits.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">Track Progress:</p>
                      <p className="text-muted-foreground">
                        Use the dashboard to monitor improvements in mood, sleep, and focus scores.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">Be Consistent:</p>
                      <p className="text-muted-foreground">
                        Research shows it takes 21 days to form a new habit - stick with it!
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">Customize:</p>
                      <p className="text-muted-foreground">
                        Adjust recommendations based on your lifestyle, work schedule, and personal goals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
