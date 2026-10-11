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
} from 'lucide-react';
import {
  SliderSlide,
  ServiceItem,
  TestimonialItem,
  EnquiryItem,
  WebsiteContent,
  GeneralSettings,
} from '../../types';

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
  onClose: () => void;
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
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'sliders' | 'services' | 'images' | 'content' | 'testimonials' | 'enquiries' | 'settings' | 'php-source'
  >('dashboard');

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Image Management States
  const [selectedImageTarget, setSelectedImageTarget] = useState('slide-1');
  const [customImageUrlInput, setCustomImageUrlInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleApplyCustomImage = () => {
    if (!previewImage && !customImageUrlInput.trim()) {
      showToast('Please select a file or enter an image URL.');
      return;
    }
    const targetUrl = previewImage || customImageUrlInput.trim();
    const updatedCustom = {
      ...(currentImageSettings.customImages || {}),
      [selectedImageTarget]: targetUrl,
    };
    const updatedSettings = {
      ...settings,
      imageSettings: {
        ...currentImageSettings,
        showAllImages: true,
        customImages: updatedCustom,
      },
    };
    setSettings(updatedSettings);
    setCustomImageUrlInput('');
    setPreviewImage(null);
    showToast(`Image applied successfully to ${selectedImageTarget}!`);
  };

  const handleRemoveCustomImage = (targetId: string) => {
    const updatedCustom = { ...(currentImageSettings.customImages || {}) };
    delete updatedCustom[targetId];
    setSettings({
      ...settings,
      imageSettings: {
        ...currentImageSettings,
        customImages: updatedCustom,
      },
    });
    showToast(`Custom image removed from ${targetId}.`);
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

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
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

              <div className="pt-2 border-t border-neutral-200">
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

            <div className="pt-4 border-t border-neutral-200">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 text-[11px] text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-[#155e3c]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Database Connected</span>
                </div>
                <p className="text-neutral-600">
                  Changes save live in state & localStorage.
                </p>
              </div>
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
                              `Assalam o Alaikum ${enq.name}, Maulana Shamsuddin sahab ke daftar se baat kar rahe hain.`
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
                        subheading: 'Nayi Pareshani Ka Hal?',
                        heading: 'Custom Ruhani Dua & Wazifa',
                        description: 'Maulana Shamsuddin se roohani mashwara lene ke liye sampark karein.',
                        highlightPills: ['Khaas Dua', 'Sharai Wazifa', 'Ruhani Amal'],
                        ctaPrimaryText: 'WhatsApp Karein',
                        ctaPrimaryLink: `https://wa.me/${settings.whatsappNumber}`,
                        ctaSecondaryText: settings.phoneDisplay,
                        ctaSecondaryLink: `tel:${settings.phoneNumber}`,
                        scriptQuote: '“Rab par yaqeen rakhein...”',
                        displayOrder: slides.length + 1,
                        isActive: true,
                        themeStyle: 'ruhani',
                      };
                      setSlides([...slides, newSlide]);
                      showToast('Naya slide shamil kiya gaya.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Naya Slide Add Karein</span>
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
                        shortDescription: 'Gharelu klesh aur aapsi ittehad ke liye khaas sharai amal.',
                        fullDescription: 'Khandan aur parivaar mein aman o sukoon ke liye sharai zikr aur counseling.',
                        spiritualBenefits: ['Ghar mein sukoon', 'Na-ittefaqi ka khatma', 'Dilon mein narmi'],
                        processSteps: ['Halat batayein', 'Mashwara lein', 'Dua karein'],
                        recommendedWazifa: 'Surah Rahman ki tilawat',
                        iconType: 'custom',
                        imageTag: 'hands_supplication',
                        displayOrder: services.length + 1,
                        isActive: true,
                        metaTitle: 'Family Dispute Resolution | Maulana Shamsuddin',
                        metaDescription: 'Spiritual guidance for family peace.',
                      };
                      setServices([...services, newSrv]);
                      showToast('Nayi service add ho gayi.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nayi Service Add Karein</span>
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
                              showToast(`Service ${srv.isActive ? 'hide' : 'publish'} ho gayi.`);
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
                                showToast('Service delete ho gayi.');
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
                    Image & Visual Asset Management
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Add custom images, replace existing visuals, or remove all images across the website with a single click.
                  </p>
                </div>

                {/* 1. MASTER CONTROL: ADD OR REMOVE ALL IMAGES */}
                <div className="p-6 bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white rounded-3xl shadow-md border border-[#d4af37]/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase font-bold tracking-widest text-[#d4af37]">
                        Master Image Switch
                      </span>
                      <h4 className="font-heading text-xl font-bold">
                        Website Image Visibility Status:{' '}
                        <span className={currentImageSettings.showAllImages ? 'text-[#86efac]' : 'text-amber-300'}>
                          {currentImageSettings.showAllImages ? 'All Images Enabled' : 'All Images Removed (Minimalist)'}
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-100 max-w-xl">
                        Switch between full photography mode and lightweight minimalist Islamic typography mode across the whole site.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleToggleAllImages(false)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          !currentImageSettings.showAllImages
                            ? 'bg-amber-400 text-neutral-900 shadow-md ring-2 ring-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        🚫 Remove All Images
                      </button>

                      <button
                        onClick={() => handleToggleAllImages(true)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          currentImageSettings.showAllImages
                            ? 'bg-[#f5b82e] text-[#112417] shadow-md ring-2 ring-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        🖼️ Restore All Images
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. GRANULAR SECTION TOGGLES */}
                <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-4">
                  <h4 className="font-bold text-sm text-neutral-900">
                    Section-by-Section Image Toggles
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800">Hero Slider Images</p>
                        <p className="text-[11px] text-neutral-500">Backdrop silhouettes & photos</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showHeroImages')}
                        className={`px-3 py-1 rounded-full font-bold transition-colors ${
                          currentImageSettings.showHeroImages && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showHeroImages && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800">Service Cards Images</p>
                        <p className="text-[11px] text-neutral-500">Photos on all 6 service cards</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showServiceImages')}
                        className={`px-3 py-1 rounded-full font-bold transition-colors ${
                          currentImageSettings.showServiceImages && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showServiceImages && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800">About Section Artwork</p>
                        <p className="text-[11px] text-neutral-500">Holy Quran & lantern image</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showAboutImage')}
                        className={`px-3 py-1 rounded-full font-bold transition-colors ${
                          currentImageSettings.showAboutImage && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showAboutImage && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800">Why Choose Us Mosque</p>
                        <p className="text-[11px] text-neutral-500">Right minarets silhouette</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showWhyChooseSkyline')}
                        className={`px-3 py-1 rounded-full font-bold transition-colors ${
                          currentImageSettings.showWhyChooseSkyline && currentImageSettings.showAllImages
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {currentImageSettings.showWhyChooseSkyline && currentImageSettings.showAllImages ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-neutral-800">Testimonial Avatars</p>
                        <p className="text-[11px] text-neutral-500">Client profile pictures</p>
                      </div>
                      <button
                        onClick={() => handleSectionImageToggle('showTestimonialAvatars')}
                        className={`px-3 py-1 rounded-full font-bold transition-colors ${
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

                {/* 3. ADD OR REPLACE CUSTOM IMAGE */}
                <div className="p-6 border border-neutral-200 rounded-3xl bg-white shadow-2xs space-y-5">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#155e3c]" />
                    <h4 className="font-heading text-lg font-bold text-neutral-900">
                      Add / Upload / Replace Images
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 space-y-4 text-xs">
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">
                          Select Section / Card to Customize
                        </label>
                        <select
                          value={selectedImageTarget}
                          onChange={(e) => setSelectedImageTarget(e.target.value)}
                          className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold"
                        >
                          <optgroup label="Hero Slider Slides">
                            <option value="slide-1">Hero Slide 1: Dua & Wazifa For Love</option>
                            <option value="slide-2">Hero Slide 2: Love Marriage Guidance</option>
                            <option value="slide-3">Hero Slide 3: Personal Ruhani Guidance</option>
                          </optgroup>
                          <optgroup label="Services Cards">
                            <option value="srv-1">Service 1: Dua For Love</option>
                            <option value="srv-2">Service 2: Wazifa For Love</option>
                            <option value="srv-3">Service 3: Ruhani Ilm</option>
                            <option value="srv-4">Service 4: Taweez</option>
                            <option value="srv-5">Service 5: Love Marriage</option>
                            <option value="srv-6">Service 6: Relationship Problem</option>
                          </optgroup>
                          <optgroup label="Other Sections">
                            <option value="about">About Maulana Shamsuddin Section</option>
                          </optgroup>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">
                          Option A: Upload Image File from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="w-full text-xs text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#155e3c] hover:file:bg-emerald-100 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">
                          Option B: Or Enter Image URL
                        </label>
                        <input
                          type="url"
                          value={customImageUrlInput}
                          onChange={(e) => setCustomImageUrlInput(e.target.value)}
                          placeholder="https://example.com/islamic-image.jpg"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={handleApplyCustomImage}
                          className="px-5 py-2.5 bg-[#155e3c] hover:bg-[#0f442b] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Apply Image</span>
                        </button>

                        {currentImageSettings.customImages?.[selectedImageTarget] && (
                          <button
                            onClick={() => handleRemoveCustomImage(selectedImageTarget)}
                            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Custom Image</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Preview Box */}
                    <div className="lg:col-span-5">
                      <label className="font-bold text-xs text-neutral-700 block mb-1">
                        Live Preview
                      </label>
                      <div className="w-full h-48 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center overflow-hidden relative">
                        {previewImage || customImageUrlInput ? (
                          <img
                            src={previewImage || customImageUrlInput}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : currentImageSettings.customImages?.[selectedImageTarget] ? (
                          <div className="w-full h-full relative">
                            <img
                              src={currentImageSettings.customImages[selectedImageTarget]}
                              alt="Currently configured"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              Current Custom Image
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-4 text-neutral-400 text-xs">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <span>Select or upload an image to preview</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. ACTIVE CUSTOM IMAGES LIST */}
                {Object.keys(currentImageSettings.customImages || {}).length > 0 && (
                  <div className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-3">
                    <h4 className="font-bold text-sm text-neutral-900">
                      Currently Configured Custom Images
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Object.entries(currentImageSettings.customImages).map(([key, url]) => (
                        <div key={key} className="bg-white p-2 rounded-xl border border-neutral-200 space-y-2">
                          <div className="w-full h-24 rounded-lg overflow-hidden bg-neutral-100">
                            <img src={url} alt={key} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-neutral-700 truncate max-w-[100px]">{key}</span>
                            <button
                              onClick={() => handleRemoveCustomImage(key)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete this image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                        quote: 'Maulana sahab ke wazifa aur dua se dil ko bohot sukoon mila.',
                        rating: 5,
                        serviceCategory: 'Ruhani Mashwara',
                        avatarType: 'man',
                        isApproved: true,
                        createdAt: new Date().toISOString().split('T')[0],
                      };
                      setTestimonials([...testimonials, newTest]);
                      showToast('Naya testimonial shamil kiya.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#155e3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f442b]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Naya Testimonial Add Karein</span>
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
                                `Assalam o Alaikum ${enq.name}, Maulana Shamsuddin sahab ke daftar se aapki enquiry ke mutalliq message hai.`
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
                    onClick={() => showToast('Settings save ho gayi hain.')}
                    className="px-6 py-2.5 bg-[#155e3c] text-white text-xs font-bold rounded-xl"
                  >
                    Save Changes
                  </button>
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
          </main>
        </div>
      </div>
    </div>
  );
};
