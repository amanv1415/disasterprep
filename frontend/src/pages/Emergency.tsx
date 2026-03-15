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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-emergency" />
            {t("emergency.title")}
          </h1>
          <p className="text-muted-foreground">{t("emergency.subtitle")}</p>
        </div>

        {/* Emergency Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {emergencyTypes.map((emergency, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-medium transition-smooth group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${emergency.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-bounce`}>
                  <emergency.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{emergency.type}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`tel:${emergency.number}`)}
                  className="w-full hover:bg-primary hover:text-primary-foreground"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {emergency.number}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Alerts */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-warning" />
                  {t("emergency.activeAlerts")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedAlert.id === alert.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <alert.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">{alert.type}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
              <Card className="shadow-soft mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <selectedAlert.icon className="h-5 w-5 text-primary" />
                    {t("emergency.alertDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{selectedAlert.title}</h3>
                  <p className="text-muted-foreground mb-4">{selectedAlert.description}</p>
                  
                  <h4 className="font-semibold mb-3">{t("emergency.recommendedActions")}</h4>
                  <ul className="space-y-2">
                    {selectedAlert.actions.map((action, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Tips */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  {t("emergency.quickSafetyTips")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickTips.map((tip, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SOS Button */}
            <Card className="shadow-soft mt-6">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">{t("emergency.emergencySOS")}</h3>
                <Button 
                  size="lg" 
                  className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground py-6 text-lg font-semibold shadow-strong"
                  onClick={() => alert("SOS feature would trigger emergency protocols")}
                >
                  <AlertTriangle className="h-6 w-6 mr-2" />
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