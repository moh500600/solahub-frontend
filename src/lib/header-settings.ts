// src/lib/header-settings.ts

export const STORAGE_KEY_HEADER_SETTINGS = "header_navigation_settings";
export const STORAGE_KEY_PAGE_VISIBILITY = "page_visibility_settings";

export interface HeaderNavigationSettings {
  id: string;
  label: string;
  href: string;
  icon: string; // اسم الأيقونة
  category: 'products' | 'services' | 'projects' | 'support' | 'about' | 'electric-cars';
  enabled: boolean;
  order: number;
  showInDesktop: boolean;
  showInMobile: boolean;
  badge?: string;
  isNew?: boolean;
  isPopular?: boolean;
  color?: string;
  description?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PageVisibilitySettings {
  id: string;
  pageName: string;
  pagePath: string;
  pageCategory: string;
  visibleInHeader: boolean;
  visibleInMobileMenu: boolean;
  showInQuickLinks: boolean;
  order: number;
  enabled: boolean;
  showBadge: boolean;
  badgeText?: string;
  showIcon: boolean;
  iconName?: string;
  createdAt: string;
  updatedAt: string;
}

// إعدادات الهيدر العامة
export interface HeaderGeneralSettings {
  showAnnouncementBar: boolean;
  announcementText: string;
  showLanguageSelector: boolean;
  showCart: boolean;
  showFavorites: boolean;
  showNotifications: boolean;
  showMessages: boolean;
  showUserProfile: boolean;
  enableMobileMenu: boolean;
  headerStyle: 'default' | 'professional' | 'minimal';
  themeColor: string;
  stickyHeader: boolean;
  showSearchBar: boolean;
  showQuickLinks: boolean;
  maxQuickLinks: number;
}

// دالات التحميل
export function loadHeaderSettings(): HeaderNavigationSettings[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_HEADER_SETTINGS);
  return saved ? JSON.parse(saved) : [];
}

export function loadPageVisibility(): PageVisibilitySettings[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_PAGE_VISIBILITY);
  return saved ? JSON.parse(saved) : [];
}

export function loadGeneralSettings(): HeaderGeneralSettings {
  if (typeof window === 'undefined') return getDefaultGeneralSettings();
  const saved = localStorage.getItem('header_general_settings');
  return saved ? JSON.parse(saved) : getDefaultGeneralSettings();
}

// دالات الحفظ
export function saveHeaderSettings(settings: HeaderNavigationSettings[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_HEADER_SETTINGS, JSON.stringify(settings));
}

export function savePageVisibility(settings: PageVisibilitySettings[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_PAGE_VISIBILITY, JSON.stringify(settings));
}

export function saveGeneralSettings(settings: HeaderGeneralSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('header_general_settings', JSON.stringify(settings));
}

// الإعدادات الافتراضية
export function getDefaultHeaderSettings(): HeaderNavigationSettings[] {
  return [
    {
      id: 'products',
      label: 'المنتجات',
      href: '/products',
      icon: 'ShoppingBag',
      category: 'products',
      enabled: true,
      order: 1,
      showInDesktop: true,
      showInMobile: true,
      badge: 'الأفضل',
      isPopular: true,
      color: 'text-amber-600',
      description: 'ألواح شمسية، محولات، بطاريات',
      features: ['مونو كريستال', 'بولي كريستال', 'عالية الكفاءة'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'electric-cars',
      label: 'السيارات الكهربائية',
      href: '/electric-cars',
      icon: 'Car',
      category: 'electric-cars',
      enabled: true,
      order: 2,
      showInDesktop: true,
      showInMobile: true,
      badge: 'جديد',
      isNew: true,
      color: 'text-green-600',
      description: 'محطات شحن، بطاريات، محولات',
      features: ['شحن منزلي', 'شحن سريع', 'إدارة ذكية'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'services',
      label: 'الخدمات',
      href: '/services',
      icon: 'Wrench',
      category: 'services',
      enabled: true,
      order: 3,
      showInDesktop: true,
      showInMobile: true,
      badge: 'مضمون',
      color: 'text-blue-600',
      description: 'تركيب، صيانة، استشارات',
      features: ['تركيب', 'صيانة', 'ضمان 5 سنوات'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'projects',
      label: 'المشاريع',
      href: '/projects',
      icon: 'FolderKanban',
      category: 'projects',
      enabled: true,
      order: 4,
      showInDesktop: true,
      showInMobile: true,
      badge: '50+',
      isPopular: true,
      color: 'text-emerald-600',
      description: 'مشاريع منفذة بنجاح',
      features: ['منازل', 'فيلات', 'شقق'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'support',
      label: 'الدعم',
      href: '/support',
      icon: 'LifeBuoy',
      category: 'support',
      enabled: true,
      order: 5,
      showInDesktop: true,
      showInMobile: true,
      badge: '24/7',
      color: 'text-purple-600',
      description: 'دعم فني، ضمان، تدريب',
      features: ['دعم هاتفي', 'دعم عن بعد', 'زيارات'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'about',
      label: 'عنّا',
      href: '/about',
      icon: 'Info',
      category: 'about',
      enabled: true,
      order: 6,
      showInDesktop: true,
      showInMobile: true,
      badge: 'منذ 2010',
      color: 'text-primary',
      description: 'قصة نجاح ورؤية مستقبلية',
      features: ['التأسيس', 'الرؤية', 'الرسالة'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

export function getDefaultPageVisibility(): PageVisibilitySettings[] {
  const pages = [
    { name: 'الألواح الشمسية', path: '/solar-panels', category: 'products' },
    { name: 'المحولات الشمسية', path: '/inverters', category: 'products' },
    { name: 'أنظمة التخزين', path: '/batteries', category: 'products' },
    { name: 'ملحقات احترافية', path: '/accessories', category: 'products' },
    { name: 'أنظمة متكاملة', path: '/systems', category: 'products' },
    { name: 'محطات الشحن', path: '/electric-cars/charging-stations', category: 'electric-cars' },
    { name: 'المحولات الكهربائية', path: '/electric-cars/attempts', category: 'electric-cars' },
    { name: 'بطاريات السيارات', path: '/electric-cars/batteries', category: 'electric-cars' },
    { name: 'التركيب الاحترافي', path: '/services/installation', category: 'services' },
    { name: 'استشارات الطاقة', path: '/services/consultation', category: 'services' },
    { name: 'خدمات الضمان', path: '/services/warranty', category: 'services' },
    { name: 'تدريب معتمد', path: '/services/training', category: 'services' },
    { name: 'حلول مخصصة', path: '/services/custom', category: 'services' },
    { name: 'مشاريع سكنية', path: '/projects/residential', category: 'projects' },
    { name: 'مشاريع تجارية', path: '/projects/commercial', category: 'projects' },
    { name: 'مشاريع صناعية', path: '/projects/industrial', category: 'projects' },
    { name: 'مشاريع زراعية', path: '/projects/agricultural', category: 'projects' },
    { name: 'مشاريع حكومية', path: '/projects/government', category: 'projects' },
    { name: 'الدعم الفني', path: '/support/technical', category: 'support' },
    { name: 'خدمات الضمان', path: '/support/warranty', category: 'support' },
    { name: 'تدريب ودورات', path: '/support/training', category: 'support' },
    { name: 'مصادر تعليمية', path: '/support/resources', category: 'support' },
    { name: 'حاسبات الطاقة', path: '/support/calculators', category: 'support' },
    { name: 'عن الشركة', path: '/about/company', category: 'about' },
    { name: 'رؤيتنا ورسالتنا', path: '/about/mission', category: 'about' },
    { name: 'فريق الخبراء', path: '/about/team', category: 'about' },
    { name: 'فروعنا', path: '/about/branches', category: 'about' },
    { name: 'الشهادات', path: '/about/certificates', category: 'about' }
  ];

  return pages.map((page, index) => ({
    id: `page-${index + 1}`,
    pageName: page.name,
    pagePath: page.path,
    pageCategory: page.category,
    visibleInHeader: true,
    visibleInMobileMenu: true,
    showInQuickLinks: index < 4,
    order: index + 1,
    enabled: true,
    showBadge: index < 5,
    badgeText: index < 3 ? 'جديد' : undefined,
    showIcon: true,
    iconName: getIconForPage(page.category),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
}

function getIconForPage(category: string): string {
  const iconMap: Record<string, string> = {
    'products': 'ShoppingBag',
    'electric-cars': 'Car',
    'services': 'Wrench',
    'projects': 'FolderKanban',
    'support': 'LifeBuoy',
    'about': 'Info'
  };
  return iconMap[category] || 'File';
}

export function getDefaultGeneralSettings(): HeaderGeneralSettings {
  return {
    showAnnouncementBar: true,
    announcementText: 'شحن مجاني للطلبات فوق 500 ر.س - ضمان 30 سنة',
    showLanguageSelector: true,
    showCart: true,
    showFavorites: true,
    showNotifications: true,
    showMessages: true,
    showUserProfile: true,
    enableMobileMenu: true,
    headerStyle: 'professional',
    themeColor: '#3b82f6',
    stickyHeader: true,
    showSearchBar: true,
    showQuickLinks: true,
    maxQuickLinks: 4
  };
}

// دالة لتحويل الإعدادات إلى هيكل مناسب للهيدر
export function getHeaderConfig() {
  const navSettings = loadHeaderSettings();
  const pageVisibility = loadPageVisibility();
  const generalSettings = loadGeneralSettings();

  // تصفية الروابط النشطة
  const activeNavItems = navSettings
    .filter(item => item.enabled)
    .sort((a, b) => a.order - b.order);

  // تحضير الروابط السريعة
  const quickLinks = pageVisibility
    .filter(page => page.showInQuickLinks && page.enabled)
    .sort((a, b) => a.order - b.order)
    .slice(0, generalSettings.maxQuickLinks);

  return {
    generalSettings,
    navigation: activeNavItems,
    quickLinks,
    pageVisibility
  };
}

// دالة لفحص إذا كانت الصفحة ظاهرة في الهيدر
export function isPageVisibleInHeader(pagePath: string): boolean {
  const pageVisibility = loadPageVisibility();
  const page = pageVisibility.find(p => p.pagePath === pagePath);
  return page ? page.visibleInHeader && page.enabled : true;
}

// دالة لفحص إذا كانت الصفحة ظاهرة في الموبايل
export function isPageVisibleInMobile(pagePath: string): boolean {
  const pageVisibility = loadPageVisibility();
  const page = pageVisibility.find(p => p.pagePath === pagePath);
  return page ? page.visibleInMobileMenu && page.enabled : true;
}