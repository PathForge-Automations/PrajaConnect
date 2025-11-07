import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Home, Users, BarChart3, AlertCircle } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">PC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">PrajaConnect</span>
            <span className="text-xs text-muted-foreground">by PathForge Automations</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/citizen">
            <Button variant="ghost" size="sm" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Report Issue
            </Button>
          </Link>
          <Link to="/collector">
            <Button variant="ghost" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              Collector Portal
            </Button>
          </Link>
          <Link to="/leadership">
            <Button variant="ghost" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Leadership
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button size="sm">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};
