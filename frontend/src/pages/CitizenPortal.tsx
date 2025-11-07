import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MapPin, Upload, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "@/lib/api";

const CitizenPortal = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Mock issues until backend fetch
  const [myIssues, setMyIssues] = useState([
    {
      id: "ISS-2025-001",
      title: "Street Light Not Working",
      category: "Infrastructure",
      district: "Visakhapatnam",
      status: "In Progress",
      date: "2025-01-15",
      assignedTo: "District Collector"
    },
    {
      id: "ISS-2025-002",
      title: "Water Supply Interruption",
      category: "Water",
      district: "Visakhapatnam",
      status: "Resolved",
      date: "2025-01-10",
      assignedTo: "Municipal Officer"
    },
    {
      id: "ISS-2025-003",
      title: "Road Pothole Repair Needed",
      category: "Roads",
      district: "Visakhapatnam",
      status: "Pending",
      date: "2025-01-18",
      assignedTo: "Pending Assignment"
    }
  ]);

  // ✅ Submit new issue (connected to backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const title = (document.getElementById("title") as HTMLInputElement)?.value;
      const description = (document.getElementById("description") as HTMLTextAreaElement)?.value;

      // Send to backend
      const { data } = await API.post(
        "/issues",
        {
          title,
          category: "Infrastructure",
          district: "Visakhapatnam",
          description,
          citizenId: user?.id
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Append to mock list for UI
      setMyIssues((prev) => [
        ...prev,
        {
          id: data.issueId || `ISS-${Date.now()}`,
          title,
          category: "Infrastructure",
          district: "Visakhapatnam",
          status: "Pending",
          date: new Date().toISOString().split("T")[0],
          assignedTo: "Pending Assignment"
        }
      ]);

      toast({
        title: "Issue Submitted Successfully!",
        description: "Your issue has been registered and sent to district officers."
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please check your connection or try again later.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Resolved: "default",
      "In Progress": "secondary",
      Pending: "outline"
    };
    return variants[status] || "outline";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Citizen Portal</h1>
          <p className="text-muted-foreground">
            Report issues and track your submissions in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Submit Issue Form */}
          <Card className="glass-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Report New Issue
              </CardTitle>
              <CardDescription>
                Submit civic issues with accurate details for quick resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input id="title" placeholder="Brief description of the issue" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roads">Roads & Transportation</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                      <SelectItem value="vijayawada">Vijayawada</SelectItem>
                      <SelectItem value="guntur">Guntur</SelectItem>
                      <SelectItem value="tirupati">Tirupati</SelectItem>
                      <SelectItem value="kakinada">Kakinada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Auto-detected via GPS"
                      readOnly
                      className="bg-muted"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enable location services for automatic GPS tagging
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Upload Photo/Video</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, MP4 up to 10MB
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Issue"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Issues */}
          <div className="space-y-6">
            <Card className="glass-card border-2">
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
                <CardDescription>
                  Track the status of your reported issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myIssues.map((issue) => (
                  <Card key={issue.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">
                              {issue.id}
                            </span>
                            {getStatusIcon(issue.status)}
                          </div>
                          <h4 className="font-semibold text-sm mb-1">
                            {issue.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {issue.district}
                            </span>
                            <span>•</span>
                            <span>{issue.date}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusBadge(issue.status)}>
                          {issue.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          Assigned to: {issue.assignedTo}
                        </span>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-2 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {myIssues.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Issues
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">
                      {
                        myIssues.filter((i) => i.status === "In Progress")
                          .length
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">
                      In Progress
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {myIssues.filter((i) => i.status === "Resolved").length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Resolved
                    </div>
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

export default CitizenPortal;
