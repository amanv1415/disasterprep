import { useState, useEffect, useRef } from "react";
import { Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState<"login" | "register">("login");
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabSwitch = (tab: "login" | "register") => {
    if (tab === activeTab || animating) return;

    setAnimating(true);

    // Phase 1: Slide out + fade out current content
    if (containerRef.current) {
      const direction = tab === "register" ? "-1" : "1";
      containerRef.current.style.transform = `translateX(${Number(direction) * 30}px)`;
      containerRef.current.style.opacity = "0";
    }

    // Phase 2: After slide-out, swap content and slide in from opposite side
    setTimeout(() => {
      setActiveTab(tab);
      setDisplayTab(tab);

      if (containerRef.current) {
        const direction = tab === "register" ? "-1" : "1";
        containerRef.current.style.transition = "none";
        containerRef.current.style.transform = `translateX(${Number(direction) * -30}px)`;
        containerRef.current.style.opacity = "0";

        // Force reflow, then animate in
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease";
            containerRef.current.style.transform = "translateX(0)";
            containerRef.current.style.opacity = "1";
          }
          setTimeout(() => setAnimating(false), 350);
        });
      }
    }, 250);
  };

  // Set initial transition
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.25s ease";
    }
  }, []);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 safe-top safe-bottom">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-primary mb-3 sm:mb-4 shadow-strong">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1.5 sm:mb-2">{t("login.welcome")}</h1>
          <p className="text-sm sm:text-base text-white/80">{t("login.companion")}</p>
        </div>

        {/* Tab Switcher */}
        <div className="relative flex justify-center gap-1 mb-5 sm:mb-6 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
          {/* Animated pill background */}
          <div
            className="absolute top-1 bottom-1 rounded-lg bg-white shadow-md transition-all duration-300 ease-out"
            style={{
              width: "calc(50% - 4px)",
              left: activeTab === "login" ? "4px" : "calc(50% + 0px)",
            }}
          />
          <button
            onClick={() => handleTabSwitch("login")}
            className={`relative z-10 flex-1 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeTab === "login"
                ? "text-primary"
                : "text-white/70 hover:text-white"
              }`}
          >
            {t("login.tab.login")}
          </button>
          <button
            onClick={() => handleTabSwitch("register")}
            className={`relative z-10 flex-1 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeTab === "register"
                ? "text-primary"
                : "text-white/70 hover:text-white"
              }`}
          >
            {t("login.tab.register")}
          </button>
        </div>

        {/* Clerk Auth Components — animated container */}
        <div className="flex justify-center overflow-hidden">
          <div
            ref={containerRef}
            className="min-w-0 max-w-full"
            style={{ willChange: "transform, opacity" }}
          >
            {displayTab === "login" ? (
              <SignIn routing="hash" />
            ) : (
              <SignUp routing="hash" />
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-5 sm:mt-6">
          <NavLink to="/" className="text-white/80 hover:text-white text-sm hover:underline transition-smooth">
            {t("login.backToHome")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;