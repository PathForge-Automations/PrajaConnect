import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "te" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "తెలుగు" : "English"}</span>
    </Button>
  );
};
