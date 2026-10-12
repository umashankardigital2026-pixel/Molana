import React from 'react';
import { X, CheckCircle2, MessageCircle, Phone, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { ServiceItem, GeneralSettings } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  settings: GeneralSettings;
  onClose: () => void;
  onConsultService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  settings,
  onClose,
  onConsultService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-[#155e3c] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
            Islamic Spiritual Guidance
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-1">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
            {service.shortDescription}
          </p>
        </div>

        {/* Relevant Couple / Lover Photo Banner */}
        {service.imageUrl && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-neutral-950 shrink-0">
            <img
              src={service.imageUrl}
              alt={service.imageCaption || service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[#fde047] border border-[#d4af37]/40 shadow-xs inline-flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40" />
                  <span>{service.coupleThemeTag || 'Roohani Couple Guidance'}</span>
                </span>
                {service.imageCaption && (
                  <p className="text-xs text-white/95 mt-1 font-medium drop-shadow-xs italic">
                    ✦ {service.imageCaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#112417] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#155e3c]" />
              <span>Tafseel & Sharai Rehnumai (Overview)</span>
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed bg-[#f8faf9] p-4 rounded-xl border border-neutral-200/60">
              {service.fullDescription}
            </p>
          </div>

          {/* Spiritual Benefits */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#112417] uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#155e3c]" />
              <span>Khaas Fawaid & Barkat (Spiritual Benefits)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.spiritualBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#155e3c] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Wazifa / Amal Note */}
          {service.recommendedWazifa && (
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
              <h5 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                ✦ Maulana Sahab Ka Mashwara & Zikr
              </h5>
              <p className="text-xs text-amber-950 font-medium">
                {service.recommendedWazifa}
              </p>
            </div>
          )}

          {/* Process / Steps */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
              Rehnumai Paane Ka Amal
            </h4>
            <ol className="space-y-1.5 list-decimal list-inside text-xs text-neutral-600">
              {service.processSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Assalam o Alaikum Maulana Shamsuddin Sahab, mujhe "${service.title}" ke bare mein mashwara chahiye.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#155e3c] hover:bg-[#0f462c] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Par Baat Karein</span>
            </a>

            <a
              href={`tel:${settings.phoneNumber}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs sm:text-sm font-bold rounded-full font-mono"
            >
              <Phone className="w-4 h-4" />
              <span>{settings.phoneDisplay}</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onConsultService(service.title);
            }}
            className="text-xs font-semibold text-[#155e3c] hover:underline"
          >
            Online Form Bhejein →
          </button>
        </div>
      </div>
    </div>
  );
};

// Generic Text / Legal Modal
export const LegalModal: React.FC<{
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-[#112417] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#155e3c]" />
          <span>{title}</span>
        </h3>

        <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-h-[60vh] overflow-y-auto space-y-3 whitespace-pre-line">
          {content}
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-full"
          >
            Band Karein (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
