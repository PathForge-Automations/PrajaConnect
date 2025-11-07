import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Users, BarChart3, MapPin, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Landing = () => {
  const features = [
    {
      icon: AlertCircle,
      title: "Report Issues",
      titleTe: "సమస్యలను నివేదించండి",
      description: "Submit civic issues with location and photos instantly",
      descriptionTe: "స్థానం మరియు ఫోటోలతో పౌర సమస్యలను తక్షణమే సమర్పించండి"
    },
    {
      icon: MapPin,
      title: "Track Progress",
      titleTe: "పురోగతిని ట్రాక్ చేయండి",
      description: "Monitor real-time status of your submitted issues",
      descriptionTe: "మీరు సమర్పించిన సమస్యల రియల్-టైమ్ స్థితిని పర్యవేక్షించండి"
    },
    {
      icon: Users,
      title: "Direct Connection",
      titleTe: "ప్రత్యక్ష సంబంధం",
      description: "Connect directly with district collectors and officials",
      descriptionTe: "జిల్లా కలెక్టర్లు మరియు అధికారులతో నేరుగా కనెక్ట్ అవ్వండి"
    },
    {
      icon: BarChart3,
      title: "Transparent Analytics",
      titleTe: "పారదర్శక విశ్లేషణ",
      description: "Leadership insights with data-driven governance",
      descriptionTe: "డేటా-ఆధారిత పాలనతో నాయకత్వ అంతర్దృష్టులు"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      titleTe: "సురక్షిత వేదిక",
      description: "Your data protected with enterprise-grade security",
      descriptionTe: "ఎంటర్‌ప్రైజ్-గ్రేడ్ భద్రతతో మీ డేటా రక్షించబడింది"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      titleTe: "తక్షణ నోటిఫికేషన్లు",
      description: "Get updates on every step of issue resolution",
      descriptionTe: "సమస్య పరిష్కారం యొక్క ప్రతి దశపై నవీకరణలను పొందండి"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Government of Andhra Pradesh</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
            Empowering Citizens.{" "}
            <span className="text-gradient">Enabling Leaders.</span>{" "}
            Evolving Governance.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            The digital bridge between people and power. Report issues, track progress, 
            and experience transparent governance in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/citizen">
              <Button size="lg" className="gap-2 text-base">
                Report an Issue
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/leadership">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <BarChart3 className="h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Secure & Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
              <span>Bilingual Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose PrajaConnect?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive platform designed for transparent, efficient, and citizen-centric governance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 border-2">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                <p className="text-sm text-primary/70 font-medium">{feature.titleTe}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-20">
        <Card className="glass-card border-2">
          <CardContent className="p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">13</div>
                <div className="text-sm text-muted-foreground">Districts Connected</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Platform Availability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <Card className="glass-card border-2 gradient-primary">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of citizens actively participating in shaping a better Andhra Pradesh
            </p>
            <Link to="/citizen">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © 2025 PrajaConnect by PathForge Automations. All rights reserved.
          </p>
          <p className="text-xs">
            A visionary project empowering Andhra Pradesh to lead India in transparent, data-driven governance.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Fix missing import
import { AlertCircle } from "lucide-react";

export default Landing;
