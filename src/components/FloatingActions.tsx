import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { GeneralSettings } from '../types';

export const FloatingActions: React.FC<{ settings: GeneralSettings }> = ({ settings }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-neutral-700 shadow-md border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-all hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Call Button (Mobile friendly) */}
      <a
        href={`tel:${settings.phoneNumber}`}
        className="sm:hidden w-12 h-12 rounded-full bg-[#155e3c] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5 text-[#fef08a]" />
      </a>

      {/* WhatsApp Pulse Floating Button */}
      <a
        href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2 px-4 py-3 bg-[#25d366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current text-white shrink-0" />
        <span className="hidden md:inline-block font-bold text-xs tracking-wide pr-1">
          WhatsApp Mashwara
        </span>
      </a>
    </div>
  );
};
