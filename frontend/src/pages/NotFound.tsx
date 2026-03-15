import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="text-center animate-fade-in-up max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mb-6">
          <AlertTriangle className="h-8 w-8 text-warning" />
        </div>
        <h1 className="mb-3 text-5xl sm:text-6xl font-display font-bold text-foreground">404</h1>
        <p className="mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("notFound.message")}
        </p>
        <NavLink to="/">
          <Button className="gradient-primary gap-2" size="lg">
            <Home className="h-4 w-4" />
            {t("notFound.returnHome")}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
