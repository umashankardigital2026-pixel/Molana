import React from 'react';
import { WebsiteContent } from '../types';
import { IslamicDivider } from './IslamicArt';
import { PhoneCall, HeartHandshake, BookOpen, Compass } from 'lucide-react';

interface ProcessSectionProps {
  content: WebsiteContent;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ content }) => {
  const stepIcons = [
    <PhoneCall key="1" className="w-5 h-5 text-[#d4af37]" />,
    <HeartHandshake key="2" className="w-5 h-5 text-[#d4af37]" />,
    <BookOpen key="3" className="w-5 h-5 text-[#d4af37]" />,
    <Compass key="4" className="w-5 h-5 text-[#d4af37]" />,
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <IslamicDivider label="Rehnumai Ka Tareeqa" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
            {content.processTitle}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            {content.processSubtitle}
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-[75%] h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {content.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-[#fafbf9] hover:bg-white rounded-2xl border border-neutral-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Numbered Circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-[#155e3c] group-hover:bg-[#0f462c] text-white flex items-center justify-center shadow-md transition-colors">
                    {stepIcons[idx] || <BookOpen className="w-5 h-5 text-[#d4af37]" />}
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#d4af37] text-[#112417] text-xs font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-[#112417] mb-2 group-hover:text-[#155e3c] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
