import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Camera,
    Save,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    AlertTriangle,
    ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const { user, isSignedIn } = useAuth();
    const { t } = useLanguage();
    const { toast } = useToast();
    const navigate = useNavigate();

    // Profile form state
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const getUserInitials = () => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase();
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return "U";
    };

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSavingProfile(false);
        setIsEditingProfile(false);
        toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
        });
    };

    const validatePassword = () => {
        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return false;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setPasswordError("Password must contain at least one uppercase letter");
            return false;
        }
        if (!/[0-9]/.test(newPassword)) {
            setPasswordError("Password must contain at least one number");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleChangePassword = async () => {
        if (!validatePassword()) return;

        setIsChangingPassword(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsChangingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast({
            title: "Password Changed",
            description: "Your password has been changed successfully.",
        });
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(newPassword);
    const strengthLabel = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"][passwordStrength];
    const strengthColor = ["", "bg-emergency", "bg-emergency", "bg-warning", "bg-success", "bg-success"][passwordStrength];

    // Redirect if not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-soft">
                    <CardContent className="p-6 text-center">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-xl font-display font-bold mb-2">Sign in Required</h2>
                        <p className="text-muted-foreground mb-4">Please sign in to view and edit your profile.</p>
                        <NavLink to="/login">
                            <Button className="gradient-primary">Sign In</Button>
                        </NavLink>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
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
                        <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        My Profile
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Manage your personal information and security
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-soft">
                            <CardContent className="p-6 text-center">
                                <div className="relative inline-block mb-4">
                                    <Avatar className="h-24 w-24 sm:h-28 sm:w-28 mx-auto">
                                        <AvatarImage src={user?.imageUrl} />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                                            {getUserInitials()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full gradient-primary flex items-center justify-center shadow-medium hover:scale-110 transition-bounce">
                                        <Camera className="h-4 w-4 text-white" />
                                    </button>
                                </div>

                                <h2 className="text-xl font-display font-semibold mb-1">
                                    {firstName || lastName
                                        ? `${firstName} ${lastName}`.trim()
                                        : "User"}
                                </h2>
                                <p className="text-sm text-muted-foreground mb-1">{user?.email}</p>
                                {location && (
                                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                                        <MapPin className="h-3 w-3" />
                                        {location}
                                    </p>
                                )}

                                <Separator className="my-4" />

                                <div className="space-y-3 text-left">
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                                        <Shield className="h-4 w-4 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Member since</p>
                                            <p className="text-sm font-medium">March 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-success/10">
                                        <CheckCircle className="h-4 w-4 text-success" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Account Status</p>
                                            <p className="text-sm font-medium text-success">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Profile + Password */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card className="shadow-soft">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <User className="h-5 w-5 text-primary" />
                                    Personal Information
                                </CardTitle>
                                {!isEditingProfile ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditingProfile(true)}
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditingProfile(false)}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-sm">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            disabled={!isEditingProfile}
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            disabled={!isEditingProfile}
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm flex items-center gap-1">
                                        <Mail className="h-3.5 w-3.5" />
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="bg-muted/50"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Email is managed by your authentication provider
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm flex items-center gap-1">
                                            <Phone className="h-3.5 w-3.5" />
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={!isEditingProfile}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            disabled={!isEditingProfile}
                                            placeholder="City, State"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-sm">Bio</Label>
                                    <textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        disabled={!isEditingProfile}
                                        placeholder="Tell us about yourself..."
                                        rows={3}
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    />
                                </div>

                                {isEditingProfile && (
                                    <div className="flex justify-end pt-2">
                                        <Button
                                            onClick={handleSaveProfile}
                                            disabled={isSavingProfile}
                                            className="gradient-primary gap-2"
                                        >
                                            <Save className="h-4 w-4" />
                                            {isSavingProfile ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Change Password */}
                        <Card className="shadow-soft">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Lock className="h-5 w-5 text-primary" />
                                    Change Password
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-sm">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setPasswordError("");
                                            }}
                                            placeholder="Enter new password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {/* Password Strength Meter */}
                                    {newPassword && (
                                        <div className="space-y-1.5">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1.5 flex-1 rounded-full transition-all ${level <= passwordStrength ? strengthColor : "bg-muted"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className={`text-xs ${passwordStrength <= 2 ? "text-emergency" : passwordStrength <= 3 ? "text-warning" : "text-success"
                                                }`}>
                                                Password strength: {strengthLabel}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setPasswordError("");
                                            }}
                                            placeholder="Confirm new password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {confirmPassword && newPassword && confirmPassword === newPassword && (
                                        <p className="text-xs text-success flex items-center gap-1">
                                            <CheckCircle className="h-3 w-3" /> Passwords match
                                        </p>
                                    )}
                                </div>

                                {passwordError && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emergency/10 border border-emergency/20">
                                        <AlertTriangle className="h-4 w-4 text-emergency shrink-0" />
                                        <p className="text-sm text-emergency">{passwordError}</p>
                                    </div>
                                )}

                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground font-medium mb-1.5">Password requirements:</p>
                                    <ul className="space-y-1">
                                        {[
                                            { label: "At least 8 characters", met: newPassword.length >= 8 },
                                            { label: "One uppercase letter", met: /[A-Z]/.test(newPassword) },
                                            { label: "One number", met: /[0-9]/.test(newPassword) },
                                            { label: "Passwords match", met: newPassword === confirmPassword && confirmPassword !== "" },
                                        ].map(({ label, met }) => (
                                            <li key={label} className={`text-xs flex items-center gap-1.5 ${met ? "text-success" : "text-muted-foreground"}`}>
                                                <CheckCircle className={`h-3 w-3 ${met ? "" : "opacity-30"}`} />
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button
                                        onClick={handleChangePassword}
                                        disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                                        className="gradient-primary gap-2"
                                    >
                                        <Lock className="h-4 w-4" />
                                        {isChangingPassword ? "Changing..." : "Change Password"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
