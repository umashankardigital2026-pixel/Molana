import React from 'react';
import { ShieldCheck, Sparkles, Clock, HeartHandshake, Phone, MessageCircle } from 'lucide-react';
import { WebsiteContent, GeneralSettings } from '../types';
import { AboutQuranLanternImage } from './IslamicArt';

interface AboutSectionProps {
  content: WebsiteContent;
  settings: GeneralSettings;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  settings,
  onOpenConsultation,
}) => {
  const iconMap: Record<number, React.ReactNode> = {
    0: <ShieldCheck className="w-5 h-5 text-white" />,
    1: <Sparkles className="w-5 h-5 text-white" />,
    2: <Clock className="w-5 h-5 text-white" />,
    3: <HeartHandshake className="w-5 h-5 text-white" />,
  };

  const showImage =
    settings.imageSettings === undefined ||
    (settings.imageSettings.showAllImages && settings.imageSettings.showAboutImage);

  const customAboutImg =
    settings.imageSettings?.aboutCustomImage || settings.imageSettings?.customImages?.['about'];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#fafbf9] border-y border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Atmospheric Quran & Lantern Illustration or Clean Spiritual Quote */}
          {showImage ? (
            <div className="lg:col-span-5">
              {customAboutImg ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/30 bg-neutral-900">
                  <img
                    src={customAboutImg}
                    alt={content.aboutTitle}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <AboutQuranLanternImage />
              )}
            </div>
          ) : (
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2617] to-[#155e3c] text-white p-8 rounded-3xl border border-[#d4af37]/40 shadow-xl space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
                ✦ Ruhani Ilm & Barkat
              </span>
              <h3 className="font-heading text-2xl font-bold leading-snug text-[#fef08a]">
                “Insaniyat Ki Khidmat Aur Allah Ki Raza”
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Maulana Shamsuddin barson se logon ke dilon mein sukoon aur rishton mein mohabbat qayam karne ke liye sharai rehnumai faraham kar rahe hain.
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-neutral-300 font-mono">
                Raabta: {settings.phoneDisplay}
              </div>
            </div>
          )}

          {/* Right Column: About Description & Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
                {content.aboutTitle}
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {content.aboutDescription}
              </p>
            </div>

            {/* 4 Feature Badges with circular icons (matches screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.aboutHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200/80 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#155e3c] flex items-center justify-center shrink-0 shadow-sm">
                    {iconMap[index] || <ShieldCheck className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                      {highlight.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">
                      {highlight.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#155e3c] hover:bg-[#0f462c] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 text-[#fde047]" />
                <span>Contact Now</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  'Assalam o Alaikum Maulana Shamsuddin Sahab, mujhe roohani rehnumai ke liye baat karni hai.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1f734c] hover:bg-[#165a3b] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#86efac]" />
                <span className="font-mono">{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
