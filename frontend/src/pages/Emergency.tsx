import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Volume2,
  Shield,
  Heart,
  Flame,
  CloudRain,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Emergency = () => {
  const { t } = useLanguage();

  const emergencyTypes = [
    { type: t("emergency.medical"), icon: Heart, color: "bg-emergency", number: "108" },
    { type: t("emergency.fire"), icon: Flame, color: "bg-warning", number: "101" },
    { type: t("emergency.police"), icon: Shield, color: "bg-primary", number: "100" },
    { type: t("emergency.disaster"), icon: AlertTriangle, color: "bg-secondary", number: "1070" },
  ];

  const activeAlerts = [
    {
      id: 1,
      type: t("emergency.cycloneType"),
      severity: "High",
      title: t("emergency.cycloneTitle"),
      description: t("emergency.cycloneDesc"),
      location: t("emergency.cycloneLocation"),
      time: t("emergency.cycloneTime"),
      icon: CloudRain,
      actions: [t("emergency.cycloneAction1"), t("emergency.cycloneAction2"), t("emergency.cycloneAction3")]
    },
    {
      id: 2,
      type: t("emergency.drillType"),
      severity: "Medium",
      title: t("emergency.drillTitle"),
      description: t("emergency.drillDesc"),
      location: t("emergency.drillLocation"),
      time: t("emergency.drillTime"),
      icon: Zap,
      actions: [t("emergency.drillAction1"), t("emergency.drillAction2"), t("emergency.drillAction3")]
    }
  ];

  const quickTips = [
    t("emergency.tip1"),
    t("emergency.tip2"),
    t("emergency.tip3"),
    t("emergency.tip4"),
    t("emergency.tip5")
  ];

  const [selectedAlert, setSelectedAlert] = useState(activeAlerts[0]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-emergency text-emergency-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-emergency" />
            {t("emergency.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t("emergency.subtitle")}</p>
        </div>

        {/* Emergency Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 stagger-children">
          {emergencyTypes.map((emergency, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-medium transition-smooth group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${emergency.color} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-bounce`}>
                  <emergency.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm mb-2 leading-snug">{emergency.type}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${emergency.number}`)}
                  className="w-full hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {emergency.number}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Active Alerts */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Volume2 className="h-5 w-5 text-warning" />
                  {t("emergency.activeAlerts")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-smooth ${selectedAlert.id === alert.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/30'
                      }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0">
                        <alert.icon className="h-5 w-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base leading-snug">{alert.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{alert.type}</p>
                        </div>
                      </div>
                      <Badge className={`${getSeverityColor(alert.severity)} shrink-0 text-xs`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{alert.description}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alert Details */}
            {selectedAlert && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <selectedAlert.icon className="h-5 w-5 text-primary" />
                    {t("emergency.alertDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{selectedAlert.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{selectedAlert.description}</p>

                  <h4 className="font-semibold text-sm sm:text-base mb-3">{t("emergency.recommendedActions")}</h4>
                  <ul className="space-y-2">
                    {selectedAlert.actions.map((action, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Tips + SOS */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Tips */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Shield className="h-5 w-5 text-accent" />
                  {t("emergency.quickSafetyTips")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {quickTips.map((tip, index) => (
                  <div key={index} className="p-2.5 sm:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs sm:text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SOS Button */}
            <Card className="shadow-soft">
              <CardContent className="p-5 sm:p-6 text-center">
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t("emergency.emergencySOS")}</h3>
                <Button
                  size="lg"
                  className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-strong pulse-emergency"
                  onClick={() => alert("SOS feature would trigger emergency protocols")}
                >
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  {t("emergency.sosButton")}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("emergency.sosHint")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;