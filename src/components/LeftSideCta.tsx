import React, { useState } from 'react';
import { Phone, MessageCircle, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { GeneralSettings } from '../types';

interface LeftSideCtaProps {
  settings: GeneralSettings;
  onOpenConsultation: () => void;
}

export const LeftSideCta: React.FC<LeftSideCtaProps> = ({ settings, onOpenConsultation }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      aria-label="Quick Consultation"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center transition-all duration-300 pointer-events-auto"
    >
      {isExpanded ? (
        <div className="bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white rounded-r-2xl shadow-2xl border-y border-r border-[#d4af37]/40 p-3 sm:p-3.5 flex flex-col gap-2.5 max-w-[210px] sm:max-w-[230px] animate-in slide-in-from-left duration-300">
          {/* Header of Left CTA */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#fde047] animate-ping" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                Live Mashwara
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors"
              title="Collapse"
              aria-label="Collapse Left CTA"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Label */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white leading-tight">
              Maulana Shamsuddin
            </h4>
            <p className="text-[10px] text-emerald-200 mt-0.5">
              Dua, Wazifa & Ruhani Hal
            </p>
          </div>

          {/* Action 1: Direct Call Button */}
          <a
            href={`tel:${settings.phoneNumber}`}
            className="flex items-center gap-2 px-3 py-2 bg-[#f5b82e] hover:bg-[#e0a41d] text-[#112417] rounded-xl font-bold text-xs shadow-md transition-all transform hover:scale-[1.02]"
          >
            <Phone className="w-3.5 h-3.5 fill-current text-[#112417]" />
            <span className="font-mono text-[11px] truncate">
              {settings.phoneDisplay}
            </span>
          </a>

          {/* Action 2: WhatsApp Chat */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              settings.whatsappMessage
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs border border-emerald-500/40 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#86efac]" />
            <span className="text-[11px]">WhatsApp Chat</span>
          </a>

          {/* Action 3: Open Consultation Form */}
          <button
            onClick={onOpenConsultation}
            className="text-[10px] font-medium text-emerald-200 hover:text-white text-center py-0.5 transition-colors"
          >
            Online Form Bhejein →
          </button>
        </div>
      ) : (
        /* Collapsed Tab */
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-[#155e3c] hover:bg-[#0f442a] text-white py-3 px-2 rounded-r-xl shadow-xl border-y border-r border-[#d4af37]/40 flex flex-col items-center gap-1.5 transition-all group"
          title="Open Quick Call / WhatsApp CTA"
          aria-label="Expand Left CTA"
        >
          <Phone className="w-4 h-4 text-[#fde047] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 text-emerald-100">
            Call Maulana
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
        </button>
      )}
    </aside>
  );
};
