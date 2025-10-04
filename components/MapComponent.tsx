"use client";


import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import AQIMap from "@/components/AQIMap"
import {
  Search,
  MapPin,
  Filter,
  Calendar,
  AlertTriangle,
  Heart,
  Baby,
  Users,
  Wind,
  Eye,
  Thermometer,
} from "lucide-react"

// Mock AQI data for different regions
const mockAQIData = [
  {
    id: 1,
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    pm25: 156,
    pm10: 198,
    aqi: 156,
    level: "Unhealthy",
    color: "bg-red-500",
  },
  {
    id: 2,
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    pm25: 89,
    pm10: 112,
    aqi: 89,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    city: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    pm25: 67,
    pm10: 85,
    aqi: 67,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    pm25: 78,
    pm10: 95,
    aqi: 78,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    city: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    pm25: 134,
    pm10: 167,
    aqi: 134,
    level: "Unhealthy for Sensitive Groups",
    color: "bg-orange-500",
  },
  {
    id: 6,
    city: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    pm25: 72,
    pm10: 89,
    aqi: 72,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 7,
    city: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    pm25: 85,
    pm10: 108,
    aqi: 85,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 8,
    city: "Ahmedabad",
    lat: 23.0225,
    lng: 72.5714,
    pm25: 112,
    pm10: 145,
    aqi: 112,
    level: "Unhealthy for Sensitive Groups",
    color: "bg-orange-500",
  },
  {
    id: 9,
    city: "Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    pm25: 98,
    pm10: 125,
    aqi: 98,
    level: "Moderate",
    color: "bg-yellow-500",
  },
  {
    id: 10,
    city: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    pm25: 145,
    pm10: 178,
    aqi: 145,
    level: "Unhealthy for Sensitive Groups",
    color: "bg-orange-500",
  },
]

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

export default function MapPage() {
  const [selectedPollutant, setSelectedPollutant] = useState("pm25")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<(typeof mockAQIData)[0] | null>(null)
  const [timeRange, setTimeRange] = useState([0])
  const [filteredData, setFilteredData] = useState(mockAQIData)

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockAQIData.filter((city) => city.city.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredData(filtered)
    } else {
      setFilteredData(mockAQIData)
    }
  }, [searchQuery])

  const handleCityClick = (city: (typeof mockAQIData)[0]) => {
    setSelectedCity(city)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Interactive AQI Map</h1>
            <p className="text-lg text-muted-foreground">
              Real-time air quality monitoring across India with AI-powered predictions
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Search Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter city name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background/50"
                  />
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters & Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Pollutant Type</label>
                    <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pm25">PM2.5</SelectItem>
                        <SelectItem value="pm10">PM10</SelectItem>
                        <SelectItem value="aqi">Overall AQI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Time Range (Hours)</label>
                    <Slider value={timeRange} onValueChange={setTimeRange} max={24} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Now</span>
                      <span>{timeRange[0]}h ago</span>
                      <span>24h ago</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </CardContent>
              </Card>

              {/* Health Recommendations */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-400" />
                    Health Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-400">Sensitive Groups</p>
                      <p className="text-xs text-muted-foreground">Limit outdoor activities</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Baby className="w-4 h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Children & Elderly</p>
                      <p className="text-xs text-muted-foreground">Avoid outdoor exposure</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Users className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-purple-400">General Public</p>
                      <p className="text-xs text-muted-foreground">Use air purifiers indoors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Area */}
          // In your main component, replace the entire map section with:
<div className="lg:col-span-2">
  <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-[600px]">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          India AQI Map
        </span>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Live Data
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="h-full p-0">
      <AQIMap onCityClick={handleCityClick} selectedCity={selectedCity} />
    </CardContent>
  </Card>
</div>

            {/* City Details Panel */}
            <div className="lg:col-span-1">
              {selectedCity ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {selectedCity.city}
                    </CardTitle>
                    <CardDescription>Current air quality data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div
                        className={`w-20 h-20 ${getAQIColor(selectedCity.aqi)} rounded-full flex items-center justify-center mx-auto mb-2`}
                      >
                        <span className="text-2xl font-bold text-white">{selectedCity.aqi}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getAQIColor(selectedCity.aqi)} text-white border-transparent`}
                      >
                        {getAQILevel(selectedCity.aqi)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">PM2.5</span>
                        </div>
                        <span className="font-medium">{selectedCity.pm25} μg/m³</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">PM10</span>
                        </div>
                        <span className="font-medium">{selectedCity.pm10} μg/m³</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Temperature</span>
                        </div>
                        <span className="font-medium">28°C</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-2">Health Recommendations</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {selectedCity.aqi > 150 ? (
                          <>
                            <p>• Avoid outdoor activities</p>
                            <p>• Use N95 masks when outside</p>
                            <p>• Keep windows closed</p>
                            <p>• Use air purifiers indoors</p>
                          </>
                        ) : selectedCity.aqi > 100 ? (
                          <>
                            <p>• Limit prolonged outdoor activities</p>
                            <p>• Sensitive groups should stay indoors</p>
                            <p>• Consider wearing masks</p>
                          </>
                        ) : (
                          <>
                            <p>• Air quality is acceptable</p>
                            <p>• Normal outdoor activities OK</p>
                            <p>• Good for exercise outdoors</p>
                          </>
                        )}
                      </div>
                    </div>

                    <Button className="w-full">View Detailed Forecast</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Click on a city marker to view detailed air quality information
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
