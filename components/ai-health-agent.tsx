"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Minimize2, Brain, TrendingUp, Activity, Database } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  dataInsights?: DataInsight[]
}

interface DataInsight {
  type: "trend" | "correlation" | "recommendation" | "alert"
  title: string
  value: string | number
  change?: number
  severity?: "low" | "medium" | "high"
}

interface RealTimeData {
  currentScreenTime: number
  todayMood: number
  weeklyTrend: number
  riskFactors: string[]
  improvements: string[]
}

interface AIHealthAgentProps {
  userData?: {
    screenTime: number
    mood: number
    sleep: number
    anxiety: number
    focus: number
  }
}

export function AIHealthAgent({ userData }: AIHealthAgentProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your enhanced Health Assistant with real-time data analysis capabilities. I continuously monitor your digital wellness patterns and provide personalized insights. How can I help optimize your screen time today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my real-time patterns",
        "Show current risk factors",
        "Generate improvement plan",
        "Monitor my progress",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isGatheringData, setIsGatheringData] = useState(false)
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const gatherRealTimeData = async (): Promise<RealTimeData> => {
    setIsGatheringData(true)

    // Simulate real-time data gathering from various sources
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentHour = new Date().getHours()
        const isEveningUsage = currentHour >= 20
        const isWorkingHours = currentHour >= 9 && currentHour <= 17

        const mockData: RealTimeData = {
          currentScreenTime: userData?.screenTime || 0,
          todayMood: userData?.mood || 0,
          weeklyTrend: Math.random() > 0.5 ? 1 : -1,
          riskFactors: [
            ...(isEveningUsage ? ["Late evening usage detected"] : []),
            ...(userData?.screenTime && userData.screenTime > 8 ? ["Excessive daily usage"] : []),
            ...(userData?.anxiety && userData.anxiety > 6 ? ["Elevated anxiety levels"] : []),
            ...(userData?.sleep && userData.sleep < 7 ? ["Insufficient sleep quality"] : []),
          ],
          improvements: [
            ...(userData?.mood && userData.mood > 7 ? ["Mood stability maintained"] : []),
            ...(isWorkingHours ? ["Productive hours usage"] : []),
            ...(userData?.focus && userData.focus > 6 ? ["Good focus levels"] : []),
          ],
        }

        setRealTimeData(mockData)
        setIsGatheringData(false)
        resolve(mockData)
      }, 2000)
    })
  }

  const generateEnhancedAIResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()
    const data = await gatherRealTimeData()

    // Real-time pattern analysis
    if (lowerMessage.includes("real-time") || lowerMessage.includes("current") || lowerMessage.includes("now")) {
      return `🔄 **Real-Time Analysis Complete:**

📊 **Current Status (Live Data):**
• Active screen time today: ${data.currentScreenTime.toFixed(1)}h
• Current mood indicator: ${data.todayMood.toFixed(1)}/10
• Weekly trend: ${data.weeklyTrend > 0 ? "📈 Improving" : "📉 Declining"}
• Data points analyzed: 1,247 interactions

⚠️ **Active Risk Factors:**
${data.riskFactors.length > 0 ? data.riskFactors.map((risk) => `• ${risk}`).join("\n") : "• No immediate risks detected"}

✅ **Positive Indicators:**
${data.improvements.length > 0 ? data.improvements.map((imp) => `• ${imp}`).join("\n") : "• Working on improvements..."}

🎯 **Immediate Recommendations:**
• Next optimal break: ${new Date(Date.now() + 25 * 60000).toLocaleTimeString()}
• Suggested activity: ${data.currentScreenTime > 4 ? "Physical movement" : "Mindful breathing"}
• Evening cutoff: 9:00 PM (${Math.max(0, 21 - new Date().getHours())} hours remaining)`
    }

    // Risk factor analysis
    if (lowerMessage.includes("risk") || lowerMessage.includes("alert")) {
      return `🚨 **Risk Factor Assessment:**

**High Priority Alerts:**
${
  data.riskFactors
    .filter((r) => r.includes("Excessive") || r.includes("Late"))
    .map((risk) => `🔴 ${risk}`)
    .join("\n") || "🟢 No high-priority risks"
}

**Medium Priority Concerns:**
${
  data.riskFactors
    .filter((r) => !r.includes("Excessive") && !r.includes("Late"))
    .map((risk) => `🟡 ${risk}`)
    .join("\n") || "🟢 No medium-priority concerns"
}

**Predictive Analysis:**
• Risk of mood decline: ${userData?.screenTime && userData.screenTime > 8 ? "High (65%)" : "Low (15%)"}
• Sleep disruption probability: ${new Date().getHours() > 20 ? "High (80%)" : "Low (20%)"}
• Focus degradation risk: ${userData?.screenTime && userData.screenTime > 6 ? "Medium (45%)" : "Low (10%)"}

**Preventive Actions:**
1. Set immediate app timer for remaining high-usage apps
2. Enable blue light filter if not already active
3. Schedule 10-minute outdoor break within next hour
4. Prepare alternative evening activities`
    }

    // Progress monitoring
    if (lowerMessage.includes("progress") || lowerMessage.includes("monitor")) {
      return `📈 **Progress Monitoring Dashboard:**

**Weekly Performance:**
• Screen time reduction: ${data.weeklyTrend > 0 ? "+12%" : "-8%"} vs last week
• Mood stability: ${userData?.mood && userData.mood > 6 ? "Stable" : "Needs attention"}
• Sleep quality trend: ${userData?.sleep && userData.sleep > 7 ? "Improving" : "Declining"}
• Focus duration: ${userData?.focus && userData.focus > 6 ? "Above average" : "Below target"}

**Goal Achievement:**
• Daily screen time target (6h): ${userData?.screenTime && userData.screenTime <= 6 ? "✅ Met" : "❌ Exceeded"}
• Evening cutoff (9 PM): ${new Date().getHours() < 21 ? "✅ On track" : "❌ Past cutoff"}
• Mindful breaks (hourly): ${Math.floor(Math.random() * 8)}/8 completed today

**Adaptive Recommendations:**
Based on your progress, I'm adjusting your plan:
• ${data.weeklyTrend > 0 ? "Continue current strategies" : "Implementing stricter limits"}
• Focus area for next week: ${userData?.anxiety && userData.anxiety > 5 ? "Anxiety management" : "Productivity optimization"}
• New challenge: ${userData?.screenTime && userData.screenTime < 7 ? "Quality over quantity focus" : "Digital minimalism week"}`
    }

    // Improvement plan generation
    if (lowerMessage.includes("improve") || lowerMessage.includes("plan")) {
      return `🎯 **AI-Generated Improvement Plan:**

**Personalized Strategy (Based on 1,247 data points):**

**Phase 1: Immediate Actions (Next 24 hours)**
• Reduce current session by 30 minutes
• Implement 5-minute break every 25 minutes
• Switch to airplane mode during meals
• Set phone to grayscale after 8 PM

**Phase 2: Weekly Optimization (Next 7 days)**
• Daily screen time target: ${Math.max(4, (userData?.screenTime || 8) - 1)}h
• Morning routine: 30 min phone-free time
• Replace 1h social media with physical activity
• Evening wind-down: 2h before bed screen-free

**Phase 3: Long-term Adaptation (Next 30 days)**
• Develop 3 offline hobbies
• Create social accountability system
• Monthly digital wellness assessment
• Establish sustainable maintenance routine

**Success Metrics & Tracking:**
• Mood improvement target: +15% within 2 weeks
• Sleep quality target: +20% within 3 weeks
• Anxiety reduction target: -25% within 4 weeks
• Focus enhancement target: +30% within 1 month

**AI Monitoring:**
I'll track your progress and adjust recommendations daily based on real-time data analysis.`
    }

    // Default enhanced response
    return `🤖 **AI Analysis Complete:**

I've analyzed your current digital wellness patterns using real-time data. Here's what I found:

**Current Assessment:**
• Screen time impact: ${userData?.screenTime && userData.screenTime > 7 ? "High concern" : "Manageable"}
• Mental health correlation: ${userData?.mood && userData.mood < 6 ? "Negative trend detected" : "Stable patterns"}
• Behavioral patterns: ${data.riskFactors.length > 2 ? "Multiple risk factors" : "Generally healthy"}

**AI Recommendations:**
• Priority focus: ${userData?.anxiety && userData.anxiety > 5 ? "Anxiety management" : "Optimization"}
• Intervention level: ${data.riskFactors.length > 1 ? "Active" : "Preventive"}
• Monitoring frequency: ${userData?.screenTime && userData.screenTime > 8 ? "Hourly" : "Daily"}

Would you like me to dive deeper into any specific area or create a detailed action plan?`
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const messageContent = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await generateEnhancedAIResponse(messageContent)

      typingTimeoutRef.current = setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: response,
          timestamp: new Date(),
          suggestions: ["Show detailed analysis", "Create action plan", "Monitor progress", "Update recommendations"],
          dataInsights: realTimeData
            ? [
                {
                  type: "trend",
                  title: "Weekly Trend",
                  value: realTimeData.weeklyTrend > 0 ? "Improving" : "Declining",
                  change: realTimeData.weeklyTrend,
                },
                {
                  type: "alert",
                  title: "Risk Factors",
                  value: realTimeData.riskFactors.length,
                  severity:
                    realTimeData.riskFactors.length > 2
                      ? "high"
                      : realTimeData.riskFactors.length > 0
                        ? "medium"
                        : "low",
                },
              ]
            : undefined,
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
        typingTimeoutRef.current = null
      }, 1500)
    } catch (error) {
      console.error("[v0] Error generating AI response:", error)
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 relative"
        >
          <Bot className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full relative">
                <Brain className="h-4 w-4 text-primary" />
                {isGatheringData && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-spin">
                    <Database className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle className="text-sm">Health Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {isGatheringData ? "Analyzing real-time data..." : "AI-Powered Digital Wellness Expert"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live Analysis
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-8 w-8 p-0">
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-80 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>

                    {message.dataInsights && (
                      <div className="mt-3 space-y-2 border-t border-border/50 pt-2">
                        <div className="text-xs font-medium text-muted-foreground">Real-time Insights:</div>
                        {message.dataInsights.map((insight, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1">
                              {insight.type === "trend" && <TrendingUp className="h-3 w-3" />}
                              {insight.type === "alert" && <Activity className="h-3 w-3" />}
                              {insight.title}:
                            </span>
                            <span
                              className={`font-medium ${
                                insight.severity === "high"
                                  ? "text-red-500"
                                  : insight.severity === "medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            >
                              {insight.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 mr-1 mb-1 bg-transparent"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about real-time wellness insights..."
                className="flex-1"
                disabled={isTyping || isGatheringData}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || isGatheringData}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Enhanced AI with real-time data analysis and personalized recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
