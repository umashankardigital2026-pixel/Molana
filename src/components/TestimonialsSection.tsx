import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem, ImageSettings } from '../types';
import { IslamicDivider, ClientAvatar } from './IslamicArt';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  imageSettings?: ImageSettings;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  imageSettings,
}) => {
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const showAvatars =
    imageSettings === undefined ||
    (imageSettings.showAllImages && imageSettings.showTestimonialAvatars);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#fafbf9] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <IslamicDivider label="Ikhlas Aur Dua" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
            Our Happy Clients
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Logon ki duaon aur bharose se hi hamari pehchaan hai.
          </p>
        </div>

        {/* 3 Testimonials Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Quote icon watermark */}
              <div className="absolute top-4 right-4 text-emerald-100 group-hover:text-emerald-200 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-1" />
              </div>

              {/* Top part: Avatar & Quote text */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {showAvatars ? (
                    item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/40 shadow-xs shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <ClientAvatar type={item.avatarType} />
                    )
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#155e3c] text-[#fef08a] font-bold font-serif flex items-center justify-center border border-[#d4af37]/40 shadow-xs shrink-0 text-sm">
                      {getInitials(item.name)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-base text-[#112417]">
                      – {item.name}
                    </h4>
                    <span className="text-xs text-neutral-500">
                      {item.serviceCategory}
                    </span>
                  </div>
                </div>

                <p className="text-neutral-700 text-sm italic leading-relaxed pt-1">
                  “{item.quote}”
                </p>
              </div>

              {/* Bottom: 5 Gold Stars */}
              <div className="flex items-center gap-1 pt-4 text-[#eab308]">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

