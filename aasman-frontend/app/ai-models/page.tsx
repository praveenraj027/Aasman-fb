"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Upload,
  Play,
  BarChart3,
  Target,
  TrendingUp,
  Cpu,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Settings,
  Eye,
  MapPin,
} from "lucide-react"

const modelTypes = [
  { id: "random_forest", name: "Random Forest", description: "Ensemble method with high accuracy" },
  { id: "regression", name: "Linear Regression", description: "Fast and interpretable baseline model" },
  { id: "deep_learning", name: "Deep Neural Network", description: "Complex patterns with high capacity" },
  { id: "xgboost", name: "XGBoost", description: "Gradient boosting with excellent performance" },
]

const mockMetrics = {
  random_forest: { mae: 12.3, rmse: 18.7, r2: 0.89, accuracy: 92 },
  regression: { mae: 18.9, rmse: 25.4, r2: 0.76, accuracy: 84 },
  deep_learning: { mae: 10.1, rmse: 15.2, r2: 0.94, accuracy: 96 },
  xgboost: { mae: 11.8, rmse: 17.3, r2: 0.91, accuracy: 94 },
}

export default function AIModelsPage() {
  const [selectedModel, setSelectedModel] = useState("random_forest")
  const [trainingStatus, setTrainingStatus] = useState("idle") // idle, training, completed
  const [trainingProgress, setTrainingProgress] = useState(0)

  const handleTraining = () => {
    setTrainingStatus("training")
    setTrainingProgress(0)

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTrainingStatus("completed")
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI/ML Model Interface</h1>
            <p className="text-lg text-muted-foreground">
              Train, evaluate, and deploy machine learning models for air quality prediction
            </p>
          </div>

          <Tabs defaultValue="trainer" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="trainer" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Model Trainer</span>
              </TabsTrigger>
              <TabsTrigger value="predictor" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Blind Zone Predictor</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Model Comparison</span>
              </TabsTrigger>
            </TabsList>

            {/* Model Trainer */}
            <TabsContent value="trainer" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Training Configuration */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="w-5 h-5 mr-2" />
                        Training Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="dataset">Dataset Source</Label>
                        <Select defaultValue="combined">
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="combined">Combined Dataset</SelectItem>
                            <SelectItem value="satellite">Satellite Only</SelectItem>
                            <SelectItem value="ground">Ground Sensors Only</SelectItem>
                            <SelectItem value="atmospheric">Atmospheric Models</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="upload">Upload Custom Data</Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Drop CSV files here or click to browse</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <span>Training samples:</span>
                          <span className="font-medium">1,247,892</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Validation samples:</span>
                          <span className="font-medium">311,973</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Features:</span>
                          <span className="font-medium">23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Model Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="model-type">Model Type</Label>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {modelTypes.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {modelTypes.find((m) => m.id === selectedModel)?.description}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="epochs">Training Epochs</Label>
                        <Input id="epochs" type="number" defaultValue="100" className="bg-background/50" />
                      </div>

                      <div>
                        <Label htmlFor="learning-rate">Learning Rate</Label>
                        <Input
                          id="learning-rate"
                          type="number"
                          step="0.001"
                          defaultValue="0.001"
                          className="bg-background/50"
                        />
                      </div>

                      <Button onClick={handleTraining} disabled={trainingStatus === "training"} className="w-full">
                        {trainingStatus === "training" ? (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            Training...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Training
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Training Progress & Results */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cpu className="w-5 h-5 mr-2" />
                        Training Progress
                      </CardTitle>
                      <CardDescription>
                        {trainingStatus === "idle" && "Ready to start training"}
                        {trainingStatus === "training" && "Model training in progress..."}
                        {trainingStatus === "completed" && "Training completed successfully"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {trainingStatus !== "idle" && (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-muted-foreground">{Math.round(trainingProgress)}%</span>
                            </div>
                            <Progress value={trainingProgress} className="h-2" />
                          </div>

                          {trainingStatus === "training" && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center justify-between">
                                <span>Epoch:</span>
                                <span className="font-medium">{Math.floor((trainingProgress / 100) * 100)}/100</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Loss:</span>
                                <span className="font-medium">{(0.5 - (trainingProgress / 100) * 0.3).toFixed(4)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Accuracy:</span>
                                <span className="font-medium">{(60 + (trainingProgress / 100) * 35).toFixed(1)}%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>ETA:</span>
                                <span className="font-medium">
                                  {Math.max(0, Math.floor((100 - trainingProgress) / 10))} min
                                </span>
                              </div>
                            </div>
                          )}

                          {trainingStatus === "completed" && (
                            <div className="flex items-center space-x-2 text-green-400">
                              <CheckCircle className="w-5 h-5" />
                              <span>Model trained successfully and saved</span>
                            </div>
                          )}
                        </div>
                      )}

                      {trainingStatus === "idle" && (
                        <div className="text-center py-8">
                          <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Configure your model settings and click "Start Training" to begin
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  {(trainingStatus === "completed" || trainingStatus === "idle") && (
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          Performance Metrics
                        </CardTitle>
                        <CardDescription>Model evaluation results</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {mockMetrics[selectedModel as keyof typeof mockMetrics].mae}
                            </div>
                            <p className="text-sm text-muted-foreground">MAE</p>
                          </div>
                          <div className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-accent">
                              {mockMetrics[selectedModel as keyof typeof mockMetrics].rmse}
                            </div>
                            <p className="text-sm text-muted-foreground">RMSE</p>
                          </div>
                          <div className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-chart-4">
                              {mockMetrics[selectedModel as keyof typeof mockMetrics].r2}
                            </div>
                            <p className="text-sm text-muted-foreground">R²</p>
                          </div>
                          <div className="text-center p-4 bg-secondary/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">
                              {mockMetrics[selectedModel as keyof typeof mockMetrics].accuracy}%
                            </div>
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                          <Button variant="outline" className="bg-transparent">
                            <Download className="w-4 h-4 mr-2" />
                            Export Model
                          </Button>
                          <Button variant="outline" className="bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Blind Zone Predictor */}
            <TabsContent value="predictor" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Blind Zone Prediction
                    </CardTitle>
                    <CardDescription>AI/ML predictions for areas without monitoring stations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                      <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Sensor-less Region Coverage</h3>
                      <div className="text-3xl font-bold text-primary mb-2">78%</div>
                      <p className="text-sm text-muted-foreground">
                        of India covered by AI predictions where sensors are missing
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <span className="text-sm font-medium">Rural Areas</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          85% Coverage
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <span className="text-sm font-medium">Remote Regions</span>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          67% Coverage
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <span className="text-sm font-medium">Mountainous Areas</span>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                          52% Coverage
                        </Badge>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Prediction Map
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Validation Results
                    </CardTitle>
                    <CardDescription>Comparison against CPCB ground truth data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">92%</div>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">±15</div>
                        <p className="text-sm text-muted-foreground">Avg Error</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">PM2.5 Prediction</span>
                          <span className="text-sm text-green-400">94% accurate</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">PM10 Prediction</span>
                          <span className="text-sm text-green-400">89% accurate</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Overall AQI</span>
                          <span className="text-sm text-green-400">92% accurate</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <AlertCircle className="w-4 h-4" />
                        <span>Validated against 1,247 ground truth measurements</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Prediction Confidence Map</CardTitle>
                  <CardDescription>Confidence levels for AI predictions across different regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-64 bg-gradient-to-br from-background to-secondary/20 rounded-lg overflow-hidden">
                    {/* Simulated confidence map */}
                    <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/20 rounded-lg"></div>

                    {/* Confidence regions */}
                    <div className="absolute top-8 left-8 w-16 h-12 bg-green-500/30 rounded-lg"></div>
                    <div className="absolute top-12 right-12 w-20 h-16 bg-yellow-500/30 rounded-lg"></div>
                    <div className="absolute bottom-12 left-16 w-12 h-10 bg-orange-500/30 rounded-lg"></div>
                    <div className="absolute bottom-8 right-8 w-14 h-14 bg-red-500/30 rounded-lg"></div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                      <p className="text-xs font-medium text-foreground mb-2">Confidence Levels</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">High (90%+)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Medium (70-90%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Low (50-70%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Very Low (&lt;50%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Model Comparison */}
            <TabsContent value="comparison" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Model Performance Comparison
                  </CardTitle>
                  <CardDescription>Compare different ML models and their performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4">Model</th>
                          <th className="text-center py-3 px-4">MAE</th>
                          <th className="text-center py-3 px-4">RMSE</th>
                          <th className="text-center py-3 px-4">R²</th>
                          <th className="text-center py-3 px-4">Accuracy</th>
                          <th className="text-center py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modelTypes.map((model) => {
                          const metrics = mockMetrics[model.id as keyof typeof mockMetrics]
                          return (
                            <tr key={model.id} className="border-b border-border/50">
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium">{model.name}</p>
                                  <p className="text-sm text-muted-foreground">{model.description}</p>
                                </div>
                              </td>
                              <td className="text-center py-3 px-4 font-medium">{metrics.mae}</td>
                              <td className="text-center py-3 px-4 font-medium">{metrics.rmse}</td>
                              <td className="text-center py-3 px-4 font-medium">{metrics.r2}</td>
                              <td className="text-center py-3 px-4 font-medium">{metrics.accuracy}%</td>
                              <td className="text-center py-3 px-4">
                                <Badge
                                  variant="outline"
                                  className={
                                    model.id === "deep_learning"
                                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                                      : "bg-primary/10 text-primary border-primary/20"
                                  }
                                >
                                  {model.id === "deep_learning" ? "Best" : "Trained"}
                                </Badge>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <Button variant="outline" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export Comparison
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Zap className="w-4 h-4 mr-2" />
                      Deploy Best Model
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Model Artifacts</CardTitle>
                    <CardDescription>Saved models and version history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "deep_learning_v2.1", date: "2025-01-20", size: "45.2 MB", status: "Active" },
                      { name: "xgboost_v1.8", date: "2025-01-19", size: "12.8 MB", status: "Archived" },
                      { name: "random_forest_v3.0", date: "2025-01-18", size: "8.4 MB", status: "Archived" },
                    ].map((artifact) => (
                      <div
                        key={artifact.name}
                        className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{artifact.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {artifact.date} • {artifact.size}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            artifact.status === "Active"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-muted/10 text-muted-foreground border-muted/20"
                          }
                        >
                          {artifact.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Training History</CardTitle>
                    <CardDescription>Recent training sessions and results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { model: "Deep Learning", date: "2025-01-20", duration: "2h 34m", accuracy: "96%" },
                      { model: "XGBoost", date: "2025-01-19", duration: "45m", accuracy: "94%" },
                      { model: "Random Forest", date: "2025-01-18", duration: "23m", accuracy: "92%" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <div>
                          <p className="font-medium">{session.model}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-400">{session.accuracy}</p>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
