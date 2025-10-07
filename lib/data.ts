// Comprehensive dataset for Screen Time Impact on Mental Health Dashboard

export interface DailyScreenTimeData {
  date: string
  day: string
  totalHours: number
  mood: number
  sleepHours: number
  sleepQuality: number
  anxietyLevel: number
  focusScore: number
  stressLevel: number
  physicalActivity: number
  socialInteraction: number
}

export interface AppUsageData {
  name: string
  category: string
  hours: number
  sessions: number
  avgSessionLength: number
  color: string
  mentalHealthImpact: "positive" | "neutral" | "negative"
}

export interface WeeklyTrendData {
  week: string
  screenTime: number
  mood: number
  anxiety: number
  sleep: number
  focus: number
  stress: number
  productivity: number
}

export interface HourlyUsageData {
  hour: string
  usage: number
  mood: number
  alertness: number
}

export interface CorrelationData {
  metric: string
  correlation: number
  significance: "high" | "medium" | "low"
  description: string
}

// 30 days of detailed screen time and mental health data
export const dailyScreenTimeData: DailyScreenTimeData[] = [
  {
    date: "2024-01-01",
    day: "Mon",
    totalHours: 8.5,
    mood: 6,
    sleepHours: 7.2,
    sleepQuality: 7,
    anxietyLevel: 4,
    focusScore: 6,
    stressLevel: 5,
    physicalActivity: 30,
    socialInteraction: 3,
  },
  {
    date: "2024-01-02",
    day: "Tue",
    totalHours: 9.2,
    mood: 5,
    sleepHours: 6.8,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 20,
    socialInteraction: 2,
  },
  {
    date: "2024-01-03",
    day: "Wed",
    totalHours: 7.8,
    mood: 7,
    sleepHours: 8.1,
    sleepQuality: 8,
    anxietyLevel: 3,
    focusScore: 7,
    stressLevel: 4,
    physicalActivity: 45,
    socialInteraction: 4,
  },
  {
    date: "2024-01-04",
    day: "Thu",
    totalHours: 10.1,
    mood: 4,
    sleepHours: 6.5,
    sleepQuality: 5,
    anxietyLevel: 6,
    focusScore: 4,
    stressLevel: 7,
    physicalActivity: 15,
    socialInteraction: 2,
  },
  {
    date: "2024-01-05",
    day: "Fri",
    totalHours: 11.3,
    mood: 3,
    sleepHours: 6.0,
    sleepQuality: 4,
    anxietyLevel: 7,
    focusScore: 3,
    stressLevel: 8,
    physicalActivity: 10,
    socialInteraction: 1,
  },
  {
    date: "2024-01-06",
    day: "Sat",
    totalHours: 6.2,
    mood: 8,
    sleepHours: 8.5,
    sleepQuality: 9,
    anxietyLevel: 2,
    focusScore: 8,
    stressLevel: 3,
    physicalActivity: 60,
    socialInteraction: 6,
  },
  {
    date: "2024-01-07",
    day: "Sun",
    totalHours: 5.8,
    mood: 8,
    sleepHours: 8.3,
    sleepQuality: 8,
    anxietyLevel: 2,
    focusScore: 7,
    stressLevel: 3,
    physicalActivity: 50,
    socialInteraction: 5,
  },
  {
    date: "2024-01-08",
    day: "Mon",
    totalHours: 9.0,
    mood: 5,
    sleepHours: 7.0,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 25,
    socialInteraction: 3,
  },
  {
    date: "2024-01-09",
    day: "Tue",
    totalHours: 8.7,
    mood: 6,
    sleepHours: 7.3,
    sleepQuality: 7,
    anxietyLevel: 4,
    focusScore: 6,
    stressLevel: 5,
    physicalActivity: 35,
    socialInteraction: 4,
  },
  {
    date: "2024-01-10",
    day: "Wed",
    totalHours: 7.5,
    mood: 7,
    sleepHours: 7.8,
    sleepQuality: 8,
    anxietyLevel: 3,
    focusScore: 7,
    stressLevel: 4,
    physicalActivity: 40,
    socialInteraction: 4,
  },
  {
    date: "2024-01-11",
    day: "Thu",
    totalHours: 10.5,
    mood: 4,
    sleepHours: 6.2,
    sleepQuality: 5,
    anxietyLevel: 6,
    focusScore: 4,
    stressLevel: 7,
    physicalActivity: 20,
    socialInteraction: 2,
  },
  {
    date: "2024-01-12",
    day: "Fri",
    totalHours: 12.1,
    mood: 3,
    sleepHours: 5.8,
    sleepQuality: 4,
    anxietyLevel: 8,
    focusScore: 3,
    stressLevel: 8,
    physicalActivity: 5,
    socialInteraction: 1,
  },
  {
    date: "2024-01-13",
    day: "Sat",
    totalHours: 5.5,
    mood: 9,
    sleepHours: 9.0,
    sleepQuality: 9,
    anxietyLevel: 1,
    focusScore: 8,
    stressLevel: 2,
    physicalActivity: 75,
    socialInteraction: 7,
  },
  {
    date: "2024-01-14",
    day: "Sun",
    totalHours: 6.0,
    mood: 8,
    sleepHours: 8.7,
    sleepQuality: 8,
    anxietyLevel: 2,
    focusScore: 7,
    stressLevel: 3,
    physicalActivity: 55,
    socialInteraction: 6,
  },
  {
    date: "2024-01-15",
    day: "Mon",
    totalHours: 8.8,
    mood: 5,
    sleepHours: 7.1,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 30,
    socialInteraction: 3,
  },
  {
    date: "2024-01-16",
    day: "Tue",
    totalHours: 9.3,
    mood: 5,
    sleepHours: 6.9,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 25,
    socialInteraction: 3,
  },
  {
    date: "2024-01-17",
    day: "Wed",
    totalHours: 7.2,
    mood: 7,
    sleepHours: 8.0,
    sleepQuality: 8,
    anxietyLevel: 3,
    focusScore: 7,
    stressLevel: 4,
    physicalActivity: 45,
    socialInteraction: 5,
  },
  {
    date: "2024-01-18",
    day: "Thu",
    totalHours: 10.8,
    mood: 4,
    sleepHours: 6.3,
    sleepQuality: 5,
    anxietyLevel: 6,
    focusScore: 4,
    stressLevel: 7,
    physicalActivity: 15,
    socialInteraction: 2,
  },
  {
    date: "2024-01-19",
    day: "Fri",
    totalHours: 11.7,
    mood: 3,
    sleepHours: 5.9,
    sleepQuality: 4,
    anxietyLevel: 7,
    focusScore: 3,
    stressLevel: 8,
    physicalActivity: 10,
    socialInteraction: 1,
  },
  {
    date: "2024-01-20",
    day: "Sat",
    totalHours: 6.8,
    mood: 8,
    sleepHours: 8.2,
    sleepQuality: 8,
    anxietyLevel: 2,
    focusScore: 7,
    stressLevel: 3,
    physicalActivity: 65,
    socialInteraction: 6,
  },
  {
    date: "2024-01-21",
    day: "Sun",
    totalHours: 5.2,
    mood: 9,
    sleepHours: 8.8,
    sleepQuality: 9,
    anxietyLevel: 1,
    focusScore: 8,
    stressLevel: 2,
    physicalActivity: 70,
    socialInteraction: 7,
  },
  {
    date: "2024-01-22",
    day: "Mon",
    totalHours: 8.9,
    mood: 6,
    sleepHours: 7.2,
    sleepQuality: 7,
    anxietyLevel: 4,
    focusScore: 6,
    stressLevel: 5,
    physicalActivity: 30,
    socialInteraction: 3,
  },
  {
    date: "2024-01-23",
    day: "Tue",
    totalHours: 9.1,
    mood: 5,
    sleepHours: 7.0,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 25,
    socialInteraction: 3,
  },
  {
    date: "2024-01-24",
    day: "Wed",
    totalHours: 7.6,
    mood: 7,
    sleepHours: 7.9,
    sleepQuality: 8,
    anxietyLevel: 3,
    focusScore: 7,
    stressLevel: 4,
    physicalActivity: 40,
    socialInteraction: 4,
  },
  {
    date: "2024-01-25",
    day: "Thu",
    totalHours: 10.3,
    mood: 4,
    sleepHours: 6.4,
    sleepQuality: 5,
    anxietyLevel: 6,
    focusScore: 4,
    stressLevel: 7,
    physicalActivity: 20,
    socialInteraction: 2,
  },
  {
    date: "2024-01-26",
    day: "Fri",
    totalHours: 11.9,
    mood: 3,
    sleepHours: 5.7,
    sleepQuality: 4,
    anxietyLevel: 8,
    focusScore: 3,
    stressLevel: 8,
    physicalActivity: 8,
    socialInteraction: 1,
  },
  {
    date: "2024-01-27",
    day: "Sat",
    totalHours: 6.5,
    mood: 8,
    sleepHours: 8.4,
    sleepQuality: 8,
    anxietyLevel: 2,
    focusScore: 7,
    stressLevel: 3,
    physicalActivity: 60,
    socialInteraction: 6,
  },
  {
    date: "2024-01-28",
    day: "Sun",
    totalHours: 5.9,
    mood: 8,
    sleepHours: 8.6,
    sleepQuality: 8,
    anxietyLevel: 2,
    focusScore: 7,
    stressLevel: 3,
    physicalActivity: 55,
    socialInteraction: 5,
  },
  {
    date: "2024-01-29",
    day: "Mon",
    totalHours: 8.6,
    mood: 6,
    sleepHours: 7.3,
    sleepQuality: 7,
    anxietyLevel: 4,
    focusScore: 6,
    stressLevel: 5,
    physicalActivity: 35,
    socialInteraction: 4,
  },
  {
    date: "2024-01-30",
    day: "Tue",
    totalHours: 9.4,
    mood: 5,
    sleepHours: 6.8,
    sleepQuality: 6,
    anxietyLevel: 5,
    focusScore: 5,
    stressLevel: 6,
    physicalActivity: 20,
    socialInteraction: 3,
  },
]

// Detailed app usage data with mental health impact
export const appUsageData: AppUsageData[] = [
  {
    name: "Instagram",
    category: "Social Media",
    hours: 2.8,
    sessions: 45,
    avgSessionLength: 3.7,
    color: "hsl(var(--chart-1))",
    mentalHealthImpact: "negative",
  },
  {
    name: "TikTok",
    category: "Social Media",
    hours: 2.1,
    sessions: 38,
    avgSessionLength: 3.3,
    color: "hsl(var(--chart-1))",
    mentalHealthImpact: "negative",
  },
  {
    name: "Facebook",
    category: "Social Media",
    hours: 1.3,
    sessions: 22,
    avgSessionLength: 3.5,
    color: "hsl(var(--chart-1))",
    mentalHealthImpact: "negative",
  },
  {
    name: "Slack",
    category: "Work/Productivity",
    hours: 3.2,
    sessions: 28,
    avgSessionLength: 6.9,
    color: "hsl(var(--chart-2))",
    mentalHealthImpact: "neutral",
  },
  {
    name: "Notion",
    category: "Work/Productivity",
    hours: 1.8,
    sessions: 15,
    avgSessionLength: 7.2,
    color: "hsl(var(--chart-2))",
    mentalHealthImpact: "positive",
  },
  {
    name: "VS Code",
    category: "Work/Productivity",
    hours: 2.5,
    sessions: 12,
    avgSessionLength: 12.5,
    color: "hsl(var(--chart-2))",
    mentalHealthImpact: "positive",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    hours: 2.2,
    sessions: 8,
    avgSessionLength: 16.5,
    color: "hsl(var(--chart-3))",
    mentalHealthImpact: "neutral",
  },
  {
    name: "YouTube",
    category: "Entertainment",
    hours: 1.9,
    sessions: 25,
    avgSessionLength: 4.6,
    color: "hsl(var(--chart-3))",
    mentalHealthImpact: "neutral",
  },
  {
    name: "Spotify",
    category: "Entertainment",
    hours: 1.1,
    sessions: 18,
    avgSessionLength: 3.7,
    color: "hsl(var(--chart-3))",
    mentalHealthImpact: "positive",
  },
  {
    name: "WhatsApp",
    category: "Communication",
    hours: 1.2,
    sessions: 35,
    avgSessionLength: 2.1,
    color: "hsl(var(--chart-4))",
    mentalHealthImpact: "positive",
  },
  {
    name: "Discord",
    category: "Communication",
    hours: 0.8,
    sessions: 12,
    avgSessionLength: 4.0,
    color: "hsl(var(--chart-4))",
    mentalHealthImpact: "positive",
  },
  {
    name: "Headspace",
    category: "Health & Wellness",
    hours: 0.3,
    sessions: 7,
    avgSessionLength: 2.6,
    color: "hsl(var(--chart-5))",
    mentalHealthImpact: "positive",
  },
  {
    name: "Calm",
    category: "Health & Wellness",
    hours: 0.2,
    sessions: 5,
    avgSessionLength: 2.4,
    color: "hsl(var(--chart-5))",
    mentalHealthImpact: "positive",
  },
  {
    name: "News Apps",
    category: "Information",
    hours: 0.9,
    sessions: 20,
    avgSessionLength: 2.7,
    color: "hsl(var(--destructive))",
    mentalHealthImpact: "negative",
  },
]

// Weekly trends over 8 weeks
export const weeklyTrendData: WeeklyTrendData[] = [
  { week: "Week 1", screenTime: 58, mood: 5.2, anxiety: 5.1, sleep: 7.0, focus: 5.3, stress: 5.8, productivity: 6.2 },
  { week: "Week 2", screenTime: 62, mood: 4.8, anxiety: 5.6, sleep: 6.7, focus: 4.9, stress: 6.2, productivity: 5.8 },
  { week: "Week 3", screenTime: 45, mood: 6.8, anxiety: 3.2, sleep: 8.1, focus: 7.1, stress: 3.8, productivity: 7.5 },
  { week: "Week 4", screenTime: 67, mood: 4.2, anxiety: 6.8, sleep: 6.2, focus: 4.1, stress: 7.1, productivity: 5.2 },
  { week: "Week 5", screenTime: 52, mood: 5.9, anxiety: 4.3, sleep: 7.4, focus: 6.2, stress: 4.9, productivity: 6.8 },
  { week: "Week 6", screenTime: 48, mood: 6.5, anxiety: 3.8, sleep: 7.8, focus: 6.8, stress: 4.2, productivity: 7.2 },
  { week: "Week 7", screenTime: 71, mood: 3.9, anxiety: 7.2, sleep: 5.9, focus: 3.8, stress: 7.8, productivity: 4.9 },
  { week: "Week 8", screenTime: 43, mood: 7.1, anxiety: 2.9, sleep: 8.3, focus: 7.4, stress: 3.5, productivity: 7.8 },
]

// Hourly usage patterns
export const hourlyUsageData: HourlyUsageData[] = [
  { hour: "6 AM", usage: 0.2, mood: 6, alertness: 4 },
  { hour: "7 AM", usage: 0.8, mood: 6, alertness: 5 },
  { hour: "8 AM", usage: 1.2, mood: 6, alertness: 6 },
  { hour: "9 AM", usage: 2.1, mood: 6, alertness: 7 },
  { hour: "10 AM", usage: 2.8, mood: 6, alertness: 8 },
  { hour: "11 AM", usage: 3.2, mood: 6, alertness: 8 },
  { hour: "12 PM", usage: 2.9, mood: 6, alertness: 7 },
  { hour: "1 PM", usage: 2.1, mood: 6, alertness: 6 },
  { hour: "2 PM", usage: 3.5, mood: 5, alertness: 6 },
  { hour: "3 PM", usage: 4.1, mood: 5, alertness: 5 },
  { hour: "4 PM", usage: 3.8, mood: 5, alertness: 5 },
  { hour: "5 PM", usage: 3.2, mood: 5, alertness: 6 },
  { hour: "6 PM", usage: 2.8, mood: 6, alertness: 6 },
  { hour: "7 PM", usage: 3.5, mood: 6, alertness: 5 },
  { hour: "8 PM", usage: 4.2, mood: 5, alertness: 4 },
  { hour: "9 PM", usage: 4.8, mood: 5, alertness: 3 },
  { hour: "10 PM", usage: 3.9, mood: 4, alertness: 3 },
  { hour: "11 PM", usage: 2.1, mood: 4, alertness: 2 },
]

// Correlation analysis data
export const correlationData: CorrelationData[] = [
  {
    metric: "Screen Time vs Mood",
    correlation: -0.78,
    significance: "high",
    description: "Strong negative correlation: Higher screen time associated with lower mood scores",
  },
  {
    metric: "Screen Time vs Sleep Quality",
    correlation: -0.72,
    significance: "high",
    description: "High screen time significantly impacts sleep quality",
  },
  {
    metric: "Screen Time vs Anxiety",
    correlation: 0.81,
    significance: "high",
    description: "Strong positive correlation: More screen time linked to higher anxiety",
  },
  {
    metric: "Screen Time vs Focus",
    correlation: -0.69,
    significance: "high",
    description: "Extended screen time reduces focus and concentration ability",
  },
  {
    metric: "Social Media vs Anxiety",
    correlation: 0.85,
    significance: "high",
    description: "Social media usage strongly correlates with increased anxiety levels",
  },
  {
    metric: "Physical Activity vs Mood",
    correlation: 0.74,
    significance: "high",
    description: "More physical activity associated with better mood scores",
  },
  {
    metric: "Sleep Quality vs Focus",
    correlation: 0.76,
    significance: "high",
    description: "Better sleep quality leads to improved focus and productivity",
  },
  {
    metric: "Evening Screen Time vs Sleep",
    correlation: -0.83,
    significance: "high",
    description: "Screen time after 9 PM severely impacts sleep quality",
  },
]

// Helper functions for data analysis
export const getWeeklyAverage = (data: DailyScreenTimeData[], metric: keyof DailyScreenTimeData): number => {
  const lastWeek = data.slice(-7)
  const sum = lastWeek.reduce((acc, day) => acc + (day[metric] as number), 0)
  return sum / lastWeek.length
}

export const getCorrelation = (x: number[], y: number[]): number => {
  const n = x.length
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0)
  const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0)
  const sumYY = y.reduce((acc, yi) => acc + yi * yi, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))

  return numerator / denominator
}

export const getMoodTrend = (data: DailyScreenTimeData[]): "improving" | "declining" | "stable" => {
  const recent = data.slice(-7).map((d) => d.mood)
  const earlier = data.slice(-14, -7).map((d) => d.mood)

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length

  const difference = recentAvg - earlierAvg

  if (difference > 0.5) return "improving"
  if (difference < -0.5) return "declining"
  return "stable"
}
