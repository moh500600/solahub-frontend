// src/lib/footer-settings.ts

// استيراد أنواع الأيقونات فقط (بدون JSX)
export const STORAGE_KEY_FOOTER_SETTINGS = "footer_settings";
export const STORAGE_KEY_FOOTER_LINKS = "footer_links_settings";
export const STORAGE_KEY_FOOTER_GENERAL = "footer_general_settings";

export interface FooterSection {
  id: string;
  title: string;
  type: 'products' | 'company' | 'support' | 'legal' | 'contact' | 'newsletter' | 'payment';
  icon: string;
  color: string;
  bgColor: string;
  enabled: boolean;
  order: number;
  columns?: number;
  items: FooterLink[];
  createdAt: string;
  updatedAt: string;
}

export interface FooterLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  iconUrl?: string; // رابط أيقونة خارجي
  description?: string;
  external: boolean;
  sectionId: string;
  enabled: boolean;
  order: number;
  badge?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  iconUrl?: string; // رابط أيقونة خارجي
  href: string;
  color: string;
  bgColor: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface ContactInfo {
  id: string;
  icon: string;
  iconUrl?: string; // رابط أيقونة خارجي
  text: string;
  subtext: string;
  href: string | null;
  external: boolean;
  enabled: boolean;
  order: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  iconUrl?: string; // رابط أيقونة خارجي
  color: string;
  bgColor: string;
  borderColor: string;
  enabled: boolean;
  order: number;
}

export interface Feature {
  id: string;
  icon: string;
  iconUrl?: string; // رابط أيقونة خارجي
  title: string;
  description: string;
  color: string;
  bgColor: string;
  enabled: boolean;
  order: number;
  delay: number;
}

export interface FooterGeneralSettings {
  // المظهر العام
  showFeatures: boolean;
  showNewsletter: boolean;
  showPaymentMethods: boolean;
  showDownloadApps: boolean;
  showScrollToTop: boolean;
  showMadeWithLove: boolean;
  
  // العلامة التجارية
  companyName: string;
  companySlogan: string;
  companyDescription: string;
  registrationNumber: string;
  
  // الألوان
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  
  // الشعار
  logoIcon: string;
  logoIconUrl?: string; // رابط أيقونة خارجية للشعار
  
  // الروابط السريعة
  maxQuickLinks: number;
  showIcons: boolean;
  
  // الاشتراك في النشرة
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterSuccessMessage: string;
  
  // التطبيقات
  appStoreLink: string;
  googlePlayLink: string;
  
  // المظهر
  roundedCorners: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // أخرى
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  showCurrentYear: boolean;
}

// دالات التحميل
export function loadFooterSections(): FooterSection[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_FOOTER_SETTINGS);
  return saved ? JSON.parse(saved) : [];
}

export function loadFooterGeneralSettings(): FooterGeneralSettings {
  if (typeof window === 'undefined') return getDefaultGeneralSettings();
  const saved = localStorage.getItem(STORAGE_KEY_FOOTER_GENERAL);
  return saved ? JSON.parse(saved) : getDefaultGeneralSettings();
}

export function loadSocialLinks(): SocialLink[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('footer_social_links');
  return saved ? JSON.parse(saved) : getDefaultSocialLinks();
}

export function loadContactInfo(): ContactInfo[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('footer_contact_info');
  return saved ? JSON.parse(saved) : getDefaultContactInfo();
}

export function loadPaymentMethods(): PaymentMethod[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('footer_payment_methods');
  return saved ? JSON.parse(saved) : getDefaultPaymentMethods();
}

export function loadFeatures(): Feature[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('footer_features');
  return saved ? JSON.parse(saved) : getDefaultFeatures();
}

// دالات الحفظ
export function saveFooterSections(sections: FooterSection[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_FOOTER_SETTINGS, JSON.stringify(sections));
}

export function saveFooterGeneralSettings(settings: FooterGeneralSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_FOOTER_GENERAL, JSON.stringify(settings));
}

export function saveSocialLinks(links: SocialLink[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('footer_social_links', JSON.stringify(links));
}

export function saveContactInfo(info: ContactInfo[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('footer_contact_info', JSON.stringify(info));
}

export function savePaymentMethods(methods: PaymentMethod[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('footer_payment_methods', JSON.stringify(methods));
}

export function saveFeatures(features: Feature[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('footer_features', JSON.stringify(features));
}

// الإعدادات الافتراضية
export function getDefaultFooterSections(): FooterSection[] {
  return [
    {
      id: 'products',
      title: 'منتجاتنا',
      type: 'products',
      icon: 'Package',
      color: 'text-blue-600',
      bgColor: 'from-blue-100 to-blue-50',
      enabled: true,
      order: 1,
      columns: 1,
      items: [
        {
          id: 'solar-panels',
          name: 'الألواح الشمسية',
          href: '/products/solar-panels',
          icon: 'PanelTop',
          description: 'ألواح مونو وبولي كريستال',
          external: false,
          sectionId: 'products',
          enabled: true,
          order: 1,
          color: 'text-blue-600'
        },
        {
          id: 'batteries',
          name: 'أنظمة التخزين',
          href: '/products/batteries',
          icon: 'Battery',
          description: 'بطاريات ليثيوم وجيل',
          external: false,
          sectionId: 'products',
          enabled: true,
          order: 2,
          color: 'text-blue-600'
        },
        {
          id: 'inverters',
          name: 'المحولات الشمسية',
          href: '/products/inverters',
          icon: 'Cpu',
          description: 'محولات مركزية ومركبة',
          external: false,
          sectionId: 'products',
          enabled: true,
          order: 3,
          color: 'text-blue-600'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'company',
      title: 'الشركة',
      type: 'company',
      icon: 'Building',
      color: 'text-green-600',
      bgColor: 'from-green-100 to-green-50',
      enabled: true,
      order: 2,
      columns: 1,
      items: [
        {
          id: 'vision',
          name: 'رؤيتنا ورسالتنا',
          href: '/about/vision',
          icon: 'Sun',
          external: false,
          sectionId: 'company',
          enabled: true,
          order: 1,
          color: 'text-green-600'
        },
        {
          id: 'team',
          name: 'فريق الخبراء',
          href: '/about/team',
          icon: 'Users',
          external: false,
          sectionId: 'company',
          enabled: true,
          order: 2,
          color: 'text-green-600'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'contact',
      title: 'الاتصال',
      type: 'contact',
      icon: 'Phone',
      color: 'text-purple-600',
      bgColor: 'from-purple-100 to-purple-50',
      enabled: true,
      order: 3,
      columns: 2,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

export function getDefaultGeneralSettings(): FooterGeneralSettings {
  return {
    showFeatures: true,
    showNewsletter: true,
    showPaymentMethods: true,
    showDownloadApps: true,
    showScrollToTop: true,
    showMadeWithLove: true,
    
    companyName: 'متجر الطاقة الشمسية',
    companySlogan: 'شركاؤك نحو مستقبل طاقة مستدام',
    companyDescription: 'الشركة الرائدة في حلول الطاقة المتجددة بالمملكة العربية السعودية',
    registrationNumber: '1010666999',
    
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    backgroundColor: '#f9fafb',
    textColor: '#111827',
    
    logoIcon: 'Sun',
    logoIconUrl: undefined,
    
    maxQuickLinks: 5,
    showIcons: true,
    
    newsletterTitle: 'اشترك في نشرتنا',
    newsletterDescription: 'كن أول من يعرف العروض',
    newsletterSuccessMessage: 'تم الاشتراك بنجاح! شكراً لك، سنرسل إليك آخر العروض',
    
    appStoreLink: '#',
    googlePlayLink: '#',
    
    roundedCorners: 'lg',
    shadowIntensity: 'md',
    
    enableHoverEffects: true,
    enableAnimations: true,
    showCurrentYear: true
  };
}

export function getDefaultSocialLinks(): SocialLink[] {
  return [
    {
      id: 'facebook',
      platform: 'facebook',
      icon: 'Facebook',
      href: 'https://facebook.com/solarstore',
      color: 'text-white',
      bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
      label: 'Facebook',
      enabled: true,
      order: 1
    },
    {
      id: 'twitter',
      platform: 'twitter',
      icon: 'Twitter',
      href: 'https://twitter.com/solarstore',
      color: 'text-white',
      bgColor: 'bg-[#1DA1F2] hover:bg-[#1A91DA]',
      label: 'Twitter',
      enabled: true,
      order: 2
    },
    {
      id: 'instagram',
      platform: 'instagram',
      icon: 'Instagram',
      href: 'https://instagram.com/solarstore',
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
      label: 'Instagram',
      enabled: true,
      order: 3
    }
  ];
}

export function getDefaultContactInfo(): ContactInfo[] {
  return [
    {
      id: 'phone',
      icon: 'Phone',
      text: '+966 11 000 0000',
      subtext: 'الخط المباشر',
      href: 'tel:+966110000000',
      external: false,
      enabled: true,
      order: 1
    },
    {
      id: 'email',
      icon: 'Mail',
      text: 'info@solarstore.sa',
      subtext: 'البريد الرسمي',
      href: 'mailto:info@solarstore.sa',
      external: false,
      enabled: true,
      order: 2
    }
  ];
}

export function getDefaultPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: 'visa',
      name: 'Visa',
      icon: 'CreditCard',
      color: 'text-[#1A1F71]',
      bgColor: 'bg-blue-50/80',
      borderColor: 'border-blue-100/50',
      enabled: true,
      order: 1
    },
    {
      id: 'mastercard',
      name: 'MasterCard',
      icon: 'CardIcon',
      color: 'text-[#EB001B]',
      bgColor: 'bg-red-50/80',
      borderColor: 'border-red-100/50',
      enabled: true,
      order: 2
    }
  ];
}

export function getDefaultFeatures(): Feature[] {
  return [
    {
      id: 'shipping',
      icon: 'Truck',
      title: 'شحن مجاني',
      description: 'لجميع الطلبات فوق 500 ر.س في المملكة',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      enabled: true,
      order: 1,
      delay: 100
    },
    {
      id: 'warranty',
      icon: 'Award',
      title: 'ضمان ممتد',
      description: 'ضمان 30 سنة على الألواح، 10 سنوات على المحولات',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      enabled: true,
      order: 2,
      delay: 200
    }
  ];
}

// دالة لتحويل الإعدادات إلى هيكل مناسب للفوتر
export function getFooterConfig() {
  const sections = loadFooterSections();
  const generalSettings = loadFooterGeneralSettings();
  const socialLinks = loadSocialLinks();
  const contactInfo = loadContactInfo();
  const paymentMethods = loadPaymentMethods();
  const features = loadFeatures();

  // تصفية العناصر النشطة
  const activeSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
    .map(section => ({
      ...section,
      items: section.items
        .filter(item => item.enabled)
        .sort((a, b) => a.order - b.order)
    }));

  return {
    generalSettings,
    sections: activeSections,
    socialLinks: socialLinks.filter(link => link.enabled).sort((a, b) => a.order - b.order),
    contactInfo: contactInfo.filter(info => info.enabled).sort((a, b) => a.order - b.order),
    paymentMethods: paymentMethods.filter(method => method.enabled).sort((a, b) => a.order - b.order),
    features: features.filter(feature => feature.enabled).sort((a, b) => a.order - b.order)
  };
}

// دالة مساعدة للحصول على معلومات الأيقونة
export function getIconInfo(iconName: string, iconUrl?: string) {
  return {
    name: iconName,
    url: iconUrl,
    isExternal: !!iconUrl
  };
}

// دالة لتحضير قائمة الأيقونات المتاحة (للوحة التحكم)
export function getAvailableIcons(): string[] {
  return [
    'Sun', 'Mail', 'Phone', 'MapPin', 'Facebook', 'Twitter', 'Instagram', 
    'Youtube', 'Shield', 'Truck', 'CreditCard', 'Headphones', 'Battery', 
    'Zap', 'PanelTop', 'Settings', 'Package', 'Globe', 'Award', 'Clock', 
    'CheckCircle', 'CardIcon', 'Smartphone', 'Lock', 'ChevronUp', 'Heart', 
    'MessageSquare', 'Building', 'Users', 'FileText', 'ArrowLeft', 
    'SmartphoneIcon', 'ShoppingBag', 'Cpu', 'LifeBuoy', 'ExternalLink',
    'Edit', 'Trash2', 'Plus', 'Save', 'Upload', 'Eye', 'EyeOff', 'Monitor',
    'LinkIcon', 'Image', 'Download', 'RefreshCw', 'Grid3X3', 'Palette',
    'Layers', 'ArrowUp'
  ];
}

// دالة للتحقق من صحة رابط الأيقونة الخارجي
export function validateIconUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string') {
      resolve(false);
      return;
    }
    
    // التحقق من تنسيق الرابط
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|ico))(?:\?.*)?$/i;
    if (!urlPattern.test(url)) {
      resolve(false);
      return;
    }
    
    // محاولة تحميل الصورة
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// دالة لاستخراج اسم الأيقونة من الرابط
export function extractIconNameFromUrl(url: string): string {
  if (!url) return 'CustomIcon';
  
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'icon';
    const nameWithoutExt = filename.split('.')[0];
    
    // تحويل إلى شكل مناسب
    return nameWithoutExt
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  } catch {
    return 'CustomIcon';
  }
}