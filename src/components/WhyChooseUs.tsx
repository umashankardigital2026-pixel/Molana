import React from 'react';
import { UserCheck, Lock, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { WebsiteContent, ImageSettings } from '../types';
import { MosqueSkylineRight } from './IslamicArt';

interface WhyChooseUsProps {
  content: WebsiteContent;
  imageSettings?: ImageSettings;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content, imageSettings }) => {
  const showSkyline =
    imageSettings === undefined ||
    (imageSettings.showAllImages && imageSettings.showWhyChooseSkyline);

  const icons = [
    <UserCheck key="0" className="w-6 h-6 text-[#155e3c]" />,
    <Lock key="1" className="w-6 h-6 text-[#155e3c]" />,
    <Sparkles key="2" className="w-6 h-6 text-[#155e3c]" />,
    <CheckCircle2 key="3" className="w-6 h-6 text-[#155e3c]" />,
    <PhoneCall key="4" className="w-6 h-6 text-[#155e3c]" />,
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#ebf5f0] overflow-hidden border-b border-emerald-100">
      {/* Decorative Mosque Silhouette on the right (matches screenshot) */}
      {showSkyline && <MosqueSkylineRight />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
            {content.whyChooseUsTitle}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            {content.whyChooseUsSubtitle}
          </p>
        </div>

        {/* 5 Circular Icons horizontally */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {content.whyChooseUsItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 max-w-[190px] group"
            >
              {/* Circular Icon Container matching screenshot */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border border-emerald-200 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-[#155e3c]">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center transition-colors group-hover:bg-emerald-100/80">
                  {icons[index] || <Sparkles className="w-6 h-6 text-[#155e3c]" />}
                </div>
              </div>

              {/* Title label */}
              <h4 className="font-bold text-xs sm:text-sm text-[#112417] leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-500 leading-normal line-clamp-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
