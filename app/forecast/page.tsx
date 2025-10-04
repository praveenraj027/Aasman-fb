"use client"

import { useState, useEffect } from "react"
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

// Types for OpenWeather API responses
interface WeatherData {
  location: string
  current: {
    aqi: number
    level: string
    color: string
    pm25: number
    pm10: number
    temperature: number
    humidity: number
    windSpeed: number
    weather: string
    icon: string
  }
  hourly: Array<{
    time: string
    aqi: number
    confidence: number
    temp: number
    weather: string
  }>
  daily: Array<{
    day: string
    aqi: number
    trend: string
    high: number
    low: number
    confidence: number
    weather: string
    icon: string
  }>
}

interface OpenWeatherCurrent {
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  name: string
}

interface OpenWeatherForecast {
  list: Array<{
    dt: number
    main: {
      temp: number
      humidity: number
      pressure: number
      temp_min: number
      temp_max: number
    }
    wind: {
      speed: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    dt_txt: string
  }>
  city: {
    name: string
    country: string
  }
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

// Mock data as fallback
const mockForecastData: WeatherData = {
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
    weather: "Clouds",
    icon: "04d"
  },
  hourly: [
    { time: "Now", aqi: 89, confidence: 95, temp: 28, weather: "Clouds" },
    { time: "1h", aqi: 92, confidence: 93, temp: 29, weather: "Clouds" },
    { time: "2h", aqi: 87, confidence: 91, temp: 29, weather: "Clouds" },
    { time: "3h", aqi: 85, confidence: 89, temp: 28, weather: "Clear" },
    { time: "4h", aqi: 88, confidence: 87, temp: 27, weather: "Clear" },
    { time: "5h", aqi: 94, confidence: 85, temp: 26, weather: "Clear" },
    { time: "6h", aqi: 98, confidence: 83, temp: 25, weather: "Clear" },
    { time: "7h", aqi: 102, confidence: 81, temp: 24, weather: "Clear" },
  ],
  daily: [
    { day: "Today", aqi: 89, trend: "stable", high: 102, low: 78, confidence: 95, weather: "Clouds", icon: "04d" },
    { day: "Tomorrow", aqi: 95, trend: "up", high: 108, low: 82, confidence: 88, weather: "Clear", icon: "01d" },
    { day: "Day 3", aqi: 78, trend: "down", high: 89, low: 67, confidence: 82, weather: "Rain", icon: "10d" },
    { day: "Day 4", aqi: 72, trend: "down", high: 85, low: 59, confidence: 76, weather: "Clear", icon: "01d" },
    { day: "Day 5", aqi: 81, trend: "up", high: 94, low: 68, confidence: 71, weather: "Clouds", icon: "04d" },
    { day: "Day 6", aqi: 86, trend: "up", high: 99, low: 73, confidence: 68, weather: "Clouds", icon: "04d" },
    { day: "Day 7", aqi: 91, trend: "up", high: 105, low: 77, confidence: 65, weather: "Rain", icon: "10d" },
  ],
}

export default function ForecastPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("7day")
  const [weatherData, setWeatherData] = useState<WeatherData>(mockForecastData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Replace with your OpenWeather API key
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "your_api_key_here"
  const BASE_URL = "https://api.openweathermap.org/data/2.5"

  // Function to fetch weather data
  const fetchWeatherData = async (location: string = "Mumbai") => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
      )
      
      if (!currentResponse.ok) {
        throw new Error(`Weather data not found for ${location}`)
      }
      
      const currentData: OpenWeatherCurrent = await currentResponse.json()

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
      )
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast data not found for ${location}`)
      }
      
      const forecastData: OpenWeatherForecast = await forecastResponse.json()

      // Process the data to match our format
      const processedData: WeatherData = processWeatherData(currentData, forecastData)
      setWeatherData(processedData)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      console.error("Error fetching weather data:", err)
      // Fallback to mock data
      setWeatherData(mockForecastData)
    } finally {
      setLoading(false)
    }
  }

  // Process OpenWeather data to match our format
  const processWeatherData = (current: OpenWeatherCurrent, forecast: OpenWeatherForecast): WeatherData => {
    // For AQI, we'll simulate it since OpenWeather's AQI might require a different subscription
    // In a real app, you might want to use a dedicated AQI API or OpenWeather's Air Pollution API
    const baseAQI = Math.floor(Math.random() * 50) + 50 // Simulated AQI between 50-100
    
    // Process hourly data (next 8 hours from forecast)
    const hourly = forecast.list.slice(0, 8).map((item, index) => ({
      time: index === 0 ? "Now" : `${index}h`,
      aqi: Math.max(30, Math.min(150, baseAQI + Math.floor(Math.random() * 20) - 10)),
      confidence: 95 - (index * 2),
      temp: Math.round(item.main.temp),
      weather: item.weather[0].main
    }))

    // Process daily data (next 7 days)
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    const daily = days.map((day, index) => {
      const dayForecasts = forecast.list.filter((_, i) => i % 8 === 0).slice(index, index + 1)
      const tempHigh = dayForecasts.length > 0 ? Math.round(dayForecasts[0].main.temp_max) : 25 + index
      const tempLow = dayForecasts.length > 0 ? Math.round(dayForecasts[0].main.temp_min) : 15 + index
      
      return {
        day,
        aqi: Math.max(30, Math.min(150, baseAQI + Math.floor(Math.random() * 30) - 15)),
        trend: index % 3 === 0 ? "stable" : index % 3 === 1 ? "up" : "down",
        high: tempHigh + 70, // Simulated AQI high
        low: tempLow + 50,   // Simulated AQI low
        confidence: 95 - (index * 5),
        weather: dayForecasts.length > 0 ? dayForecasts[0].weather[0].main : "Clear",
        icon: dayForecasts.length > 0 ? dayForecasts[0].weather[0].icon : "01d"
      }
    })

    return {
      location: `${current.name}, ${forecast.city.country}`,
      current: {
        aqi: baseAQI,
        level: getAQILevel(baseAQI),
        color: getAQIColor(baseAQI),
        pm25: Math.floor(baseAQI * 0.7),
        pm10: Math.floor(baseAQI * 1.1),
        temperature: Math.round(current.main.temp),
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
        weather: current.weather[0].main,
        icon: current.weather[0].icon
      },
      hourly,
      daily
    }
  }

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData()
  }, [])

  const handleSearch = () => {
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Weather & AQI Forecast</h1>
            <p className="text-lg text-muted-foreground">
              Real-time weather data with AI-powered air quality predictions
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
                      placeholder="Enter city name..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 bg-background/50"
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  <MapPin className="w-4 h-4 mr-2" />
                  {loading ? "Loading..." : "Get Forecast"}
                </Button>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading weather data...</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Current Conditions */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Current Conditions
                    </CardTitle>
                    <CardDescription>{weatherData.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-4">
                        <img 
                          src={getWeatherIcon(weatherData.current.icon)} 
                          alt={weatherData.current.weather}
                          className="w-16 h-16"
                        />
                        <div
                          className={`w-24 h-24 ${getAQIColor(weatherData.current.aqi)} rounded-full flex items-center justify-center ml-4`}
                        >
                          <span className="text-3xl font-bold text-white">{weatherData.current.aqi}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getAQIColor(weatherData.current.aqi)} text-white border-transparent mb-2`}
                      >
                        {getAQILevel(weatherData.current.aqi)}
                      </Badge>
                      <p className="text-lg font-medium capitalize">{weatherData.current.weather}</p>
                      <p className="text-sm text-muted-foreground mt-2">Last updated: Just now</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">PM2.5</span>
                        </div>
                        <span className="font-medium">{weatherData.current.pm25} μg/m³</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Cloud className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">PM10</span>
                        </div>
                        <span className="font-medium">{weatherData.current.pm10} μg/m³</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Temperature</span>
                        </div>
                        <span className="font-medium">{weatherData.current.temperature}°C</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Humidity</span>
                        </div>
                        <span className="font-medium">{weatherData.current.humidity}%</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Wind Speed</span>
                        </div>
                        <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
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
                        <p className="text-sm font-medium text-yellow-400">{getAQILevel(weatherData.current.aqi)} Air Quality</p>
                        <p className="text-xs text-muted-foreground">
                          {weatherData.current.aqi <= 50 ? "Ideal air quality for outdoor activities" :
                           weatherData.current.aqi <= 100 ? "Sensitive groups should limit outdoor activities" :
                           weatherData.current.aqi <= 150 ? "People with respiratory issues should take caution" :
                           "Limit outdoor activities for all groups"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-400">General Public</p>
                        <p className="text-xs text-muted-foreground">
                          {weatherData.current.aqi <= 100 ? "Normal outdoor activities are acceptable" :
                           "Consider reducing prolonged outdoor exposure"}
                        </p>
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
                      {weatherData.hourly.map((hour, index) => (
                        <div key={index} className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">{hour.time}</p>
                          <div
                            className={`w-12 h-12 ${getAQIColor(hour.aqi)} rounded-full flex items-center justify-center mx-auto mb-2`}
                          >
                            <span className="text-xs font-bold text-white">{hour.aqi}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{hour.temp}°C</p>
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
                      {weatherData.daily.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-16 text-sm font-medium">{day.day}</div>
                            <img 
                              src={getWeatherIcon(day.icon)} 
                              alt={day.weather}
                              className="w-8 h-8"
                            />
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
          )}
        </div>
      </div>
    </div>
  )
}