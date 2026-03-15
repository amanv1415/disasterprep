import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Settings as SettingsIcon,
    Sun,
    Moon,
    Monitor,
    Bell,
    BellOff,
    Globe,
    Shield,
    MapPin,
    Volume2,
    Smartphone,
    Trash2,
    Download,
    ArrowLeft,
    Info,
    AlertTriangle,
    CheckCircle,
    Lock,
    Eye,
    Database,
    Wifi,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Notification settings
    const [pushNotifications, setPushNotifications] = useState(() => {
        return localStorage.getItem("bandhu_push_notifs") !== "false";
    });
    const [emailNotifications, setEmailNotifications] = useState(() => {
        return localStorage.getItem("bandhu_email_notifs") !== "false";
    });
    const [emergencyAlerts, setEmergencyAlerts] = useState(true); // Always on by default
    const [weatherAlerts, setWeatherAlerts] = useState(() => {
        return localStorage.getItem("bandhu_weather_alerts") !== "false";
    });
    const [soundAlerts, setSoundAlerts] = useState(() => {
        return localStorage.getItem("bandhu_sound_alerts") !== "false";
    });
    const [vibration, setVibration] = useState(() => {
        return localStorage.getItem("bandhu_vibration") !== "false";
    });

    // Privacy settings
    const [locationAccess, setLocationAccess] = useState(() => {
        return localStorage.getItem("bandhu_location") !== "false";
    });
    const [shareActivity, setShareActivity] = useState(() => {
        return localStorage.getItem("bandhu_share_activity") === "true";
    });
    const [showOnLeaderboard, setShowOnLeaderboard] = useState(() => {
        return localStorage.getItem("bandhu_leaderboard") !== "false";
    });

    // Accessibility
    const [largeText, setLargeText] = useState(() => {
        return localStorage.getItem("bandhu_large_text") === "true";
    });
    const [reducedMotion, setReducedMotion] = useState(() => {
        return localStorage.getItem("bandhu_reduced_motion") === "true";
    });

    // Data settings
    const [offlineMode, setOfflineMode] = useState(() => {
        return localStorage.getItem("bandhu_offline") === "true";
    });
    const [autoUpdate, setAutoUpdate] = useState(() => {
        return localStorage.getItem("bandhu_auto_update") !== "false";
    });

    // Persisted toggles
    const handleToggle = (key: string, value: boolean, setter: (v: boolean) => void) => {
        setter(value);
        localStorage.setItem(key, String(value));
    };

    const handleExportData = () => {
        const data = {
            settings: {
                theme,
                language,
                pushNotifications,
                emailNotifications,
                emergencyAlerts,
                weatherAlerts,
                soundAlerts,
                vibration,
                locationAccess,
                shareActivity,
                showOnLeaderboard,
                largeText,
                reducedMotion,
                offlineMode,
                autoUpdate,
            },
            exportedAt: new Date().toISOString(),
            app: "Bandhu Disaster Preparedness",
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bandhu-settings-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: "Data Exported",
            description: "Your settings have been exported successfully.",
        });
    };

    const handleClearCache = () => {
        // Clear only app-specific cached data, not auth/settings
        const keysToKeep = [
            "bandhu_language",
            "bandhu_theme",
            "bandhu_push_notifs",
            "bandhu_email_notifs",
            "bandhu_weather_alerts",
            "bandhu_sound_alerts",
            "bandhu_vibration",
            "bandhu_location",
            "bandhu_share_activity",
            "bandhu_leaderboard",
            "bandhu_large_text",
            "bandhu_reduced_motion",
            "bandhu_offline",
            "bandhu_auto_update",
        ];
        const savedValues: Record<string, string | null> = {};
        keysToKeep.forEach((key) => {
            savedValues[key] = localStorage.getItem(key);
        });

        // Clear and restore
        const allKeys = Object.keys(localStorage).filter((k) => k.startsWith("bandhu_cache"));
        allKeys.forEach((k) => localStorage.removeItem(k));

        toast({
            title: "Cache Cleared",
            description: "Cached data has been cleared successfully.",
        });
    };

    const handleResetSettings = () => {
        if (!confirm("Are you sure you want to reset all settings to default? This cannot be undone.")) return;

        // Reset all settings
        const bandhuKeys = Object.keys(localStorage).filter((k) => k.startsWith("bandhu_"));
        bandhuKeys.forEach((k) => {
            if (k !== "bandhu_language") localStorage.removeItem(k);
        });

        // Reset states
        setTheme("light");
        setPushNotifications(true);
        setEmailNotifications(true);
        setWeatherAlerts(true);
        setSoundAlerts(true);
        setVibration(true);
        setLocationAccess(true);
        setShareActivity(false);
        setShowOnLeaderboard(true);
        setLargeText(false);
        setReducedMotion(false);
        setOfflineMode(false);
        setAutoUpdate(true);

        toast({
            title: "Settings Reset",
            description: "All settings have been restored to defaults.",
        });
    };

    const themeOptions = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    const languageOptions = [
        { value: "en", label: "English" },
        { value: "hi", label: "हिंदी (Hindi)" },
        { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                        <SettingsIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        Settings
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Customize your Bandhu experience
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Sun className="h-5 w-5 text-primary" />
                                Appearance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {/* Theme */}
                            <div>
                                <Label className="text-sm font-medium mb-3 block">Theme</Label>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {themeOptions.map(({ value, label, icon: Icon }) => (
                                        <button
                                            key={value}
                                            onClick={() => setTheme(value as any)}
                                            className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border transition-smooth ${theme === value
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-border hover:bg-muted/50"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="text-xs sm:text-sm font-medium">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Language */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Language</p>
                                        <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                                    </div>
                                </div>
                                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                                    <SelectTrigger className="w-[140px] sm:w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languageOptions.map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            {/* Large Text */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Large Text</p>
                                        <p className="text-xs text-muted-foreground">Increase text size for better readability</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={largeText}
                                    onCheckedChange={(val) => handleToggle("bandhu_large_text", val, setLargeText)}
                                />
                            </div>

                            {/* Reduced Motion */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Reduced Motion</p>
                                        <p className="text-xs text-muted-foreground">Minimize animations throughout the app</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={reducedMotion}
                                    onCheckedChange={(val) => handleToggle("bandhu_reduced_motion", val, setReducedMotion)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Bell className="h-5 w-5 text-primary" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Push Notifications</p>
                                        <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={pushNotifications}
                                    onCheckedChange={(val) => handleToggle("bandhu_push_notifs", val, setPushNotifications)}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Email Notifications</p>
                                        <p className="text-xs text-muted-foreground">Receive updates via email</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={emailNotifications}
                                    onCheckedChange={(val) => handleToggle("bandhu_email_notifs", val, setEmailNotifications)}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-emergency" />
                                    <div>
                                        <p className="text-sm font-medium">Emergency Alerts</p>
                                        <p className="text-xs text-muted-foreground">Critical disaster warnings (always recommended)</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={emergencyAlerts}
                                    onCheckedChange={(val) => {
                                        if (!val) {
                                            const confirmed = confirm(
                                                "Turning off emergency alerts is not recommended. You may miss critical disaster warnings. Continue?"
                                            );
                                            if (!confirmed) return;
                                        }
                                        setEmergencyAlerts(val);
                                    }}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Sound Alerts</p>
                                        <p className="text-xs text-muted-foreground">Play sound for notifications</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={soundAlerts}
                                    onCheckedChange={(val) => handleToggle("bandhu_sound_alerts", val, setSoundAlerts)}
                                />
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Vibration</p>
                                        <p className="text-xs text-muted-foreground">Vibrate for emergency alerts</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={vibration}
                                    onCheckedChange={(val) => handleToggle("bandhu_vibration", val, setVibration)}
                                />
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Weather Alerts</p>
                                        <p className="text-xs text-muted-foreground">Get severe weather notifications</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={weatherAlerts}
                                    onCheckedChange={(val) => handleToggle("bandhu_weather_alerts", val, setWeatherAlerts)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy & Security */}
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Lock className="h-5 w-5 text-primary" />
                                Privacy & Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Location Access</p>
                                        <p className="text-xs text-muted-foreground">Allow app to use your location for nearby shelters</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={locationAccess}
                                    onCheckedChange={(val) => handleToggle("bandhu_location", val, setLocationAccess)}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Share Activity</p>
                                        <p className="text-xs text-muted-foreground">Share your preparedness progress with community</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={shareActivity}
                                    onCheckedChange={(val) => handleToggle("bandhu_share_activity", val, setShareActivity)}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Show on Leaderboard</p>
                                        <p className="text-xs text-muted-foreground">Display your name on the games leaderboard</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={showOnLeaderboard}
                                    onCheckedChange={(val) => handleToggle("bandhu_leaderboard", val, setShowOnLeaderboard)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data & Storage */}
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Database className="h-5 w-5 text-primary" />
                                Data & Storage
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Wifi className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Offline Mode</p>
                                        <p className="text-xs text-muted-foreground">Download essential data for offline access</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={offlineMode}
                                    onCheckedChange={(val) => {
                                        handleToggle("bandhu_offline", val, setOfflineMode);
                                        if (val) {
                                            toast({
                                                title: "Offline Mode Enabled",
                                                description: "Essential data will be cached for offline access.",
                                            });
                                        }
                                    }}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Download className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Auto-Update</p>
                                        <p className="text-xs text-muted-foreground">Automatically update shelter and alert data</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={autoUpdate}
                                    onCheckedChange={(val) => handleToggle("bandhu_auto_update", val, setAutoUpdate)}
                                />
                            </div>

                            <Separator />

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="gap-2 flex-1"
                                    onClick={handleExportData}
                                >
                                    <Download className="h-4 w-4" />
                                    Export Settings
                                </Button>
                                <Button
                                    variant="outline"
                                    className="gap-2 flex-1"
                                    onClick={handleClearCache}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Clear Cache
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About & Reset */}
                    <Card className="shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Info className="h-5 w-5 text-primary" />
                                About
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">App Version</p>
                                    <p className="font-medium">1.0.0</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Build</p>
                                    <p className="font-medium">2026.03.15</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Developer</p>
                                    <p className="font-medium">Bandhu Team</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">License</p>
                                    <p className="font-medium">MIT</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Button
                                    variant="outline"
                                    className="gap-2 flex-1 text-emergency hover:text-emergency hover:bg-emergency/10"
                                    onClick={handleResetSettings}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Reset All Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Need Mail icon
import { Mail } from "lucide-react";

export default Settings;
