import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, MapPin, Award, AlertTriangle } from "lucide-react";

const LeadershipDashboard = () => {
  const stateStats = [
    { label: "Total Issues Reported", value: "3,247", change: "+18%", trend: "up" },
    { label: "Issues Resolved", value: "2,891", change: "+12%", trend: "up" },
    { label: "Avg Response Time", value: "3.8h", change: "-22%", trend: "up" },
    { label: "Citizen Satisfaction", value: "91%", change: "+5%", trend: "up" }
  ];

  const districtPerformance = [
    { name: "Visakhapatnam", resolved: 412, pending: 23, rating: 94, trend: "up" },
    { name: "Vijayawada", resolved: 387, pending: 31, rating: 91, trend: "up" },
    { name: "Guntur", resolved: 354, pending: 28, rating: 89, trend: "stable" },
    { name: "Tirupati", resolved: 298, pending: 19, rating: 92, trend: "up" },
    { name: "Kakinada", resolved: 276, pending: 34, rating: 87, trend: "down" }
  ];

  const topCategories = [
    { category: "Roads & Transportation", count: 847, percentage: 26 },
    { category: "Water Supply", count: 634, percentage: 20 },
    { category: "Electricity", count: 521, percentage: 16 },
    { category: "Sanitation", count: 423, percentage: 13 },
    { category: "Infrastructure", count: 389, percentage: 12 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">Leadership Dashboard</h1>
            <Badge variant="outline" className="text-sm">
              Government of Andhra Pradesh
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Real-time governance analytics and insights across all districts
          </p>
        </div>

        {/* State-wide Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stateStats.map((stat, index) => (
            <Card key={index} className="glass-card border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <Badge 
                    variant={stat.trend === "up" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* District Performance */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  District Performance Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {districtPerformance.map((district, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                {district.name}
                                <TrendingUp 
                                  className={`h-4 w-4 ${
                                    district.trend === "up" ? "text-success" : 
                                    district.trend === "down" ? "text-destructive" : 
                                    "text-muted-foreground"
                                  }`} 
                                />
                              </h4>
                              <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                <span>Resolved: <span className="font-semibold text-foreground">{district.resolved}</span></span>
                                <span>Pending: <span className="font-semibold text-foreground">{district.pending}</span></span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{district.rating}%</div>
                            <div className="text-xs text-muted-foreground">Satisfaction</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issue Categories */}
            <Card className="glass-card border-2 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Top Issue Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCategories.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">{item.count} issues</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${item.percentage}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Analytics & Map */}
          <div className="space-y-6">
            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  State Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      District-wise issue density visualization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Citizen Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">47,892</div>
                  <div className="text-sm text-muted-foreground">Active Citizens</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-1">89%</div>
                  <div className="text-sm text-muted-foreground">Avg Resolution Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning mb-1">4.2h</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-2 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Key Insights
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Resolution rate improved by 12% this quarter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Response time reduced by 22% across all districts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    <span>Kakinada district needs attention for pending issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Citizen satisfaction at all-time high of 91%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipDashboard;
