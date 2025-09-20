"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Cloud,
  Sun,
  Wind,
  Droplets,
} from "lucide-react"

const mockForecastData = {
  location: "Mumbai, Maharashtra",
  current: {
    aqi: 89,
    level: "Moderate",
    color: "bg-yellow-500",
    pm25: 65,
    pm10: 89,
    temperature: 28,
    humidity: 72,
    windSpeed: 12,
  },
  hourly: [
    { time: "Now", aqi: 89, confidence: 95 },
    { time: "1h", aqi: 92, confidence: 93 },
    { time: "2h", aqi: 87, confidence: 91 },
    { time: "3h", aqi: 85, confidence: 89 },
    { time: "4h", aqi: 88, confidence: 87 },
    { time: "5h", aqi: 94, confidence: 85 },
    { time: "6h", aqi: 98, confidence: 83 },
    { time: "7h", aqi: 102, confidence: 81 },
  ],
  daily: [
    { day: "Today", aqi: 89, trend: "stable", high: 102, low: 78, confidence: 95 },
    { day: "Tomorrow", aqi: 95, trend: "up", high: 108, low: 82, confidence: 88 },
    { day: "Day 3", aqi: 78, trend: "down", high: 89, low: 67, confidence: 82 },
    { day: "Day 4", aqi: 72, trend: "down", high: 85, low: 59, confidence: 76 },
    { day: "Day 5", aqi: 81, trend: "up", high: 94, low: 68, confidence: 71 },
    { day: "Day 6", aqi: 86, trend: "up", high: 99, low: 73, confidence: 68 },
    { day: "Day 7", aqi: 91, trend: "up", high: 105, low: 77, confidence: 65 },
  ],
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "bg-green-500"
  if (aqi <= 100) return "bg-yellow-500"
  if (aqi <= 150) return "bg-orange-500"
  if (aqi <= 200) return "bg-red-500"
  if (aqi <= 300) return "bg-purple-500"
  return "bg-red-900"
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

export default function ForecastPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("7day")

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AQI Forecast</h1>
            <p className="text-lg text-muted-foreground">
              AI-powered air quality predictions with confidence intervals and uncertainty analysis
            </p>
          </div>

          {/* Location Search */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter city name or coordinates..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </div>
                <Button className="md:w-auto">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Forecast
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Conditions */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Current Conditions
                  </CardTitle>
                  <CardDescription>{mockForecastData.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div
                      className={`w-24 h-24 ${getAQIColor(mockForecastData.current.aqi)} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-3xl font-bold text-white">{mockForecastData.current.aqi}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getAQIColor(mockForecastData.current.aqi)} text-white border-transparent`}
                    >
                      {getAQILevel(mockForecastData.current.aqi)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Last updated: 5 minutes ago</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Wind className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">PM2.5</span>
                      </div>
                      <span className="font-medium">{mockForecastData.current.pm25} μg/m³</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Cloud className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">PM10</span>
                      </div>
                      <span className="font-medium">{mockForecastData.current.pm10} μg/m³</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Sun className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-medium">{mockForecastData.current.temperature}°C</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-medium">{mockForecastData.current.humidity}%</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Wind className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Wind Speed</span>
                      </div>
                      <span className="font-medium">{mockForecastData.current.windSpeed} km/h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Health Advisory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">Moderate Air Quality</p>
                      <p className="text-xs text-muted-foreground">Sensitive groups should limit outdoor activities</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-400">General Public</p>
                      <p className="text-xs text-muted-foreground">Normal outdoor activities are acceptable</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Consider wearing masks during peak hours</li>
                      <li>• Keep windows closed during high pollution</li>
                      <li>• Use air purifiers indoors if available</li>
                      <li>• Stay hydrated and avoid strenuous outdoor exercise</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Forecast Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hourly Forecast */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    8-Hour Forecast
                  </CardTitle>
                  <CardDescription>Hourly AQI predictions with confidence levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-8 gap-2">
                    {mockForecastData.hourly.map((hour, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">{hour.time}</p>
                        <div
                          className={`w-12 h-12 ${getAQIColor(hour.aqi)} rounded-full flex items-center justify-center mx-auto mb-2`}
                        >
                          <span className="text-xs font-bold text-white">{hour.aqi}</span>
                        </div>
                        <div className="mb-1">
                          <Progress value={hour.confidence} className="h-1" />
                        </div>
                        <p className="text-xs text-muted-foreground">{hour.confidence}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 7-Day Forecast */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    7-Day Forecast
                  </CardTitle>
                  <CardDescription>Daily AQI predictions with high/low ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockForecastData.daily.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 text-sm font-medium">{day.day}</div>
                          <div
                            className={`w-10 h-10 ${getAQIColor(day.aqi)} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-sm font-bold text-white">{day.aqi}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {day.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            ) : day.trend === "down" ? (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            ) : (
                              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                            )}
                            <span className="text-sm text-muted-foreground capitalize">{day.trend}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-sm">
                              <span className="text-red-400">{day.high}</span>
                              <span className="text-muted-foreground mx-1">/</span>
                              <span className="text-green-400">{day.low}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">High / Low</p>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium">{day.confidence}%</div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forecast Accuracy */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Forecast Accuracy
                  </CardTitle>
                  <CardDescription>Model performance and uncertainty analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">94%</div>
                      <p className="text-sm text-muted-foreground">24-hour accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">87%</div>
                      <p className="text-sm text-muted-foreground">3-day accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">72%</div>
                      <p className="text-sm text-muted-foreground">7-day accuracy</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">Uncertainty Factors</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Weather conditions</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          Low
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Seasonal variations</span>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          Medium
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Extreme events</span>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                          High
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
