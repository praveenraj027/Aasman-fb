import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Target,
  Lightbulb,
  Award,
  Globe,
  Brain,
  Satellite,
  BarChart3,
  Mail,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="stars"></div>
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Aasman</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pioneering the future of air quality monitoring through advanced AI/ML technology and comprehensive data
              integration
            </p>
          </div>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    To democratize access to accurate air quality information across India by leveraging cutting-edge
                    AI/ML technology, satellite data, and comprehensive atmospheric modeling. We believe everyone
                    deserves to breathe clean air and make informed decisions about their health and environment.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-chart-4/10 border-accent/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    To create a world where air quality monitoring is ubiquitous, accurate, and actionable. We envision
                    a future where AI-powered environmental intelligence helps governments, researchers, and citizens
                    work together to create cleaner, healthier communities for all.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* The Problem We Solve */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Problem We Solve</h2>
              <p className="text-lg text-muted-foreground">
                Addressing critical gaps in India's air quality monitoring infrastructure
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Limited Coverage</h3>
                    <p className="text-sm text-muted-foreground">
                      Only 344 monitoring stations across India's 3.3M km² area, leaving vast regions without air
                      quality data
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Data Gaps</h3>
                    <p className="text-sm text-muted-foreground">
                      Rural and remote areas have no monitoring infrastructure, creating blind spots in air quality
                      assessment
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Limited Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Existing data is often fragmented, delayed, or not easily accessible to citizens and researchers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Solution */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Solution</h2>
              <p className="text-lg text-muted-foreground">
                A comprehensive AI-powered platform that transforms air quality monitoring
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>AI/ML Intelligence</CardTitle>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-1">
                        Core Technology
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Advanced machine learning models trained on massive datasets to predict air quality with 92%
                    accuracy, even in areas without monitoring stations.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Deep neural networks for complex pattern recognition</li>
                    <li>• Ensemble methods for robust predictions</li>
                    <li>• Continuous learning and model improvement</li>
                    <li>• Uncertainty quantification and confidence intervals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Satellite className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>Multi-Source Integration</CardTitle>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 mt-1">
                        Data Fusion
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Seamlessly combines satellite imagery, ground sensor data, and atmospheric models to create a
                    comprehensive view of air quality across India.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• INSAT-3D satellite data for broad coverage</li>
                    <li>• CPCB ground sensor network integration</li>
                    <li>• MERRA-2 and NARR atmospheric model data</li>
                    <li>• Real-time data processing and validation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle>Complete Coverage</CardTitle>
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20 mt-1">
                        Pan-India
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Provides air quality information for every district in India, including remote and rural areas that
                    have never had monitoring infrastructure.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 78% of India now has AQI predictions</li>
                    <li>• Rural areas get equal coverage as cities</li>
                    <li>• Mountainous and remote regions included</li>
                    <li>• High-resolution spatial mapping</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-chart-5" />
                    </div>
                    <div>
                      <CardTitle>Multi-Stakeholder Platform</CardTitle>
                      <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20 mt-1">
                        Role-Based
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Tailored interfaces and tools for different user types, from citizens seeking health advice to
                    policymakers making environmental decisions.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Citizen dashboards with health recommendations</li>
                    <li>• Policy maker tools for impact simulation</li>
                    <li>• Research interfaces for data analysis</li>
                    <li>• Admin controls for system management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Impact & Achievements */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Impact & Achievements</h2>
              <p className="text-lg text-muted-foreground">Measurable results in air quality monitoring</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">2.4M</div>
                  <p className="text-sm text-muted-foreground">Data points processed daily</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">92%</div>
                  <p className="text-sm text-muted-foreground">Prediction accuracy</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-chart-4 mb-2">78%</div>
                  <p className="text-sm text-muted-foreground">Of India covered</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-chart-5 mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Continuous monitoring</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Technology Stack</h2>
              <p className="text-lg text-muted-foreground">Built with cutting-edge technologies and frameworks</p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Machine Learning</h3>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        TensorFlow
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        PyTorch
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Scikit-learn
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        XGBoost
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Data Processing</h3>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Apache Spark
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Pandas
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        NumPy
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Dask
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Infrastructure</h3>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                        AWS/Azure
                      </Badge>
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                        Docker
                      </Badge>
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                        Kubernetes
                      </Badge>
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                        PostgreSQL
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact & Connect */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Get in Touch</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Interested in collaborating, have questions, or want to learn more about our technology? We'd love to
                  hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button size="lg" className="text-lg px-8">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    <Award className="w-5 h-5 mr-2" />
                    Partnership Opportunities
                  </Button>
                </div>
                <div className="flex justify-center space-x-6">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Link href="https://github.com/Aasman" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Link href="https://twitter.com/praveenraj027" target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Link href="https://www.linkedin.com/in/praveen-rajak" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </Link>
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
