import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { GeneralSettings } from '../types';

interface CtaBannerProps {
  settings: GeneralSettings;
  onOpenConsultation: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ settings, onOpenConsultation }) => {
  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#0a1f14] text-white overflow-hidden border-y border-[#d4af37]/30">
      {/* Background Islamic Architecture silhouette & warm lantern glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 240" className="w-full h-full object-cover">
          <path
            d="M0 240 L120 180 C200 130 300 130 380 180 L500 240 L620 180 C700 130 800 130 880 180 L1000 240 L1120 180 C1200 130 1300 130 1380 180 L1440 240 Z"
            fill="#d4af37"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left: Heading & Subheading */}
          <div className="space-y-1">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Apni Problem Ka Hal Paaein
            </h3>
            <p className="font-heading text-xl sm:text-2xl text-[#f8d268] font-semibold">
              Maulana Shamsuddin Se
            </p>
          </div>

          {/* Center: Action Buttons matching screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam o Alaikum Maulana Shamsuddin Sahab, mujhe mashwara chahiye.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#f5b82e] hover:bg-[#e0a41d] text-[#112417] font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current text-[#112417]" />
              <span>Abhi Contact Kare</span>
            </a>

            <a
              href={`tel:${settings.phoneNumber}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#155e3c] hover:bg-[#0f462c] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg border border-emerald-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-[#fde047]" />
              <span className="font-mono">{settings.phoneDisplay}</span>
            </a>
          </div>

          {/* Right: Golden Script Quote */}
          <div className="hidden lg:block text-right">
            <p className="font-script text-2xl sm:text-3xl text-[#fde047] leading-relaxed drop-shadow">
              “Dua, Wazifa, Taweez... <br />
              <span className="text-[#fef08a]">Har Mushkil Ka Hal”</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
