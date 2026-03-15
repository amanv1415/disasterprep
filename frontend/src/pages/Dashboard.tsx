import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Shield,
  MapPin,
  CheckCircle,
  Clock,
  Phone,
  User,
  Brain,
  GamepadIcon,
  Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, isSignedIn } = useAuth();

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

  const userActivity = [
    { action: "Completed Disaster Preparedness Quiz", points: "+50 pts", time: "Today, 10:30 AM", icon: Brain, color: "text-primary", bg: "bg-primary/10" },
    { action: "Updated Emergency Contact List", points: "+10 pts", time: "Yesterday, 2:15 PM", icon: Phone, color: "text-success", bg: "bg-success/10" },
    { action: "Played Emergency Simulator Game", points: "+20 pts", time: "3 days ago", icon: GamepadIcon, color: "text-warning", bg: "bg-warning/10" },
    { action: "Checked Nearby Shelters Map", points: "", time: "Last week", icon: MapPin, color: "text-accent", bg: "bg-accent/10" },
  ];

  const completedItems = preparednessItems.filter(item => item.completed).length;
  const preparednessPercentage = (completedItems / preparednessItems.length) * 100;

  // Sign in gate for dashboard
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-soft">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Sign in Required</h2>
            <p className="text-muted-foreground mb-4">Please sign in to view your personalized dashboard and activity tracking.</p>
            <NavLink to="/login">
              <Button className="gradient-primary">Sign In to Dashboard</Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2 text-foreground">
              Welcome back, {user?.username || user?.firstName || 'User'}!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">{t("dashboard.subtitle")}</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium inline-flex items-center w-fit gap-2">
            <Activity className="h-4 w-4" />
            Active Supporter
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
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
          <Card className="shadow-soft sm:col-span-2 lg:col-span-1">
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

        {/* Middle Row */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
          {/* My Activity Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.points && (
                    <div className="shrink-0 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                      {activity.points}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preparedness Checklist */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CheckCircle className="h-5 w-5 text-success" />
                {t("dashboard.preparednessChecklist")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
              {preparednessItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.completed
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted border-2 border-muted-foreground'
                    }`}>
                    {item.completed && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span className={`text-sm sm:text-base ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {item.item}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 mt-6">
          {/* Emergency Contacts */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Phone className="h-5 w-5 text-primary" />
                {t("dashboard.emergencyContacts")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 ${contact.color}`} />
                    <span className="font-medium text-sm sm:text-base truncate">{contact.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground shrink-0 ml-2"
                    onClick={() => window.open(`tel:${contact.number}`)}
                  >
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Clock className="h-5 w-5 text-warning" />
                {t("dashboard.recentAlerts")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth">
                  <div className={`w-3 h-3 rounded-full shrink-0 mt-1 sm:mt-0 ${alert.severity === 'high' ? 'bg-emergency' :
                    alert.severity === 'medium' ? 'bg-warning' : 'bg-accent'
                    }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base">{alert.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{alert.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{alert.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;