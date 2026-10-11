import React from 'react';

// Brand Mosque Logo Icon matching screenshot
export const MosqueLogoIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#155E3C" />
    <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
    {/* Crescent Moon */}
    <path d="M54 18 C52 18 48 20 48 24 C48 28 52 30 55 30 C51 31 45 28 45 24 C45 19 50 17 54 18 Z" fill="#D4AF37" />
    {/* Center Dome */}
    <path d="M30 65 C30 45 42 34 50 32 C58 34 70 45 70 65 Z" fill="#F4F9F5" />
    <path d="M50 28 L50 32" stroke="#D4AF37" strokeWidth="2.5" />
    {/* Minarets */}
    <rect x="22" y="44" width="7" height="28" rx="2" fill="#F4F9F5" />
    <polygon points="25.5,35 22,44 29,44" fill="#D4AF37" />
    <rect x="71" y="44" width="7" height="28" rx="2" fill="#F4F9F5" />
    <polygon points="74.5,35 71,44 78,44" fill="#D4AF37" />
    {/* Base & Arches */}
    <rect x="18" y="70" width="64" height="12" rx="3" fill="#D4AF37" />
    <path d="M44 65 C44 58 50 54 50 54 C50 54 56 58 56 65 Z" fill="#155E3C" />
    <path d="M35 65 C35 60 39 57 39 57 C39 57 43 60 43 65 Z" fill="#155E3C" />
    <path d="M57 65 C57 60 61 57 61 57 C61 57 65 60 65 65 Z" fill="#155E3C" />
  </svg>
);

// Decorative Islamic Divider Flourish
export const IslamicDivider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex items-center justify-center gap-3 my-2">
    <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#155e3c]" />
    <div className="flex items-center gap-1.5 text-[#155e3c]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#155e3c]">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#155e3c" />
        <circle cx="12" cy="12" r="3" fill="#D4AF37" />
      </svg>
      {label && (
        <span className="text-sm font-semibold tracking-wider text-[#155e3c] uppercase px-1">
          {label}
        </span>
      )}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#155e3c]">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#155e3c" />
        <circle cx="12" cy="12" r="3" fill="#D4AF37" />
      </svg>
    </div>
    <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#155e3c]" />
  </div>
);

// Hero Slide 1: Couple silhouette with sunset & grand mosque backdrop
export const HeroSlide1Backdrop: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0d1f14]">
    <svg className="w-full h-full object-cover" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs>
        <radialGradient id="sunGlow" cx="45%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#ffb03a" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#e36b22" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#5c1d10" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#08140c" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1910" />
          <stop offset="40%" stopColor="#2c1409" />
          <stop offset="70%" stopColor="#d8772a" />
          <stop offset="100%" stopColor="#eeb661" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="1600" height="900" fill="url(#skyGrad)" />
      <rect width="1600" height="900" fill="url(#sunGlow)" />

      {/* Mosque Silhouettes in Distance */}
      <g opacity="0.38" fill="#1e0b06">
        {/* Distant Minarets & Domes */}
        <path d="M400 550 C400 450 480 390 540 380 C600 390 680 450 680 550 Z" />
        <path d="M540 340 L540 380" stroke="#d4af37" strokeWidth="3" />
        <circle cx="540" cy="336" r="6" fill="#d4af37" />
        <rect x="350" y="420" width="18" height="280" />
        <polygon points="359,380 348,420 370,420" />
        <rect x="710" y="420" width="18" height="280" />
        <polygon points="719,380 708,420 730,420" />

        <path d="M720 570 C720 490 780 440 830 435 C880 440 940 490 940 570 Z" />
        <rect x="960" y="460" width="16" height="240" />
        <polygon points="968,425 958,460 978,460" />
      </g>

      {/* Midground Mosque Architecture */}
      <g opacity="0.75" fill="#130805">
        <path d="M800 620 C800 480 910 400 1000 390 C1090 400 1200 480 1200 620 Z" />
        <rect x="750" y="440" width="22" height="300" />
        <polygon points="761,390 748,440 774,440" />
        <rect x="1230" y="440" width="22" height="300" />
        <polygon points="1241,390 1228,440 1254,440" />
        <rect x="0" y="680" width="1600" height="220" />
      </g>

      {/* Foreground: Young Couple seen from behind */}
      <g fill="#0b0504">
        {/* Balcony / Wall */}
        <path d="M900 670 L1600 670 L1600 900 L900 900 Z" />
        {/* Male Silhouette */}
        <path d="M1220 540 C1220 500 1250 490 1270 490 C1290 490 1315 505 1315 540 C1315 575 1290 590 1270 590 C1250 590 1220 575 1220 540 Z" />
        <path d="M1210 595 C1210 595 1240 575 1270 575 C1305 575 1345 595 1365 640 L1380 770 L1200 770 Z" />
        {/* Female Silhouette with veil / dupatta */}
        <path d="M1110 560 C1110 515 1140 500 1165 500 C1190 500 1215 520 1215 560 C1215 600 1185 615 1165 615 C1140 615 1110 595 1110 560 Z" />
        <path d="M1070 615 C1070 580 1120 560 1165 560 C1200 560 1235 580 1245 615 L1250 780 L1040 780 Z" />
        {/* Flowing Dupatta */}
        <path d="M1040 620 C1020 670 1010 740 1000 800 L1100 800 Z" opacity="0.9" />
      </g>
    </svg>
    {/* Dark subtle vignette overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
  </div>
);

// Hero Slide 2: Romantic Muslim Wedding & Mosque Arches
export const HeroSlide2Backdrop: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0c1f17]">
    <svg className="w-full h-full object-cover" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs>
        <radialGradient id="emeraldGlow" cx="60%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1e5c3a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#0d2e1c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#04120a" stopOpacity="0.98" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#emeraldGlow)" />
      {/* Islamic Arch Silhouettes */}
      <g stroke="#d4af37" strokeWidth="2" opacity="0.25">
        <path d="M200 900 V400 C200 250 350 150 500 120 C650 150 800 250 800 400 V900" fill="none" />
        <path d="M750 900 V400 C750 250 900 150 1050 120 C1200 150 1350 250 1350 400 V900" fill="none" />
      </g>
      {/* Hanging Antique Lanterns with warm glow */}
      <g>
        <line x1="1050" y1="0" x2="1050" y2="280" stroke="#d4af37" strokeWidth="2" />
        <circle cx="1050" cy="330" r="45" fill="#f59e0b" opacity="0.3" filter="blur(20px)" />
        <polygon points="1050,280 1030,310 1070,310" fill="#d4af37" />
        <rect x="1030" y="310" width="40" height="50" rx="4" fill="#fbbf24" opacity="0.9" />
        <polygon points="1030,360 1050,385 1070,360" fill="#d4af37" />
        
        <line x1="1250" y1="0" x2="1250" y2="350" stroke="#d4af37" strokeWidth="1.5" />
        <circle cx="1250" cy="390" r="35" fill="#f59e0b" opacity="0.3" filter="blur(15px)" />
        <rect x="1235" y="370" width="30" height="40" rx="3" fill="#fbbf24" opacity="0.85" />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
  </div>
);

// Hero Slide 3: Holy Quran & Divine Light Rays
export const HeroSlide3Backdrop: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#101b13]">
    <svg className="w-full h-full object-cover" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs>
        <radialGradient id="divineLight" cx="70%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#d97706" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#143e26" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#07120a" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#divineLight)" />
      {/* Light Rays */}
      <g opacity="0.22" stroke="#fef08a" strokeWidth="8">
        <line x1="1100" y1="0" x2="800" y2="900" />
        <line x1="1250" y1="0" x2="1050" y2="900" />
        <line x1="1400" y1="0" x2="1300" y2="900" />
        <line x1="1000" y1="0" x2="600" y2="900" />
      </g>
      {/* Wooden Rehal & Open Quran Silhouette */}
      <g fill="#0e0704" opacity="0.9">
        <path d="M1000 680 L1150 560 L1300 680 L1230 730 L1150 670 L1070 730 Z" />
        {/* Pages */}
        <path d="M1010 560 C1070 535 1140 550 1150 565 C1160 550 1230 535 1290 560 L1270 630 C1220 605 1160 620 1150 635 C1140 620 1080 605 1030 630 Z" fill="#e2d2b5" opacity="0.3" />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
  </div>
);

// Service 1 Image: Couple Silhouette with sunset glow
export const ServiceCoupleImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-gradient-to-br from-[#e0712a] via-[#aa381e] to-[#2b0c05] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="cSunset" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="45%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#cSunset)" />
      {/* Sunset Sun */}
      <circle cx="200" cy="110" r="45" fill="#fef08a" opacity="0.9" />
      {/* Couple Silhouette */}
      <path d="M140 125 C140 105 155 95 170 95 C185 95 195 105 195 125 C195 140 180 150 170 150 C155 150 140 140 140 125 Z" fill="#180502" />
      <path d="M130 160 C130 145 150 135 170 135 C190 135 210 145 210 160 L215 240 L125 240 Z" fill="#180502" />
      {/* Partner */}
      <path d="M205 130 C205 110 220 100 235 100 C250 100 260 110 260 130 C260 145 245 155 235 155 C220 155 205 145 205 130 Z" fill="#180502" />
      <path d="M195 165 C195 150 215 140 235 140 C255 140 275 150 275 165 L280 240 L190 240 Z" fill="#180502" />
      {/* Gentle Heart glow above */}
      <path d="M200 70 C195 60 185 60 180 65 C175 70 175 78 185 88 L200 100 L215 88 C225 78 225 70 220 65 C215 60 205 60 200 70 Z" fill="#fbbf24" opacity="0.8" />
    </svg>
  </div>
);

// Service 2 Image: Holy Quran on wooden rehal
export const ServiceQuranImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-gradient-to-br from-[#3b2210] via-[#211105] to-[#0d0702] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="qGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#1f1107" />
      <circle cx="200" cy="110" r="100" fill="url(#qGlow)" />
      {/* Wooden Rehal Stand */}
      <path d="M120 170 L200 100 L280 170 L260 200 L200 150 L140 200 Z" fill="#78350f" />
      <path d="M140 170 L200 115 L260 170 L250 185 L200 140 L150 185 Z" fill="#92400e" />
      {/* Holy Quran Pages Open */}
      <path d="M130 95 C165 75 198 85 200 95 C202 85 235 75 270 95 L265 140 C230 120 202 130 200 140 C198 130 170 120 135 140 Z" fill="#fef3c7" />
      {/* Spine & Gold edges */}
      <path d="M199 92 L201 92 L201 142 L199 142 Z" fill="#b45309" />
      {/* Quranic Calligraphy Lines */}
      <g stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="145" y1="102" x2="190" y2="102" />
        <line x1="145" y1="112" x2="190" y2="112" />
        <line x1="145" y1="122" x2="185" y2="122" />
        <line x1="210" y1="102" x2="255" y2="102" />
        <line x1="210" y1="112" x2="255" y2="112" />
        <line x1="215" y1="122" x2="255" y2="122" />
      </g>
      {/* Golden Bookmark Ribbon */}
      <path d="M200 95 C205 130 215 160 220 180 L212 175 L205 180 Z" fill="#d97706" />
    </svg>
  </div>
);

// Service 3 Image: Hands raised in Dua receiving celestial golden light
export const ServiceRuhaniImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-[#0d1f14] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="rDuaGlow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#d97706" stopOpacity="0.5" />
          <stop offset="80%" stopColor="#14532d" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#052e16" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#061c10" />
      {/* Divine Golden Light Source */}
      <circle cx="200" cy="50" r="120" fill="url(#rDuaGlow)" />
      {/* Beams */}
      <g stroke="#fde047" strokeWidth="2" opacity="0.35">
        <line x1="200" y1="10" x2="140" y2="200" />
        <line x1="200" y1="10" x2="180" y2="200" />
        <line x1="200" y1="10" x2="220" y2="200" />
        <line x1="200" y1="10" x2="260" y2="200" />
      </g>
      {/* Raised Hands Silhouette in Supplication */}
      <g fill="#1e293b" opacity="0.95">
        {/* Left hand */}
        <path d="M150 170 C150 140 165 110 185 105 C190 104 195 110 192 120 C185 135 180 155 180 185 L160 210 Z" />
        {/* Right hand */}
        <path d="M250 170 C250 140 235 110 215 105 C210 104 205 110 208 120 C215 135 220 155 220 185 L240 210 Z" />
        {/* Palms joined */}
        <path d="M175 155 C190 165 210 165 225 155 L215 220 L185 220 Z" />
      </g>
      <circle cx="200" cy="115" r="8" fill="#fbbf24" filter="blur(2px)" />
    </svg>
  </div>
);

// Service 4 Image: Traditional Islamic Taweez Pendant
export const ServiceTaweezImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#01140e] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="tGlow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#04271d" />
      <circle cx="200" cy="120" r="80" fill="url(#tGlow)" />
      {/* Gold Chain */}
      <path d="M120 0 C150 60 180 90 200 95 C220 90 250 60 280 0" stroke="#d4af37" strokeWidth="3" fill="none" strokeDasharray="4 2" />
      {/* Pendant Ring */}
      <circle cx="200" cy="98" r="9" stroke="#d4af37" strokeWidth="3.5" fill="none" />
      {/* Rectangular Gold Taweez Box */}
      <rect x="165" y="105" width="70" height="85" rx="6" fill="#155e3c" stroke="#d4af37" strokeWidth="3.5" />
      {/* Inner border and Islamic talismanic engraving */}
      <rect x="172" y="112" width="56" height="71" rx="3" fill="#0d3b25" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Arabic Script & Sacred Numeric Square */}
      <g stroke="#d4af37" strokeWidth="1">
        <line x1="172" y1="135" x2="228" y2="135" />
        <line x1="172" y1="160" x2="228" y2="160" />
        <line x1="190" y1="112" x2="190" y2="183" />
        <line x1="210" y1="112" x2="210" y2="183" />
      </g>
      {/* Hanging emerald drop bead at bottom */}
      <polygon points="200,190 194,205 200,215 206,205" fill="#34d399" stroke="#d4af37" strokeWidth="1.5" />
    </svg>
  </div>
);

// Service 5 Image: Muslim Wedding Bride & Groom
export const ServiceMarriageImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-gradient-to-br from-[#991b1b] via-[#450a0a] to-[#1c0404] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="mGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#450a0a" />
      <circle cx="200" cy="110" r="90" fill="url(#mGlow)" />
      {/* Groom in Cream Sherwani on right */}
      <path d="M225 110 C225 85 240 75 255 75 C270 75 285 85 285 110 C285 130 270 145 255 145 C240 145 225 130 225 110 Z" fill="#fed7aa" />
      {/* Groom Turban / Kulla */}
      <path d="M228 85 C228 65 255 55 260 55 C265 55 282 65 282 85 Z" fill="#d97706" />
      {/* Groom Sherwani */}
      <path d="M210 150 C210 140 235 135 255 135 C275 135 300 140 300 150 L310 240 L200 240 Z" fill="#fef3c7" />
      {/* Bride in Red Embroidered Dupatta / Lehanga on left */}
      <path d="M120 120 C120 95 135 85 150 85 C165 85 180 95 180 120 C180 140 165 150 150 150 C135 150 120 140 120 120 Z" fill="#fed7aa" />
      {/* Red bridal dupatta with gold border */}
      <path d="M105 100 C110 65 160 65 185 90 C190 120 185 160 190 200 L110 200 Z" fill="#b91c1c" stroke="#d4af37" strokeWidth="2" />
      <path d="M110 155 C110 145 130 140 150 140 C170 140 190 145 190 155 L195 240 L95 240 Z" fill="#991b1b" />
      {/* Traditional Maang Tikka */}
      <circle cx="150" cy="85" r="3" fill="#fbbf24" />
      <line x1="150" y1="75" x2="150" y2="85" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  </div>
);

// Service 6 Image: Broken heart mended with golden light
export const ServiceRelationshipImage: React.FC = () => (
  <div className="w-full h-44 relative overflow-hidden bg-gradient-to-br from-[#450a0a] via-[#1f0505] to-[#0a0202] flex items-center justify-center">
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#1c0505" />
      <circle cx="200" cy="115" r="95" fill="url(#hGlow)" />
      {/* Left Heart Half */}
      <path d="M195 195 C140 155 100 125 100 85 C100 55 125 40 155 40 C175 40 190 55 195 65 L195 195 Z" fill="#dc2626" />
      {/* Right Heart Half */}
      <path d="M205 195 C260 155 300 125 300 85 C300 55 275 40 245 40 C225 40 210 55 205 65 L205 195 Z" fill="#b91c1c" />
      {/* Golden Kintsugi / Healing Light between halves */}
      <path d="M195 65 L205 75 L192 100 L208 125 L195 155 L202 180 L195 195" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="200" cy="115" r="14" fill="#fbbf24" filter="blur(6px)" />
    </svg>
  </div>
);

// About Section Left Image: Holy Quran, Prayer Beads & Antique Glowing Lantern
export const AboutQuranLanternImage: React.FC = () => (
  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/30 bg-[#0d0703]">
    <svg viewBox="0 0 600 480" className="w-full h-auto object-cover">
      <defs>
        <radialGradient id="lampLight" cx="68%" cy="45%" r="48%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#b45309" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#180b02" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Atmospheric Wooden Table Backdrop */}
      <rect width="600" height="480" fill="#140a04" />
      <circle cx="410" cy="220" r="180" fill="url(#lampLight)" />
      
      {/* Open Holy Quran on Left */}
      <g>
        {/* Rehal base */}
        <polygon points="120,410 240,320 360,410 330,440 240,370 150,440" fill="#5c2d12" stroke="#d4af37" strokeWidth="1.5" />
        {/* Quran Left Book Page */}
        <path d="M80,290 C140,250 220,265 240,285 L230,350 C180,325 120,330 90,360 Z" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
        {/* Quran Right Book Page */}
        <path d="M240,285 C260,265 340,250 400,290 L390,360 C360,330 300,325 250,350 Z" fill="#fffbeb" stroke="#78350f" strokeWidth="1.5" />
        {/* Ornate Gold Border & Arabic script lines */}
        <path d="M100,295 C145,268 205,278 220,292 L215,340 C175,320 130,325 108,348 Z" stroke="#d97706" strokeWidth="1" fill="none" />
        <path d="M260,292 C275,278 335,268 380,295 L372,348 C350,325 305,320 265,340 Z" stroke="#d97706" strokeWidth="1" fill="none" />
        {/* Script mock lines */}
        <g stroke="#92400e" strokeWidth="1.5" opacity="0.6">
          <line x1="120" y1="295" x2="200" y2="295" />
          <line x1="115" y1="307" x2="205" y2="307" />
          <line x1="115" y1="319" x2="205" y2="319" />
          <line x1="275" y1="295" x2="360" y2="295" />
          <line x1="270" y1="307" x2="365" y2="307" />
          <line x1="270" y1="319" x2="365" y2="319" />
        </g>
      </g>

      {/* Tasbih (Prayer Beads) draped across table */}
      <g stroke="#d4af37" strokeWidth="1">
        <path d="M180,370 C220,400 300,420 380,390" fill="none" stroke="#78350f" strokeWidth="2" />
        {[180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380].map((x, i) => (
          <circle key={i} cx={x} cy={370 + Math.sin(i * 0.5) * 15} r="6" fill="#92400e" stroke="#f59e0b" strokeWidth="1" />
        ))}
      </g>

      {/* Antique Brass Islamic Lantern (Fanous) on Right */}
      <g>
        {/* Lantern Hanging Ring */}
        <circle cx="430" cy="90" r="16" stroke="#d4af37" strokeWidth="4" fill="none" />
        {/* Lantern Cap Dome */}
        <path d="M380,150 C380,110 410,105 430,105 C450,105 480,110 480,150 Z" fill="#b45309" stroke="#d4af37" strokeWidth="3" />
        {/* Glass Cylinder / Frame with warm candle inside */}
        <rect x="385" y="150" width="90" height="150" rx="6" fill="#fef08a" opacity="0.85" stroke="#78350f" strokeWidth="3" />
        {/* Decorative Arabesque Cutouts */}
        <g stroke="#78350f" strokeWidth="2">
          <line x1="415" y1="150" x2="415" y2="300" />
          <line x1="445" y1="150" x2="445" y2="300" />
          <path d="M385,225 C410,210 450,210 475,225" fill="none" />
        </g>
        {/* Glowing Candle Flame inside */}
        <path d="M430,230 C420,210 425,190 430,180 C435,190 440,210 430,230 Z" fill="#f59e0b" />
        <circle cx="430" cy="205" r="25" fill="#fef08a" opacity="0.6" filter="blur(6px)" />
        {/* Base */}
        <path d="M370,300 L490,300 L500,340 L360,340 Z" fill="#b45309" stroke="#d4af37" strokeWidth="3" />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
  </div>
);

// Why Choose Us Mosque Skyline graphic
export const MosqueSkylineRight: React.FC = () => (
  <div className="hidden lg:block absolute right-0 bottom-0 h-full w-80 pointer-events-none overflow-hidden opacity-85">
    <svg viewBox="0 0 320 450" className="w-full h-full object-contain object-bottom-right">
      <defs>
        <linearGradient id="minaretGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#155e3c" />
          <stop offset="100%" stopColor="#0a3622" />
        </linearGradient>
      </defs>
      {/* Tall Minaret */}
      <rect x="220" y="80" width="22" height="370" fill="url(#minaretGreen)" />
      <polygon points="231,20 215,80 247,80" fill="#d4af37" />
      <circle cx="231" cy="16" r="5" fill="#d4af37" />
      {/* Minaret Balconies */}
      <rect x="210" y="120" width="42" height="10" rx="2" fill="#d4af37" />
      <rect x="212" y="220" width="38" height="10" rx="2" fill="#d4af37" />
      {/* Main Dome */}
      <path d="M80 450 C80 320 150 250 210 240 C270 250 340 320 340 450 Z" fill="#155e3c" opacity="0.9" />
      <path d="M210 210 L210 240" stroke="#d4af37" strokeWidth="3" />
      <circle cx="210" cy="205" r="7" fill="#d4af37" />
      {/* Smaller side dome */}
      <path d="M20 450 C20 380 60 340 90 335 C120 340 160 380 160 450 Z" fill="#1e734b" opacity="0.7" />
    </svg>
  </div>
);

// User Avatar Helpers
export const ClientAvatar: React.FC<{ type: 'couple' | 'man' | 'woman' }> = ({ type }) => {
  if (type === 'couple') {
    return (
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37] bg-gradient-to-tr from-[#991b1b] to-[#ea580c] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="40" fill="#ea580c" />
          {/* Couple silhouette */}
          <circle cx="30" cy="30" r="10" fill="#1a0604" />
          <path d="M18 58 C18 45 25 42 32 42 C38 42 45 45 45 58 Z" fill="#1a0604" />
          <circle cx="48" cy="28" r="11" fill="#2d0a06" />
          <path d="M38 58 C38 43 45 40 52 40 C60 40 68 43 68 58 Z" fill="#2d0a06" />
        </svg>
      </div>
    );
  }
  if (type === 'man') {
    return (
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37] bg-gradient-to-tr from-[#0f172a] to-[#334155] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="40" fill="#334155" />
          {/* Respectful male portrait with short beard */}
          <circle cx="40" cy="30" r="14" fill="#fcd34d" />
          <path d="M30 36 C33 46 47 46 50 36 Z" fill="#1e293b" />
          <path d="M20 70 C20 50 30 45 40 45 C50 45 60 50 60 70 Z" fill="#0f172a" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37] bg-gradient-to-tr from-[#155e3c] to-[#047857] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="#047857" />
        {/* Hijab silhouette */}
        <circle cx="40" cy="34" r="13" fill="#fcd34d" />
        <path d="M24 35 C24 20 32 15 40 15 C48 15 56 20 56 35 C56 50 48 54 40 54 C32 54 24 50 24 35 Z" fill="#064e3b" />
        <path d="M18 70 C18 52 26 48 40 48 C54 48 62 52 62 70 Z" fill="#064e3b" />
      </svg>
    </div>
  );
};
