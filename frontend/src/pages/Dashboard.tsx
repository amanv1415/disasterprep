import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  Phone
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();

  const emergencyContacts = [
    { name: t("dashboard.police"), number: "100", color: "bg-emergency" },
    { name: t("dashboard.fire"), number: "101", color: "bg-warning" },
    { name: t("dashboard.medical"), number: "108", color: "bg-success" },
    { name: t("dashboard.womenHelpline"), number: "1091", color: "bg-primary" },
  ];

  const preparednessItems = [
    { item: t("dashboard.emergencyKit"), completed: true },
    { item: t("dashboard.familyPlan"), completed: true },
    { item: t("dashboard.importantDocuments"), completed: false },
    { item: t("dashboard.waterStorage"), completed: true },
    { item: t("dashboard.foodSupplies"), completed: false },
    { item: t("dashboard.firstAidTraining"), completed: false },
  ];

  const recentAlerts = [
    {
      type: "weather",
      title: t("dashboard.heavyRainWarning"),
      location: "Mumbai, Maharashtra",
      time: t("dashboard.hoursAgo"),
      severity: "medium"
    },
    {
      type: "earthquake",
      title: t("dashboard.earthquakeDrillReminder"),
      location: t("dashboard.yourArea"),
      time: t("dashboard.dayAgo"),
      severity: "low"
    },
  ];

  const completedItems = preparednessItems.filter(item => item.completed).length;
  const preparednessPercentage = (completedItems / preparednessItems.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Preparedness Score */}
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.preparednessScore")}</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{Math.round(preparednessPercentage)}%</div>
              <Progress value={preparednessPercentage} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                {completedItems} of {preparednessItems.length} {t("dashboard.itemsCompleted")}
              </p>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.activeAlerts")}</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{recentAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                Latest: {recentAlerts[0]?.time || t("dashboard.noRecentAlerts")}
              </p>
            </CardContent>
          </Card>

          {/* Nearby Shelters */}
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.nearbyShelters")}</CardTitle>
              <MapPin className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">12</div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.within5km")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Emergency Contacts */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                {t("dashboard.emergencyContacts")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${contact.color}`} />
                    <span className="font-medium">{contact.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(`tel:${contact.number}`)}
                  >
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preparedness Checklist */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                {t("dashboard.preparednessChecklist")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preparednessItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    item.completed 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted border-2 border-muted-foreground'
                  }`}>
                    {item.completed && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.item}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-soft mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              {t("dashboard.recentAlerts")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'high' ? 'bg-emergency' :
                  alert.severity === 'medium' ? 'bg-warning' : 'bg-accent'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">{alert.location}</p>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;