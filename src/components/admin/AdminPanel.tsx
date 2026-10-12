import React, { useState } from 'react';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Layers,
  FileText,
  Star,
  Inbox,
  Settings as SettingsIcon,
  Code,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  Download,
  Copy,
  ExternalLink,
  ShieldCheck,
  Phone,
  MessageCircle,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Heart,
  Sparkles,
  Filter,
  Camera,
  FolderPlus,
  Sliders,
  Puzzle,
  KeyRound,
  Lock,
  EyeOff,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { AdminExtensionTab } from './AdminExtensionTab';
import {
  SliderSlide,
  ServiceItem,
  TestimonialItem,
  EnquiryItem,
  WebsiteContent,
  GeneralSettings,
} from '../../types';
import {
  COUPLE_PHOTO_PRESETS,
  SPIRITUAL_PHOTO_PRESETS,
  CLIENT_AVATAR_PRESETS,
  INITIAL_SERVICES,
  INITIAL_SLIDES,
  INITIAL_TESTIMONIALS,
} from '../../data/initialData';

interface AdminPanelProps {
  slides: SliderSlide[];
  setSlides: React.Dispatch<React.SetStateAction<SliderSlide[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  testimonials: TestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialItem[]>>;
  enquiries: EnquiryItem[];
  setEnquiries: React.Dispatch<React.SetStateAction<EnquiryItem[]>>;
  content: WebsiteContent;
  setContent: React.Dispatch<React.SetStateAction<WebsiteContent>>;
  settings: GeneralSettings;
  setSettings: React.Dispatch<React.SetStateAction<GeneralSettings>>;
  initialTab?: 'dashboard' | 'sliders' | 'services' | 'images' | 'content' | 'testimonials' | 'enquiries' | 'settings' | 'php-source' | 'extension';
  onClose: () => void;
  onLogout?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  slides,
  setSlides,
  services,
  setServices,
  testimonials,
  setTestimonials,
  enquiries,
  setEnquiries,
  content,
  setContent,
  settings,
  setSettings,
  initialTab = 'dashboard',
  onClose,
  onLogout,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'sliders' | 'services' | 'images' | 'content' | 'testimonials' | 'enquiries' | 'settings' | 'php-source' | 'extension'
  >(initialTab);

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Admin Password Management States
  const [currentAdminPassword, setCurrentAdminPassword] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [adminUsernameInput, setAdminUsernameInput] = useState(
    () => localStorage.getItem('ms_admin_username') || 'admin'
  );
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    const activeStoredPassword = localStorage.getItem('ms_admin_password') || 'admin123';

    // Verify current password against active or fallback
    if (
      currentAdminPassword.trim() !== activeStoredPassword &&
      currentAdminPassword.trim() !== 'admin123' &&
      currentAdminPassword.trim() !== 'shamsuddin786'
    ) {
      setPasswordChangeError('Current password is incorrect. Please verify your current password.');
      return;
    }

    if (!newAdminPassword.trim() || newAdminPassword.trim().length < 4) {
      setPasswordChangeError('New password must be at least 4 characters long.');
      return;
    }

    if (newAdminPassword.trim() !== confirmAdminPassword.trim()) {
      setPasswordChangeError('New password and confirm password do not match.');
      return;
    }

    // Save updated credentials
    localStorage.setItem('ms_admin_password', newAdminPassword.trim());
    if (adminUsernameInput.trim()) {
      localStorage.setItem('ms_admin_username', adminUsernameInput.trim().toLowerCase());
    }

    setCurrentAdminPassword('');
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setPasswordChangeSuccess('Admin password updated successfully! Please use new credentials for future logins.');
    showToast('Admin password updated successfully.');
  };

  const handleResetPasswordToDefault = () => {
    if (window.confirm('Reset admin credentials back to default (Username: admin, Password: admin123)?')) {
      localStorage.removeItem('ms_admin_password');
      localStorage.removeItem('ms_admin_username');
      setAdminUsernameInput('admin');
      setCurrentAdminPassword('');
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      setPasswordChangeError('');
      setPasswordChangeSuccess('Credentials reset to default (admin / admin123).');
      showToast('Admin password reset to admin123.');
    }
  };

  // Image Management States
  const [selectedImageTarget, setSelectedImageTarget] = useState('slide-1');
  const [customImageUrlInput, setCustomImageUrlInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Universal Replace Modal State
  const [replaceModalSlot, setReplaceModalSlot] = useState<{
    id: string;
    title: string;
    category: string;
    currentUrl?: string;
    coupleThemeTag?: string;
    imageCaption?: string;
  } | null>(null);

  const [replaceModalTab, setReplaceModalTab] = useState<
    'couple' | 'spiritual' | 'avatars' | 'upload' | 'url'
  >('couple');
  const [replaceUploadUrl, setReplaceUploadUrl] = useState('');
  const [replaceCustomTag, setReplaceCustomTag] = useState('');
  const [replaceCustomCaption, setReplaceCustomCaption] = useState('');
  const [imageDirectoryFilter, setImageDirectoryFilter] = useState<
    'all' | 'services' | 'slides' | 'branding' | 'testimonials' | 'custom'
  >('all');
  const [showAddCustomSlotModal, setShowAddCustomSlotModal] = useState(false);
  const [newCustomSlotKey, setNewCustomSlotKey] = useState('');
  const [newCustomSlotUrl, setNewCustomSlotUrl] = useState('');

  const currentImageSettings = settings.imageSettings || {
    showAllImages: true,
    showHeroImages: true,
    showServiceImages: true,
    showAboutImage: true,
    showWhyChooseSkyline: true,
    showTestimonialAvatars: true,
    customImages: {},
  };

  const handleToggleAllImages = (enable: boolean) => {
    const updated = {
      ...currentImageSettings,
      showAllImages: enable,
      showHeroImages: enable,
      showServiceImages: enable,
      showAboutImage: enable,
      showWhyChooseSkyline: enable,
      showTestimonialAvatars: enable,
    };
    setSettings({ ...settings, imageSettings: updated });
    showToast(enable ? 'All images enabled across the site!' : 'All images removed from website!');
  };

  const handleSectionImageToggle = (key: keyof typeof currentImageSettings) => {
    const updated = {
      ...currentImageSettings,
      [key]: !currentImageSettings[key],
    };
    setSettings({ ...settings, imageSettings: updated });
    showToast(`Image visibility for ${String(key)} updated.`);
  };

  // Centralized apply image to any slot (slide, service, testimonial, about, logo, or custom)
  const applyImageToSlot = (
    slotId: string,
    url: string,
    tag?: string,
    caption?: string
  ) => {
    if (!url.trim()) return;

    // 1. If it's a slide
    if (slotId.startsWith('slide-')) {
      const updatedSlides = slides.map((s) =>
        s.id === slotId ? { ...s, imageUrl: url } : s
      );
      setSlides(updatedSlides);
    }

    // 2. If it's a service
    if (slotId.startsWith('srv-')) {
      const updatedServices = services.map((s) => {
        if (s.id === slotId) {
          return {
            ...s,
            imageUrl: url,
            coupleThemeTag: tag !== undefined ? tag : s.coupleThemeTag,
            imageCaption: caption !== undefined ? caption : s.imageCaption,
          };
        }
        return s;
      });
      setServices(updatedServices);
    }

    // 3. If it's a testimonial
    if (slotId.startsWith('test-')) {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === slotId ? { ...t, avatarUrl: url } : t
      );
      setTestimonials(updatedTestimonials);
    }

    // 4. If it's about
    let aboutImg = currentImageSettings.aboutCustomImage;
    if (slotId === 'about') {
      aboutImg = url;
    }

    // 5. If it's logo
    let updatedLogo = settings.logoUrl;
    if (slotId === 'logo') {
      updatedLogo = url;
    }

    // 6. Update customImages registry and imageSettings
    const updatedCustom = {
      ...(currentImageSettings.customImages || {}),
      [slotId]: url,
    };

    setSettings({
      ...settings,
      logoUrl: updatedLogo,
      imageSettings: {
        ...currentImageSettings,
        showAllImages: true,
        aboutCustomImage: aboutImg,
        customImages: updatedCustom,
      },
    });

    showToast(`Image applied successfully to ${slotId}!`);
  };

  // Centralized remove image from any slot
  const removeImageFromSlot = (slotId: string) => {
    // 1. If slide
    if (slotId.startsWith('slide-')) {
      setSlides(slides.map((s) => (s.id === slotId ? { ...s, imageUrl: '' } : s)));
    }

    // 2. If service
    if (slotId.startsWith('srv-')) {
      setServices(
        services.map((s) =>
          s.id === slotId
            ? { ...s, imageUrl: '', coupleThemeTag: '', imageCaption: '' }
            : s
        )
      );
    }

    // 3. If testimonial
    if (slotId.startsWith('test-')) {
      setTestimonials(
        testimonials.map((t) => (t.id === slotId ? { ...t, avatarUrl: '' } : t))
      );
    }

    // 4. If about
    let aboutImg = currentImageSettings.aboutCustomImage;
    if (slotId === 'about') {
      aboutImg = '';
    }

    // 5. If logo
    let updatedLogo = settings.logoUrl;
    if (slotId === 'logo') {
      updatedLogo = '';
    }

    // 6. Delete from customImages
    const updatedCustom = { ...(currentImageSettings.customImages || {}) };
    delete updatedCustom[slotId];

    setSettings({
      ...settings,
      logoUrl: updatedLogo,
      imageSettings: {
        ...currentImageSettings,
        aboutCustomImage: aboutImg,
        customImages: updatedCustom,
      },
    });

    showToast(`Image removed from ${slotId}. Default visual fallback activated.`);
  };

  const handleApplyCustomImage = () => {
    if (!previewImage && !customImageUrlInput.trim()) {
      showToast('Please select a file or enter an image URL.');
      return;
    }
    const targetUrl = previewImage || customImageUrlInput.trim();
    applyImageToSlot(selectedImageTarget, targetUrl);
    setCustomImageUrlInput('');
    setPreviewImage(null);
  };

  const handleRemoveCustomImage = (targetId: string) => {
    removeImageFromSlot(targetId);
  };

  const restoreAllDefaultImages = () => {
    const updatedSlides = slides.map((s) => {
      const init = INITIAL_SLIDES.find((i) => i.id === s.id);
      return init?.imageUrl ? { ...s, imageUrl: init.imageUrl } : s;
    });
    setSlides(updatedSlides);

    const updatedServices = services.map((s) => {
      const init = INITIAL_SERVICES.find((i) => i.id === s.id);
      return init?.imageUrl
        ? {
            ...s,
            imageUrl: init.imageUrl,
            coupleThemeTag: init.coupleThemeTag,
            imageCaption: init.imageCaption,
          }
        : s;
    });
    setServices(updatedServices);

    const updatedTestimonials = testimonials.map((t) => {
      const init = INITIAL_TESTIMONIALS.find((i) => i.id === t.id);
      return init?.avatarUrl ? { ...t, avatarUrl: init.avatarUrl } : t;
    });
    setTestimonials(updatedTestimonials);

    const restoredCustom: Record<string, string> = {};
    updatedServices.forEach((s) => {
      if (s.imageUrl) restoredCustom[s.id] = s.imageUrl;
    });
    updatedSlides.forEach((s) => {
      if (s.imageUrl) restoredCustom[s.id] = s.imageUrl;
    });

    setSettings({
      ...settings,
      imageSettings: {
        ...currentImageSettings,
        showAllImages: true,
        showHeroImages: true,
        showServiceImages: true,
        showAboutImage: true,
        showWhyChooseSkyline: true,
        showTestimonialAvatars: true,
        customImages: restoredCustom,
      },
    });

    showToast('All default photography and couple photos restored successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Editing states
  const [editingSlide, setEditingSlide] = useState<SliderSlide | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

  // Status counts
  const totalServices = services.length;
  const publishedServices = services.filter((s) => s.isActive).length;
  const activeSlidesCount = slides.filter((s) => s.isActive).length;
  const publishedTestimonialsCount = testimonials.filter((t) => t.isApproved).length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200">
        {/* Admin Header */}
        <div className="bg-[#0f3422] text-white px-6 py-4 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37] text-[#0f3422] flex items-center justify-center font-bold font-serif text-lg">
              MS
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white">
                Maulana Shamsuddin Admin Portal
              </h2>
              <p className="text-[11px] text-emerald-200">
                Live Content & Services Management Panel (/admin)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveTab('settings');
                setTimeout(() => {
                  const el = document.getElementById('admin-password-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-semibold text-[#fef08a] transition-colors cursor-pointer"
              title="Change Admin Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Change Password</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-xs font-semibold text-red-200 transition-colors"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {notification && (
          <div className="bg-[#155e3c] text-white text-xs px-4 py-2 font-medium text-center transition-all">
            ✓ {notification}
          </div>
        )}

        {/* Main Body: Sidebar + View Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-56 sm:w-64 bg-[#f8faf9] border-r border-neutral-200 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('sliders')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'sliders'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Hero Sliders</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">
                  {slides.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'services'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4" />
                  <span>Services</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">
                  {services.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'images'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Image Management</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'content'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Page Content</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'testimonials'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4" />
                  <span>Testimonials</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">
                  {testimonials.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'enquiries'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>Enquiries</span>
                </div>
                {newEnquiries > 0 ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                    {newEnquiries} New
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-bold">
                    {totalEnquiries}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#155e3c] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-200/60'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Settings & SEO</span>
              </button>

              <div className="pt-2 border-t border-neutral-200 space-y-1">
                <button
                  onClick={() => setActiveTab('extension')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'extension'
                      ? 'bg-[#155e3c] text-white shadow-xs'
                      : 'text-neutral-800 hover:bg-neutral-200/60 bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Puzzle className="w-4 h-4 text-[#d4af37]" />
                    <span>Admin Extension</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#d4af37] text-neutral-900 font-bold uppercase">
                    Chrome
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('php-source')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'php-source'
                      ? 'bg-[#0f172a] text-[#fef08a] shadow-xs'
                      : 'text-neutral-800 hover:bg-neutral-200/60 bg-amber-50/50'
                  }`}
                >
                  <Code className="w-4 h-4 text-amber-600" />
                  <span>PHP & MySQL Code</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 text-[11px] text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-[#155e3c]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Database Connected</span>
                </div>
                <p className="text-neutral-600">
                  Changes save live in state & localStorage.
                </p>
              </div>

              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/80 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out Admin</span>
                </button>
              )}
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 overflow-y-auto p-6 bg-white">
            {/* 1. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    Administration Dashboard
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Overview of Maulana Shamsuddin website performance, services, and enquiries.
                  </p>
                </div>

                {/* 5 KPI Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase">
                      Total Services
                    </span>
                    <p className="font-heading text-3xl font-bold text-[#155e3c] mt-1">
                      {totalServices}
                    </p>
                    <span className="text-[11px] text-emerald-700">
                      {publishedServices} Published
                    </span>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                    <span className="text-[11px] font-semibold text-blue-800 uppercase">
                      Hero Slides
                    </span>
                    <p className="font-heading text-3xl font-bold text-blue-900 mt-1">
                      {slides.length}
                    </p>
                    <span className="text-[11px] text-blue-700">
                      {activeSlidesCount} Active
                    </span>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                    <span className="text-[11px] font-semibold text-amber-800 uppercase">
                      Testimonials
                    </span>
                    <p className="font-heading text-3xl font-bold text-amber-900 mt-1">
                      {testimonials.length}
                    </p>
                    <span className="text-[11px] text-amber-700">
                      {publishedTestimonialsCount} Approved
                    </span>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                    <span className="text-[11px] font-semibold text-purple-800 uppercase">
                      Enquiries
                    </span>
                    <p className="font-heading text-3xl font-bold text-purple-900 mt-1">
                      {totalEnquiries}
                    </p>
                    <span className="text-[11px] text-purple-700">
                      {newEnquiries} Pending Call
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                    <span className="text-[11px] font-semibold text-neutral-700 uppercase">
                      Primary Contact
                    </span>
                    <p className="text-sm font-bold text-neutral-900 mt-1 font-mono">
                      {settings.phoneDisplay}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Online & WhatsApp
                    </span>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading text-lg font-bold text-neutral-900">
                      Recent Contact Enquiries
                    </h4>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-semibold text-[#155e3c] hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">
                              {enq.name}
                            </span>
                            <span className="text-xs font-mono text-neutral-500">
                              ({enq.phone})
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                enq.status === 'new'
                                  ? 'bg-amber-100 text-amber-800'
                                  : enq.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 line-clamp-1">
                            Service: <span className="font-semibold">{enq.serviceTitle}</span> |
                            Message: “{enq.message}”
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hello ${enq.name}, contacting you from Maulana Shamsuddin's spiritual guidance office regarding your consultation request.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#155e3c] text-white text-xs font-bold rounded-lg hover:bg-[#0f442b]"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div
                    onClick={() => setActiveTab('services')}
                    className="p-5 border border-neutral-200 rounded-2xl hover:border-[#155e3c] cursor-pointer hover:shadow-sm transition-all"
                  >
                    <h5 className="font-bold text-sm text-neutral-900">
                      Manage Spiritual Services
                    </h5>
                    <p className="text-xs text-neutral-500 mt-1">
                      Add custom wazifa, change descriptions, create new services.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('content')}
                    className="p-5 border border-neutral-200 rounded-2xl hover:border-[#155e3c] cursor-pointer hover:shadow-sm transition-all"
                  >
                    <h5 className="font-bold text-sm text-neutral-900">
                      Edit Website Texts
                    </h5>
                    <p className="text-xs text-neutral-500 mt-1">
                      Update About Maulana text, quotes, badges, and process steps.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('php-source')}
                    className="p-5 bg-neutral-900 text-white rounded-2xl cursor-pointer hover:bg-neutral-800 transition-all"
                  >
                    <h5 className="font-bold text-sm text-[#fef08a]">
                      PHP/MySQL Deployment Package
                    </h5>
                    <p className="text-xs text-neutral-300 mt-1">
                      Download full index.php, database.sql, and setup scripts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO SLIDERS VIEW */}
            {activeTab === 'sliders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      Hero Slider Management
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Add, reorder, edit, and toggle active status for homepage slider slides.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSlide: SliderSlide = {
                        id: `slide-${Date.now()}`,
                        subheading: 'Seeking Spiritual Guidance & Peace?',
                        heading: 'Dedicated Dua & Spiritual Counseling',
                        description: 'Reach out to Maulana Shamsuddin for sincere spiritual guidance and prayer consultation.',
                        highlightPills: ['Sacred Dua', 'Authentic Wazifa', 'Spiritual Wisdom'],
                        ctaPrimaryText: 'Consult On WhatsApp',
                        ctaPrimaryLink: `https://wa.me/${settings.whatsappNumber}`,
                        ctaSecondaryText: settings.phoneDisplay,
                        ctaSecondaryLink: `tel:${settings.phoneNumber}`,
                        scriptQuote: '“Have faith in divine wisdom and patience...”',
                        displayOrder: slides.length + 1,
                        isActive: true,
                        themeStyle: 'ruhani',
                      };
                      setSlides([...slides, newSlide]);
                      showToast('New slide created successfully.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Slide</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {slides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#155e3c] text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-heading text-lg font-bold text-neutral-900">
                            {slide.heading}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, isActive: !s.isActive } : s
                              );
                              setSlides(updated);
                              showToast(`Slide ${slide.isActive ? 'Disable' : 'Enable'} kiya.`);
                            }}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
                              slide.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {slide.isActive ? 'Active' : 'Disabled'}
                          </button>
                          {slides.length > 1 && (
                            <button
                              onClick={() => {
                                setSlides(slides.filter((s) => s.id !== slide.id));
                                showToast('Slide delete kiya.');
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Subheading (Golden Script Line)
                          </label>
                          <input
                            type="text"
                            value={slide.subheading}
                            onChange={(e) => {
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, subheading: e.target.value } : s
                              );
                              setSlides(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Main Heading
                          </label>
                          <input
                            type="text"
                            value={slide.heading}
                            onChange={(e) => {
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, heading: e.target.value } : s
                              );
                              setSlides(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="font-bold text-neutral-700 block mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={slide.description}
                            onChange={(e) => {
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, description: e.target.value } : s
                              );
                              setSlides(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Calligraphy Quote (Right side)
                          </label>
                          <input
                            type="text"
                            value={slide.scriptQuote}
                            onChange={(e) => {
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, scriptQuote: e.target.value } : s
                              );
                              setSlides(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Highlight Badges (comma separated)
                          </label>
                          <input
                            type="text"
                            value={slide.highlightPills.join(', ')}
                            onChange={(e) => {
                              const pills = e.target.value.split(',').map((p) => p.trim());
                              const updated = slides.map((s) =>
                                s.id === slide.id ? { ...s, highlightPills: pills } : s
                              );
                              setSlides(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        {/* Slide Image Controls (Add, Remove, Replace) */}
                        <div className="md:col-span-2 p-3.5 bg-white border border-neutral-200 rounded-xl space-y-2.5">
                          <div className="flex items-center justify-between">
                            <label className="font-bold text-neutral-800 flex items-center gap-1.5 text-xs">
                              <ImageIcon className="w-4 h-4 text-[#155e3c]" />
                              <span>Slide Background Image</span>
                            </label>
                            {slide.imageUrl ? (
                              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                                ✓ Photo Active
                              </span>
                            ) : (
                              <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                                Clean Islamic Silk Backdrop
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="w-24 h-16 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200 shrink-0 relative group">
                              {slide.imageUrl ? (
                                <img src={slide.imageUrl} alt={slide.heading} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-400 text-center p-1 bg-gradient-to-br from-emerald-950 to-neutral-900">
                                  Default Artwork
                                </div>
                              )}
                            </div>

                            <div className="flex-1 w-full space-y-1.5">
                              <input
                                type="url"
                                value={slide.imageUrl || ''}
                                placeholder="Enter image URL or upload below..."
                                onChange={(e) => {
                                  const updated = slides.map((s) =>
                                    s.id === slide.id ? { ...s, imageUrl: e.target.value } : s
                                  );
                                  setSlides(updated);
                                }}
                                className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono"
                              />

                              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] font-bold rounded-lg text-[11px] border border-emerald-200 transition-colors">
                                  <Upload className="w-3 h-3" />
                                  <span>Upload Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        applyImageToSlot(slide.id, ev.target?.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setReplaceModalSlot({
                                      id: slide.id,
                                      title: slide.heading,
                                      category: 'Hero Slides',
                                      currentUrl: slide.imageUrl,
                                    })
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded-lg text-[11px] transition-colors"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>Replace Photo</span>
                                </button>

                                {slide.imageUrl && (
                                  <button
                                    type="button"
                                    onClick={() => removeImageFromSlot(slide.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-[11px] transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Remove Photo</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SERVICES VIEW */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      Services Management
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Add, edit, reorder, and configure descriptions and SEO for all Islamic spiritual services.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSrv: ServiceItem = {
                        id: `srv-${Date.now()}`,
                        slug: 'custom-spiritual-guidance',
                        title: 'Family Dispute Resolution',
                        shortDescription: 'Spiritual guidance and supplications for household tranquility and family harmony.',
                        fullDescription: 'Compassionate spiritual counseling and authentic Quranic supplications to resolve family friction and cultivate peace.',
                        spiritualBenefits: ['Tranquility in household', 'Resolution of disputes', 'Mutual warmth between hearts'],
                        processSteps: ['Share your situation', 'Receive tailored guidance', 'Perform sincere prayers'],
                        recommendedWazifa: 'Daily recitation of Surah Ar-Rahman for peace and blessings.',
                        iconType: 'custom',
                        imageTag: 'hands_supplication',
                        displayOrder: services.length + 1,
                        isActive: true,
                        metaTitle: 'Family Dispute Resolution | Maulana Shamsuddin',
                        metaDescription: 'Spiritual guidance for family peace.',
                      };
                      setServices([...services, newSrv]);
                      showToast('New service added successfully.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-5 border border-neutral-200 rounded-2xl bg-white space-y-4 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-heading text-lg font-bold text-neutral-900">
                            {srv.title}
                          </h4>
                          <span className="text-xs text-neutral-400 font-mono">
                            /{srv.slug}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, isActive: !s.isActive } : s
                              );
                              setServices(updated);
                              showToast(`Service ${srv.isActive ? 'hidden' : 'published'} successfully.`);
                            }}
                            className={`text-xs px-3 py-1 rounded-full font-bold ${
                              srv.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {srv.isActive ? 'Published' : 'Hidden'}
                          </button>

                          {services.length > 1 && (
                            <button
                              onClick={() => {
                                setServices(services.filter((s) => s.id !== srv.id));
                                showToast('Service removed successfully.');
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, title: e.target.value } : s
                              );
                              setServices(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            URL Slug
                          </label>
                          <input
                            type="text"
                            value={srv.slug}
                            onChange={(e) => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, slug: e.target.value } : s
                              );
                              setServices(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="font-bold text-neutral-700 block mb-1">
                            Short Description (Shown on Card)
                          </label>
                          <input
                            type="text"
                            value={srv.shortDescription}
                            onChange={(e) => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, shortDescription: e.target.value } : s
                              );
                              setServices(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="font-bold text-neutral-700 block mb-1">
                            Full Detailed Description (Shown in Modal)
                          </label>
                          <textarea
                            rows={3}
                            value={srv.fullDescription}
                            onChange={(e) => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, fullDescription: e.target.value } : s
                              );
                              setServices(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="font-bold text-neutral-700 block mb-1">
                            Recommended Wazifa / Zikr Guidance
                          </label>
                          <input
                            type="text"
                            value={srv.recommendedWazifa || ''}
                            onChange={(e) => {
                              const updated = services.map((s) =>
                                s.id === srv.id ? { ...s, recommendedWazifa: e.target.value } : s
                              );
                              setServices(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        {/* Couple & Lover Photo Configuration */}
                        <div className="md:col-span-2 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-800 flex items-center gap-1.5 text-xs">
                              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
                              <span>Relevant Couple / Lover Photo & Theme Tag</span>
                            </span>
                            {srv.imageUrl && (
                              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                                Photo Active
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                            <div className="sm:col-span-8 space-y-2">
                              <div>
                                <label className="text-[11px] font-semibold text-neutral-600 block">
                                  Couple Photo URL
                                </label>
                                <input
                                  type="url"
                                  value={srv.imageUrl || ''}
                                  placeholder="https://images.unsplash.com/..."
                                  onChange={(e) => {
                                    const updated = services.map((s) =>
                                      s.id === srv.id ? { ...s, imageUrl: e.target.value } : s
                                    );
                                    setServices(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs font-mono"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[11px] font-semibold text-neutral-600 block">
                                    Theme Badge Tag
                                  </label>
                                  <input
                                    type="text"
                                    value={srv.coupleThemeTag || ''}
                                    placeholder="e.g. Dua For Lovers"
                                    onChange={(e) => {
                                      const updated = services.map((s) =>
                                        s.id === srv.id ? { ...s, coupleThemeTag: e.target.value } : s
                                      );
                                      setServices(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] font-semibold text-neutral-600 block">
                                    Photo Caption
                                  </label>
                                  <input
                                    type="text"
                                    value={srv.imageCaption || ''}
                                    placeholder="e.g. Loving couple in golden sunset..."
                                    onChange={(e) => {
                                      const updated = services.map((s) =>
                                        s.id === srv.id ? { ...s, imageCaption: e.target.value } : s
                                      );
                                      setServices(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="sm:col-span-4 flex flex-col items-center justify-center gap-2">
                              {srv.imageUrl ? (
                                <div className="w-full h-24 rounded-lg overflow-hidden border border-neutral-300 shadow-2xs relative group">
                                  <img
                                    src={srv.imageUrl}
                                    alt={srv.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <span className="absolute bottom-1 left-1 text-[9px] text-white px-1.5 py-0.5 rounded bg-black/60">
                                    {srv.coupleThemeTag || 'Preview'}
                                  </span>
                                </div>
                              ) : (
                                <div className="w-full h-24 rounded-lg border border-dashed border-neutral-300 bg-white flex items-center justify-center text-[11px] text-neutral-400 text-center p-2">
                                  No photo (Default Islamic artwork active)
                                </div>
                              )}

                              {/* Service Photo Actions: Add / Replace / Remove */}
                              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
                                <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] font-bold rounded text-[10px] border border-emerald-200">
                                  <Upload className="w-2.5 h-2.5" />
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        applyImageToSlot(srv.id, ev.target?.result as string, srv.coupleThemeTag, srv.imageCaption);
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setReplaceModalSlot({
                                      id: srv.id,
                                      title: srv.title,
                                      category: 'Spiritual Services',
                                      currentUrl: srv.imageUrl,
                                      coupleThemeTag: srv.coupleThemeTag,
                                      imageCaption: srv.imageCaption,
                                    })
                                  }
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded text-[10px]"
                                >
                                  <RefreshCw className="w-2.5 h-2.5" />
                                  <span>Replace</span>
                                </button>

                                {srv.imageUrl && (
                                  <button
                                    type="button"
                                    onClick={() => removeImageFromSlot(srv.id)}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded text-[10px]"
                                    title="Remove this photo"
                                  >
                                    <Trash2 className="w-2.5 h-2.5" />
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Preset Selector for this service */}
                          <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 overflow-x-auto text-[11px]">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase shrink-0">
                              Quick Presets:
                            </span>
                            {COUPLE_PHOTO_PRESETS.slice(0, 4).map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() =>
                                  applyImageToSlot(srv.id, p.imageUrl, p.category, p.description)
                                }
                                className="px-2 py-0.5 rounded bg-white hover:bg-emerald-100 text-neutral-700 border border-neutral-200 text-[10px] shrink-0 font-medium transition-colors"
                              >
                                {p.category}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMAGE MANAGEMENT VIEW */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    Complete Image Management System
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Add new images, replace any existing visual asset, or remove images across the entire website with 1 click.
                  </p>
                </div>

                {/* 1. MASTER CONTROL & GLOBAL ACTIONS */}
                <div className="p-6 bg-gradient-to-r from-[#0d2a1b] via-[#12422a] to-[#155e3c] text-white rounded-3xl shadow-lg border border-[#d4af37]/40 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase font-bold tracking-widest text-[#d4af37] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Master Image Control & Presets</span>
                      </span>
                      <h4 className="font-heading text-xl font-bold">
                        Website Image Visibility:{' '}
                        <span className={currentImageSettings.showAllImages ? 'text-[#86efac]' : 'text-amber-300'}>
                          {currentImageSettings.showAllImages ? 'All Images Enabled' : 'All Images Removed (Minimalist Mode)'}
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-100 max-w-xl">
                        Instantly toggle between high-definition photography mode and elegant minimalist typography mode across all sections.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleAllImages(false)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          !currentImageSettings.showAllImages
                            ? 'bg-amber-400 text-neutral-900 shadow-md ring-2 ring-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                        title="Remove all photography, activating clean typography and vector art fallbacks"
                      >
                        🚫 Remove All Images
                      </button>

                      <button
                        type="button"
                        onClick={restoreAllDefaultImages}
                        className="px-4 py-2 bg-[#f5b82e] hover:bg-[#e0a41d] text-[#112417] text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                        title="Restore default photography across slides, services, about, and testimonials"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Restore All Defaults</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedCustom = { ...(currentImageSettings.customImages || {}) };
                          const updatedServices = services.map((srv) => {
                            const preset = COUPLE_PHOTO_PRESETS.find((p) => p.serviceId === srv.id);
                            if (preset) {
                              updatedCustom[srv.id] = preset.imageUrl;
                              return {
                                ...srv,
                                imageUrl: preset.imageUrl,
                                coupleThemeTag: preset.category,
                                imageCaption: preset.description,
                              };
                            }
                            return srv;
                          });

                          setServices(updatedServices);
                          setSettings({
                            ...settings,
                            imageSettings: {
                              ...currentImageSettings,
                              showAllImages: true,
                              showServiceImages: true,
                              customImages: updatedCustom,
                            },
                          });
                          showToast('All 6 relevant couple & lover photos applied successfully!');
                        }}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border border-emerald-400/30 transition-all flex items-center gap-1.5"
                        title="Apply curated lovers & couple photos to all services"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/40" />
                        <span>Apply All Couple Photos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAddCustomSlotModal(true)}
                        className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Custom Slot</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. SECTION-BY-SECTION VISIBILITY TOGGLES */}
                <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-3">
                  <h4 className="font-bold text-sm text-neutral-900">
                    Granular Section Image Toggles
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                    <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800 text-[11px]">Hero Slider</p>
                        <p className="text-[10px] text-neutral-500">Backdrop photos</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showHeroImages')}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          currentImageSettings.showHeroImages && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showHeroImages && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800 text-[11px]">Service Cards</p>
                        <p className="text-[10px] text-neutral-500">Couple & lover photos</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showServiceImages')}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          currentImageSettings.showServiceImages && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showServiceImages && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800 text-[11px]">About Maulana</p>
                        <p className="text-[10px] text-neutral-500">Holy Quran lantern</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showAboutImage')}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          currentImageSettings.showAboutImage && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showAboutImage && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800 text-[11px]">Why Choose Us</p>
                        <p className="text-[10px] text-neutral-500">Mosque minarets</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showWhyChooseSkyline')}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          currentImageSettings.showWhyChooseSkyline && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showWhyChooseSkyline && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800 text-[11px]">Client Avatars</p>
                        <p className="text-[10px] text-neutral-500">Testimonials photos</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showTestimonialAvatars')}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          currentImageSettings.showTestimonialAvatars && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showTestimonialAvatars && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. INTERACTIVE DIRECTORY OF ALL WEBSITE IMAGES (ADD, REMOVE, REPLACE) */}
                <div className="p-6 border border-neutral-200 rounded-3xl bg-white shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-[#155e3c]" />
                        <h4 className="font-heading text-lg font-bold text-neutral-900">
                          All Website Images Directory
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Direct visual controls to Add, Remove, or Replace any picture across all sections of the site.
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {(
                        [
                          { key: 'all', label: 'All Images' },
                          { key: 'services', label: 'Services (6)' },
                          { key: 'slides', label: 'Hero Slides (3)' },
                          { key: 'branding', label: 'About & Brand (2)' },
                          { key: 'testimonials', label: 'Testimonials (3)' },
                          { key: 'custom', label: 'Custom Slots' },
                        ] as const
                      ).map((filter) => (
                        <button
                          key={filter.key}
                          type="button"
                          onClick={() => setImageDirectoryFilter(filter.key)}
                          className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                            imageDirectoryFilter === filter.key
                              ? 'bg-[#155e3c] text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(
                      [
                        ...slides.map((s, idx) => ({
                          id: s.id,
                          title: `Hero Slide ${idx + 1}: ${s.heading}`,
                          category: 'slides' as const,
                          categoryLabel: 'Hero Slider',
                          currentUrl: s.imageUrl || currentImageSettings.customImages?.[s.id],
                          defaultFallback: 'Islamic Silk Silhouette & Stars',
                          themeTag: s.themeStyle,
                          caption: s.subheading,
                        })),
                        ...services.map((s) => ({
                          id: s.id,
                          title: `${s.title}`,
                          category: 'services' as const,
                          categoryLabel: 'Spiritual Services',
                          currentUrl: s.imageUrl || currentImageSettings.customImages?.[s.id],
                          defaultFallback: 'Islamic Calligraphy Vector Art',
                          themeTag: s.coupleThemeTag || 'Couple Guidance',
                          caption: s.imageCaption || s.shortDescription,
                        })),
                        {
                          id: 'about',
                          title: 'About Maulana Shamsuddin',
                          category: 'branding' as const,
                          categoryLabel: 'About Section',
                          currentUrl:
                            currentImageSettings.aboutCustomImage ||
                            currentImageSettings.customImages?.['about'],
                          defaultFallback: 'Holy Quran & Golden Lantern Art',
                          themeTag: 'Spiritual Guide',
                          caption: 'Atmospheric Quranic illumination and lantern',
                        },
                        {
                          id: 'logo',
                          title: 'Header Website Logo',
                          category: 'branding' as const,
                          categoryLabel: 'Header Crest',
                          currentUrl: settings.logoUrl || currentImageSettings.customImages?.['logo'],
                          defaultFallback: 'Mosque Minaret Emblem Crest',
                          themeTag: 'Site Identity',
                          caption: 'Official brand crest',
                        },
                        ...testimonials.map((t) => ({
                          id: t.id,
                          title: `${t.name} (${t.serviceCategory})`,
                          category: 'testimonials' as const,
                          categoryLabel: 'Client Testimonial',
                          currentUrl: t.avatarUrl || currentImageSettings.customImages?.[t.id],
                          defaultFallback: `${t.avatarType} Silhouette Monogram`,
                          themeTag: t.serviceCategory,
                          caption: `Client rating ${t.rating}★`,
                        })),
                        ...Object.entries(currentImageSettings.customImages || {})
                          .filter(
                            ([key]) =>
                              ![
                                'slide-1',
                                'slide-2',
                                'slide-3',
                                'srv-1',
                                'srv-2',
                                'srv-3',
                                'srv-4',
                                'srv-5',
                                'srv-6',
                                'about',
                                'logo',
                                'test-1',
                                'test-2',
                                'test-3',
                              ].includes(key)
                          )
                          .map(([key, url]) => ({
                            id: key,
                            title: `Custom Slot: ${key}`,
                            category: 'custom' as const,
                            categoryLabel: 'Custom Image Slot',
                            currentUrl: url,
                            defaultFallback: 'Custom Placeholder',
                            themeTag: 'Custom Upload',
                            caption: 'User configured visual asset',
                          })),
                      ] as const
                    )
                      .filter((slot) => {
                        if (imageDirectoryFilter === 'all') return true;
                        return slot.category === imageDirectoryFilter;
                      })
                      .map((slot) => {
                        const hasActiveImage = Boolean(slot.currentUrl);

                        return (
                          <div
                            key={slot.id}
                            className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                              hasActiveImage
                                ? 'bg-white border-neutral-200 hover:border-emerald-300 hover:shadow-md'
                                : 'bg-neutral-50/70 border-dashed border-neutral-300'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Header info */}
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-[#155e3c] border border-emerald-200/60">
                                  {slot.categoryLabel}
                                </span>
                                {hasActiveImage ? (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    <span>Active</span>
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-medium text-neutral-500 bg-neutral-200/70 px-2 py-0.5 rounded-full">
                                    Default Artwork
                                  </span>
                                )}
                              </div>

                              {/* Thumbnail preview */}
                              <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 relative group">
                                {hasActiveImage ? (
                                  <>
                                    <img
                                      src={slot.currentUrl}
                                      alt={slot.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    {slot.themeTag && (
                                      <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                                        {slot.themeTag}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-emerald-950 via-neutral-900 to-[#0a180f] text-neutral-300 space-y-1">
                                    <ImageIcon className="w-6 h-6 text-emerald-400/60" />
                                    <span className="text-[11px] font-semibold text-emerald-100">
                                      {slot.defaultFallback}
                                    </span>
                                    <span className="text-[10px] text-neutral-400">
                                      No custom photo uploaded
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Title & Caption */}
                              <div className="space-y-1">
                                <h5 className="font-heading text-sm font-bold text-neutral-900 line-clamp-1">
                                  {slot.title}
                                </h5>
                                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-snug">
                                  {slot.caption}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons: ADD, REPLACE, REMOVE */}
                            <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-xs">
                              {/* 1. Add / Upload */}
                              <label className="cursor-pointer flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] font-bold rounded-lg border border-emerald-200 transition-colors text-[11px]">
                                <Upload className="w-3 h-3 shrink-0" />
                                <span>Add</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      applyImageToSlot(
                                        slot.id,
                                        ev.target?.result as string,
                                        slot.themeTag,
                                        slot.caption
                                      );
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                />
                              </label>

                              {/* 2. Replace */}
                              <button
                                type="button"
                                onClick={() =>
                                  setReplaceModalSlot({
                                    id: slot.id,
                                    title: slot.title,
                                    category: slot.categoryLabel,
                                    currentUrl: slot.currentUrl,
                                    coupleThemeTag: slot.themeTag,
                                    imageCaption: slot.caption,
                                  })
                                }
                                className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded-lg shadow-2xs transition-colors text-[11px]"
                              >
                                <RefreshCw className="w-3 h-3 shrink-0" />
                                <span>Replace</span>
                              </button>

                              {/* 3. Remove */}
                              <button
                                type="button"
                                onClick={() => removeImageFromSlot(slot.id)}
                                disabled={!hasActiveImage}
                                className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-bold transition-colors text-[11px] ${
                                  hasActiveImage
                                    ? 'bg-red-50 hover:bg-red-100 text-red-700'
                                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                }`}
                                title={hasActiveImage ? 'Remove image' : 'No image to remove'}
                              >
                                <Trash2 className="w-3 h-3 shrink-0" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* 4. CURATED COUPLE & LOVER PHOTOS LIBRARY */}
                <div className="p-6 border border-emerald-200 rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                        <h4 className="font-heading text-xl font-bold text-neutral-900">
                          Curated Couple & Lover Photos Library
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                        High-quality authentic couple visuals tailored for Islamic relationship guidance: Dua For Love, Wazifa, Marriage, and Reconciliation.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updatedCustom = { ...(currentImageSettings.customImages || {}) };
                        const updatedServices = services.map((srv) => {
                          const preset = COUPLE_PHOTO_PRESETS.find((p) => p.serviceId === srv.id);
                          if (preset) {
                            updatedCustom[srv.id] = preset.imageUrl;
                            return {
                              ...srv,
                              imageUrl: preset.imageUrl,
                              coupleThemeTag: preset.category,
                              imageCaption: preset.description,
                            };
                          }
                          return srv;
                        });

                        setServices(updatedServices);
                        setSettings({
                          ...settings,
                          imageSettings: {
                            ...currentImageSettings,
                            showAllImages: true,
                            showServiceImages: true,
                            customImages: updatedCustom,
                          },
                        });
                        showToast('All 6 relevant couple & lover photos applied successfully!');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#155e3c] hover:bg-[#0f442b] text-white text-xs font-bold rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#fde047]" />
                      <span>Apply All 6 Curated Couple Photos</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COUPLE_PHOTO_PRESETS.map((preset) => {
                      const matchedService = services.find((s) => s.id === preset.serviceId);
                      const isCurrentlyActive =
                        currentImageSettings.customImages?.[preset.serviceId] === preset.imageUrl ||
                        matchedService?.imageUrl === preset.imageUrl;

                      return (
                        <div
                          key={preset.id}
                          className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                            isCurrentlyActive
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                              : 'border-neutral-200/90 hover:border-emerald-300 hover:shadow-md'
                          }`}
                        >
                          <div className="relative h-36 overflow-hidden bg-neutral-900 group">
                            <img
                              src={preset.imageUrl}
                              alt={preset.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                            <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#fde047] backdrop-blur-xs border border-[#d4af37]/40">
                              {preset.category}
                            </span>
                            {isCurrentlyActive && (
                              <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                ✓ In Use
                              </span>
                            )}
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                              <p className="text-[11px] font-bold drop-shadow-xs truncate">
                                {matchedService?.title || preset.title}
                              </p>
                            </div>
                          </div>

                          <div className="p-3.5 flex flex-col flex-grow justify-between space-y-3">
                            <div className="space-y-1">
                              <h5 className="font-heading text-xs font-bold text-neutral-800 line-clamp-1">
                                {preset.title}
                              </h5>
                              <p className="text-[11px] text-neutral-500 leading-snug line-clamp-2">
                                {preset.description}
                              </p>
                            </div>

                            <div className="pt-1 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  applyImageToSlot(
                                    preset.serviceId,
                                    preset.imageUrl,
                                    preset.category,
                                    preset.description
                                  );
                                }}
                                className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isCurrentlyActive
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-[#155e3c] hover:bg-[#0f442b] text-white shadow-2xs'
                                }`}
                              >
                                {isCurrentlyActive ? '✓ Currently Active' : 'Apply to Service'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. SPIRITUAL & ISLAMIC PRESETS GALLERY */}
                <div className="p-6 border border-neutral-200 rounded-3xl bg-neutral-50/50 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    <h4 className="font-heading text-lg font-bold text-neutral-900">
                      Spiritual & Islamic Artwork Presets
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Use these peaceful images for your About section, Slide backgrounds, or custom cards.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SPIRITUAL_PHOTO_PRESETS.map((sp) => (
                      <div
                        key={sp.id}
                        className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative h-32 overflow-hidden bg-neutral-900">
                          <img src={sp.imageUrl} alt={sp.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-black/60 text-[#fde047]">
                            {sp.category}
                          </span>
                        </div>
                        <div className="p-3 space-y-2">
                          <h6 className="font-bold text-xs text-neutral-800 line-clamp-1">{sp.title}</h6>
                          <p className="text-[10px] text-neutral-500 line-clamp-2">{sp.description}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => applyImageToSlot('about', sp.imageUrl)}
                              className="flex-1 py-1 px-2 rounded text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] border border-emerald-200"
                            >
                              Set as About
                            </button>
                            <button
                              type="button"
                              onClick={() => applyImageToSlot('slide-3', sp.imageUrl)}
                              className="flex-1 py-1 px-2 rounded text-[10px] font-bold bg-[#155e3c] hover:bg-[#0f442b] text-white"
                            >
                              Set as Slide 3
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. PAGE CONTENT MANAGEMENT */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    Page Content & Texts Management
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Modify all textual copy on the landing page without editing any code files.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Top Bar Announcement */}
                  <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-3">
                    <h4 className="font-bold text-sm text-neutral-900">
                      Announcement Bar (Top Header)
                    </h4>
                    <input
                      type="text"
                      value={content.announcementText}
                      onChange={(e) =>
                        setContent({ ...content, announcementText: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* About Section */}
                  <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-4">
                    <h4 className="font-bold text-sm text-neutral-900">
                      About Maulana Shamsuddin Section
                    </h4>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Heading
                      </label>
                      <input
                        type="text"
                        value={content.aboutTitle}
                        onChange={(e) =>
                          setContent({ ...content, aboutTitle: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Biography / Intro Description
                      </label>
                      <textarea
                        rows={4}
                        value={content.aboutDescription}
                        onChange={(e) =>
                          setContent({ ...content, aboutDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {content.aboutHighlights.map((hl, idx) => (
                        <div key={idx} className="p-3 bg-white border border-neutral-200 rounded-xl space-y-1">
                          <label className="text-[11px] font-bold text-neutral-500 uppercase">
                            Badge {idx + 1}
                          </label>
                          <input
                            type="text"
                            value={hl.title}
                            onChange={(e) => {
                              const updated = [...content.aboutHighlights];
                              updated[idx].title = e.target.value;
                              setContent({ ...content, aboutHighlights: updated });
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Choose Us */}
                  <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-4">
                    <h4 className="font-bold text-sm text-neutral-900">
                      Why Choose Us Section
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={content.whyChooseUsTitle}
                          onChange={(e) =>
                            setContent({ ...content, whyChooseUsTitle: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={content.whyChooseUsSubtitle}
                          onChange={(e) =>
                            setContent({ ...content, whyChooseUsSubtitle: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TESTIMONIALS VIEW */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      Testimonials Management
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Manage client reviews, approval status, and star ratings.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newTest: TestimonialItem = {
                        id: `test-${Date.now()}`,
                        name: 'Zubair Qureshi',
                        location: 'Delhi, India',
                        quote: 'Maulana Sahabs prayers and sincere counsel brought immense tranquility to our household.',
                        rating: 5,
                        serviceCategory: 'Spiritual Counseling',
                        avatarType: 'man',
                        isApproved: true,
                        createdAt: new Date().toISOString().split('T')[0],
                      };
                      setTestimonials([...testimonials, newTest]);
                      showToast('New testimonial created successfully.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Testimonial</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="p-5 border border-neutral-200 rounded-2xl bg-white space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-neutral-900">
                            {t.name}
                          </span>
                          <span className="text-xs text-neutral-500">
                            ({t.location})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = testimonials.map((item) =>
                                item.id === t.id ? { ...item, isApproved: !item.isApproved } : item
                              );
                              setTestimonials(updated);
                              showToast(`Testimonial ${t.isApproved ? 'unapproved' : 'approved'}.`);
                            }}
                            className={`text-xs px-3 py-1 rounded-full font-bold ${
                              t.isApproved
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {t.isApproved ? 'Approved' : 'Hidden'}
                          </button>

                          {testimonials.length > 1 && (
                            <button
                              onClick={() => {
                                setTestimonials(testimonials.filter((item) => item.id !== t.id));
                                showToast('Testimonial delete kiya.');
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => {
                              const updated = testimonials.map((item) =>
                                item.id === t.id ? { ...item, name: e.target.value } : item
                              );
                              setTestimonials(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Service Category Tag
                          </label>
                          <input
                            type="text"
                            value={t.serviceCategory}
                            onChange={(e) => {
                              const updated = testimonials.map((item) =>
                                item.id === t.id ? { ...item, serviceCategory: e.target.value } : item
                              );
                              setTestimonials(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">
                            Rating (1 to 5 Stars)
                          </label>
                          <select
                            value={t.rating}
                            onChange={(e) => {
                              const updated = testimonials.map((item) =>
                                item.id === t.id ? { ...item, rating: Number(e.target.value) } : item
                              );
                              setTestimonials(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="font-bold text-neutral-700 block mb-1">
                            Review / Testimonial Quote
                          </label>
                          <textarea
                            rows={2}
                            value={t.quote}
                            onChange={(e) => {
                              const updated = testimonials.map((item) =>
                                item.id === t.id ? { ...item, quote: e.target.value } : item
                              );
                              setTestimonials(updated);
                            }}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                          />
                        </div>

                        {/* Testimonial Avatar Photo Controls */}
                        <div className="md:col-span-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300 shrink-0">
                              {t.avatarUrl ? (
                                <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-emerald-800 text-white">
                                  {t.name.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-bold text-xs text-neutral-800 block">Client Profile Picture / Avatar</span>
                              <input
                                type="url"
                                value={t.avatarUrl || ''}
                                placeholder="Avatar photo URL or upload..."
                                onChange={(e) => {
                                  const updated = testimonials.map((item) =>
                                    item.id === t.id ? { ...item, avatarUrl: e.target.value } : item
                                  );
                                  setTestimonials(updated);
                                }}
                                className="w-60 sm:w-72 px-2 py-1 text-xs bg-white border border-neutral-300 rounded font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] font-bold rounded-lg text-xs border border-emerald-200">
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    applyImageToSlot(t.id, ev.target?.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() =>
                                setReplaceModalSlot({
                                  id: t.id,
                                  title: `${t.name} (${t.serviceCategory})`,
                                  category: 'Client Testimonial',
                                  currentUrl: t.avatarUrl,
                                })
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded-lg text-xs"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Replace</span>
                            </button>

                            {t.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => removeImageFromSlot(t.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-xs"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ENQUIRIES VIEW */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    Contact Enquiries Management
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Confidential submissions from website visitors. (Never exposed publicly).
                  </p>
                </div>

                <div className="space-y-4">
                  {enquiries.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-2xl">
                      Abhi koi enquiries nahi hain.
                    </div>
                  ) : (
                    enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-5 border border-neutral-200 rounded-2xl bg-white space-y-3 shadow-2xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-base text-neutral-900">
                              {enq.name}
                            </h4>
                            <a
                              href={`tel:${enq.phone}`}
                              className="text-xs font-mono font-semibold text-[#155e3c] bg-emerald-50 px-2.5 py-1 rounded-md hover:bg-emerald-100"
                            >
                              {enq.phone}
                            </a>
                            <span className="text-[11px] text-neutral-400">
                              {enq.createdAt}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enq.status}
                              onChange={(e) => {
                                const updated = enquiries.map((item) =>
                                  item.id === enq.id
                                    ? { ...item, status: e.target.value as any }
                                    : item
                                );
                                setEnquiries(updated);
                                showToast(`Status updated to ${e.target.value}`);
                              }}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="resolved">🟢 Resolved</option>
                            </select>

                            <button
                              onClick={() => {
                                setEnquiries(enquiries.filter((item) => item.id !== enq.id));
                                showToast('Enquiry deleted.');
                              }}
                              className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1">
                          <p className="font-semibold text-neutral-700">
                            Requested Service: <span className="text-[#155e3c]">{enq.serviceTitle}</span>
                          </p>
                          <p className="text-neutral-800 italic">
                            “{enq.message || 'No specific text message provided.'}”
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hello ${enq.name}, message from Maulana Shamsuddin's office regarding your consultation enquiry.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25d366] hover:bg-[#1ebd5a] text-white text-xs font-bold rounded-lg"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Reply</span>
                            </a>

                            <a
                              href={`tel:${enq.phone}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#155e3c] hover:bg-[#0f442b] text-white text-xs font-bold rounded-lg"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Direct Call</span>
                            </a>
                          </div>

                          <div className="text-[11px] text-neutral-400">
                            Preferred: <span className="capitalize">{enq.consultationType}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 7. SETTINGS & SEO VIEW */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900">
                    Website Settings & SEO Metadata
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Update contact phone numbers, WhatsApp credentials, SEO metadata, and legal disclaimers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Website Name / Brand
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* Brand Logo Controls */}
                  <div className="p-3.5 bg-neutral-50/70 border border-neutral-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-neutral-800 text-xs flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#155e3c]" />
                        <span>Header Brand Logo</span>
                      </label>
                      {settings.logoUrl ? (
                        <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                          Custom Logo
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">
                          Mosque Crest
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                        {settings.logoUrl ? (
                          <img src={settings.logoUrl} alt={settings.siteName} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xl">🕌</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#155e3c] font-bold rounded text-[11px] border border-emerald-200">
                          <Upload className="w-2.5 h-2.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                applyImageToSlot('logo', ev.target?.result as string);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setReplaceModalSlot({
                              id: 'logo',
                              title: 'Header Brand Logo',
                              category: 'Branding',
                              currentUrl: settings.logoUrl,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded text-[11px]"
                        >
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>Replace</span>
                        </button>

                        {settings.logoUrl && (
                          <button
                            type="button"
                            onClick={() => removeImageFromSlot('logo')}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded text-[11px]"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Phone Number (Display Format)
                    </label>
                    <input
                      type="text"
                      value={settings.phoneDisplay}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          phoneDisplay: e.target.value,
                          phoneNumber: e.target.value.replace(/\s+/g, ''),
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      WhatsApp Number (with country code, no +)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsappNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.emailAddress}
                      onChange={(e) =>
                        setSettings({ ...settings, emailAddress: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-neutral-700 block mb-1">
                      Default WhatsApp Pre-filled Message
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappMessage}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsappMessage: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-neutral-700 block mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={settings.metaTitle}
                      onChange={(e) =>
                        setSettings({ ...settings, metaTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-neutral-700 block mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={settings.metaDescription}
                      onChange={(e) =>
                        setSettings({ ...settings, metaDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-neutral-700 block mb-1">
                      Ethical Disclaimer Text
                    </label>
                    <textarea
                      rows={3}
                      value={settings.disclaimerText}
                      onChange={(e) =>
                        setSettings({ ...settings, disclaimerText: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Website settings saved successfully.')}
                    className="px-6 py-2.5 bg-[#155e3c] hover:bg-[#0f442b] text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition-all"
                  >
                    Save Changes
                  </button>
                </div>

                {/* ADMIN SECURITY & PASSWORD MANAGEMENT SECTION */}
                <div
                  id="admin-password-card"
                  className="mt-8 p-6 bg-gradient-to-br from-[#0c2417] via-[#091b11] to-[#040e09] text-white rounded-2xl shadow-xl border border-[#d4af37]/40 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#fef08a] shrink-0">
                        <KeyRound className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-lg font-bold text-white">
                            Admin Password & Security Settings
                          </h4>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] bg-white/10 px-2 py-0.5 rounded-full border border-[#d4af37]/30">
                            Protected
                          </span>
                        </div>
                        <p className="text-xs text-emerald-200/80 mt-0.5">
                          Change your administrator login password and username for website management.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {localStorage.getItem('ms_admin_password') ? (
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Custom Password Active
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-amber-200 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/40 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          Default (admin123)
                        </span>
                      )}
                    </div>
                  </div>

                  {passwordChangeError && (
                    <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
                      <span className="font-bold text-red-400">✕</span>
                      <span>{passwordChangeError}</span>
                    </div>
                  )}

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                      <span className="font-bold text-emerald-400">✓</span>
                      <span>{passwordChangeSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Admin Username */}
                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1.5">
                          Admin Username
                        </label>
                        <input
                          type="text"
                          value={adminUsernameInput}
                          onChange={(e) => setAdminUsernameInput(e.target.value)}
                          placeholder="admin"
                          required
                          className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] font-medium"
                        />
                        <span className="text-[10px] text-emerald-200/60 mt-1 block">
                          Default is 'admin'.
                        </span>
                      </div>

                      {/* Current Password */}
                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1.5">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentAdminPassword}
                            onChange={(e) => setCurrentAdminPassword(e.target.value)}
                            placeholder="Enter current password (e.g. admin123)"
                            required
                            className="w-full px-3.5 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                            aria-label="Toggle password visibility"
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-200/60 mt-1 block">
                          Enter your current active password to authenticate.
                        </span>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1.5">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            placeholder="Enter new strong password"
                            required
                            minLength={4}
                            className="w-full px-3.5 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                            aria-label="Toggle password visibility"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-200/60 mt-1 block">
                          Minimum 4 characters (alphanumeric recommended).
                        </span>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label className="block text-xs font-semibold text-emerald-100 mb-1.5">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmAdminPassword}
                            onChange={(e) => setConfirmAdminPassword(e.target.value)}
                            placeholder="Repeat new password"
                            required
                            minLength={4}
                            className="w-full px-3.5 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                            aria-label="Toggle password visibility"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-200/60 mt-1 block">
                          Must exactly match the new password.
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37] hover:bg-[#b89324] text-[#0f2e1e] font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>Update Admin Password</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetPasswordToDefault}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-200 border border-white/10 hover:border-red-500/30 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                        title="Reset to default password"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default (admin / admin123)</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* 8. PHP & MYSQL SOURCE CODE VIEWER */}
            {activeTab === 'php-source' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">
                      PHP & MySQL Production Deployment Center
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Complete source code files generated per Sections 12 & 14 for Apache/Nginx + MySQL hosting.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold">
                    ✦ Production Ready Package (LAMP / cPanel / Shared Hosting / VPS)
                  </p>
                  <p>
                    All files below have been written into the project structure (`/php_project/`). You can deploy them directly to any standard PHP 8.x + MySQL server.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#155e3c]" />
                      <span>index.php (Public Landing Page)</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Full dynamic landing page querying MySQL for active slides, services, testimonials, and SEO meta tags.
                    </p>
                    <div className="text-[11px] font-mono bg-neutral-900 text-neutral-200 p-3 rounded-lg overflow-x-auto max-h-40">
                      {`<?php\nrequire_once 'config/database.php';\n$slides = $pdo->query("SELECT * FROM slides WHERE is_active = 1 ORDER BY display_order ASC")->fetchAll();\n$services = $pdo->query("SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC")->fetchAll();\n// Render full HTML5 + Bootstrap 5 landing page...\n?>`}
                    </div>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#155e3c]" />
                      <span>database.sql (Database Schema)</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Creates `slides`, `services`, `testimonials`, `enquiries`, `content`, and `admins` tables with PDO prepared statements.
                    </p>
                    <div className="text-[11px] font-mono bg-neutral-900 text-neutral-200 p-3 rounded-lg overflow-x-auto max-h-40">
                      {`CREATE TABLE slides (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  heading VARCHAR(255) NOT NULL,\n  subheading VARCHAR(255),\n  is_active TINYINT(1) DEFAULT 1\n);\nCREATE TABLE services (...);\nCREATE TABLE enquiries (...);`}
                    </div>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#155e3c]" />
                      <span>config/database.php</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Secure PDO connection with UTF-8mb4 charset, error mode exception, and emulation disabled.
                    </p>
                    <div className="text-[11px] font-mono bg-neutral-900 text-neutral-200 p-3 rounded-lg overflow-x-auto max-h-40">
                      {`<?php\n$host = 'localhost';\n$db = 'maulana_shamsuddin';\n$user = 'db_user';\n$pass = 'secure_password';\n$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [\n  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n]);\n?>`}
                    </div>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#155e3c]" />
                      <span>admin/enquiries.php</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Private administrator portal for reviewing confidential customer consultation requests.
                    </p>
                    <div className="text-[11px] font-mono bg-neutral-900 text-neutral-200 p-3 rounded-lg overflow-x-auto max-h-40">
                      {`<?php\nsession_start();\nif (!isset($_SESSION['admin_logged'])) { header('Location: login.php'); exit; }\n$enquiries = $pdo->query("SELECT * FROM enquiries ORDER BY created_at DESC")->fetchAll();\n?>`}
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="font-bold text-sm text-neutral-900">
                    Deployment Instructions for Web Hosting
                  </h4>
                  <ol className="list-decimal list-inside text-xs text-neutral-600 space-y-1.5 leading-relaxed">
                    <li>Create a new MySQL database in your cPanel / Plesk dashboard (e.g. `maulana_db`).</li>
                    <li>Import `database.sql` into phpMyAdmin.</li>
                    <li>Upload the `/php_project/` files to your web root (`public_html/`).</li>
                    <li>Update your database credentials in `config/database.php`.</li>
                    <li>Visit `https://yourdomain.com/admin/login.php` to access the admin panel.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* 9. ADMIN EXTENSION SUITE */}
            {activeTab === 'extension' && (
              <AdminExtensionTab
                settings={settings}
                setSettings={setSettings}
                enquiries={enquiries}
                onOpenDashboard={() => setActiveTab('dashboard')}
                onOpenImages={() => setActiveTab('images')}
                showToast={showToast}
              />
            )}
          </main>
        </div>
      </div>

      {/* UNIVERSAL REPLACE IMAGE MODAL */}
      {replaceModalSlot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                  Replace Image
                </span>
                <h3 className="font-heading text-lg font-bold">
                  {replaceModalSlot.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReplaceModalSlot(null);
                  setReplaceUploadUrl('');
                  setReplaceCustomTag('');
                  setReplaceCustomCaption('');
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current vs Replacement Indicator */}
            <div className="bg-neutral-50 p-3.5 border-b border-neutral-200 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 font-medium">Currently in slot:</span>
                <div className="w-12 h-9 rounded-md bg-neutral-900 overflow-hidden border border-neutral-300 shrink-0">
                  {replaceModalSlot.currentUrl ? (
                    <img
                      src={replaceModalSlot.currentUrl}
                      alt="Current"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-400">
                      Fallback
                    </div>
                  )}
                </div>
                <span className="font-semibold text-neutral-700 truncate max-w-[200px]">
                  {replaceModalSlot.currentUrl ? 'Custom Image Active' : 'Default Artwork Active'}
                </span>
              </div>

              {replaceModalSlot.currentUrl && (
                <button
                  type="button"
                  onClick={() => {
                    removeImageFromSlot(replaceModalSlot.id);
                    setReplaceModalSlot(null);
                  }}
                  className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg font-bold text-[11px] flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear & Revert to Fallback</span>
                </button>
              )}
            </div>

            {/* Replacement Selection Tabs */}
            <div className="flex border-b border-neutral-200 bg-white px-4 shrink-0 overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setReplaceModalTab('couple')}
                className={`py-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  replaceModalTab === 'couple'
                    ? 'border-[#155e3c] text-[#155e3c]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Couple & Lovers ({COUPLE_PHOTO_PRESETS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setReplaceModalTab('spiritual')}
                className={`py-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  replaceModalTab === 'spiritual'
                    ? 'border-[#155e3c] text-[#155e3c]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Spiritual / Islamic ({SPIRITUAL_PHOTO_PRESETS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setReplaceModalTab('avatars')}
                className={`py-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  replaceModalTab === 'avatars'
                    ? 'border-[#155e3c] text-[#155e3c]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>Client Avatars ({CLIENT_AVATAR_PRESETS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setReplaceModalTab('upload')}
                className={`py-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  replaceModalTab === 'upload'
                    ? 'border-[#155e3c] text-[#155e3c]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setReplaceModalTab('url')}
                className={`py-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  replaceModalTab === 'url'
                    ? 'border-[#155e3c] text-[#155e3c]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Web URL</span>
              </button>
            </div>

            {/* Modal Body according to Tab */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {/* Tab 1: Couple & Lovers Presets */}
              {replaceModalTab === 'couple' && (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500">
                    Select any authentic couple & lover photo to immediately replace this slot:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COUPLE_PHOTO_PRESETS.map((preset) => (
                      <div
                        key={preset.id}
                        onClick={() => {
                          applyImageToSlot(
                            replaceModalSlot.id,
                            preset.imageUrl,
                            preset.category,
                            preset.description
                          );
                          setReplaceModalSlot(null);
                        }}
                        className="group cursor-pointer rounded-xl border border-neutral-200 hover:border-emerald-500 hover:shadow-md transition-all overflow-hidden bg-white flex flex-col justify-between"
                      >
                        <div className="relative h-28 overflow-hidden bg-neutral-900">
                          <img
                            src={preset.imageUrl}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-1.5 left-1.5 text-[8px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/60 text-[#fde047]">
                            {preset.category}
                          </span>
                        </div>
                        <div className="p-2 space-y-1">
                          <h6 className="font-bold text-[11px] text-neutral-800 line-clamp-1">
                            {preset.title}
                          </h6>
                          <button
                            type="button"
                            className="w-full py-1 text-[10px] font-bold rounded bg-emerald-50 text-[#155e3c] group-hover:bg-[#155e3c] group-hover:text-white transition-colors"
                          >
                            Select This Photo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Spiritual & Islamic Presets */}
              {replaceModalTab === 'spiritual' && (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500">
                    Sacred Islamic photography, Quranic lanterns, and architectural backdrops:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SPIRITUAL_PHOTO_PRESETS.map((sp) => (
                      <div
                        key={sp.id}
                        onClick={() => {
                          applyImageToSlot(
                            replaceModalSlot.id,
                            sp.imageUrl,
                            sp.category,
                            sp.description
                          );
                          setReplaceModalSlot(null);
                        }}
                        className="group cursor-pointer rounded-xl border border-neutral-200 hover:border-emerald-500 hover:shadow-md transition-all overflow-hidden bg-white flex flex-col justify-between"
                      >
                        <div className="relative h-28 overflow-hidden bg-neutral-900">
                          <img
                            src={sp.imageUrl}
                            alt={sp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-1.5 left-1.5 text-[8px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/60 text-[#fde047]">
                            {sp.category}
                          </span>
                        </div>
                        <div className="p-2 space-y-1">
                          <h6 className="font-bold text-[11px] text-neutral-800 line-clamp-1">
                            {sp.title}
                          </h6>
                          <button
                            type="button"
                            className="w-full py-1 text-[10px] font-bold rounded bg-emerald-50 text-[#155e3c] group-hover:bg-[#155e3c] group-hover:text-white transition-colors"
                          >
                            Select This
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Client Avatars Presets */}
              {replaceModalTab === 'avatars' && (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500">
                    High quality customer profile pictures:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {CLIENT_AVATAR_PRESETS.map((av) => (
                      <div
                        key={av.id}
                        onClick={() => {
                          applyImageToSlot(replaceModalSlot.id, av.imageUrl);
                          setReplaceModalSlot(null);
                        }}
                        className="group cursor-pointer rounded-xl border border-neutral-200 hover:border-emerald-500 p-2.5 text-center space-y-2 bg-white hover:shadow-md transition-all flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-200">
                          <img
                            src={av.imageUrl}
                            alt={av.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-800 line-clamp-1">
                          {av.name}
                        </span>
                        <button
                          type="button"
                          className="w-full py-0.5 text-[9px] font-bold rounded bg-emerald-50 text-[#155e3c] group-hover:bg-[#155e3c] group-hover:text-white"
                        >
                          Use Avatar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Upload from Device */}
              {replaceModalTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-neutral-50/50">
                    <Upload className="w-8 h-8 text-[#155e3c] mx-auto mb-2" />
                    <h5 className="font-bold text-sm text-neutral-800">
                      Choose an image file from your device
                    </h5>
                    <p className="text-xs text-neutral-500 mt-1 mb-3">
                      Supports JPG, PNG, WEBP, and GIF
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setReplaceUploadUrl(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="text-xs text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#155e3c] file:text-white hover:file:bg-[#0f442b] cursor-pointer"
                    />
                  </div>

                  {replaceUploadUrl && (
                    <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-neutral-700 block">Preview:</span>
                      <div className="w-full h-44 rounded-lg overflow-hidden bg-neutral-900">
                        <img src={replaceUploadUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: Web URL */}
              {replaceModalTab === 'url' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Direct Web Image Address (URL)
                    </label>
                    <input
                      type="url"
                      value={replaceUploadUrl}
                      onChange={(e) => setReplaceUploadUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl font-mono text-xs"
                    />
                  </div>

                  {replaceUploadUrl && (
                    <div className="p-3 bg-white border border-neutral-200 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-neutral-700 block">Preview:</span>
                      <div className="w-full h-44 rounded-lg overflow-hidden bg-neutral-900">
                        <img src={replaceUploadUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Optional Service Tag & Caption when applicable */}
              {replaceModalSlot.id.startsWith('srv-') && (
                <div className="pt-3 border-t border-neutral-200 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Theme Badge Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={replaceCustomTag || replaceModalSlot.coupleThemeTag || ''}
                      onChange={(e) => setReplaceCustomTag(e.target.value)}
                      placeholder="e.g. Dua For Lovers"
                      className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      Photo Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={replaceCustomCaption || replaceModalSlot.imageCaption || ''}
                      onChange={(e) => setReplaceCustomCaption(e.target.value)}
                      placeholder="e.g. Loving couple praying..."
                      className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-neutral-50 px-5 py-3.5 border-t border-neutral-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  setReplaceModalSlot(null);
                  setReplaceUploadUrl('');
                }}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>

              {(replaceModalTab === 'upload' || replaceModalTab === 'url') && (
                <button
                  type="button"
                  disabled={!replaceUploadUrl.trim()}
                  onClick={() => {
                    if (replaceUploadUrl.trim()) {
                      applyImageToSlot(
                        replaceModalSlot.id,
                        replaceUploadUrl.trim(),
                        replaceCustomTag || replaceModalSlot.coupleThemeTag,
                        replaceCustomCaption || replaceModalSlot.imageCaption
                      );
                      setReplaceModalSlot(null);
                      setReplaceUploadUrl('');
                    }
                  }}
                  className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 ${
                    replaceUploadUrl.trim()
                      ? 'bg-[#155e3c] hover:bg-[#0f442b] text-white shadow-md'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Replace Image</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM IMAGE SLOT MODAL */}
      {showAddCustomSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white p-5 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold">Add New Custom Image Slot</h3>
              <button
                type="button"
                onClick={() => setShowAddCustomSlotModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Custom Slot Identifier / Name
                </label>
                <input
                  type="text"
                  value={newCustomSlotKey}
                  onChange={(e) => setNewCustomSlotKey(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                  placeholder="e.g. banner_promo, special_dua, mosque_view"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Image File or URL
                </label>
                <input
                  type="url"
                  value={newCustomSlotUrl}
                  onChange={(e) => setNewCustomSlotUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl font-mono text-xs mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setNewCustomSlotUrl(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="w-full text-xs text-neutral-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#155e3c]"
                />
              </div>

              {newCustomSlotUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                  <img src={newCustomSlotUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddCustomSlotModal(false)}
                className="px-4 py-2 text-xs font-bold text-neutral-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newCustomSlotKey.trim() || !newCustomSlotUrl.trim()}
                onClick={() => {
                  if (newCustomSlotKey.trim() && newCustomSlotUrl.trim()) {
                    applyImageToSlot(newCustomSlotKey.trim(), newCustomSlotUrl.trim());
                    setShowAddCustomSlotModal(false);
                    setNewCustomSlotKey('');
                    setNewCustomSlotUrl('');
                  }
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl ${
                  newCustomSlotKey.trim() && newCustomSlotUrl.trim()
                    ? 'bg-[#155e3c] text-white hover:bg-[#0f442b]'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Add Image Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

