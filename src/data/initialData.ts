import { SliderSlide, ServiceItem, TestimonialItem, EnquiryItem, WebsiteContent, GeneralSettings } from '../types';

export const INITIAL_SLIDES: SliderSlide[] = [
  {
    id: 'slide-1',
    subheading: 'Facing Hardships In Your Love Life?',
    heading: 'Sacred Dua & Wazifa For Love',
    description: 'If misunderstandings or emotional distance are weakening your bond, find healing and emotional peace through sincere spiritual guidance and prayer.',
    highlightPills: ['Dua For Love', 'Wazifa For Love', 'Spiritual Wisdom', 'Sacred Blessings'],
    ctaPrimaryText: 'Consult on WhatsApp',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Hello%20Maulana%20Shamsuddin,%20I%20would%20like%20spiritual%20guidance%20and%20dua%20for%20my%20relationship',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“True love flourishes through pure intention, patience, and divine grace...”',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80',
    displayOrder: 1,
    isActive: true,
    themeStyle: 'love',
  },
  {
    id: 'slide-2',
    subheading: 'Concerns Regarding Marriage & Family Approval?',
    heading: 'Love Marriage & Family Harmony',
    description: 'Share your circumstances in complete confidentiality and receive spiritual counseling, Istikhara guidance, and prayers to unite families with respect.',
    highlightPills: ['Marriage Approval Dua', 'Family Reconciliation', 'Istikhara Guidance', 'Household Peace'],
    ctaPrimaryText: 'Connect On WhatsApp',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Hello%20Maulana%20Shamsuddin,%20I%20seek%20guidance%20regarding%20love%20marriage%20and%20family%20harmony',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“Every hardship eases when prayers are made with a sincere heart...”',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
    displayOrder: 2,
    isActive: true,
    themeStyle: 'marriage',
  },
  {
    id: 'slide-3',
    subheading: 'Patience & Devotion In Every Life Challenge',
    heading: 'Personal Spiritual Guidance & Inner Peace',
    description: 'Seek genuine spiritual counseling and authentic Quranic supplications to find clarity, resolve domestic friction, and regain peace of mind.',
    highlightPills: ['Quranic Supplications', 'Resolve Domestic Conflict', 'Career & Life Blessings', 'Peace of Mind'],
    ctaPrimaryText: 'Contact Maulana Shamsuddin',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Hello%20Maulana%20Shamsuddin,%20I%20seek%20personal%20spiritual%20guidance%20and%20counseling',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“Have faith in divine wisdom; after every hardship comes ease and renewed hope...”',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
    displayOrder: 3,
    isActive: true,
    themeStyle: 'ruhani',
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'dua-for-love',
    title: 'Dua For Love',
    shortDescription: 'Sacred supplications and Quranic prayers to mend hearts, resolve misunderstandings, and strengthen loving bonds.',
    fullDescription: 'When relationships experience emotional distance, misunderstandings, or bitter grief, sincere Quranic prayers and ethical spiritual counseling help restore affection and tenderness between partners. Maulana Shamsuddin provides personalized guidance tailored to your specific situation.',
    spiritualBenefits: [
      'Cultivate mutual love, understanding, and tenderness',
      'Dissolve unnecessary misunderstandings and estrangement',
      'Deepen emotional commitment and mutual respect',
      'Establish lasting tranquility and honesty within the relationship'
    ],
    processSteps: [
      'Share your relationship concerns in strict confidence',
      'Receive personalized guidance and Quranic supplications tailored to your need',
      'Perform the recommended prayers with cleanliness and sincere devotion',
      'Maintain patience, good character, and trust in divine wisdom'
    ],
    recommendedWazifa: 'Recitation of Surah Al-Furqan (Verse 74) along with sincere invocation of Ya Wadood (The Loving).',
    iconType: 'dua',
    imageTag: 'couple_silhouette',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Loving couple in golden sunset praying for eternal emotional harmony',
    coupleThemeTag: 'Dua For Lovers',
    displayOrder: 1,
    isActive: true,
    metaTitle: 'Dua For Love - Islamic Dua For Relationship Peace | Maulana Shamsuddin',
    metaDescription: 'Get spiritual guidance and Quranic dua for love and relationship harmony with Maulana Shamsuddin.'
  },
  {
    id: 'srv-2',
    slug: 'wazifa-for-love',
    title: 'Wazifa For Love',
    shortDescription: 'Structured spiritual recitations and supplications for love, matrimonial harmony, and mutual commitment.',
    fullDescription: 'A Wazifa is a focused, disciplined spiritual recitation performed at consistent times with purity of intention. If you seek marriage or renewed affection with your intended partner, authentic spiritual recitations provide inner strength, peace, and divine favor.',
    spiritualBenefits: [
      'Clear emotional obstacles on the path to holy matrimony',
      'Foster mutual harmony, empathy, and honor between both hearts',
      'Instill serenity in the soul and courage in times of distress',
      'Strengthen relationship values within sacred and ethical bounds'
    ],
    processSteps: [
      'Consult directly with Maulana Shamsuddin for personalized instruction',
      'Follow the designated duration (7, 11, or 21 days) with consistency',
      'Combine spiritual recitation with daily obligatory prayers and charity',
      'Maintain pure, lawful intentions focused on honest companionship'
    ],
    recommendedWazifa: 'Invocation of Ya Jami Ya Wadood with pure heart following evening contemplation.',
    iconType: 'wazifa',
    imageTag: 'quran_rehal',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Lovers reciting sacred wazifa holding hands in mutual commitment',
    coupleThemeTag: 'Wazifa For Couples',
    displayOrder: 2,
    isActive: true,
    metaTitle: 'Wazifa For Love - Powerful Islamic Wazifa Guidance | Maulana Shamsuddin',
    metaDescription: 'Effective and authentic Islamic wazifa practices for love and marriage harmony.'
  },
  {
    id: 'srv-3',
    slug: 'ruhani-ilm',
    title: 'Ruhani Ilm',
    shortDescription: 'Spiritual insight and counseling based on sacred verses to navigate lifes profound challenges.',
    fullDescription: 'Spiritual knowledge (Ruhani Ilm) utilizes the sublime names of the Divine and sacred Quranic verses to bring light, solace, and spiritual clarity to troubled minds. Each individual receives tailored spiritual counsel, Istikhara guidance, and ethical life direction.',
    spiritualBenefits: [
      'Protection against negative influences, spiritual anxiety, and despair',
      'Profound sense of tranquility, peace of mind, and emotional balance',
      'Clear direction in difficult decisions through prayer and Istikhara',
      'Strengthening of personal faith, resilience, and spiritual connection'
    ],
    processSteps: [
      'Share your name and concerns through secure, private consultation',
      'Spiritual assessment and Istikhara evaluation conducted with care',
      'Personalized daily routine of remembrance and prayer provided',
      'Receive ongoing follow-up and ethical counseling sessions'
    ],
    recommendedWazifa: 'Morning and evening recitation of Ayat-ul-Kursi and the Four Qul chapters for protection.',
    iconType: 'ruhani',
    imageTag: 'hands_supplication',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Deep spiritual bond and soulmate connection with divine blessings',
    coupleThemeTag: 'Spiritual Love Bonding',
    displayOrder: 3,
    isActive: true,
    metaTitle: 'Ruhani Ilm & Spiritual Consultation | Maulana Shamsuddin',
    metaDescription: 'Spiritual knowledge, Istikhara guidance, and personal consultation for peace of mind.'
  },
  {
    id: 'srv-4',
    slug: 'taweez',
    title: 'Taweez',
    shortDescription: 'Traditional spiritual prayers and Quranic verses inscribed for protection, blessings, and emotional safety.',
    fullDescription: 'Composed of authentic Quranic verses and time-honored prayers of supplication, sacred Islamic guidance serves as a source of spiritual protection and divine grace. Prepared to shield against negative energies, promote household peace, and soften hardened hearts.',
    spiritualBenefits: [
      'Protection from the evil eye, negative energies, and malevolence',
      'Abundance of peace, blessings, and harmony in home and livelihood',
      'Cultivation of unity, warmth, and mutual goodwill among family members',
      'Freedom from persistent anxieties, restless dread, and distress'
    ],
    processSteps: [
      'Explain your situation via phone consultation or WhatsApp message',
      'Tailored spiritual preparation aligned with sacred Islamic traditions',
      'Instructions provided regarding reverent use and ethical care',
      'Keep with purity of heart, good deeds, and regular prayers'
    ],
    recommendedWazifa: 'Accompany with daily recitation of Surah Al-Falaq and Surah An-Nas.',
    iconType: 'taweez',
    imageTag: 'taweez_pendant',
    imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Couple protected from evil eye and negative interference under sacred taweez',
    coupleThemeTag: 'Protected Love & Peace',
    displayOrder: 4,
    isActive: true,
    metaTitle: 'Islamic Taweez For Protection & Blessings | Maulana Shamsuddin',
    metaDescription: 'Authentic Quranic taweez for protection from evil eye and bringing harmony in life.'
  },
  {
    id: 'srv-5',
    slug: 'love-marriage',
    title: 'Love Marriage',
    shortDescription: 'Ethical spiritual counseling and prayers to resolve marital obstacles and unite families with honor.',
    fullDescription: 'When pursuing marriage with someone you love faces resistance—such as parental disapproval, social pressure, or unexpected friction—Maulana Shamsuddin provides compassionate counsel and sacred prayers to resolve misunderstandings honorably.',
    spiritualBenefits: [
      'Softening of hearts and gentle acceptance among parents and elders',
      'Peaceful resolution of obstacles hindering lawful matrimonial union',
      'Facilitating marriage solemnized with dignity, mutual respect, and joy',
      'Invoking divine blessings and everlasting tranquility for future married life'
    ],
    processSteps: [
      'Provide a clear overview of the obstacles and family dynamics involved',
      'Spiritual Istikhara conducted to discern goodness and blessings in the match',
      'Engage in dedicated prayer and supplication over a 21-day period',
      'Approach parents with utmost courtesy, gentleness, and filial respect'
    ],
    recommendedWazifa: 'Focused reflection on selected verses from Surah Ta-Ha following daily prayers.',
    iconType: 'marriage',
    imageTag: 'wedding_couple',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Joyful traditional Muslim wedding couple celebrating approved love marriage',
    coupleThemeTag: 'Love Marriage & Nikkah',
    displayOrder: 5,
    isActive: true,
    metaTitle: 'Love Marriage Dua & Guidance | Maulana Shamsuddin',
    metaDescription: 'Islamic dua and guidance for love marriage, parents approval and happy married life.'
  },
  {
    id: 'srv-6',
    slug: 'relationship-problem',
    title: 'Relationship Problem',
    shortDescription: 'Spiritual counseling to resolve spouse disputes, restore trust, and bring harmony back to your household.',
    fullDescription: 'Marital friction, persistent suspicion, breakdown of communication, or third-party interference can endanger even the most dedicated bonds. Through spiritual counseling and sincere prayers, couples rebuild trust, rekindle love, and restore harmony.',
    spiritualBenefits: [
      'Rekindling mutual warmth, empathy, and affection between husband and wife',
      'Permanent cessation of domestic toxicity, frequent arguments, and bitterness',
      'Shielding the home from outside malice, jealousy, and destructive gossip',
      'Restoring a serene, secure environment for children and loved ones'
    ],
    processSteps: [
      'Describe the root challenges affecting the marriage or relationship',
      'Participate in 100% confidential spiritual consultation and counseling',
      'Implement straightforward daily prayers, mindfulness, and constructive actions',
      'Practice patience, kind speech, and positive moral conduct consistently'
    ],
    recommendedWazifa: 'Daily peaceful invocation of Ya Lateef Ya Wadood in a quiet reflective atmosphere.',
    iconType: 'relationship',
    imageTag: 'broken_heart_mended',
    imageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Husband and wife peacefully reconciled after clearing misunderstandings',
    coupleThemeTag: 'Husband & Wife Reconciliation',
    displayOrder: 6,
    isActive: true,
    metaTitle: 'Husband Wife Relationship Problem Solution | Maulana Shamsuddin',
    metaDescription: 'Resolve marital disputes, communication gaps, and family misunderstandings with spiritual guidance.'
  }
];

export const COUPLE_PHOTO_PRESETS = [
  {
    id: 'preset-1',
    serviceId: 'srv-1',
    title: 'Dua For Love: Lovers Golden Sunset',
    category: 'Romantic Lovers',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    description: 'Tender couple in golden sunset praying for emotional harmony and unbreakable bond'
  },
  {
    id: 'preset-2',
    serviceId: 'srv-2',
    title: 'Wazifa For Love: Hands With Rings & Commitment',
    category: 'Devoted Lovers',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    description: 'Interlocked hands of lovers holding tight in sacred commitment and wazifa power'
  },
  {
    id: 'preset-3',
    serviceId: 'srv-3',
    title: 'Ruhani Ilm: Spiritual Light & Lovers Touch',
    category: 'Soulmate Connection',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle affectionate touch between lovers bathed in warm celestial glow'
  },
  {
    id: 'preset-4',
    serviceId: 'srv-4',
    title: 'Taweez: Protected Lovers Embracing at Twilight',
    category: 'Spiritual Protection',
    imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
    description: 'Couple looking at the peaceful horizon protected from evil eye and rivalry'
  },
  {
    id: 'preset-5',
    serviceId: 'srv-5',
    title: 'Love Marriage: Nikkah Bride & Groom Celebration',
    category: 'Wedding Couple',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional South Asian / Muslim wedding bride and groom smiling happily'
  },
  {
    id: 'preset-6',
    serviceId: 'srv-6',
    title: 'Relationship Problem: Reconciled Husband & Wife',
    category: 'Marital Peace',
    imageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80',
    description: 'Husband and wife overcoming conflict and embracing with renewed affection'
  },
  {
    id: 'preset-7',
    serviceId: 'srv-1',
    title: 'Alternative: Couple Walking Hand in Hand',
    category: 'Romance & Harmony',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Couple walking together in serenity, holding hands through lifes journey'
  },
  {
    id: 'preset-8',
    serviceId: 'srv-5',
    title: 'Alternative: Wedding Rings & Sacred Nikkah',
    category: 'Nikkah & Rings',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional sacred wedding celebration with golden rings and floral joy'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Ayesha Khan',
    location: 'Mumbai, Maharashtra',
    quote: 'With the sincere prayers and guidance of Maulana Shamsuddin, our families happily accepted our marriage. I will always remain grateful for his compassionate counsel.',
    rating: 5,
    serviceCategory: 'Love Marriage Guidance',
    avatarType: 'couple',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    isApproved: true,
    createdAt: '2025-05-14',
  },
  {
    id: 'test-2',
    name: 'Rizwan Ali',
    location: 'Hyderabad, Telangana',
    quote: 'My relationship was experiencing severe communication breakdowns and conflict. Following the spiritual recitations and advice brought deep peace back to our home.',
    rating: 5,
    serviceCategory: 'Wazifa & Taweez',
    avatarType: 'man',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    isApproved: true,
    createdAt: '2025-06-22',
  },
  {
    id: 'test-3',
    name: 'Sana Begum',
    location: 'Lucknow, Uttar Pradesh',
    quote: 'I was overwhelmed by stress and despair. Maulana Sahabs respectful counseling and prayers helped me regain mental clarity and marital harmony.',
    rating: 5,
    serviceCategory: 'Relationship Solution',
    avatarType: 'woman',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    isApproved: true,
    createdAt: '2025-07-10',
  },
];

export const SPIRITUAL_PHOTO_PRESETS = [
  {
    id: 'sp-1',
    title: 'Holy Quran with Golden Lantern Glow',
    category: 'About Maulana / Quran',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    description: 'Serene holy scripture illuminated by spiritual light and lantern'
  },
  {
    id: 'sp-2',
    title: 'Grand Mosque & Minarets at Twilight',
    category: 'Mosque & Skyline',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Majestic Islamic architectural silhouette under starry sky'
  },
  {
    id: 'sp-3',
    title: 'Hands in Dua & Supplication',
    category: 'Dua & Prayer',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    description: 'Devoted hands raised in heartfelt prayer and surrender to Allah'
  },
  {
    id: 'sp-4',
    title: 'Spiritual Islamic Rosary (Tasbih)',
    category: 'Wazifa & Zikr',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    description: 'Sacred wooden prayer beads for devotional remembrance and peace'
  }
];

export const CLIENT_AVATAR_PRESETS = [
  {
    id: 'av-1',
    name: 'Ayesha (Married)',
    type: 'woman',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'av-2',
    name: 'Rizwan (Husband)',
    type: 'man',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'av-3',
    name: 'Sana (Client)',
    type: 'woman',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'av-4',
    name: 'Tariq (Brother)',
    type: 'man',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'av-5',
    name: 'Happy Couple Profile',
    type: 'couple',
    imageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=200&h=200&q=80',
  }
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'enq-101',
    name: 'Mohammad Farooq',
    phone: '+91 98765 43210',
    serviceId: 'srv-1',
    serviceTitle: 'Dua For Love',
    consultationType: 'whatsapp',
    message: 'Respected Maulana, please advise on prayers and guidance to help resolve misunderstandings in our marriage.',
    hasConsent: true,
    status: 'new',
    createdAt: '2026-10-09 14:30',
    adminNotes: 'Call scheduled for afternoon'
  },
  {
    id: 'enq-102',
    name: 'Zareen Fatima',
    phone: '+91 91234 56789',
    serviceId: 'srv-5',
    serviceTitle: 'Love Marriage',
    consultationType: 'phone',
    message: 'I request Istikhara guidance and prayers to assist with family approval for my marriage.',
    hasConsent: true,
    status: 'contacted',
    createdAt: '2026-10-08 11:15',
    adminNotes: 'Istikhara prayer guidance shared via WhatsApp'
  }
];

export const INITIAL_CONTENT: WebsiteContent = {
  announcementText: 'Have faith in divine wisdom — every hardship has a path to peace and resolution...',
  brandName: 'Maulana Shamsuddin',
  brandSubtitle: 'Dua | Wazifa | Spiritual Counseling | Sacred Prayers',
  aboutTitle: 'About Maulana Shamsuddin',
  aboutDescription: 'Maulana Shamsuddin is a distinguished and compassionate Islamic spiritual scholar recognized for his decades of dedicated counseling, heartfelt prayers, and ethical guidance. Believing firmly in universal human dignity, mercy, and sincere devotion, Maulana Sahab strives to assist individuals experiencing emotional and familial distress through authentic prayer, spiritual reflection, and moral encouragement.',
  aboutHighlights: [
    { title: '100% Confidential', desc: 'Every conversation and personal detail remains strictly private and protected.' },
    { title: 'Genuine Spiritual Practice', desc: 'Grounding in noble Islamic principles, authentic Quranic verses, and ethical guidance.' },
    { title: 'Compassionate Guidance', desc: 'Heartfelt empathy, sincere listening, and patient understanding for every seeker.' },
    { title: 'Open To All People', desc: 'Serving humanity with compassion, respectful prayers, and universal goodwill.' }
  ],
  whyChooseUsTitle: 'Why Choose Us?',
  whyChooseUsSubtitle: 'Your peace of mind and emotional well-being are our highest commitment.',
  whyChooseUsItems: [
    { title: 'Decades of Spiritual Experience', desc: 'Years of profound spiritual wisdom, counseling expertise, and deep understanding of human relationships.', icon: 'tajurba' },
    { title: '100% Confidential & Secure', desc: 'Your private matters, personal details, and concerns are kept entirely confidential.', icon: 'lock' },
    { title: 'Heartfelt Prayers & Supplications', desc: 'Sincere devotion and Quranic remembrance aimed at bringing lasting peace to troubled hearts.', icon: 'dua' },
    { title: 'Guidance For Diverse Challenges', desc: 'Compassionate assistance for relationship conflicts, marriage hurdles, and emotional distress.', icon: 'solution' },
    { title: 'Direct Phone & WhatsApp Access', desc: 'Convenient consultation from anywhere via secure direct call or WhatsApp messaging.', icon: 'phone' }
  ],
  processTitle: 'Our Process',
  processSubtitle: 'A clear, respectful, and comforting process to receive authentic spiritual guidance',
  processSteps: [
    { step: 1, title: 'Reach Out', desc: 'Connect with Maulana Shamsuddin easily via direct phone call or WhatsApp message.' },
    { step: 2, title: 'Share Your Concern', desc: 'Explain your personal circumstances and worries in complete trust and tranquility.' },
    { step: 3, title: 'Receive Spiritual Guidance', desc: 'Receive tailored Quranic supplications, Istikhara insights, and compassionate advice.' },
    { step: 4, title: 'Practice With Sincerity', desc: 'Follow the guidance with patience, moral integrity, cleanliness, and faith in divine grace.' }
  ],
  ctaBannerTitle: 'Find Peace & Solution For Your Life Challenges',
  ctaBannerSubtitle: 'With Maulana Shamsuddin',
  ctaBannerQuote: '“Prayer, Patience, and Faith... A Path Toward Peace for Every Heart”'
};

export const INITIAL_SETTINGS: GeneralSettings = {
  siteName: 'Maulana Shamsuddin',
  phoneNumber: '+919928409129',
  phoneDisplay: '+91 99284 09129',
  whatsappNumber: '919928409129',
  whatsappMessage: 'Hello Maulana Shamsuddin, I would like to seek spiritual guidance and prayer consultation regarding my situation.',
  emailAddress: 'contact@maulanashamsuddin.com',
  address: 'India',
  disclaimerText: 'Spiritual guidance and dua consultations are based on faith, personal prayer, and Islamic counseling practices. Results may vary according to faith, sabr, and divine will. We do not make misleading, unscientific, or guaranteed claims.',
  metaTitle: 'Maulana Shamsuddin - Dua, Wazifa, Ruhani Ilm & Taweez Consultation',
  metaDescription: 'Trusted Islamic spiritual consultation for love, marriage, family disputes, and inner peace by Maulana Shamsuddin.',
  socialLinks: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/919928409129'
  },
  imageSettings: {
    showAllImages: true,
    showHeroImages: true,
    showServiceImages: true,
    showAboutImage: true,
    showWhyChooseSkyline: true,
    showTestimonialAvatars: true,
    customImages: {}
  }
};
