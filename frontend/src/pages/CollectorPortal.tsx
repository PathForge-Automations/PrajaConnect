import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const CollectorPortal = () => {
  const issues = [
    { id: "ISS-001", title: "Street Light Not Working", location: "MG Road", status: "New", priority: "High", time: "2h ago" },
    { id: "ISS-002", title: "Water Supply Issue", location: "Gandhi Nagar", status: "Assigned", priority: "Critical", time: "5h ago" },
    { id: "ISS-003", title: "Road Repair Needed", location: "Beach Road", status: "In Progress", priority: "Medium", time: "1d ago" },
    { id: "ISS-004", title: "Garbage Collection", location: "Main Market", status: "New", priority: "Medium", time: "3h ago" }
  ];

  const stats = [
    { label: "Total Issues", value: "247", change: "+12%", icon: AlertCircle, color: "text-primary" },
    { label: "Resolved Today", value: "18", change: "+8%", icon: CheckCircle, color: "text-success" },
    { label: "Avg Response Time", value: "4.2h", change: "-15%", icon: Clock, color: "text-warning" },
    { label: "Citizens Served", value: "1,234", change: "+23%", icon: Users, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Collector Dashboard</h1>
          <p className="text-muted-foreground">District: Visakhapatnam | Officer: K. Ramesh Kumar, IAS</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Issues List */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>Manage and assign citizen-reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Issues</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned</TabsTrigger>
                    <TabsTrigger value="progress">In Progress</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {issues.map((issue) => (
                      <Card key={issue.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-muted-foreground">{issue.id}</span>
                                <Badge 
                                  variant={issue.priority === "Critical" ? "destructive" : issue.priority === "High" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {issue.priority}
                                </Badge>
                              </div>
                              <h4 className="font-semibold mb-1">{issue.title}</h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {issue.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {issue.time}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline">{issue.status}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="default">Assign</Button>
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Map & Analytics */}
          <div className="space-y-6">
            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle className="text-lg">Issue Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Interactive map showing issue density across districts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Resolution Rate</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: "87%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Citizen Satisfaction</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "92%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Response Efficiency</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: "78%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorPortal;
