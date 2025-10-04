"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Satellite,
  Wifi,
  Cloud,
  Filter,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Settings,
  Activity,
  Globe,
  BarChart3,
  RefreshCw,
  Download,
  Eye,
} from "lucide-react"

const pipelineStages = [
  {
    id: "ingestion",
    title: "Data Ingestion",
    description: "Collect data from multiple sources",
    icon: Database,
    status: "active",
    progress: 95,
    sources: [
      { name: "INSAT-3D Satellite", status: "active", rate: "1.2 MB/s" },
      { name: "CPCB Ground Sensors", status: "active", rate: "850 KB/s" },
      { name: "MERRA-2 Atmospheric", status: "active", rate: "650 KB/s" },
      { name: "NARR Weather Data", status: "warning", rate: "420 KB/s" },
    ],
  },
  {
    id: "cleaning",
    title: "Data Cleaning",
    description: "Remove outliers and validate data quality",
    icon: Filter,
    status: "active",
    progress: 88,
    metrics: {
      processed: "2.4M",
      cleaned: "2.1M",
      outliers: "0.3M",
      quality: "87%",
    },
  },
  {
    id: "alignment",
    title: "Data Alignment",
    description: "Synchronize temporal and spatial data",
    icon: Zap,
    status: "active",
    progress: 92,
    metrics: {
      temporal: "98%",
      spatial: "94%",
      synchronized: "1.9M",
      conflicts: "45K",
    },
  },
  {
    id: "engineering",
    title: "Feature Engineering",
    description: "Extract and transform features for ML",
    icon: Settings,
    status: "completed",
    progress: 100,
    features: [
      { name: "Meteorological Features", count: 12, status: "ready" },
      { name: "Temporal Features", count: 8, status: "ready" },
      { name: "Spatial Features", count: 6, status: "ready" },
      { name: "Derived Features", count: 15, status: "ready" },
    ],
  },
]

export default function PipelinePage() {
  const [selectedStage, setSelectedStage] = useState("ingestion")

  const currentStage = pipelineStages.find((stage) => stage.id === selectedStage)

  return (
    <div className="min-h-screen bg-background">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Data Fusion & Cleaning Pipeline</h1>
            <p className="text-lg text-muted-foreground">
              Real-time data processing pipeline for multi-source air quality data integration
            </p>
          </div>

          {/* Pipeline Overview */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Pipeline Status
              </CardTitle>
              <CardDescription>Overall system health and processing metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">98.7%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.4M</div>
                  <p className="text-sm text-muted-foreground">Records/Day</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">3.2s</div>
                  <p className="text-sm text-muted-foreground">Avg Latency</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">87%</div>
                  <p className="text-sm text-muted-foreground">Data Quality</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Flow Visualization */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <CardHeader>
              <CardTitle>Pipeline Flow</CardTitle>
              <CardDescription>Interactive visualization of the data processing pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {pipelineStages.map((stage, index) => {
                  const Icon = stage.icon
                  return (
                    <div key={stage.id} className="flex items-center">
                      <button
                        onClick={() => setSelectedStage(stage.id)}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                          selectedStage === stage.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary/20 hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            stage.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : stage.status === "completed"
                                ? "bg-primary/20 text-primary"
                                : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-medium text-sm text-center">{stage.title}</h3>
                        <p className="text-xs text-muted-foreground text-center mt-1">{stage.description}</p>
                        <div className="mt-2 w-full">
                          <Progress value={stage.progress} className="h-1" />
                          <p className="text-xs text-center mt-1">{stage.progress}%</p>
                        </div>
                      </button>
                      {index < pipelineStages.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-muted-foreground mx-2 hidden lg:block" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stage Details */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {currentStage && <currentStage.icon className="w-5 h-5 mr-2" />}
                    {currentStage?.title} Details
                  </CardTitle>
                  <CardDescription>{currentStage?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStage === "ingestion" && currentStage && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <div className="text-2xl font-bold text-primary">4</div>
                          <p className="text-sm text-muted-foreground">Active Sources</p>
                        </div>
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <div className="text-2xl font-bold text-accent">2.9 MB/s</div>
                          <p className="text-sm text-muted-foreground">Total Throughput</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Data Sources</h4>
                        {currentStage.sources?.map((source) => (
                          <div
                            key={source.name}
                            className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  source.status === "active" ? "bg-green-400" : "bg-orange-400"
                                }`}
                              ></div>
                              <span className="font-medium">{source.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{source.rate}</p>
                              <Badge
                                variant="outline"
                                className={
                                  source.status === "active"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                }
                              >
                                {source.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStage === "cleaning" && currentStage && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(currentStage.metrics || {}).map(([key, value]) => (
                          <div key={key} className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{value}</div>
                            <p className="text-sm text-muted-foreground capitalize">{key.replace("_", " ")}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Cleaning Operations</h4>
                        {[
                          { name: "Outlier Detection", status: "active", processed: "98%" },
                          { name: "Missing Value Imputation", status: "active", processed: "94%" },
                          { name: "Data Validation", status: "active", processed: "91%" },
                          { name: "Quality Scoring", status: "completed", processed: "100%" },
                        ].map((operation) => (
                          <div
                            key={operation.name}
                            className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                          >
                            <span className="font-medium">{operation.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{operation.processed}</span>
                              <Badge
                                variant="outline"
                                className={
                                  operation.status === "active"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : "bg-primary/10 text-primary border-primary/20"
                                }
                              >
                                {operation.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStage === "alignment" && currentStage && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(currentStage.metrics || {}).map(([key, value]) => (
                          <div key={key} className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{value}</div>
                            <p className="text-sm text-muted-foreground capitalize">{key.replace("_", " ")}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Alignment Progress</h4>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Temporal Synchronization</span>
                            <span className="text-sm text-green-400">98%</span>
                          </div>
                          <Progress value={98} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Spatial Alignment</span>
                            <span className="text-sm text-green-400">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Cross-source Validation</span>
                            <span className="text-sm text-yellow-400">87%</span>
                          </div>
                          <Progress value={87} className="h-2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStage === "engineering" && currentStage && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <div className="text-2xl font-bold text-primary">41</div>
                          <p className="text-sm text-muted-foreground">Total Features</p>
                        </div>
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-400">100%</div>
                          <p className="text-sm text-muted-foreground">Ready</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Feature Categories</h4>
                        {currentStage.features?.map((feature) => (
                          <div
                            key={feature.name}
                            className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-muted-foreground">{feature.count} features</p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                              {feature.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* System Controls */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Pipeline Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restart Pipeline
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Sources
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">NARR Data Delay</p>
                      <p className="text-xs text-muted-foreground">15 min delay in weather data</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-400">Pipeline Healthy</p>
                      <p className="text-xs text-muted-foreground">All systems operational</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <BarChart3 className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-400">High Throughput</p>
                      <p className="text-xs text-muted-foreground">Processing 120% of avg load</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                  <CardDescription>Connected data providers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "INSAT-3D", icon: Satellite, status: "active" },
                    { name: "CPCB Network", icon: Wifi, status: "active" },
                    { name: "MERRA-2", icon: Cloud, status: "active" },
                    { name: "NARR", icon: Globe, status: "warning" },
                  ].map((source) => {
                    const Icon = source.icon
                    return (
                      <div
                        key={source.name}
                        className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            source.status === "active"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          }
                        >
                          {source.status}
                        </Badge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
