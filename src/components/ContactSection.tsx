import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GeneralSettings, ServiceItem, EnquiryItem } from '../types';
import { IslamicDivider } from './IslamicArt';

interface ContactSectionProps {
  settings: GeneralSettings;
  services: ServiceItem[];
  prefilledService?: string;
  onSubmitEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  services,
  prefilledService = '',
  onSubmitEnquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(prefilledService);
  const [consultationType, setConsultationType] = useState<'whatsapp' | 'phone' | 'either'>('whatsapp');
  const [message, setMessage] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Kripya apna naam darj karein (Please enter your name).');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Kripya valid 10-digit mobile number darj karein (Please enter a valid phone number).');
      return;
    }
    if (!hasConsent) {
      setErrorMsg('Kripya gopniyata shartein (privacy consent) swikaar karein.');
      return;
    }

    const serviceObj = services.find((s) => s.id === selectedService) || services[0];

    const success = onSubmitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      serviceId: selectedService || (serviceObj ? serviceObj.id : 'general'),
      serviceTitle: serviceObj ? serviceObj.title : 'General Consultation',
      consultationType,
      message: message.trim(),
      hasConsent,
    });

    if (success) {
      setSubmitted(true);
      setName('');
      setPhone('');
      setMessage('');
      setHasConsent(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <IslamicDivider label="Raabta & Mashwara" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112417] tracking-tight">
            Apni Pareshani Par Baat Karein
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Maulana Shamsuddin Se Sampark Karein – Har mushkil ka sharai roohani hal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Phone & WhatsApp Access */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e2417] text-white p-7 sm:p-8 rounded-3xl shadow-xl border border-[#d4af37]/30 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
                  Instant Reach
                </span>
                <h3 className="font-heading text-2xl font-bold">
                  Bila-Jhijhak Sampark Karein
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Aapki har baat 100% confidential aur mehfooz rakhi jayegi. Maulana Shamsuddin se direct mashwara lene ke liye niche diye gaye button par click karein.
                </p>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1f734c] hover:bg-[#165a3b] text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#86efac]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">WhatsApp Chat</h4>
                      <p className="text-xs text-emerald-200">Turant message bhejein</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full">
                    Chat Now →
                  </span>
                </a>

                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all group border border-white/15"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#fde047]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Direct Phone Call</h4>
                      <p className="text-xs font-mono text-neutral-300">{settings.phoneDisplay}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full">
                    Call Now →
                  </span>
                </a>
              </div>

              {/* Trust markers */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-emerald-200/80">
                <ShieldAlert className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>100% Gopniya (Confidential). Koi fake ya unscientific daawa nahi kiya jata.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#fafbf9] p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#112417] mb-2">
                Consultation Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                Apni pareshani darj karein, Maulana Sahab ke daftar se jald hi aapse sampark kiya jayega.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#155e3c] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#155e3c]">
                    Shukriya! Aapki Enquiry Darj Kar Li Gayi Hai
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 max-w-md mx-auto">
                    Maulana Shamsuddin aapse WhatsApp ya Phone par jald hi rabta karenge. Agar mamla behad zaroori hai toh turant WhatsApp karein.
                  </p>
                  <div className="pt-3">
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Assalam o Alaikum Maulana Sahab, maine website par form submit kiya hai.')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#155e3c] text-white rounded-full text-xs font-bold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Par Turant Baat Karein</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Aapka Naam (Your Full Name) *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mohammad Ali"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Select Service / Pareshani Ka Mauzu
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c]"
                      >
                        <option value="">General Spiritual Consultation</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Preferred Contact Mode
                      </label>
                      <select
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c]"
                      >
                        <option value="whatsapp">WhatsApp Message</option>
                        <option value="phone">Direct Phone Call</option>
                        <option value="either">Either (Koi bhi chalega)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Apni Pareshani / Sawal Likhein (Message)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Apni situation ke bare mein thoda batayein taaki Maulana Sahab munasib jawab de sakein..."
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c]"
                    />
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={hasConsent}
                      onChange={(e) => setHasConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#155e3c] rounded border-neutral-300 focus:ring-[#155e3c]"
                      required
                    />
                    <label htmlFor="consent" className="text-xs text-neutral-600 leading-snug">
                      Main Maulana Shamsuddin se roohani mashwara lene ke liye apni maloomat bhejne par razamand hoon aur meri gopniyata ka ahtram kiya jayega.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#155e3c] hover:bg-[#0f462c] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enquiry Submit Karein</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
