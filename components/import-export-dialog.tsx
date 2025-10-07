"use client"

import { useState } from "react"

import type React from "react"
import { useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, FileText, FileSpreadsheet, Info, Database, BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraphicalVisualization } from "./graphical-visualization"

interface ImportExportDialogProps {
  type: "import" | "export"
  onImport?: (data: any) => void
  onExport?: (format: "pdf" | "excel" | "original") => void
}

export function ImportExportDialog({ type, onImport, onExport }: ImportExportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importData, setImportData] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [importedData, setImportedData] = useState<any>(null)
  const [showVisualization, setShowVisualization] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Simulate file reading
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setImportData(content.substring(0, 500) + "...")
      }
      reader.readAsText(file)
    }
  }

  const handleImport = () => {
    if (!selectedFile) return

    setIsProcessing(true)
    timeoutRef.current = setTimeout(() => {
      // Mock imported data structure
      const mockData = {
        totalRecords: 30,
        dateRange: "2024-01-01 to 2024-01-30",
        metrics: ["screenTime", "mood", "sleep", "anxiety", "focus"],
        apps: 15,
        categories: 5,
      }

      setImportedData(mockData)
      onImport?.(mockData)
      setIsProcessing(false)
      timeoutRef.current = null
    }, 2000)
  }

  const handleExport = (format: "pdf" | "excel" | "original") => {
    setIsProcessing(true)
    timeoutRef.current = setTimeout(() => {
      onExport?.(format)
      setIsProcessing(false)
      timeoutRef.current = null
    }, 1500)
  }

  if (type === "import") {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Import Dataset
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full h-full sm:w-screen sm:h-screen max-w-none max-h-none m-0 sm:rounded-none md:w-[90vw] md:h-[90vh] md:max-w-6xl md:rounded-lg lg:w-[80vw] lg:h-[85vh] overflow-y-auto bg-gradient-to-br from-background to-muted/20 border-2 border-border/50 shadow-2xl">
            <DialogHeader>
              <DialogTitle>Import Screen Time Dataset</DialogTitle>
              <DialogDescription>
                Upload your screen time and mental health data to analyze patterns and trends
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="format">Data Format</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Select Dataset File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".json,.csv,.xlsx"
                      onChange={handleFileSelect}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Supported formats: JSON, CSV, Excel (.xlsx)</p>
                  </div>

                  {selectedFile && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">File Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Filename:</span>
                          <span className="font-mono">{selectedFile.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Size:</span>
                          <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Type:</span>
                          <Badge variant="outline">{selectedFile.type || "Unknown"}</Badge>
                        </div>

                        {importData && (
                          <div className="mt-3">
                            <Label className="text-xs">Data Preview:</Label>
                            <Textarea value={importData} readOnly className="mt-1 text-xs font-mono h-20" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button onClick={handleImport} disabled={!selectedFile || isProcessing} className="gap-2">
                      {isProcessing ? "Processing..." : "Import Data"}
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>

                  {importedData && (
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-green-700">Dataset Imported Successfully!</h4>
                            <p className="text-sm text-green-600">
                              {importedData.totalRecords} records imported from {importedData.dateRange}
                            </p>
                          </div>
                          <Button
                            onClick={() => setShowVisualization(true)}
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                          >
                            <BarChart3 className="h-4 w-4" />
                            Graphical Representation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="format" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Info className="h-4 w-4" />
                      Dataset Information & Format Guide
                    </CardTitle>
                    <CardDescription>
                      Understanding your screen time data structure and mental health metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-base mb-3">Field Explanations</h4>

                      <div className="grid grid-cols-1 gap-4">
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-blue-700">Core Metrics</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">date:</span>
                                <span className="text-muted-foreground">Recording date (YYYY-MM-DD format)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">totalScreenTime:</span>
                                <span className="text-muted-foreground">Daily device usage in hours (e.g., 8.5)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">sleepHours:</span>
                                <span className="text-muted-foreground">Sleep duration in hours (e.g., 7.5)</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-green-700">Mental Health Indicators</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">mood:</span>
                                <span className="text-muted-foreground">Overall mood (1=very sad, 10=very happy)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">anxietyLevel:</span>
                                <span className="text-muted-foreground">
                                  Anxiety intensity (1=calm, 10=very anxious)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">focusScore:</span>
                                <span className="text-muted-foreground">
                                  Concentration ability (1=distracted, 10=focused)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">stressLevel:</span>
                                <span className="text-muted-foreground">
                                  Stress intensity (1=relaxed, 10=overwhelmed)
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-purple-500">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-purple-700">Lifestyle Factors</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">physicalActivity:</span>
                                <span className="text-muted-foreground">Exercise time in minutes (e.g., 45)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">socialInteraction:</span>
                                <span className="text-muted-foreground">
                                  Face-to-face social time in hours (e.g., 2.5)
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-orange-500">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-orange-700">App Usage Details</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">appUsage:</span>
                                <span className="text-muted-foreground">Array of app objects with usage data</span>
                              </div>
                              <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                                <div>• name: App name (e.g., "Instagram")</div>
                                <div>• hours: Time spent in hours (e.g., 2.1)</div>
                                <div>• category: App type (Social, Productivity, Entertainment, etc.)</div>
                                <div>• mentalHealthImpact: Impact rating (-5 to +5)</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">Complete Sample Entry</h4>
                      <div className="p-4 bg-muted rounded-lg">
                        <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                          {`{
    "date": "2024-01-15",
    "totalScreenTime": 8.5,
    "mood": 7,
    "sleepHours": 7.5,
    "anxietyLevel": 3,
    "focusScore": 8,
    "stressLevel": 4,
    "physicalActivity": 45,
    "socialInteraction": 2.5,
    "appUsage": [
      {
        "name": "Instagram",
        "hours": 2.1,
        "category": "Social",
        "mentalHealthImpact": -2
      },
      {
        "name": "Meditation App",
        "hours": 0.5,
        "category": "Health",
        "mentalHealthImpact": 4
      },
      {
        "name": "Work Email",
        "hours": 1.8,
        "category": "Productivity",
        "mentalHealthImpact": -1
      }
    ]
  }`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">Data Quality Tips</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-blue-700">✓ Best Practices</h5>
                            <ul className="text-xs space-y-1 text-blue-600">
                              <li>• Record data at the same time daily</li>
                              <li>• Use consistent rating scales</li>
                              <li>• Include at least 7 days of data</li>
                              <li>• Be honest with self-assessments</li>
                              <li>• Track major life events separately</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-amber-50 border-amber-200">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-sm mb-2 text-amber-700">⚠ Common Issues</h5>
                            <ul className="text-xs space-y-1 text-amber-600">
                              <li>• Missing dates create gaps in analysis</li>
                              <li>• Inconsistent scales affect correlations</li>
                              <li>• Extreme outliers may skew results</li>
                              <li>• Too few data points limit insights</li>
                              <li>• Mixed time zones cause confusion</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">What You'll Get</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Badge variant="outline" className="p-2 justify-center">
                          Trend Analysis
                        </Badge>
                        <Badge variant="outline" className="p-2 justify-center">
                          Correlations
                        </Badge>
                        <Badge variant="outline" className="p-2 justify-center">
                          App Impact
                        </Badge>
                        <Badge variant="outline" className="p-2 justify-center">
                          Recommendations
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our dashboard will analyze your data to identify patterns between screen time and mental health,
                        highlight problematic apps, suggest optimal usage times, and provide personalized wellness
                        recommendations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        <GraphicalVisualization
          isOpen={showVisualization}
          onClose={() => setShowVisualization(false)}
          data={importedData}
        />
      </>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:w-screen sm:h-screen max-w-none max-h-none m-0 sm:rounded-none md:w-[90vw] md:h-[90vh] md:max-w-6xl md:rounded-lg lg:w-[80vw] lg:h-[85vh] overflow-y-auto bg-gradient-to-br from-background to-muted/20 border-2 border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Export Screen Time Analysis</DialogTitle>
          <DialogDescription>Download your screen time data and analysis in your preferred format</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="font-semibold">PDF Report</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive analysis with charts and insights</p>
                    </div>
                  </div>
                  <Button onClick={() => handleExport("pdf")} disabled={isProcessing} size="sm">
                    {isProcessing ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Excel Spreadsheet</h3>
                      <p className="text-sm text-muted-foreground">Raw data with calculations for further analysis</p>
                    </div>
                  </div>
                  <Button onClick={() => handleExport("excel")} disabled={isProcessing} size="sm">
                    {isProcessing ? "Generating..." : "Download Excel"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        Original Quality Dataset
                        <Badge variant="secondary" className="text-xs">
                          Premium
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Complete unprocessed data with full precision and metadata
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleExport("original")}
                    disabled={isProcessing}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? "Preparing..." : "Download Original"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Export Includes:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Daily screen time and mental health metrics</li>
              <li>• App usage breakdown and categorization</li>
              <li>• Trend analysis and correlation insights</li>
              <li>• Personalized recommendations</li>
              <li>• Visual charts and graphs (PDF only)</li>
              <li>
                • <strong>Original Quality:</strong> Raw timestamps, device metadata, and unrounded values
              </li>
            </ul>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-blue-700 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Original Quality Export Details
            </h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>
                • <strong>Full Precision:</strong> Exact timestamps down to seconds, unrounded decimal values
              </li>
              <li>
                • <strong>Complete Metadata:</strong> Device info, app versions, location data (if available)
              </li>
              <li>
                • <strong>Raw Sensor Data:</strong> Accelerometer, gyroscope readings during usage
              </li>
              <li>
                • <strong>Interaction Patterns:</strong> Touch frequency, scroll velocity, typing patterns
              </li>
              <li>
                • <strong>Research Grade:</strong> Suitable for academic studies and detailed analysis
              </li>
              <li>
                • <strong>Format:</strong> JSON with nested objects preserving all original data structure
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
