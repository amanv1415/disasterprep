import { Shield, Heart, Github, Twitter, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    const quickLinks = [
        { to: "/", label: t("nav.home") },
        { to: "/dashboard", label: t("nav.dashboard") },
        { to: "/emergency", label: t("nav.emergency") },
        { to: "/maps", label: t("nav.maps") },
        { to: "/quiz", label: t("nav.quiz") },
        { to: "/games", label: t("nav.games") },
    ];

    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 py-10 sm:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <NavLink to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
                            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-white">Bandhu</span>
                        </NavLink>
                        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                            Your trusted companion for disaster preparedness. Together, we build resilient communities across India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-1.5"
                                    >
                                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Emergency
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <a href="tel:100" className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" /> Police: 100
                                </a>
                            </li>
                            <li>
                                <a href="tel:101" className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" /> Fire: 101
                                </a>
                            </li>
                            <li>
                                <a href="tel:108" className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" /> Ambulance: 108
                                </a>
                            </li>
                            <li>
                                <a href="tel:1070" className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" /> Disaster: 1070
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Contact
                        </h3>
                        <ul className="space-y-2.5">
                            <li className="text-white/70 text-sm flex items-start gap-2">
                                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                <span>India</span>
                            </li>
                            <li>
                                <a href="mailto:support@bandhu.app" className="text-white/70 hover:text-white text-sm transition-smooth flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" /> support@bandhu.app
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-xs text-center sm:text-left">
                        © {new Date().getFullYear()} Bandhu. Built with Love for a safer India.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-white/50 hover:text-white transition-smooth" aria-label="GitHub">
                            <Github className="h-4 w-4" />
                        </a>
                        <a href="#" className="text-white/50 hover:text-white transition-smooth" aria-label="Twitter">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="mailto:support@bandhu.app" className="text-white/50 hover:text-white transition-smooth" aria-label="Email">
                            <Mail className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
