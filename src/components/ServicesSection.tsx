import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart, Camera } from 'lucide-react';
import { ServiceItem, ImageSettings } from '../types';
import {
  IslamicDivider,
  ServiceCoupleImage,
  ServiceQuranImage,
  ServiceRuhaniImage,
  ServiceTaweezImage,
  ServiceMarriageImage,
  ServiceRelationshipImage,
} from './IslamicArt';

interface ServicesSectionProps {
  services: ServiceItem[];
  imageSettings?: ImageSettings;
  onSelectService: (service: ServiceItem) => void;
  isAdminAuthenticated?: boolean;
  onOpenImageManager?: (slotId?: string) => void;
}

const ServiceCardArtwork: React.FC<{
  service: ServiceItem;
  imageSettings?: ImageSettings;
}> = ({ service, imageSettings }) => {
  const [hasError, setHasError] = useState(false);

  const showImages =
    imageSettings === undefined ||
    (imageSettings.showAllImages && imageSettings.showServiceImages);

  const customImg = imageSettings?.customImages?.[service.id] || service.imageUrl;

  const renderSvgFallback = () => {
    switch (service.iconType) {
      case 'dua':
        return <ServiceCoupleImage />;
      case 'wazifa':
        return <ServiceQuranImage />;
      case 'ruhani':
        return <ServiceRuhaniImage />;
      case 'taweez':
        return <ServiceTaweezImage />;
      case 'marriage':
        return <ServiceMarriageImage />;
      case 'relationship':
        return <ServiceRelationshipImage />;
      default:
        return <ServiceCoupleImage />;
    }
  };

  if (showImages && customImg && !hasError) {
    return (
      <div className="w-full h-48 relative overflow-hidden bg-neutral-900 group">
        <img
          src={customImg}
          alt={service.imageCaption || service.title}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Relevancy Tag / Couple Theme Badge */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[#fde047] border border-[#d4af37]/50 shadow-sm flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40 inline" />
            <span>{service.coupleThemeTag || 'Couple Guidance'}</span>
          </span>
          <span className="text-[10px] text-emerald-100 bg-[#155e3c]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30 shadow-sm">
            Spiritual Care
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {renderSvgFallback()}
      {service.coupleThemeTag && (
        <div className="absolute bottom-2.5 left-3 pointer-events-none">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[#fde047] border border-[#d4af37]/50 shadow-sm flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40 inline" />
            <span>{service.coupleThemeTag}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  imageSettings,
  onSelectService,
  isAdminAuthenticated,
  onOpenImageManager,
}) => {
  const activeServices = services.filter((s) => s.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  const showImages =
    imageSettings === undefined ||
    (imageSettings.showAllImages && imageSettings.showServiceImages);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          {/* Islamic Ornamental Flourish with badge */}
          <IslamicDivider label="Sacred Spiritual Supplications" />

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
            Our Services
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Spiritual solutions for life's challenges and relationship harmony – grounded in authentic prayer and moral guidance with Maulana Shamsuddin.
          </p>
        </div>

        {/* 6 Services Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 relative"
            >
              {/* Admin Change Photo Button */}
              {isAdminAuthenticated && (
                <button
                  type="button"
                  onClick={() => onOpenImageManager?.(service.id)}
                  className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 bg-[#0b1a12]/85 hover:bg-[#155e3c] text-[#fde047] text-[11px] font-bold rounded-lg border border-[#d4af37]/60 shadow-md backdrop-blur-xs flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
                  title={`Change Photo for ${service.title}`}
                >
                  <Camera className="w-3 h-3 text-[#d4af37]" />
                  <span>Change Photo</span>
                </button>
              )}

              {/* Card Artwork / Image Container or Clean Banner */}
              {showImages ? (
                <div className="relative overflow-hidden">
                  <ServiceCardArtwork service={service} imageSettings={imageSettings} />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              ) : (
                <div className="py-5 px-6 bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white flex items-center justify-between border-b border-[#d4af37]/30">
                  <div className="flex items-center gap-2">
                    <span className="text-[#fde047]">✦</span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">
                      {service.coupleThemeTag || 'Spiritual Healing'}
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#fde047]/80" />
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow text-center items-center justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold text-[#112417] group-hover:text-[#155e3c] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
                    {service.shortDescription}
                  </p>
                  {service.imageCaption && (
                    <p className="text-[11px] text-[#155e3c] font-medium italic line-clamp-1">
                      ✦ {service.imageCaption}
                    </p>
                  )}
                </div>

                {/* Dark Green Pill CTA Button */}
                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155e3c] hover:bg-[#0f442b] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all group-hover:px-6 cursor-pointer"
                >
                  <span>More Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

