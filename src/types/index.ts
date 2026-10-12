export interface SliderSlide {
  id: string;
  subheading: string;
  heading: string;
  description: string;
  highlightPills: string[];
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  scriptQuote: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  themeStyle: 'love' | 'marriage' | 'ruhani';
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  spiritualBenefits: string[];
  processSteps: string[];
  recommendedWazifa?: string;
  iconType: 'dua' | 'wazifa' | 'ruhani' | 'taweez' | 'marriage' | 'relationship' | 'custom';
  imageTag: string;
  imageUrl?: string;
  imageCaption?: string;
  coupleThemeTag?: string;
  displayOrder: number;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  serviceCategory: string;
  avatarType: 'couple' | 'man' | 'woman';
  avatarUrl?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  serviceTitle: string;
  consultationType: 'whatsapp' | 'phone' | 'either';
  message: string;
  hasConsent: boolean;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
  adminNotes?: string;
}

export interface WebsiteContent {
  announcementText: string;
  brandName: string;
  brandSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutHighlights: { title: string; desc: string }[];
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  whyChooseUsItems: { title: string; desc: string; icon: string }[];
  processTitle: string;
  processSubtitle: string;
  processSteps: { step: number; title: string; desc: string }[];
  ctaBannerTitle: string;
  ctaBannerSubtitle: string;
  ctaBannerQuote: string;
}

export interface ImageSettings {
  showAllImages: boolean;
  showHeroImages: boolean;
  showServiceImages: boolean;
  showAboutImage: boolean;
  showWhyChooseSkyline: boolean;
  showTestimonialAvatars: boolean;
  aboutCustomImage?: string;
  logoUrl?: string;
  customImages: Record<string, string>; // key -> image URL or base64
}

export interface GeneralSettings {
  siteName: string;
  phoneNumber: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessage: string;
  emailAddress: string;
  address: string;
  disclaimerText: string;
  metaTitle: string;
  metaDescription: string;
  logoUrl?: string;
  socialLinks: {
    facebook: string;
    youtube: string;
    instagram: string;
    whatsapp: string;
  };
  imageSettings: ImageSettings;
}
