import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Satellite,
  Brain,
  Globe,
  Zap,
  Target,
  Shield,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  MapPin,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">System Features</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive air quality monitoring powered by cutting-edge AI/ML technology and multi-source data
              integration
            </p>
          </div>

          {/* How is it different? */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How is it different?</h2>
              <p className="text-lg text-muted-foreground">
                Revolutionary approach to air quality monitoring that goes beyond traditional methods
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Satellite className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Multi-source Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Combines satellite imagery, ground sensors, and atmospheric models for comprehensive coverage unlike
                    single-source systems
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>AI/ML-driven Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced machine learning algorithms create high-resolution predictions, not just simple
                    interpolation between sensor points
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-chart-4" />
                  </div>
                  <CardTitle>Complete Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Covers all regions across India, including rural and remote areas where traditional monitoring
                    stations are absent
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Unique Selling Points */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Unique Selling Points</h2>
              <p className="text-lg text-muted-foreground">What makes our system stand out in the market</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Pan-India Coverage</CardTitle>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-1">
                        All-Weather
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Complete geographical coverage across all Indian states and territories, providing air quality data
                    even in the most remote locations where traditional monitoring is impossible.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">28 states and 8 union territories</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Rural and urban areas included</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">24/7 continuous monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-chart-4/10 border-accent/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>Advanced AI/ML Predictions</CardTitle>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 mt-1">
                        High Accuracy
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    State-of-the-art machine learning models trained on massive datasets to provide accurate air quality
                    predictions with confidence intervals and uncertainty quantification.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">92% prediction accuracy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Multiple ML model ensemble</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Continuous model improvement</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-4/10 to-chart-5/10 border-chart-4/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle>Real-time Adaptive System</CardTitle>
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20 mt-1">
                        Live Updates
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Dynamic system that adapts to changing conditions, provides real-time updates, and offers
                    intelligent decision support for various stakeholders.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Sub-hourly data updates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Adaptive alert thresholds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Intelligent recommendations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-5/10 to-primary/10 border-chart-5/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-chart-5" />
                    </div>
                    <div>
                      <CardTitle>Multi-stakeholder Platform</CardTitle>
                      <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20 mt-1">
                        Role-based
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Tailored interfaces and tools for different user types - from citizens seeking health advice to
                    researchers conducting studies and policymakers making decisions.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Citizen health dashboards</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Policy simulation tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Research data access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How does it solve the problem? */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How does it solve the problem?</h2>
              <p className="text-lg text-muted-foreground">
                Addressing critical gaps in current air quality monitoring infrastructure
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Fills Monitoring Gaps</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Traditional monitoring relies on sparse ground stations, leaving vast areas without coverage.
                        Our AI system predicts air quality in these "blind zones" using satellite data and atmospheric
                        models.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">78% of India now has AQI predictions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Rural areas get equal coverage as cities</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Real-time updates every 30 minutes</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-500/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400 mb-2">2,400+</div>
                        <p className="text-sm text-muted-foreground mb-4">Districts without monitoring stations</p>
                        <div className="text-2xl font-bold text-green-400 mb-2">Now Covered</div>
                        <p className="text-sm text-muted-foreground">By AI predictions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                        <p className="text-sm text-muted-foreground mb-4">Automated monitoring</p>
                        <div className="text-2xl font-bold text-accent mb-2">No Manual</div>
                        <p className="text-sm text-muted-foreground">Intervention needed</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Activity className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Automates Air Quality Mapping</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Manual air quality assessment is time-consuming and inconsistent. Our automated system processes
                        multiple data streams continuously, providing consistent, nationwide air quality maps without
                        human intervention.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Processes 2.4M data points daily</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Consistent methodology nationwide</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Reduces operational costs by 60%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-chart-4" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Provides Timely Insights</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Decision-makers need current, actionable information. Our system delivers real-time insights
                        with predictive capabilities, enabling proactive policy decisions and health recommendations.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Real-time policy impact simulation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Personalized health recommendations</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm">Research-grade data access</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-chart-4/10 to-chart-5/10 rounded-lg p-6 border border-chart-4/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-chart-4 mb-2">3.2s</div>
                        <p className="text-sm text-muted-foreground mb-4">Average response time</p>
                        <div className="text-2xl font-bold text-chart-5 mb-2">4 User Types</div>
                        <p className="text-sm text-muted-foreground">Tailored interfaces</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Experience the Future?</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join the revolution in air quality monitoring. Get access to AI-powered insights that help you make
                  informed decisions about air quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8">
                    <MapPin className="w-5 h-5 mr-2" />
                    <Link href="/map">Explore Interactive Map</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 hover:text-white">
                    <Users className="w-5 h-5 mr-2" />
                    <Link href="/dashboard">View Dashboards</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
