"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Database,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Heart,
  Moon,
  Smartphone,
  Target,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Shield,
  Settings,
  Bell,
  Save,
  Play,
} from "lucide-react"

interface DatasetAnalysisProps {
  importedData: any
  onClose: () => void
}

export function DatasetAnalysis({ importedData, onClose }: DatasetAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [implementationSettings, setImplementationSettings] = useState({
    sleepHygiene: {
      enabled: false,
      bedtimeReminder: "21:00",
      screenCutoff: 2,
      customGoals: "",
    },
    appManagement: {
      enabled: false,
      socialMediaLimit: 90,
      breakReminders: true,
      blockedApps: [] as string[],
      customRules: "",
    },
    physicalActivity: {
      enabled: false,
      outdoorTimeGoal: 60,
      exerciseReminders: true,
      activityType: "walking",
      customPlan: "",
    },
  })

  // Mock detailed analysis based on imported data
  const analysisResults = {
    dataQuality: {
      completeness: 92,
      consistency: 88,
      accuracy: 95,
      issues: [
        "3 missing mood entries on weekends",
        "Sleep data gaps on Jan 15-16",
        "Inconsistent app usage tracking on 2 days",
      ],
    },
    keyFindings: {
      avgScreenTime: 8.2,
      avgMood: 6.8,
      avgSleep: 7.1,
      avgAnxiety: 4.2,
      avgFocus: 6.5,
      strongestCorrelation: {
        metric1: "Screen Time",
        metric2: "Sleep Quality",
        correlation: -0.73,
        significance: "High",
      },
    },
    patterns: {
      peakUsageHour: "8-9 PM",
      mostProblematicApp: "Social Media",
      bestPerformanceDay: "Sunday",
      worstPerformanceDay: "Wednesday",
    },
    recommendations: [
      {
        priority: "High",
        category: "Sleep Hygiene",
        action: "Reduce screen time 2 hours before bed",
        impact: "Could improve sleep quality by 15%",
        implementation: {
          steps: [
            "Set up bedtime reminder notifications",
            "Enable blue light filters after sunset",
            "Create a screen-free bedtime routine",
            "Use sleep tracking to monitor improvements",
          ],
          timeline: "2-3 weeks to see results",
          difficulty: "Medium",
        },
      },
      {
        priority: "Medium",
        category: "App Management",
        action: "Limit social media to 90 minutes daily",
        impact: "May reduce anxiety levels by 20%",
        implementation: {
          steps: [
            "Set app time limits on your device",
            "Schedule specific social media windows",
            "Replace mindless scrolling with purposeful activities",
            "Use app blocking during focus hours",
          ],
          timeline: "1-2 weeks to establish habits",
          difficulty: "Easy",
        },
      },
      {
        priority: "Low",
        category: "Physical Activity",
        action: "Increase outdoor time on high screen days",
        impact: "Could boost mood scores by 10%",
        implementation: {
          steps: [
            "Schedule 30-minute outdoor breaks every 2 hours",
            "Take walking meetings when possible",
            "Use nature sounds or outdoor apps for motivation",
            "Track outdoor time alongside screen time",
          ],
          timeline: "Immediate benefits, long-term in 4-6 weeks",
          difficulty: "Easy",
        },
      },
    ],
  }

  const handleImplementationToggle = (category: string, enabled: boolean) => {
    setImplementationSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        enabled,
      },
    }))
  }

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setImplementationSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const screenTimeAdvice = {
    advantages: [
      {
        category: "Educational Benefits",
        points: [
          "Access to online learning platforms and educational content",
          "Development of digital literacy skills essential for modern work",
          "Language learning through apps and interactive content",
          "Access to vast libraries of information and research materials",
        ],
        impact: "Positive cognitive development when used purposefully",
      },
      {
        category: "Social Connection",
        points: [
          "Maintaining relationships through video calls and messaging",
          "Building communities around shared interests and hobbies",
          "Professional networking and career development opportunities",
          "Support groups and mental health resources accessibility",
        ],
        impact: "Enhanced social support and reduced isolation",
      },
      {
        category: "Productivity & Creativity",
        points: [
          "Digital tools for creative expression and content creation",
          "Productivity apps that enhance organization and time management",
          "Remote work capabilities and flexible employment options",
          "Access to professional development and skill-building resources",
        ],
        impact: "Increased efficiency and creative output",
      },
      {
        category: "Entertainment & Relaxation",
        points: [
          "Stress relief through games, music, and entertainment content",
          "Mindfulness and meditation apps for mental wellness",
          "Access to diverse cultural content and perspectives",
          "Convenient entertainment options for downtime",
        ],
        impact: "Improved mood and stress management when balanced",
      },
    ],
    disadvantages: [
      {
        category: "Sleep Disruption",
        points: [
          "Blue light exposure interferes with natural circadian rhythms",
          "Late-night screen use delays sleep onset and reduces sleep quality",
          "Stimulating content keeps the mind active before bedtime",
          "Sleep fragmentation from notifications and device proximity",
        ],
        impact: "Chronic sleep deprivation affecting cognitive function and mood",
        severity: "High",
      },
      {
        category: "Mental Health Impact",
        points: [
          "Social media comparison leading to decreased self-esteem",
          "Information overload causing anxiety and decision fatigue",
          "Cyberbullying and negative online interactions",
          "Fear of missing out (FOMO) and constant connectivity pressure",
        ],
        impact: "Increased anxiety, depression, and emotional instability",
        severity: "High",
      },
      {
        category: "Physical Health Concerns",
        points: [
          "Sedentary behavior leading to reduced physical activity",
          "Eye strain and digital eye syndrome from prolonged use",
          "Poor posture causing neck, back, and shoulder problems",
          "Reduced outdoor time and vitamin D deficiency",
        ],
        impact: "Long-term physical health deterioration",
        severity: "Medium",
      },
      {
        category: "Cognitive & Behavioral Issues",
        points: [
          "Shortened attention span and difficulty with deep focus",
          "Addiction-like behaviors and compulsive device checking",
          "Reduced face-to-face social skills and empathy",
          "Procrastination and avoidance of real-world responsibilities",
        ],
        impact: "Impaired cognitive development and social functioning",
        severity: "Medium",
      },
    ],
    personalizedInsights: {
      basedOnData: [
        `Your average ${analysisResults.keyFindings.avgScreenTime}h daily screen time is ${analysisResults.keyFindings.avgScreenTime > 8 ? "above" : "within"} recommended limits`,
        `Strong correlation (-${Math.abs(analysisResults.keyFindings.strongestCorrelation.correlation)}) between screen time and sleep quality in your data`,
        `Peak usage at ${analysisResults.patterns.peakUsageHour} may be impacting your sleep preparation`,
        `${analysisResults.patterns.mostProblematicApp} shows highest negative correlation with mental health metrics`,
      ],
      recommendations: [
        "Implement a digital sunset 2 hours before bedtime to improve sleep quality",
        "Use app timers to limit social media to 90 minutes daily",
        "Schedule regular screen-free periods for physical activity and face-to-face interaction",
        "Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds",
      ],
    },
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Dataset Analysis Results</h2>
                <p className="text-muted-foreground">Comprehensive analysis of your imported screen time data</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close Analysis
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Dataset Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-blue-200 bg-slate-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Data Period</span>
                </div>
                <p className="text-lg font-bold">{importedData.dateRange}</p>
                <p className="text-xs text-muted-foreground">{importedData.totalRecords} daily records</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-slate-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Apps Tracked</span>
                </div>
                <p className="text-lg font-bold">{importedData.apps}</p>
                <p className="text-xs text-muted-foreground">{importedData.categories} categories</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-slate-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Metrics</span>
                </div>
                <p className="text-lg font-bold">{importedData.metrics.length}</p>
                <p className="text-xs text-muted-foreground">Health indicators</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-slate-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Data Quality</span>
                </div>
                <p className="text-lg font-bold">{analysisResults.dataQuality.completeness}%</p>
                <p className="text-xs text-muted-foreground">Completeness score</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quality">Data Quality</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="advice">Health Advice</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Smartphone className="h-4 w-4" />
                      Screen Time Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Daily:</span>
                      <span className="font-semibold">{analysisResults.keyFindings.avgScreenTime}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Peak Usage:</span>
                      <span className="font-semibold">{analysisResults.patterns.peakUsageHour}</span>
                    </div>
                    <Progress value={(analysisResults.keyFindings.avgScreenTime / 12) * 100} className="mt-2" />
                    <p className="text-xs text-muted-foreground">
                      {analysisResults.keyFindings.avgScreenTime > 8
                        ? "Above recommended limit"
                        : "Within healthy range"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Heart className="h-4 w-4" />
                      Mental Health Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Mood Score:</span>
                      <span className="font-semibold">{analysisResults.keyFindings.avgMood}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Anxiety Level:</span>
                      <span className="font-semibold">{analysisResults.keyFindings.avgAnxiety}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Focus Score:</span>
                      <span className="font-semibold">{analysisResults.keyFindings.avgFocus}/10</span>
                    </div>
                    <Badge
                      variant={analysisResults.keyFindings.avgMood >= 7 ? "default" : "destructive"}
                      className="w-full justify-center"
                    >
                      {analysisResults.keyFindings.avgMood >= 7 ? "Good Mental Health" : "Needs Attention"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Moon className="h-4 w-4" />
                      Sleep Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Sleep:</span>
                      <span className="font-semibold">{analysisResults.keyFindings.avgSleep}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Best Day:</span>
                      <span className="font-semibold">{analysisResults.patterns.bestPerformanceDay}</span>
                    </div>
                    <Progress value={(analysisResults.keyFindings.avgSleep / 9) * 100} className="mt-2" />
                    <p className="text-xs text-muted-foreground">
                      {analysisResults.keyFindings.avgSleep >= 7 ? "Healthy sleep duration" : "Below recommended"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Key Insights from Your Data
                  </CardTitle>
                  <CardDescription>
                    Most significant findings from your {importedData.totalRecords}-day dataset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Strongest Correlation Found</h4>
                      <p className="text-sm text-blue-700">
                        <strong>{analysisResults.keyFindings.strongestCorrelation.metric1}</strong> and{" "}
                        <strong>{analysisResults.keyFindings.strongestCorrelation.metric2}</strong> show a{" "}
                        <strong>{Math.abs(analysisResults.keyFindings.strongestCorrelation.correlation)}</strong>{" "}
                        correlation
                      </p>
                      <Badge variant="outline" className="mt-2 text-blue-600 border-blue-300">
                        {analysisResults.keyFindings.strongestCorrelation.significance} Significance
                      </Badge>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Usage Pattern Alert</h4>
                      <p className="text-sm text-amber-700">
                        Peak usage occurs at <strong>{analysisResults.patterns.peakUsageHour}</strong>, which may impact
                        sleep quality. Consider reducing screen time 2 hours before bed.
                      </p>
                      <Badge variant="outline" className="mt-2 text-amber-600 border-amber-300">
                        Sleep Impact
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Data Quality Assessment
                  </CardTitle>
                  <CardDescription>Analysis of your dataset completeness, consistency, and accuracy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {analysisResults.dataQuality.completeness}%
                      </div>
                      <div className="text-sm font-medium mb-2">Completeness</div>
                      <Progress value={analysisResults.dataQuality.completeness} className="h-2" />
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {analysisResults.dataQuality.consistency}%
                      </div>
                      <div className="text-sm font-medium mb-2">Consistency</div>
                      <Progress value={analysisResults.dataQuality.consistency} className="h-2" />
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {analysisResults.dataQuality.accuracy}%
                      </div>
                      <div className="text-sm font-medium mb-2">Accuracy</div>
                      <Progress value={analysisResults.dataQuality.accuracy} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      Data Quality Issues Found
                    </h4>
                    {analysisResults.dataQuality.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                      >
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-amber-800">{issue}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Overall Assessment</h4>
                    <p className="text-sm text-green-700">
                      Your dataset quality is <strong>excellent</strong> with high completeness and accuracy scores. The
                      minor gaps identified won't significantly impact the analysis results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Usage Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Peak Usage Time</span>
                        <Badge variant="outline">{analysisResults.patterns.peakUsageHour}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Most Problematic App</span>
                        <Badge variant="destructive">{analysisResults.patterns.mostProblematicApp}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Best Performance Day</span>
                        <Badge variant="default">{analysisResults.patterns.bestPerformanceDay}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Worst Performance Day</span>
                        <Badge variant="secondary">{analysisResults.patterns.worstPerformanceDay}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Behavioral Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Weekend vs Weekday</h4>
                      <p className="text-xs text-muted-foreground">
                        Weekend screen time is 23% lower, correlating with improved mood scores
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Evening Usage Impact</h4>
                      <p className="text-xs text-muted-foreground">
                        Screen time after 9 PM consistently reduces next-day focus by 15%
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">App Category Trends</h4>
                      <p className="text-xs text-muted-foreground">
                        Social media usage peaks during stress periods, increasing anxiety levels
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="correlations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Statistical Correlations
                  </CardTitle>
                  <CardDescription>
                    Relationships between screen time and mental health metrics in your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Screen Time ↔ Sleep Quality</h4>
                        <Badge variant="destructive">Strong Negative</Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Progress value={73} className="flex-1" />
                        <span className="text-sm font-mono">-0.73</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Higher screen time strongly correlates with reduced sleep quality
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Social Media ↔ Anxiety</h4>
                        <Badge variant="secondary">Moderate Positive</Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Progress value={58} className="flex-1" />
                        <span className="text-sm font-mono">+0.58</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Increased social media usage moderately correlates with higher anxiety
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Productivity Apps ↔ Focus</h4>
                        <Badge variant="default">Moderate Positive</Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Progress value={45} className="flex-1" />
                        <span className="text-sm font-mono">+0.45</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Productivity app usage shows positive correlation with focus scores
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="space-y-4">
                {analysisResults.recommendations.map((rec, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${
                      rec.priority === "High"
                        ? "border-l-red-500"
                        : rec.priority === "Medium"
                          ? "border-l-yellow-500"
                          : "border-l-green-500"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{rec.category}</CardTitle>
                        <Badge
                          variant={
                            rec.priority === "High"
                              ? "destructive"
                              : rec.priority === "Medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {rec.priority} Priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">{rec.action}</p>
                        <p className="text-sm text-muted-foreground mb-3">{rec.impact}</p>

                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              Implementation Plan
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {rec.implementation.difficulty}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">
                              <strong>Timeline:</strong> {rec.implementation.timeline}
                            </p>
                            <div>
                              <p className="text-xs font-medium mb-1">Steps to implement:</p>
                              <ul className="space-y-1">
                                {rec.implementation.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {implementationSettings[
                          rec.category.toLowerCase().replace(" ", "") as keyof typeof implementationSettings
                        ]?.enabled && (
                          <div className="mt-4 p-4 border rounded-lg space-y-4">
                            {rec.category === "Sleep Hygiene" && (
                              <div className="space-y-3 pt-3 border-t">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-xs">Bedtime Reminder</Label>
                                    <Input
                                      type="time"
                                      value={implementationSettings.sleepHygiene.bedtimeReminder}
                                      onChange={(e) =>
                                        handleSettingChange("sleepHygiene", "bedtimeReminder", e.target.value)
                                      }
                                      className="h-8 text-xs"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs">Screen Cutoff (hours before bed)</Label>
                                    <Slider
                                      value={[implementationSettings.sleepHygiene.screenCutoff]}
                                      onValueChange={(value) =>
                                        handleSettingChange("sleepHygiene", "screenCutoff", value[0])
                                      }
                                      max={4}
                                      min={1}
                                      step={0.5}
                                      className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {implementationSettings.sleepHygiene.screenCutoff} hours
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs">Custom Sleep Goals</Label>
                                  <Textarea
                                    placeholder="Add your personal sleep improvement goals..."
                                    value={implementationSettings.sleepHygiene.customGoals}
                                    onChange={(e) => handleSettingChange("sleepHygiene", "customGoals", e.target.value)}
                                    className="h-16 text-xs resize-none"
                                  />
                                </div>
                              </div>
                            )}

                            {rec.category === "App Management" && (
                              <div className="space-y-3 pt-3 border-t">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-xs">Social Media Limit (minutes/day)</Label>
                                    <Slider
                                      value={[implementationSettings.appManagement.socialMediaLimit]}
                                      onValueChange={(value) =>
                                        handleSettingChange("appManagement", "socialMediaLimit", value[0])
                                      }
                                      max={180}
                                      min={30}
                                      step={15}
                                      className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {implementationSettings.appManagement.socialMediaLimit} minutes
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={implementationSettings.appManagement.breakReminders}
                                      onCheckedChange={(checked) =>
                                        handleSettingChange("appManagement", "breakReminders", checked)
                                      }
                                    />
                                    <Label className="text-xs">Break Reminders</Label>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs">Custom App Rules</Label>
                                  <Textarea
                                    placeholder="Define specific rules for app usage..."
                                    value={implementationSettings.appManagement.customRules}
                                    onChange={(e) =>
                                      handleSettingChange("appManagement", "customRules", e.target.value)
                                    }
                                    className="h-16 text-xs resize-none"
                                  />
                                </div>
                              </div>
                            )}

                            {rec.category === "Physical Activity" && (
                              <div className="space-y-3 pt-3 border-t">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-xs">Outdoor Time Goal (minutes/day)</Label>
                                    <Slider
                                      value={[implementationSettings.physicalActivity.outdoorTimeGoal]}
                                      onValueChange={(value) =>
                                        handleSettingChange("physicalActivity", "outdoorTimeGoal", value[0])
                                      }
                                      max={120}
                                      min={15}
                                      step={15}
                                      className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {implementationSettings.physicalActivity.outdoorTimeGoal} minutes
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={implementationSettings.physicalActivity.exerciseReminders}
                                      onCheckedChange={(checked) =>
                                        handleSettingChange("physicalActivity", "exerciseReminders", checked)
                                      }
                                    />
                                    <Label className="text-xs">Exercise Reminders</Label>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs">Custom Activity Plan</Label>
                                  <Textarea
                                    placeholder="Describe your preferred physical activities..."
                                    value={implementationSettings.physicalActivity.customPlan}
                                    onChange={(e) =>
                                      handleSettingChange("physicalActivity", "customPlan", e.target.value)
                                    }
                                    className="h-16 text-xs resize-none"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="default" className="flex items-center gap-2">
                                <Play className="h-3 w-3" />
                                Start Implementation
                              </Button>
                              <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                                <Save className="h-3 w-3" />
                                Save Settings
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Implementation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {Object.values(implementationSettings).filter((setting) => setting.enabled).length}
                      </div>
                      <div className="text-xs text-blue-700">Active Plans</div>
                    </div>
                    <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
                      <div className="text-lg font-bold text-green-600">2-3</div>
                      <div className="text-xs text-green-700">Weeks to Results</div>
                    </div>
                    <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">35%</div>
                      <div className="text-xs text-purple-700">Expected Improvement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-4">
                    <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Your personalized implementation plan will send reminders and track progress automatically. Review
                      and adjust settings weekly for optimal results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advice" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Advantages Section */}
                <div className="space-y-4">
                  <Card className="border-green-200 bg-green-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <ThumbsUp className="h-5 w-5" />
                        Screen Time Advantages
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Positive impacts when screen time is used mindfully and purposefully
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {screenTimeAdvice.advantages.map((advantage, index) => (
                        <div key={index} className="p-4 bg-white border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="h-4 w-4 text-green-600" />
                            <h4 className="font-semibold text-green-800">{advantage.category}</h4>
                          </div>
                          <ul className="space-y-1 mb-3">
                            {advantage.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-sm text-green-700 flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            {advantage.impact}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Disadvantages Section */}
                <div className="space-y-4">
                  <Card className="border-red-200 bg-red-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <ThumbsDown className="h-5 w-5" />
                        Screen Time Disadvantages
                      </CardTitle>
                      <CardDescription className="text-red-700">
                        Negative impacts from excessive or poorly timed screen use
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {screenTimeAdvice.disadvantages.map((disadvantage, index) => (
                        <div key={index} className="p-4 bg-white border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <h4 className="font-semibold text-red-800">{disadvantage.category}</h4>
                            </div>
                            <Badge
                              variant={disadvantage.severity === "High" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {disadvantage.severity} Risk
                            </Badge>
                          </div>
                          <ul className="space-y-1 mb-3">
                            {disadvantage.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-sm text-red-700 flex items-start gap-2">
                                <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          <div className="p-2 bg-red-100 border border-red-200 rounded text-xs text-red-800">
                            <strong>Impact:</strong> {disadvantage.impact}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Personalized Insights Based on User Data */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Lightbulb className="h-5 w-5" />
                    Personalized Insights from Your Data
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Specific advice based on your {importedData.totalRecords}-day screen time patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Your Data Shows
                      </h4>
                      <div className="space-y-2">
                        {screenTimeAdvice.personalizedInsights.basedOnData.map((insight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-2 bg-white border border-blue-200 rounded"
                          >
                            <Activity className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                            <p className="text-sm text-blue-700">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Recommended Actions
                      </h4>
                      <div className="space-y-2">
                        {screenTimeAdvice.personalizedInsights.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-2 bg-white border border-blue-200 rounded"
                          >
                            <CheckCircle2 className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                            <p className="text-sm text-blue-700">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Key Takeaway for Your Mental Health
                    </h4>
                    <p className="text-sm text-gray-700">
                      Your data shows that <strong>balanced screen time</strong> can provide significant benefits for
                      learning, social connection, and productivity. However, your current usage patterns suggest
                      focusing on
                      <strong> timing and content quality</strong> rather than just reducing total screen time. The
                      strongest predictor of positive mental health outcomes in your data is
                      <strong> avoiding screens 2 hours before bedtime</strong> and
                      <strong> limiting passive social media consumption</strong> during high-stress periods.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
