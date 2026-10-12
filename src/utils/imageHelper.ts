/**
 * Image compression and safe storage utility for Maulana Shamsuddin spiritual portal
 * Prevents localStorage quota errors by downscaling uploaded files to high-performance web formats.
 */

export interface WebsiteImageSlotInfo {
  id: string;
  name: string;
  section: 'slides' | 'services' | 'about' | 'branding' | 'whychoose' | 'testimonials' | 'custom';
  sectionLabel: string;
  recommendedSize: string;
  aspectRatio: string;
  description: string;
  defaultFallbackName: string;
}

export const WEBSITE_IMAGE_SLOTS: WebsiteImageSlotInfo[] = [
  {
    id: 'slide-1',
    name: 'Hero Slide 1: Sacred Dua & Wazifa For Love',
    section: 'slides',
    sectionLabel: 'Hero Slider',
    recommendedSize: '1600 × 900 px',
    aspectRatio: '16:9 Landscape',
    description: 'Main homepage banner background for Dua For Love slide',
    defaultFallbackName: 'Islamic Silk Silhouette Artwork',
  },
  {
    id: 'slide-2',
    name: 'Hero Slide 2: Love Marriage & Family Harmony',
    section: 'slides',
    sectionLabel: 'Hero Slider',
    recommendedSize: '1600 × 900 px',
    aspectRatio: '16:9 Landscape',
    description: 'Homepage banner background for Love Marriage slide',
    defaultFallbackName: 'Golden Starry Celestial Sky',
  },
  {
    id: 'slide-3',
    name: 'Hero Slide 3: Personal Spiritual Guidance & Inner Peace',
    section: 'slides',
    sectionLabel: 'Hero Slider',
    recommendedSize: '1600 × 900 px',
    aspectRatio: '16:9 Landscape',
    description: 'Homepage banner background for Personal Guidance slide',
    defaultFallbackName: 'Sacred Mosque & Silk Backdrop',
  },
  {
    id: 'srv-1',
    name: 'Service 1: Dua For Love',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Dua For Love & Relationship Healing',
    defaultFallbackName: 'Lovers Praying In Sunset Artwork',
  },
  {
    id: 'srv-2',
    name: 'Service 2: Wazifa For Love',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Wazifa For Love & Matrimonial Harmony',
    defaultFallbackName: 'Holy Quran & Rehal Artwork',
  },
  {
    id: 'srv-3',
    name: 'Service 3: Dua For Love Marriage',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Marriage Obstacle Guidance & Family Consent',
    defaultFallbackName: 'Ruhani Light & Celestial Glow Artwork',
  },
  {
    id: 'srv-4',
    name: 'Service 4: Taweez For Love',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Sacred Taweez & Spiritual Shield Against Evil Eye',
    defaultFallbackName: 'Sacred Taweez Shield Artwork',
  },
  {
    id: 'srv-5',
    name: 'Service 5: Dua To Get Lost Love Back',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Heartbreak Healing & Reconciling Separated Lovers',
    defaultFallbackName: 'Wedding Couple Blessing Artwork',
  },
  {
    id: 'srv-6',
    name: 'Service 6: Relationship Problem',
    section: 'services',
    sectionLabel: 'Spiritual Services',
    recommendedSize: '800 × 600 px',
    aspectRatio: '4:3 Landscape',
    description: 'Card photo for Husband-Wife Conflict Resolution & Peace',
    defaultFallbackName: 'Reconciled Couple & Warmth Artwork',
  },
  {
    id: 'about',
    name: 'About Maulana Shamsuddin Photo',
    section: 'about',
    sectionLabel: 'About Maulana',
    recommendedSize: '800 × 800 px',
    aspectRatio: '1:1 Square or 4:3',
    description: 'Main spiritual portrait or Quranic illumination in About section',
    defaultFallbackName: 'Atmospheric Holy Quran & Golden Lantern Art',
  },
  {
    id: 'logo',
    name: 'Header & Footer Brand Logo',
    section: 'branding',
    sectionLabel: 'Brand Identity',
    recommendedSize: '500 × 500 px',
    aspectRatio: '1:1 Square (Transparent PNG recommended)',
    description: 'Official emblem crest displayed in Header navigation and Footer',
    defaultFallbackName: 'Golden Mosque Minaret Crest',
  },
  {
    id: 'whychoose',
    name: 'Why Choose Us Banner Graphic',
    section: 'whychoose',
    sectionLabel: 'Why Choose Us',
    recommendedSize: '1200 × 600 px',
    aspectRatio: '2:1 Banner',
    description: 'Right-hand side background visual for Why Choose Us section',
    defaultFallbackName: 'Mosque Skyline Minarets Silhouette',
  },
  {
    id: 'test-1',
    name: 'Testimonial 1: Sister Fatima (Hyderabad)',
    section: 'testimonials',
    sectionLabel: 'Client Testimonials',
    recommendedSize: '300 × 300 px',
    aspectRatio: '1:1 Avatar Circle',
    description: 'Client profile photo for Family Reconciliation review',
    defaultFallbackName: 'Sister Silhouette Monogram',
  },
  {
    id: 'test-2',
    name: 'Testimonial 2: Brother Zaid (Dubai, UAE)',
    section: 'testimonials',
    sectionLabel: 'Client Testimonials',
    recommendedSize: '300 × 300 px',
    aspectRatio: '1:1 Avatar Circle',
    description: 'Client profile photo for Love Marriage Wazifa review',
    defaultFallbackName: 'Brother Silhouette Monogram',
  },
  {
    id: 'test-3',
    name: 'Testimonial 3: Sister Ayesha (London, UK)',
    section: 'testimonials',
    sectionLabel: 'Client Testimonials',
    recommendedSize: '300 × 300 px',
    aspectRatio: '1:1 Avatar Circle',
    description: 'Client profile photo for Evil Eye Protection review',
    defaultFallbackName: 'Sister Silhouette Monogram',
  },
];

/**
 * Compresses an image File or Blob using HTML5 Canvas to prevent LocalStorage Quota Exceeded errors.
 * Takes multi-megabyte camera photos and converts them into optimized, web-ready base64 data URLs.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.82
): Promise<string> {
  // If it's an SVG, we can read as data URL directly as SVGs are already tiny text
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file from disk'));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Empty file content'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data'));
      img.onload = () => {
        let { width, height } = img;

        // Downscale while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context is unavailable
          resolve(dataUrl);
          return;
        }

        // Apply slight image smoothing for high quality downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG data URL
        const mimeType = file.type === 'image/png' && file.size < 500000 ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        resolve(compressedDataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Safely persists an item to localStorage with error handling for quota constraints
 */
export function safeSaveToLocalStorage(key: string, data: any): { success: boolean; error?: string } {
  try {
    const serialized = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return { success: true };
  } catch (err: any) {
    console.error(`LocalStorage quota exceeded while saving "${key}":`, err);
    return {
      success: false,
      error: err?.message || 'Storage quota exceeded. Please use image URLs or smaller photos.',
    };
  }
}
