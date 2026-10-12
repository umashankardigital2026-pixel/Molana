import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Lock, Shield, LogOut } from 'lucide-react';
import { MosqueLogoIcon } from './IslamicArt';
import { GeneralSettings } from '../types';

interface HeaderProps {
  settings: GeneralSettings;
  announcementText: string;
  onNavigate: (sectionId: string) => void;
  isAdminAuthenticated?: boolean;
  onOpenLogin?: () => void;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
  showAllImages?: boolean;
  onToggleImages?: () => void;
  onOpenImageManager?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  announcementText,
  onNavigate,
  isAdminAuthenticated = false,
  onOpenLogin,
  onOpenAdmin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const customLogo = settings.logoUrl || settings.imageSettings?.customImages?.['logo'];

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Our Process', id: 'process' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-neutral-100">
      {/* Top Black / Dark Islamic Announcement Bar */}
      <div className="bg-[#0b1610] text-[#f4f7f5] text-xs py-2 px-4 border-b border-[#1b3d29]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium tracking-wide text-emerald-100/90">
            <span className="text-[#d4af37]">✦</span>
            <span>{announcementText}</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-300">
            <div className="flex items-center gap-3">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d4af37] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d4af37] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d4af37] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Admin Login / Logout Option */}
            <div className="flex items-center pl-1 border-l border-white/10">
              {isAdminAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-900/90 hover:bg-emerald-800 text-[11px] text-[#fef08a] border border-emerald-500/40 transition-colors cursor-pointer"
                    title="Open Admin Portal"
                  >
                    <Shield className="w-3 h-3 text-[#d4af37]" />
                    <span>Admin Panel</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/80 hover:bg-red-900 text-[11px] text-red-200 border border-red-500/30 transition-colors cursor-pointer"
                    title="Logout from Admin"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] text-[#d4af37] border border-[#d4af37]/30 transition-colors cursor-pointer"
                  title="Admin Login & Authentication"
                >
                  <Lock className="w-3 h-3 text-[#d4af37]" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {customLogo ? (
              <img
                src={customLogo}
                alt={settings.siteName}
                className="w-12 h-12 object-contain rounded-xl border border-emerald-600/20 shrink-0 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <MosqueLogoIcon size={46} className="shrink-0 group-hover:scale-105 transition-transform" />
            )}
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#155e3c] leading-tight">
                {settings.siteName}
              </span>
              <span className="text-[11px] sm:text-xs font-medium tracking-wide text-neutral-500">
                Dua &nbsp;|&nbsp; Wazifa &nbsp;|&nbsp; Ruhani Ilm &nbsp;|&nbsp; Taweez
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-neutral-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#155e3c] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#155e3c] hover:after:w-full after:transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call / WhatsApp Primary Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#155e3c] hover:bg-[#0f442a] text-white rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                <Phone className="w-4 h-4 text-[#fef08a]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-sm tracking-wide text-white font-mono">
                  {settings.phoneDisplay}
                </span>
                <span className="text-[10px] text-emerald-200/90 font-medium -mt-0.5">
                  Call / WhatsApp
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#155e3c] hover:bg-emerald-50 rounded-lg sm:hidden"
              aria-label="Direct WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-[#155e3c] hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-neutral-100 pb-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-emerald-50 hover:text-[#155e3c] rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#155e3c] text-white rounded-lg text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>Call / WhatsApp: {settings.phoneDisplay}</span>
              </a>
            </div>

            {/* Mobile Admin option */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-1">
              {isAdminAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin?.();
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#155e3c] hover:underline"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin?.();
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-[#155e3c]"
                >
                  <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
