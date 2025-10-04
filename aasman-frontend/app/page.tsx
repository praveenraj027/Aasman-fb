import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Satellite, Globe, Brain, Users, BarChart3, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background py-2">
      <div className="stars"></div>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
                <span className="text-foreground">AI-Powered</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Air Quality Estimation
                </span>
                <br />
                <span className="text-foreground">& Mapping System</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                {
                  "Revolutionizing air quality monitoring across India through advanced AI/ML, satellite data fusion, and comprehensive atmospheric modeling."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Globe className="w-5 h-5 mr-2" />
                <Link href="/map">
                  Explore Air Quality Data
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent hover:text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                <Link href="/dashboard" className="hover:text-white">
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Transforming Air Quality Monitoring</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our system addresses critical gaps in air quality monitoring by leveraging cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Estimate and map AQI (PM2.5, PM10) across India with unprecedented accuracy and coverage
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">How</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Fuse satellite, ground sensor, and atmospheric data using advanced AI/ML algorithms
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-chart-4" />
                </div>
                <CardTitle className="text-lg">Why</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Provide critical air quality information where monitoring stations are missing or sparse
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-chart-5" />
                </div>
                <CardTitle className="text-lg">Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Empower citizens, policymakers, and researchers with actionable air quality insights
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Explore Clean Air Data?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of users already making informed decisions with our AI-powered air quality insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  <Satellite className="w-5 h-5 mr-2" />
                  <Link href="/map">Start Monitoring</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent hover:text-white">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Satellite className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Aasman</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Aasman | Powered by advanced AI/ML technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
