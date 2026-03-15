import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, Shield, AlertTriangle, Map, BarChart3, GamepadIcon, Brain, LogIn, LogOut, User, Settings, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: t("nav.home"), icon: Shield },
    ...(isSignedIn ? [{ to: "/dashboard", label: t("nav.dashboard"), icon: BarChart3 }] : []),
    { to: "/emergency", label: t("nav.emergency"), icon: AlertTriangle },
    { to: "/maps", label: t("nav.maps"), icon: Map },
    { to: "/quiz", label: t("nav.quiz"), icon: Brain },
    { to: "/games", label: t("nav.games"), icon: GamepadIcon },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md safe-top">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl shrink-0">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Bandhu
            </span>
          </NavLink>

          {/* Desktop Navigation — visible at lg and up */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden xl:inline">{label}</span>
                <span className="xl:hidden text-xs">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth + Language — visible at lg and up */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSelector />

            {isSignedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-tight">
                        {user.firstName
                          ? `${user.firstName} ${user.lastName || ''}`.trim()
                          : user.email
                        }
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    {t("nav.profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    {t("nav.settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.signout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </Button>
              </NavLink>
            )}
          </div>

          {/* Mobile Navigation — visible below lg */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <NavLink
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 font-display font-bold text-lg"
                    >
                      <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Bandhu
                      </span>
                    </NavLink>
                  </div>

                  {/* Mobile nav items */}
                  <div className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                      {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`
                          }
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  {/* Mobile bottom: auth */}
                  <div className="border-t p-4 safe-bottom">
                    {isSignedIn && user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-2 py-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user.firstName
                                ? `${user.firstName} ${user.lastName || ''}`.trim()
                                : user.email
                              }
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                        <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" />
                            {t("nav.profile")}
                          </Button>
                        </NavLink>
                        <NavLink to="/settings" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start gap-2">
                            <Settings className="h-4 w-4" />
                            {t("nav.settings")}
                          </Button>
                        </NavLink>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                          {t("nav.signout")}
                        </Button>
                      </div>
                    ) : (
                      <NavLink to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <LogIn className="h-4 w-4" />
                          {t("nav.login")}
                        </Button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;