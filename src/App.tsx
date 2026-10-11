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

export default function App() {
  // Load initial state with localStorage support for Admin live editing
  const [slides, setSlides] = useState<SliderSlide[]>(() => {
    const saved = localStorage.getItem('ms_slides');
    return saved ? JSON.parse(saved) : INITIAL_SLIDES;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('ms_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('ms_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    const saved = localStorage.getItem('ms_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [content, setContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem('ms_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [settings, setSettings] = useState<GeneralSettings>(() => {
    const saved = localStorage.getItem('ms_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledServiceConsultation, setPrefilledServiceConsultation] = useState('');

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
        onOpenAdmin={() => setIsAdminOpen(true)}
        showAllImages={settings.imageSettings?.showAllImages ?? true}
        onToggleImages={() => {
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
        }}
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
        onOpenPrivacy={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Privacy Policy (Gopniyata Niti)',
            content: `Aapki Shakhsi Maloomat Ki Hifazat:

1. Hum aapki shakhsi jankari (naam, phone number, pareshani ki tafseel) ko 100% confidential aur mehfooz rakhte hain.
2. Aapki koi bhi jankari kisi teesre shakhs ya public forum par zahir nahi ki jati.
3. Form ke zariye bheja gaya data sirf Maulana Shamsuddin aur unke authorised muawin (assistant) tak mehdood rehta hai taaki aapse raabta kiya ja sake.
4. Agar aap chahein toh kisi bhi waqt apna record delete karne ki darkhwast kar sakte hain.`,
          })
        }
        onOpenTerms={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Terms & Conditions (Shartein)',
            content: `Sharai Mashwara & Service Shartein:

1. Maulana Shamsuddin ki janib se pesh kiye jane wale aamaal, dua aur wazaif mukammal sharai aur roohani tareeqon par mabni hain.
2. Har dua aur wazifa insaan ki sachhi niyyat, pakeezgi, sabr aur Allah Taala ki raza par munhasir hai.
3. Hamari website par kisi bhi kism ka unscientific ya 100% guaranteed jadugari daawa nahi kiya jata. Dua mashwara aur roohani rehnumai ka zariya hai.
4. Kisi bhi ghair-sharai ya na-jayez maqsad ke liye roohani rehnumai nahi di jati.`,
          })
        }
        onOpenDisclaimer={() =>
          setLegalModalState({
            isOpen: true,
            title: 'Disclaimer (Sharai Wazaahat)',
            content: `${settings.disclaimerText}

Sabka Bhala, Sabka Sukoon. Dua aur wazifa qalb ke itminaan aur roohani barkat ke liye sharai rehnumai hai.`,
          })
        }
      />

      {/* Floating Action Buttons */}
      <FloatingActions settings={settings} />

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
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
