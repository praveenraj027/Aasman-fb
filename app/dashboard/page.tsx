"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  Microscope,
  Shield,
  MapPin,
  TrendingUp,
  Download,
  AlertTriangle,
  Heart,
  BarChart3,
  Activity,
  Globe,
  Database,
  Settings,
} from "lucide-react"

export default function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState("citizen")

  return (
    <div className="min-h-screen bg-background">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">User Dashboards</h1>
            <p className="text-lg text-muted-foreground">
              Role-based interfaces for different user types and use cases
            </p>
          </div>

          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="citizen" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Citizen</span>
              </TabsTrigger>
              <TabsTrigger value="policymaker" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Policy Maker</span>
              </TabsTrigger>
              <TabsTrigger value="researcher" className="flex items-center space-x-2">
                <Microscope className="w-4 h-4" />
                <span>Researcher</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            {/* Citizen Dashboard */}
            <TabsContent value="citizen" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Current Location AQI */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Your Location
                    </CardTitle>
                    <CardDescription>Mumbai, Maharashtra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">89</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        Moderate
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">Last updated: 2 minutes ago</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Recommendations */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-400" />
                      Health Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2 p-2 bg-green-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Outdoor activities are acceptable</p>
                        <p className="text-xs text-muted-foreground">Air quality is moderate for most people</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 p-2 bg-yellow-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Sensitive groups should limit exposure</p>
                        <p className="text-xs text-muted-foreground">Consider wearing masks during peak hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Set Alerts
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Trends
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Forecast */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>7-Day AQI Forecast</CardTitle>
                  <CardDescription>Predicted air quality levels for your location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                      const aqiValues = [89, 76, 92, 105, 118, 95, 82]
                      const colors = [
                        "bg-yellow-500",
                        "bg-yellow-500",
                        "bg-yellow-500",
                        "bg-orange-500",
                        "bg-orange-500",
                        "bg-yellow-500",
                        "bg-yellow-500",
                      ]
                      return (
                        <div key={day} className="text-center">
                          <p className="text-sm font-medium text-foreground mb-2">{day}</p>
                          <div
                            className={`w-12 h-12 ${colors[index]} rounded-full flex items-center justify-center mx-auto mb-2`}
                          >
                            <span className="text-sm font-bold text-white">{aqiValues[index]}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {aqiValues[index] <= 100 ? "Moderate" : "Unhealthy"}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Policy Maker Dashboard */}
            <TabsContent value="policymaker" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Regional Hotspots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">12</div>
                    <p className="text-sm text-muted-foreground">Areas above 150 AQI</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Population Affected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-400">2.3M</div>
                    <p className="text-sm text-muted-foreground">People in unhealthy zones</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">-8%</div>
                    <p className="text-sm text-muted-foreground">Improvement this month</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Policy Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <p className="text-sm text-muted-foreground">Compliance rate</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Regional Trends
                    </CardTitle>
                    <CardDescription>AQI changes across different regions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: "Delhi NCR", change: "+12%", trend: "up", color: "text-red-400" },
                        { region: "Mumbai Metro", change: "-5%", trend: "down", color: "text-green-400" },
                        { region: "Bangalore", change: "-2%", trend: "down", color: "text-green-400" },
                        { region: "Chennai", change: "+8%", trend: "up", color: "text-orange-400" },
                      ].map((item) => (
                        <div
                          key={item.region}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                        >
                          <span className="font-medium">{item.region}</span>
                          <span className={`font-bold ${item.color}`}>{item.change}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Policy Simulation Tools</CardTitle>
                    <CardDescription>Impact assessment for proposed policies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Vehicle Emission Standards
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Building2 className="w-4 h-4 mr-2" />
                      Industrial Regulations
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="w-4 h-4 mr-2" />
                      Green Zone Expansion
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Health Researcher Dashboard */}
            <TabsContent value="researcher" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Data Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">1.2M</div>
                    <p className="text-sm text-muted-foreground">AQI measurements collected</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Correlations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">0.78</div>
                    <p className="text-sm text-muted-foreground">AQI-Health correlation</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Studies Active</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-chart-4">15</div>
                    <p className="text-sm text-muted-foreground">Ongoing research projects</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Health Impact Analysis
                    </CardTitle>
                    <CardDescription>Correlation between AQI and health outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { condition: "Respiratory Issues", correlation: "0.82", impact: "High" },
                        { condition: "Cardiovascular Disease", correlation: "0.67", impact: "Medium" },
                        { condition: "Asthma Episodes", correlation: "0.91", impact: "Very High" },
                        { condition: "Hospital Admissions", correlation: "0.74", impact: "High" },
                      ].map((item) => (
                        <div
                          key={item.condition}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.condition}</p>
                            <p className="text-sm text-muted-foreground">Correlation: {item.correlation}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              item.impact === "Very High"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : item.impact === "High"
                                  ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }
                          >
                            {item.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Research Tools</CardTitle>
                    <CardDescription>Data analysis and visualization tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Statistical Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Trend Visualization
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Database className="w-4 h-4 mr-2" />
                      Export Datasets
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Microscope className="w-4 h-4 mr-2" />
                      Custom Queries
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Admin Dashboard */}
            <TabsContent value="admin" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">247</div>
                    <p className="text-sm text-muted-foreground">Active sensors</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Data Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">94%</div>
                    <p className="text-sm text-muted-foreground">Validation success rate</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">99.2%</div>
                    <p className="text-sm text-muted-foreground">Uptime this month</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">API Calls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">1.8M</div>
                    <p className="text-sm text-muted-foreground">Requests today</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      Data Source Management
                    </CardTitle>
                    <CardDescription>Monitor and validate incoming data streams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { source: "CPCB Sensors", status: "Active", quality: "98%" },
                        { source: "INSAT-3D Satellite", status: "Active", quality: "95%" },
                        { source: "MERRA-2 Data", status: "Active", quality: "92%" },
                        { source: "Private Sensors", status: "Warning", quality: "87%" },
                      ].map((item) => (
                        <div
                          key={item.source}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.source}</p>
                            <p className="text-sm text-muted-foreground">Quality: {item.quality}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "Active"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      System Administration
                    </CardTitle>
                    <CardDescription>Manage system configuration and performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Database className="w-4 h-4 mr-2" />
                      Database Management
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      User Access Control
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      Performance Monitoring
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      System Alerts
                    </Button>
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
