import { SliderSlide, ServiceItem, TestimonialItem, EnquiryItem, WebsiteContent, GeneralSettings } from '../types';

export const INITIAL_SLIDES: SliderSlide[] = [
  {
    id: 'slide-1',
    subheading: 'Mohabbat Mein Pareshani?',
    heading: 'Dua & Wazifa For Love',
    description: 'Kisi bhi wajah se toot rahi ho aapki mohabbat... Maulana Shamsuddin ki roohani madad se paayein apne pyaar, rishte aur sukoon ko wapas.',
    highlightPills: ['Dua For Love', 'Wazifa For Love', 'Ruhani Ilm', 'Taweez'],
    ctaPrimaryText: 'Abhi Contact Karein',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Assalam%20o%20Alaikum%20Maulana%20Sahab,%20Mujhe%20Dua%20aur%20Wazifa%20ke%20bare%20mein%20mashwara%20chahiye',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“Pyar sirf dil se nahi, Rab ki raza se milta hai...”',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80',
    displayOrder: 1,
    isActive: true,
    themeStyle: 'love',
  },
  {
    id: 'slide-2',
    subheading: 'Rishte Aur Shaadi Se Judi Pareshani?',
    heading: 'Love Marriage & Family Approval',
    description: 'Apni situation share karein aur ruhani rehnumai paayein. Parivaar ko manane aur rishton mein barkat ke liye sharai dua aur amal.',
    highlightPills: ['Manpasand Shaadi Dua', 'Waldain Ko Manana', 'Istikhara Rehnumai', 'Khandani Sukoon'],
    ctaPrimaryText: 'WhatsApp Par Baat Karein',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Assalam%20o%20Alaikum%20Maulana%20Sahab,%20Love%20Marriage%20se%20judi%20rehnumai%20chahiye',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“Har mushkil aasan hoti hai jab dua dil se nikalti hai...”',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
    displayOrder: 2,
    isActive: true,
    themeStyle: 'marriage',
  },
  {
    id: 'slide-3',
    subheading: 'Har Pareshani Mein Sabr Aur Dua',
    heading: 'Personal Ruhani Guidance & Sukoon',
    description: 'Dua, Islamic guidance aur ruhani mashware ke liye sampark karein. Zindagi ki uljhanon aur pareshaniyon ka sharai wazifa aur hal.',
    highlightPills: ['Qurani Dua & Wazifa', 'Gharelu Klesh Khatam', 'Karobar Mein Barkat', 'Nafsani Sukoon'],
    ctaPrimaryText: 'Contact Maulana Shamsuddin',
    ctaPrimaryLink: 'https://wa.me/919928409129?text=Assalam%20o%20Alaikum%20Maulana%20Sahab,%20Mujhe%20Personal%20Ruhani%20Guidance%20chahiye',
    ctaSecondaryText: '+91 99284 09129',
    ctaSecondaryLink: 'tel:+919928409129',
    scriptQuote: '“Allah par yaqeen rakhiye, har andhere ke baad subah aati hai...”',
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
    shortDescription: 'Mohabbat ko mazboot banane aur dilon ko jodne ke liye khaas dua.',
    fullDescription: 'Mohabbat mein aapsi ranjish, galatfehmi ya dooriyan paida ho gayi hon to Qurani duaon aur roohani amal se dilon mein mohabbat aur narmi paida ki ja sakti hai. Maulana Shamsuddin aapki shakhsi halat ko samajhkar munasib sharai dua tajweez karte hain.',
    spiritualBenefits: [
      'Dilon mein muhabbat aur narmi paida karna',
      'Dooriyan aur bewajah narazgi khatam karna',
      'Ek doosre ke liye jazbaat mein barkat',
      'Rishte mein hamesha ke liye sukoon aur sachhai'
    ],
    processSteps: [
      'Apni pareshani aur halat ki mukammal tafseel batayein',
      'Maulana Sahab aapki situation ke mutabiq sharai dua tajweez karenge',
      'Pakeezgi aur sharait ke saath dua aur istighfar ada karein',
      'Nateeje ke liye sabr aur Allah par mukammal yaqeen rakhein'
    ],
    recommendedWazifa: 'Surah Al-Furqan Ayat 74 ka tilawat aur Ya Wadoodo ka vird ba-wazu.',
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
    shortDescription: 'Pyar, rishte aur shaadi ke liye asardar wazifa.',
    fullDescription: 'Wazifa ek mukaddas zikr hai jise mukarrar waqt aur pakeezah tareeqe se kiya jata hai. Agar aap apne mahboob se shadi ya rishte mein barkat chahte hain, toh Maulana Shamsuddin ke bataye asardar wazaif se dil ko chain aur faida milta hai.',
    spiritualBenefits: [
      'Mohabbat aur nikah ke raste se rukawatein door karna',
      'Dono dilon mein aapsi ham-aahangi aur izzat',
      'Qalb ko sukoon aur rooh ko taqat',
      'Rishte ko shariyet ke dayre mein mazboot karna'
    ],
    processSteps: [
      'Maulana Shamsuddin se direct mashwara karein',
      'Wazifa ki muddat (7, 11 ya 21 din) aur pabandi samjhein',
      'Panch waqt ki namaz ke sath wazifa padhein',
      'Niyyat bilkul saaf aur nek maqsad ke liye rakhein'
    ],
    recommendedWazifa: 'Ya Jamiu Ya Wadoodo 1100 martaba baad namaz-e-Isha.',
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
    shortDescription: 'Ruhani taqat se har mushkil ka hal, chahe wo kaisa bhi ho.',
    fullDescription: 'Ruhani Ilm Allah Taala ke asma-ul-husna aur Qurani ayaton ka noorani ilm hai jiske zariye roohani uljhanon, dili pareshaniyon aur musibaton ka ilaaj kiya jata hai. Har shakhs ke liye makhsoos ruhani mashwara diya jata hai.',
    spiritualBenefits: [
      'Manfi asraat aur dili ghabrahat se hifazat',
      'Zehan aur rooh mein noorani sukoon ka ehsaas',
      'Mushkil faislon mein sahih rehnumai aur istikhara',
      'Imaan aur taqwa mein izafa'
    ],
    processSteps: [
      'Apna naam aur pareshani confidential tareeqe se share karein',
      'Istikhara aur roohani tashkhees ki jayegi',
      'Makhsoos aamaal aur zikr ka nizaam diya jayega',
      'Maulana sahab se waqtan-fawaqtan feedback lein'
    ],
    recommendedWazifa: 'Ayat-ul-Kursi aur Charon Qul subah o sham hifazat ke liye.',
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
    shortDescription: 'Hifazat, pyar, rizaq aur sukoon ke liye khaas taweez.',
    fullDescription: 'Qurani ayaton aur masnoon duaaon par mushtamil taweez roohani hifazat aur barkat ka zariya hota hai. Nazar-e-bad se bachne, ghar mein khushhali aur dilon ki narmi ke liye traditional sharai taweez tayyar kiya jata hai.',
    spiritualBenefits: [
      'Nazar-e-bad aur bure asraat se mukammal bachao',
      'Ghar aur karobar mein barkat o rizaq',
      'Parivaar mein aapsi ittehad aur khushi',
      'Khauf, dar aur be-chaini se azaadi'
    ],
    processSteps: [
      'Apni pareshani ke bare mein call ya WhatsApp par batayein',
      'Aapke liye makhsoos taweez ka amal kiya jayega',
      'Taweez ke istemal aur ihtiyat ke usool samjhaye jayenge',
      'Pakeezah kapde aur adab ke sath paas rakhein ya pehnein'
    ],
    recommendedWazifa: 'Taweez ke sath rozana Surah Falaq aur Surah Naas ka wird zaroori hai.',
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
    shortDescription: 'Love marriage ke liye khaas amal aur dua.',
    fullDescription: 'Manpasand shadi mein aane wali rukawatein jaise waldain ki narazgi, samajik dushwariyaan ya rishte mein achanak doori ke liye Maulana Shamsuddin sharai dua aur roohani amal sikhate hain taaki rishta ba-izzat tareeqe se tay ho sake.',
    spiritualBenefits: [
      'Waldain aur rishtedaron ke dilon mein narmi aur razamandi',
      'Nikah ke raste mein aane wali har rukawat ka sharai hal',
      'Rishta mukammal izzat aur ahtram ke sath tay hona',
      'Aane wali shadi-shuda zindagi mein barkat aur aman'
    ],
    processSteps: [
      'Dono taraf ki pareshani aur halat ko share karein',
      'Istikhara ke zariye rishte ki barkat maloom karein',
      'Khaas dua aur wazifa ka amal 21 din ke liye karein',
      'Waldain se ahtram aur muhabbat se baat karein'
    ],
    recommendedWazifa: 'Surah Taha ki makhsoos aayat ka zikr har namaz ke baad.',
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
    shortDescription: 'Jeevan saathi, pati-patni ke jhagde, extra affair ka solution.',
    fullDescription: 'Mian-biwi ke aapsi jhagde, bewajah shaq, baat cheet band hona ya teesre shakhs ki dakhal-andazi se ghar tootne ki naubat aa jati hai. Maulana Shamsuddin ke mashware aur dua se aapsi pyar aur ittefaq dobara qayam hota hai.',
    spiritualBenefits: [
      'Shauhar aur biwi ke dilon mein aapas ki mohabbat dobara zinda hona',
      'Gharelu klesh aur ladai jhagde ka mukammal khatma',
      'Bahar ke logon ki buri nazar ya asar se chhutkara',
      'Bachhon aur ghar ke mahol mein aman o sukoon'
    ],
    processSteps: [
      'Ghar aur rishte ki bunyadi pareshani batayein',
      'Gopniya (100% confidential) mashwara aur counseling',
      'Dua aur wazifa ka aasan tarika bataya jayega',
      'Sabr aur husn-e-akhlaq ke sath amal jari rakhein'
    ],
    recommendedWazifa: 'Ya Lateefu Ya Wadoodo 100 martaba rozana shant mahol mein.',
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
    quote: 'Maulana Shamsuddin sahab ki dua se meri love marriage ho gayi. Main hamesha unki duaon ke liye shukrguzaar hoon.',
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
    quote: 'Mere relationship mein bahut problems thi. Wazifa aur taweez ke baad sab kuch sahi ho gaya. Allah unhe khush rakhe.',
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
    quote: 'Main bohot pareshan thi. Maulana sahab ne jo dua aur taweez diya, usse meri life mein sukoon wapas aa gaya.',
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
    description: 'Pakeezah wooden prayer beads for sacred zikr and peace'
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
    message: 'Maulana Sahab, hamari aapsi narazgi door karne ke liye dua aur wazifa ka tareeqa bataiye.',
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
    message: 'Waldain ko manane ke liye sharai istikhara aur dua ki zaroorat hai.',
    hasConsent: true,
    status: 'contacted',
    createdAt: '2026-10-08 11:15',
    adminNotes: 'Istikhara dua details sent via WhatsApp'
  }
];

export const INITIAL_CONTENT: WebsiteContent = {
  announcementText: 'Allah Par Yaqeen Rakhiye, Har Mushkil Ka Hal Hai...',
  brandName: 'Maulana Shamsuddin',
  brandSubtitle: 'Dua | Wazifa | Ruhani Ilm | Taweez',
  aboutTitle: 'About Maulana Shamsuddin',
  aboutDescription: 'Maulana Shamsuddin ek anubhavi aur mashhoor roohani alim hain, jinhe logon ki duaon ka jawab dene aur unki zindagi mein sukoon lane ke liye jaana jata hai. Wo sirf ilm aur dua par hi nahi, balki insaniyat aur rehmat par bhi bharosa rakhte hain. Maulana sahab ka maqsad hai ki har musibat mein ghire insaan ko Allah ki yaad aur roohani madad ke zariye raasta dikhaya jaaye.',
  aboutHighlights: [
    { title: '100% Confidential', desc: 'Aapki har baat aur guftagu bilkul raazdari mein rakhi jati hai.' },
    { title: 'Real & Genuine Amal', desc: 'Sharai usoolon aur Quranic ayaton par mabni pakeezah amal.' },
    { title: 'Jaldi Asar', desc: 'Ikhlas aur sachhi niyyat se dua ka asar mehsus hota hai.' },
    { title: 'Har Dharm Ke Liye Seva', desc: 'Insaniyat sabse pehle hai, har zarooratmand ke liye dua aur rehnumai.' }
  ],
  whyChooseUsTitle: 'Why Choose Us?',
  whyChooseUsSubtitle: 'Aapki khushi aur sukoon hi hamari sabse badi kamyabi hai.',
  whyChooseUsItems: [
    { title: 'Roohani Ilm Mein Tajurba', desc: 'Barson ka roohani tajurba aur sharai qawaneen ki gehri samajh.', icon: 'tajurba' },
    { title: '100% Gopniyata (Confidential)', desc: 'Aapki shakhsi zindagi ki har maloomat hamesha mehfooz.', icon: 'lock' },
    { title: 'Asardar Amal Aur Dua', desc: 'Mukhlisana duaon aur zikr ke zariye dilon mein sukoon.', icon: 'dua' },
    { title: 'Har Problem Ka Solution', desc: 'Mohabbat, rishte, gharelu uljhanein aur dil ka chain.', icon: 'solution' },
    { title: 'Online / Phone Se Bhi Salah', desc: 'Ghar baithe Call ya WhatsApp par asaani se sampark.', icon: 'phone' }
  ],
  processTitle: 'Our Process',
  processSubtitle: 'Ek asaan aur pur-sukoon tareeqa roohani rehnumai paane ka',
  processSteps: [
    { step: 1, title: 'Contact Us', desc: 'Call ya WhatsApp ke zariye Maulana Shamsuddin se sampark karein.' },
    { step: 2, title: 'Share Your Concern', desc: 'Apni pareshani aur halat ko khulkar aur tasalli se batayein.' },
    { step: 3, title: 'Receive Appropriate Guidance', desc: 'Aapki situation ke mutabiq munasib dua, wazifa ya mashwara lein.' },
    { step: 4, title: 'Follow at Your Own Discretion', desc: 'Pakeezgi, sabr aur Allah par yaqeen ke sath hidayat par amal karein.' }
  ],
  ctaBannerTitle: 'Apni Problem Ka Hal Paaein',
  ctaBannerSubtitle: 'Maulana Shamsuddin Se',
  ctaBannerQuote: '“Dua, Wazifa, Taweez... Har Mushkil Ka Hal”'
};

export const INITIAL_SETTINGS: GeneralSettings = {
  siteName: 'Maulana Shamsuddin',
  phoneNumber: '+919928409129',
  phoneDisplay: '+91 99284 09129',
  whatsappNumber: '919928409129',
  whatsappMessage: 'Assalam o Alaikum Maulana Shamsuddin Sahab, mujhe roohani mashwara aur dua ke silsile mein baat karni hai.',
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
