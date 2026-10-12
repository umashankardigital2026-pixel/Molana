import React, { useState, useEffect } from 'react';
import {
  INITIAL_SLIDES,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_CONTENT,
  INITIAL_SETTINGS,
} from './data/initialData';
import {
  SliderSlide,
  ServiceItem,
  TestimonialItem,
  EnquiryItem,
  WebsiteContent,
  GeneralSettings,
} from './types';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { LeftSideCta } from './components/LeftSideCta';
import { ServiceDetailModal, LegalModal } from './components/Modals';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminQuickBar } from './components/admin/AdminQuickBar';

export default function App() {
  const isMigrated = localStorage.getItem('ms_content_locale') === 'v2_en';

  // Load initial state with localStorage support for Admin live editing
  const [slides, setSlides] = useState<SliderSlide[]>(() => {
    if (!isMigrated) return INITIAL_SLIDES;
    const saved = localStorage.getItem('ms_slides');
    return saved ? JSON.parse(saved) : INITIAL_SLIDES;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (!isMigrated) return INITIAL_SERVICES;
    const saved = localStorage.getItem('ms_services');
    if (!saved) return INITIAL_SERVICES;
    try {
      const parsed: ServiceItem[] = JSON.parse(saved);
      return parsed.map((item) => {
        const initial = INITIAL_SERVICES.find((i) => i.id === item.id);
        if (!initial) return item;
        return {
          ...initial,
          ...item,
          imageUrl: item.imageUrl || initial.imageUrl,
          coupleThemeTag: item.coupleThemeTag || initial.coupleThemeTag,
          imageCaption: item.imageCaption || initial.imageCaption,
        };
      });
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    if (!isMigrated) return INITIAL_TESTIMONIALS;
    const saved = localStorage.getItem('ms_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    const saved = localStorage.getItem('ms_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [content, setContent] = useState<WebsiteContent>(() => {
    if (!isMigrated) return INITIAL_CONTENT;
    const saved = localStorage.getItem('ms_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [settings, setSettings] = useState<GeneralSettings>(() => {
    if (!isMigrated) return INITIAL_SETTINGS;
    const saved = localStorage.getItem('ms_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ms_content_locale', 'v2_en');
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ms_slides', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem('ms_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('ms_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('ms_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('ms_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('ms_settings', JSON.stringify(settings));
  }, [settings]);

  // Modals & UI States
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ms_admin_auth') === 'true' || sessionStorage.getItem('ms_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<
    'dashboard' | 'sliders' | 'services' | 'images' | 'content' | 'testimonials' | 'enquiries' | 'settings' | 'security' | 'php-source' | 'extension'
  >('dashboard');
  const [prefilledServiceConsultation, setPrefilledServiceConsultation] = useState('');

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('ms_admin_auth');
    sessionStorage.removeItem('ms_admin_auth');
    setIsAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#images' || window.location.hash === '#security' || window.location.hash === '#password') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleToggleAllImages = () => {
    const current = settings.imageSettings?.showAllImages ?? true;
    const target = !current;
    setSettings({
      ...settings,
      imageSettings: {
        ...(settings.imageSettings || {
          showAllImages: true,
          showHeroImages: true,
          showServiceImages: true,
          showAboutImage: true,
          showWhyChooseSkyline: true,
          showTestimonialAvatars: true,
          customImages: {},
        }),
        showAllImages: target,
        showHeroImages: target,
        showServiceImages: target,
        showAboutImage: target,
        showWhyChooseSkyline: target,
        showTestimonialAvatars: target,
      },
    });
  };

  // Support #admin, #images and Ctrl+Shift+A for administrative access
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        const isAuth = localStorage.getItem('ms_admin_auth') === 'true' || sessionStorage.getItem('ms_admin_auth') === 'true';
        if (isAuth) {
          setAdminInitialTab('dashboard');
          setIsAdminOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      } else if (window.location.hash === '#images') {
        const isAuth = localStorage.getItem('ms_admin_auth') === 'true' || sessionStorage.getItem('ms_admin_auth') === 'true';
        if (isAuth) {
          setAdminInitialTab('images');
          setIsAdminOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      } else if (window.location.hash === '#security' || window.location.hash === '#password') {
        const isAuth = localStorage.getItem('ms_admin_auth') === 'true' || sessionStorage.getItem('ms_admin_auth') === 'true';
        if (isAuth) {
          setAdminInitialTab('security');
          setIsAdminOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        const isAuth = localStorage.getItem('ms_admin_auth') === 'true' || sessionStorage.getItem('ms_admin_auth') === 'true';
        if (isAuth) {
          setAdminInitialTab('dashboard');
          setIsAdminOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Legal Modals
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultService = (serviceTitle: string) => {
    setPrefilledServiceConsultation(serviceTitle);
    scrollToSection('contact');
  };

  const handleEnquirySubmit = (newEnqData: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: EnquiryItem = {
      ...newEnqData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toLocaleString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return true;
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col font-body text-[#1c2e24]">
      {/* 1. Header Navigation */}
      <Header
        settings={settings}
        announcementText={content.announcementText}
        onNavigate={scrollToSection}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAdmin={(tab) => {
          setAdminInitialTab(tab || 'dashboard');
          setIsAdminOpen(true);
        }}
        onLogout={handleAdminLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Image Slider */}
        <HeroSlider
          slides={slides}
          imageSettings={settings.imageSettings}
          onOpenConsultation={(svc) => {
            if (svc) setPrefilledServiceConsultation(svc);
            scrollToSection('contact');
          }}
        />

        {/* 3. Our Services Section */}
        <ServicesSection
          services={services}
          imageSettings={settings.imageSettings}
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* 4. About Maulana Shamsuddin */}
        <AboutSection
          content={content}
          settings={settings}
          onOpenConsultation={() => scrollToSection('contact')}
        />

        {/* 5. Why Choose Us? */}
        <WhyChooseUs content={content} imageSettings={settings.imageSettings} />

        {/* 6. Our Process */}
        <ProcessSection content={content} />

        {/* 7. Testimonials / Our Happy Clients */}
        <TestimonialsSection
          testimonials={testimonials}
          imageSettings={settings.imageSettings}
        />

        {/* 8. Call To Action Banner */}
        <CtaBanner
          settings={settings}
          onOpenConsultation={() => scrollToSection('contact')}
        />

        {/* 9. Contact Section with interactive consultation form */}
        <ContactSection
          settings={settings}
          services={services}
          prefilledService={prefilledServiceConsultation}
          onSubmitEnquiry={handleEnquirySubmit}
        />
      </main>

      {/* Left-Side Call To Action Button */}
      <LeftSideCta
        settings={settings}
        onOpenConsultation={() => scrollToSection('contact')}
      />

      {/* 10. Footer */}
      <Footer
        settings={settings}
        onNavigate={scrollToSection}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAdmin={() => {
          setAdminInitialTab('dashboard');
          setIsAdminOpen(true);
        }}
        onLogout={handleAdminLogout}
        onOpenPrivacy={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Privacy Policy & Confidentiality',
            content: `Protection of Your Personal & Spiritual Information:

1. We safeguard all personal information (including your name, phone number, and private consultation details) with 100% strict confidentiality and digital privacy.
2. Under no circumstances is your personal information shared with third parties, marketing agencies, or public forums.
3. Information submitted through our consultation forms is accessed solely by Maulana Shamsuddin and his authorized assistants to facilitate your direct consultation.
4. You may request the immediate deletion or removal of your contact details and enquiry records at any time.`,
          })
        }
        onOpenTerms={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Terms & Conditions',
            content: `Spiritual Consultation & Ethical Service Terms:

1. All spiritual guidance, supplications, prayers, and wazaif offered by Maulana Shamsuddin are grounded in traditional, ethical, and lawful spiritual counseling practices.
2. The outcome of any prayer or spiritual practice relies upon genuine sincerity, pure intention, moral patience, and divine wisdom.
3. Our services and website make no misleading, unscientific, or guaranteed claims. Consultations serve as moral support, spiritual reflection, and faith-based guidance.
4. Spiritual consultation is strictly denied for any unlawful, unethical, or harmful purposes.`,
          })
        }
        onOpenDisclaimer={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Spiritual Disclaimer',
            content: `${settings.disclaimerText}

Peace and goodwill to all seekers. Spiritual supplications, guidance, and prayers serve to bring tranquility to the heart, inner fortitude, and divine grace.`,
          })
        }
      />

      {/* Floating Action Buttons */}
      <FloatingActions settings={settings} />

      {/* In-App Admin Extension Companion Quick Bar */}
      <AdminQuickBar
        isAuthenticated={isAdminAuthenticated}
        onOpenAdmin={(tab) => {
          if (tab) setAdminInitialTab(tab);
          setIsAdminOpen(true);
        }}
        onLogout={handleAdminLogout}
        enquiries={enquiries}
        showAllImages={settings.imageSettings?.showAllImages ?? true}
        onToggleImages={handleToggleAllImages}
      />

      {/* Admin Authentication Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        settings={settings}
        onClose={() => setSelectedService(null)}
        onConsultService={handleConsultService}
      />

      {/* Legal & Disclaimer Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        title={legalModalState.title}
        content={legalModalState.content}
        onClose={() => setLegalModalState({ ...legalModalState, isOpen: false })}
      />

      {/* Admin Panel Modal (/admin) */}
      {isAdminOpen && (
        <AdminPanel
          slides={slides}
          setSlides={setSlides}
          services={services}
          setServices={setServices}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          enquiries={enquiries}
          setEnquiries={setEnquiries}
          content={content}
          setContent={setContent}
          settings={settings}
          setSettings={setSettings}
          initialTab={adminInitialTab}
          onLogout={handleAdminLogout}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin' || window.location.hash === '#images' || window.location.hash === '#security' || window.location.hash === '#password') {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          }}
        />
      )}
    </div>
  );
}
