import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { SliderSlide, ImageSettings } from '../types';
import { HeroSlide1Backdrop, HeroSlide2Backdrop, HeroSlide3Backdrop } from './IslamicArt';

interface HeroSliderProps {
  slides: SliderSlide[];
  imageSettings?: ImageSettings;
  onOpenConsultation: (serviceSuggestion?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  imageSettings,
  onOpenConsultation,
}) => {
  const activeSlides = slides.filter((s) => s.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const total = activeSlides.length;

  const showImages =
    imageSettings === undefined ||
    (imageSettings.showAllImages && imageSettings.showHeroImages);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (total || 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % (total || 1));
  };

  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = window.setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, total]);

  const handleManualNav = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  if (!total) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];
  const customImg =
    currentSlide.imageUrl || imageSettings?.customImages?.[currentSlide.id];

  return (
    <section className="relative w-full overflow-hidden bg-[#0a180f] text-white min-h-[580px] sm:min-h-[620px] lg:min-h-[640px] flex items-center">
      {/* Background Graphic Crossfade or Clean Minimal Canvas if Images Removed */}
      <div className="absolute inset-0">
        {!showImages ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a1b] via-[#091b11] to-[#040e08] bg-islamic-pattern opacity-95">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.15),transparent_60%)]" />
          </div>
        ) : customImg ? (
          <div className="absolute inset-0">
            <img
              src={customImg}
              alt={currentSlide.heading}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
          </div>
        ) : (
          <>
            {currentSlide.themeStyle === 'love' && <HeroSlide1Backdrop />}
            {currentSlide.themeStyle === 'marriage' && <HeroSlide2Backdrop />}
            {currentSlide.themeStyle === 'ruhani' && <HeroSlide3Backdrop />}
          </>
        )}
      </div>

      {/* Slide Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center content column (matches screenshot) */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            {/* Italic Calligraphic Subheading */}
            <p className="font-heading italic text-[#f8d268] text-xl sm:text-2xl md:text-3xl tracking-wide drop-shadow">
              {currentSlide.subheading}
            </p>

            {/* Main Gold & White Display Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#e5b84c] leading-[1.15] drop-shadow-md">
              {currentSlide.heading}
            </h1>

            {/* Description Paragraph */}
            <p className="text-neutral-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow">
              {currentSlide.description}
            </p>

            {/* Feature Highlights Grid / Checkmarks */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-1 text-xs sm:text-sm font-medium text-neutral-100">
              {currentSlide.highlightPills.map((pill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#d4af37] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0a180f]" />
                  </div>
                  <span className="tracking-wide">{pill}</span>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              {/* Gold/Yellow WhatsApp Button */}
              <a
                href={currentSlide.ctaPrimaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#f5b82e] hover:bg-[#e0a41d] text-[#112417] font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>{currentSlide.ctaPrimaryText}</span>
                <MessageCircle className="w-5 h-5 fill-current text-[#112417]" />
              </a>

              {/* Dark Green Phone Call Button */}
              <a
                href={currentSlide.ctaSecondaryLink}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#155e3c] hover:bg-[#0f462c] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg border border-emerald-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-[#fde047]" />
                <span className="font-mono">{currentSlide.ctaSecondaryText}</span>
              </a>

              {/* Consultation Modal Trigger */}
              <button
                onClick={() => onOpenConsultation(currentSlide.heading)}
                className="inline-flex items-center gap-1.5 px-4 py-3 bg-white/10 hover:bg-white/20 text-neutral-100 font-medium text-xs sm:text-sm rounded-full backdrop-blur-sm transition-colors border border-white/15"
              >
                <span>Online Form</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Script Quote Column (matches screenshot) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end pr-4">
            <div className="max-w-xs text-right space-y-2">
              <p className="font-script text-3xl sm:text-4xl text-[#fde047] leading-relaxed drop-shadow-lg">
                {currentSlide.scriptQuote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Indicators (Dots) */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleManualNav(idx)}
            className={`transition-all rounded-full ${
              idx === currentIndex
                ? 'w-6 h-2.5 bg-[#f5b82e]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
