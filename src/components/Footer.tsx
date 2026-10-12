import React from 'react';
import { Phone, MapPin, MessageCircle, Heart } from 'lucide-react';
import { MosqueLogoIcon } from './IslamicArt';
import { GeneralSettings } from '../types';

interface FooterProps {
  settings: GeneralSettings;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
  isAdminAuthenticated?: boolean;
  onOpenLogin?: () => void;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  isAdminAuthenticated = false,
  onOpenLogin,
  onOpenAdmin,
  onLogout,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081810] text-[#e2e8e4] border-t border-[#155e3c]/40">
      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MosqueLogoIcon size={44} />
              <div>
                <h4 className="font-heading text-xl font-bold text-white tracking-tight">
                  {settings.siteName}
                </h4>
                <p className="text-[11px] text-emerald-200/80 font-medium">
                  Dua | Wazifa | Ruhani Ilm | Taweez
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Allah Taala ke fazl o karam aur sharai rehnumai se insaniyat ki khidmat. Har musibat aur pareshani mein roohani mashwara aur dua.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-white border-b border-[#155e3c]/50 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#fde047] transition-colors"
                >
                  • Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us Details */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-white border-b border-[#155e3c]/50 pb-2 inline-block">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${settings.phoneNumber}`}
                    className="font-bold text-white hover:text-[#fde047] transition-colors font-mono"
                  >
                    {settings.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-emerald-300/80">Call / WhatsApp</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="text-neutral-300">{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us & Social */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-white border-b border-[#155e3c]/50 pb-2 inline-block">
              Follow Us
            </h4>
            <p className="text-xs text-neutral-400">
              Social platforms par humse jude rahein aur roohani wazaif ki jankari paayein.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#155e3c] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#155e3c] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#155e3c] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#155e3c] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching screenshot */}
      <div className="border-t border-white/10 bg-[#05100a] py-4 px-4 sm:px-6 lg:px-8 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {currentYear} {settings.siteName}. All Rights Reserved. &nbsp;|&nbsp;{' '}
            <span className="text-emerald-300/80">Sabka Bhala, Sabka Sukoon.</span>
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>|</span>
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-white transition-colors text-amber-300/80"
            >
              Disclaimer
            </button>
            <span>|</span>
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  onClick={onOpenAdmin}
                  className="text-emerald-300 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  Admin Panel
                </button>
                <span>/</span>
                <button
                  onClick={onLogout}
                  className="text-red-300 hover:text-white transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="text-neutral-400 hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
