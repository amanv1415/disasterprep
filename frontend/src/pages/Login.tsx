import { useState } from "react";
import { Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4 shadow-strong">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">{t("login.welcome")}</h1>
          <p className="text-white/80">{t("login.companion")}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "login"
                ? "bg-white text-primary shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {t("login.tab.login")}
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "register"
                ? "bg-white text-primary shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {t("login.tab.register")}
          </button>
        </div>

        {/* Clerk Auth Components */}
        <div className="flex justify-center">
          {activeTab === "login" ? (
            <SignIn routing="hash" />
          ) : (
            <SignUp routing="hash" />
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <NavLink to="/" className="text-white/80 hover:text-white text-sm hover:underline">
            {t("login.backToHome")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;