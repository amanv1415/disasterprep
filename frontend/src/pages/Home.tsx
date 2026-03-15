import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Map, Users, Brain, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: AlertTriangle,
      title: t("home.features.emergencyAlerts"),
      description: t("home.features.emergencyAlertsDesc"),
      to: "/emergency"
    },
    {
      icon: Map,
      title: t("home.features.shelterMaps"),
      description: t("home.features.shelterMapsDesc"),
      to: "/maps"
    },
    {
      icon: Users,
      title: t("home.features.communitySupport"),
      description: t("home.features.communitySupportDesc"),
      to: "/dashboard"
    },
    {
      icon: Brain,
      title: t("home.features.preparednessQuiz"),
      description: t("home.features.preparednessQuizDesc"),
      to: "/quiz"
    }
  ];

  const stats = [
    { icon: Shield, value: "0", label: t("home.stats.peopleProtected") },
    { icon: Map, value: "17+", label: t("home.stats.shelterLocations") },
    { icon: Users, value: "24/7", label: t("home.stats.emergencySupport") },
    { icon: Star, value: "0", label: t("home.stats.userRating") }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Bandhu - Disaster Preparedness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/60 to-primary/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {t("home.hero.title")}{" "}
              <span className="text-warning">{t("home.hero.brand")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/dashboard">
                <Button size="lg" className="gradient-primary text-lg px-8 py-6 shadow-strong hover:scale-105 transition-bounce">
                  <Shield className="mr-2 h-5 w-5" />
                  {t("home.hero.getStarted")}
                </Button>
              </NavLink>
              <NavLink to="/emergency">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-emergency text-emergency-foreground border-emergency hover:bg-emergency/90 text-lg px-8 py-6 shadow-medium"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  {t("home.hero.emergency")}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-2">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description, to }, index) => (
              <Card key={index} className="group hover:shadow-medium transition-smooth cursor-pointer">
                <CardContent className="p-6">
                  <NavLink to={to}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-primary mb-4 group-hover:scale-110 transition-bounce">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                  </NavLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("home.cta.subtitle")}
          </p>
          <NavLink to="/login">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 shadow-strong hover:scale-105 transition-bounce"
            >
              {t("home.cta.createAccount")}
            </Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;