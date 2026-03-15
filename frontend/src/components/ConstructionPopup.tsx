import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Hammer } from 'lucide-react';

const ConstructionPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the popup has been closed in this session
        const hasSeenPopup = sessionStorage.getItem('constructionPopupClosed');
        if (!hasSeenPopup) {
            // Small delay for smoother entrance on initial load
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Trigger the animation slightly after mounting
                requestAnimationFrame(() => setIsVisible(true));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for the exit animation to finish before removing from DOM
        setTimeout(() => {
            setIsOpen(false);
            sessionStorage.setItem('constructionPopupClosed', 'true');
        }, 300); // 300ms matches the duration in CSS/tailwind
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                className={`bg-background border border-border rounded-xl shadow-strong max-w-md w-full p-6 transition-all duration-300 ease-out transform ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    }`}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4 text-warning">
                        <Hammer className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold font-display mb-2 text-foreground">Site Under Construction</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Welcome to Bandhu! This platform is currently under active development. Please note that some features may not be fully functional yet.
                    </p>
                    <Button onClick={handleClose} className="w-full sm:w-auto min-w-[140px]" size="lg">
                        OK, I understand
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConstructionPopup;
