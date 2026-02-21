"use client";

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Sun,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  PanelTop,
  Package,
  Home,
  Info,
  Phone,
  Truck,
  MessageSquare,
  ShoppingBag,
  Briefcase,
  Sparkles,
  TrendingUp,
  Cpu,
  Battery,
  Wrench,
  Users,
  Bell,
  Headphones,
  ShieldCheck,
  MessageCircle,
  Settings as SettingsIcon,
  ThumbsUp,
  LifeBuoy,
  Building,
  Users as UsersIcon,
  Languages,
  Globe as GlobeIcon,
  Car,
  BatteryFull,
  Gauge,
  Zap as ChargingIcon,
  AlertCircle,
  HelpCircle,
  Star,
  Clock,
  Shield,
  CheckCircle,
  FolderKanban,
  FileText,
  Award,
  MapPin,
  Mail,
  PhoneCall,
  MessageCircleMore,
  Lightbulb,
  TrendingUp as TrendingUpIcon,
  Calculator,
  Download,
  Video,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  File,
  Folder,
  Settings
} from "lucide-react";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { localCart } from "@/lib/local-cart";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import {
  getHeaderConfig,
  isPageVisibleInHeader,
  isPageVisibleInMobile,
  HeaderNavigationSettings,
  PageVisibilitySettings,
  HeaderGeneralSettings,
  loadGeneralSettings
} from "@/lib/header-settings";

// تعريف الأيقونات الديناميكية
const iconComponents: Record<string, any> = {
  Sun, ShoppingCart, Heart, User, Menu, X, ChevronDown, Zap, PanelTop, Package,
  Home, Info, Phone, Truck, MessageSquare, ShoppingBag, Briefcase, Sparkles,
  TrendingUp, Cpu, Battery, Wrench, Users, Bell, Headphones, ShieldCheck,
  MessageCircle, SettingsIcon, ThumbsUp, LifeBuoy, Building, UsersIcon,
  Languages, GlobeIcon, Car, BatteryFull, Gauge, ChargingIcon, AlertCircle,
  HelpCircle, Star, Clock, Shield, CheckCircle, FolderKanban, FileText, Award,
  MapPin, Mail, PhoneCall, MessageCircleMore, Lightbulb, TrendingUpIcon,
  Calculator, Download, Video, BookOpen, Calendar, ChevronLeft, ChevronRight,
  Search, File, Folder, Settings
};

// تعريف HandshakeIcon في البداية
const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);
iconComponents.HandshakeIcon = HandshakeIcon;

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  description?: string;
  badge?: string;
  features?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

interface QuickLink {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  badge?: string;
  count?: number;
}

interface LanguageOption {
  code: 'ar' | 'en' | 'zh';
  name: string;
  flag: string;
  dir: 'rtl' | 'ltr';
}

const ProfessionalNavItem = memo(({ item, onClick, variant = "default" }: { 
  item: NavItem; 
  onClick: () => void;
  variant?: "default" | "compact";
}) => {
  const Icon = item.icon;
  
  const getColorClasses = (color: string) => {
    if (color.includes('amber')) return "from-amber-500/10 to-amber-600/5";
    if (color.includes('purple')) return "from-purple-500/10 to-purple-600/5";
    if (color.includes('green')) return "from-green-500/10 to-green-600/5";
    if (color.includes('primary')) return "from-primary/10 to-primary/5";
    if (color.includes('blue')) return "from-blue-500/10 to-blue-600/5";
    if (color.includes('red')) return "from-red-500/10 to-red-600/5";
    if (color.includes('rose')) return "from-rose-500/10 to-rose-600/5";
    if (color.includes('emerald')) return "from-emerald-500/10 to-emerald-600/5";
    if (color.includes('pink')) return "from-pink-500/10 to-pink-600/5";
    if (color.includes('indigo')) return "from-indigo-500/10 to-indigo-600/5";
    if (color.includes('gray')) return "from-gray-500/10 to-gray-600/5";
    return "from-primary/10 to-primary/5";
  };

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm ${
        variant === "default" 
          ? "bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/2 border border-gray-100 dark:border-gray-800"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <div className={`${getColorClasses(item.color)} ${
          variant === "default" ? "w-10 h-10" : "w-8 h-8"
        } rounded-lg flex items-center justify-center bg-gradient-to-br`}>
          <Icon className={`${item.color} ${
            variant === "default" ? "w-4 h-4" : "w-3 h-3"
          }`} />
        </div>
        {item.isNew && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">جديد</span>
          </div>
        )}
        {item.isPopular && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-primary/90 rounded-full flex items-center justify-center">
            <Star className="w-1.5 h-1.5 text-white" fill="white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white text-xs group-hover:text-primary transition-colors">
            {item.label}
          </span>
          {item.badge && !item.isNew && (
            <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20 whitespace-nowrap">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {item.description}
        </p>
        
        {item.features && variant === "default" && (
          <div className="flex items-center gap-1 mt-1.5">
            {item.features.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx} 
                className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {feature}
              </span>
            ))}
            {item.features.length > 3 && (
              <span className="text-[10px] text-primary px-1.5 py-0.5">+{item.features.length - 3}</span>
            )}
          </div>
        )}
      </div>
      
      <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 transform -rotate-90" />
    </Link>
  );
});

ProfessionalNavItem.displayName = 'ProfessionalNavItem';

const ActionButton = memo(({ 
  href, 
  icon: Icon, 
  count = 0, 
  label,
  color 
}: { 
  href: string; 
  icon: React.ComponentType<any>; 
  count?: number; 
  label?: string;
  color?: string;
}) => (
  <Link href={href} className="relative group">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
      hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5
      hover:scale-105 active:scale-95`}>
      <Icon className={`w-3.5 h-3.5 transition-colors duration-200
        ${color || "text-gray-600 dark:text-gray-400"}
        group-hover:text-primary`} />
    </div>
    {count > 0 && (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-gradient-to-r from-primary to-primary/90 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow"
      >
        {count > 9 ? '9+' : count}
      </motion.span>
    )}
    {label && (
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded whitespace-nowrap">
          {label}
        </span>
      </div>
    )}
  </Link>
));

ActionButton.displayName = 'ActionButton';

const LanguageSelector = memo(({ 
  language, 
  onLanguageChange 
}: { 
  language: 'ar' | 'en' | 'zh';
  onLanguageChange: (lang: 'ar' | 'en' | 'zh') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages: LanguageOption[] = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageSelect = (langCode: 'ar' | 'en' | 'zh') => {
    onLanguageChange(langCode);
    setIsOpen(false);
    console.log('Language changed to:', langCode);
  };

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={buttonRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
          bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900
          border border-gray-200 dark:border-gray-700 hover:border-primary/30
          hover:shadow-sm hover:shadow-primary/5 group"
      >
        <div className="flex items-center gap-2">
          <Languages className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
            {currentLang.code.toUpperCase()}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              <div className="px-2 py-1.5 mb-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  اختر اللغة / Select Language
                </span>
              </div>
              
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                    language === lang.code
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}

              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="px-2 py-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    قريباً: تغيير اللغة الفعلي
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default function ProfessionalHeader() {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(3);
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [language, setLanguage] = useState<'ar' | 'en' | 'zh'>('ar');
  const [activeNav, setActiveNav] = useState<string | null>(null);
  
  // إعدادات الهيدر الديناميكية
  const [headerConfig, setHeaderConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const dropdownTimer = useRef<NodeJS.Timeout>();

  const { data: userCartItems } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: userFavorites } = trpc.favorites.count.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // تحميل إعدادات الهيدر
  useEffect(() => {
    const loadConfig = () => {
      const config = getHeaderConfig();
      setHeaderConfig(config);
      setIsLoading(false);
    };

    loadConfig();
    
    // الاستماع لتحديثات الإعدادات
    const handleStorageChange = () => {
      loadConfig();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateCartCount = useCallback(() => {
    if (isAuthenticated) {
      const count = userCartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(count);
    } else {
      const count = localCart.getItemCount();
      setCartCount(count);
    }
  }, [isAuthenticated, userCartItems]);

  useEffect(() => {
    updateCartCount();
    
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, [updateCartCount]);

  useEffect(() => {
    if (isAuthenticated && userFavorites) {
      setFavoritesCount(userFavorites);
    }
  }, [isAuthenticated, userFavorites]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 5);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && !ref.contains(event.target as Node)) {
          setIsDropdownOpen(null);
          setActiveNav(null);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تحضير بيانات التنقل من الإعدادات
  const getNavigationItems = () => {
    if (!headerConfig || !headerConfig.navigation) return [];
    
    return headerConfig.navigation.map((item: HeaderNavigationSettings) => {
      const Icon = iconComponents[item.icon] || ShoppingBag;
      
      // تحضير قوائم الصفحات الفرعية
      const subItems = headerConfig.pageVisibility
        ?.filter((page: PageVisibilitySettings) => 
          page.pageCategory === item.category && 
          page.enabled && 
          page.visibleInHeader
        )
        .map((page: PageVisibilitySettings) => ({
          href: page.pagePath,
          label: page.pageName,
          icon: iconComponents[page.iconName || 'File'] || File,
          color: item.color || 'text-primary',
          description: `انتقال إلى ${page.pageName}`,
          badge: page.badgeText,
          showBadge: page.showBadge,
          showIcon: page.showIcon
        })) || [];

      return {
        type: item.category,
        label: item.label,
        icon: Icon,
        items: subItems,
        title: item.label,
        description: item.description || `تصفح ${item.label}`,
        badge: item.badge,
        isNew: item.isNew,
        isPopular: item.isPopular,
        color: item.color,
        href: item.href,
        features: item.features,
        enabled: item.enabled,
        showInDesktop: item.showInDesktop,
        showInMobile: item.showInMobile
      };
    }).filter((item: any) => item.enabled);
  };

  // تحضير الروابط السريعة
  const getQuickLinks = () => {
    if (!headerConfig || !headerConfig.quickLinks) return [];
    
    return headerConfig.quickLinks.map((page: PageVisibilitySettings) => {
      const Icon = iconComponents[page.iconName || 'File'] || File;
      return {
        href: page.pagePath,
        label: page.pageName,
        icon: Icon,
        color: getCategoryColor(page.pageCategory),
        badge: page.badgeText,
        showBadge: page.showBadge
      };
    });
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      'products': 'text-amber-600',
      'electric-cars': 'text-green-600',
      'services': 'text-blue-600',
      'projects': 'text-emerald-600',
      'support': 'text-purple-600',
      'about': 'text-primary'
    };
    return colorMap[category] || 'text-primary';
  };

  const navigationItems = getNavigationItems();
  const quickLinks = getQuickLinks();

  const toggleDropdown = useCallback((dropdown: string) => {
    setIsDropdownOpen(prev => prev === dropdown ? null : dropdown);
    setActiveNav(prev => prev === dropdown ? null : dropdown);
  }, []);

  const handleDropdownMouseEnter = useCallback((dropdown: string) => {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }
    setIsDropdownOpen(dropdown);
    setActiveNav(dropdown);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(null);
      setActiveNav(null);
    }, 150);
  }, []);

  // الدالة المعدلة لتحويل العرض العمودي بدلاً من الأفقي
  const renderProfessionalDropdown = useCallback((type: string, items: any[], title: string, description: string) => (
    <LazyMotion features={domAnimation}>
      <motion.div
        ref={el => dropdownRefs.current[type] = el}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden"
        onMouseEnter={() => handleDropdownMouseEnter(type)}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      جودة مضمونة
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Shield className="w-3 h-3 text-primary" />
                      ضمان 30 سنة
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/${type}`}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0"
              >
                <span>عرض الكل</span>
                <ChevronDown className="w-3 h-3 transform rotate-90" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item: any, index: number) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group"
                >
                  <ProfessionalNavItem 
                    item={item} 
                    onClick={() => {
                      setIsDropdownOpen(null);
                      setActiveNav(null);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">لا توجد صفحات متاحة حالياً</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href={`/${type}`}>تصفح القسم</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </LazyMotion>
  ), [handleDropdownMouseEnter, handleDropdownMouseLeave]);

  const renderUserSection = useCallback(() => {
    const generalSettings = headerConfig?.generalSettings;
    if (!generalSettings?.showUserProfile) return null;

    if (isAuthenticated) {
      return (
        <Link href="/profile" className="hidden lg:flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900 shadow"></div>
          </div>
          <div className="hidden xl:block text-right">
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-[90px]">
              {user?.name?.split(' ')[0] || "حسابي"}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full">
                نقاط: 1,250
              </span>
            </div>
          </div>
        </Link>
      );
    }
    
    return (
      <div className="hidden lg:flex items-center gap-1">
        <Link href="/login">
          <Button variant="outline" className="h-8 px-3 text-xs rounded-lg border-gray-300 dark:border-gray-700 hover:border-primary transition-all duration-200">
            دخول
          </Button>
        </Link>
        <Link href="/register">
          <Button className="h-8 px-3 text-xs rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow hover:shadow-md hover:shadow-primary/20 transition-all duration-200">
            حساب جديد
          </Button>
        </Link>
      </div>
    );
  }, [isAuthenticated, user, headerConfig]);

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="h-14 flex items-center justify-center">
            <p className="text-sm text-gray-500">جاري تحميل الهيدر...</p>
          </div>
        </div>
      </header>
    );
  }

  const generalSettings = headerConfig?.generalSettings || loadGeneralSettings();

  return (
    <LazyMotion features={domAnimation}>
      <div ref={headerRef} className="relative">
        {/* Announcement Bar */}
        {generalSettings.showAnnouncementBar && (
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs">
            <div className="container mx-auto px-4 py-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Truck className="w-2.5 h-2.5 text-green-400" />
                    </div>
                    <span className="truncate">{generalSettings.announcementText}</span>
                  </div>
                </div>
                
                {/* Language Indicator in Announcement Bar */}
                {generalSettings.showLanguageSelector && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Languages className="w-3 h-3 opacity-80" />
                    <span className="text-[10px] font-medium opacity-90">
                      {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : '中文'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Header */}
        <header 
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-0 border-b border-gray-200 dark:border-gray-800"
              : "bg-white dark:bg-gray-900 py-1"
          } ${generalSettings.stickyHeader ? 'sticky' : ''}`}
          style={generalSettings.headerStyle === 'minimal' ? { borderBottom: 'none' } : {}}
        >
          <div className="container mx-auto px-4">
            <div className="h-14 flex items-center justify-between gap-4">
              
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2 group">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center shadow ring-2 ring-primary/20">
                      <Sun className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                      <Zap className="w-2 h-2 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="hidden md:block">
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-base font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                        طاقة المستقبل
                      </h1>
                      <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20">
                        Pro
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      حلول الطاقة المستدامة
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center gap-0.5 mx-auto">
                {navigationItems
                  .filter((item: any) => item.showInDesktop)
                  .map((section: any) => {
                    const Icon = section.icon;
                    const isActive = activeNav === section.type;
                    
                    return (
                      <div key={section.type} className="relative">
                        <button
                          onClick={() => toggleDropdown(section.type)}
                          onMouseEnter={() => handleDropdownMouseEnter(section.type)}
                          onMouseLeave={handleDropdownMouseLeave}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                            isActive 
                              ? "text-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm shadow-primary/5" 
                              : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/2"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isActive && "scale-110"
                          }`} />
                          <span>{section.label}</span>
                          {section.items.length > 0 && (
                            <ChevronDown className={`w-3 h-3 transition-all duration-200 ${
                              isActive ? "rotate-180 text-primary" : "text-gray-400"
                            }`} />
                          )}
                          {isActive && (
                            <motion.div 
                              layoutId="activeNav"
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/90 rounded-t-full"
                            />
                          )}
                        </button>
                        
                        {section.items.length > 0 && (
                          <AnimatePresence>
                            {isDropdownOpen === section.type && renderProfessionalDropdown(
                              section.type,
                              section.items,
                              section.title,
                              section.description
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
              </nav>

              {/* Search Bar */}
              {generalSettings.showSearchBar && (
                <div className="hidden lg:block flex-1 max-w-xs">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      className="w-full pr-10 pl-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                {generalSettings.showLanguageSelector && (
                  <div className="hidden lg:block">
                    <LanguageSelector 
                      language={language} 
                      onLanguageChange={setLanguage} 
                    />
                  </div>
                )}

                {/* User Section */}
                {renderUserSection()}

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5">
                  {generalSettings.showMessages && (
                    <ActionButton 
                      href="/messages" 
                      icon={MessageCircle} 
                      count={unreadMessages}
                      label="الرسائل"
                      color="text-blue-500"
                    />
                  )}
                  {generalSettings.showNotifications && (
                    <ActionButton 
                      href="/notifications" 
                      icon={Bell} 
                      count={unreadNotifications}
                      label="الإشعارات"
                      color="text-amber-500"
                    />
                  )}
                  {generalSettings.showFavorites && (
                    <ActionButton 
                      href="/favorites" 
                      icon={Heart} 
                      count={favoritesCount}
                      label="المفضلة"
                      color="text-rose-500"
                    />
                  )}
                  {generalSettings.showCart && (
                    <ActionButton 
                      href="/cart" 
                      icon={ShoppingCart} 
                      count={cartCount}
                      label="السلة"
                      color="text-emerald-500"
                    />
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                {generalSettings.enableMobileMenu && (
                  <button
                    className="lg:hidden w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="القائمة الرئيسية"
                  >
                    <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {generalSettings.enableMobileMenu && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                />
                
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto shadow-xl"
                >
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-b from-primary/10 to-transparent border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center shadow">
                            <Sun className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h2 className="font-bold text-sm text-gray-900 dark:text-white">طاقة المستقبل</h2>
                            <p className="text-xs text-gray-600 dark:text-gray-400">حلول الطاقة المستدامة</p>
                          </div>
                        </div>
                        <button
                          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="إغلاق القائمة"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Language Selector in Mobile Menu */}
                    {generalSettings.showLanguageSelector && (
                      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Languages className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">تغيير اللغة</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setLanguage('ar')}
                              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                                language === 'ar' 
                                  ? "bg-gradient-to-r from-primary to-primary/90 text-white" 
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              🇸🇦
                            </button>
                            <button
                              onClick={() => setLanguage('en')}
                              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                                language === 'en' 
                                  ? "bg-gradient-to-r from-primary to-primary/90 text-white" 
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              🇺🇸
                            </button>
                            <button
                              onClick={() => setLanguage('zh')}
                              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                                language === 'zh' 
                                  ? "bg-gradient-to-r from-primary to-primary/90 text-white" 
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              🇨🇳
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {language === 'ar' && 'سيتم تفعيل تغيير اللغة قريباً'}
                          {language === 'en' && 'Full language switching coming soon'}
                          {language === 'zh' && '即将推出完整的语言切换功能'}
                        </p>
                      </div>
                    )}

                    {/* User Section */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{user?.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20">
                                نقاط: 1,250
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                              <Button variant="outline" className="w-full gap-1.5 h-9 rounded-lg text-xs">
                                <User className="w-3.5 h-3.5" />
                                دخول
                              </Button>
                            </Link>
                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                              <Button className="w-full gap-1.5 h-9 rounded-lg text-xs bg-gradient-to-r from-primary to-primary/90">
                                حساب جديد
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {generalSettings.showQuickLinks && quickLinks.length > 0 && (
                      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-4 gap-2">
                          {quickLinks.map((link, i) => {
                            const Icon = link.icon;
                            const actualCount = link.href === "/cart" ? cartCount : 
                                              link.href === "/favorites" ? favoritesCount : 0;
                            
                            return (
                              <Link
                                key={i}
                                href={link.href}
                                className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 hover:border-primary/30 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.color.replace('text', 'from')}/10 to-primary/5 flex items-center justify-center mb-1`}>
                                  <Icon className={`w-4 h-4 ${link.color}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-900 dark:text-white text-center">{link.label}</span>
                                {(actualCount > 0 || link.badge) && (
                                  <span className="mt-0.5 text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full">
                                    {actualCount > 0 ? `${actualCount}` : link.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {navigationItems
                        .filter((item: any) => item.showInMobile)
                        .map((section: any) => {
                          const Icon = section.icon;
                          return (
                            <div key={section.type}>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                  <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{section.label}</h3>
                              </div>
                              
                              {section.items.length > 0 ? (
                                <div className="space-y-1.5">
                                  {section.items.slice(0, 3).map((item: any) => {
                                    const ItemIcon = item.icon;
                                    return (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.color.replace('text', 'from')}/10 to-primary/5 flex items-center justify-center`}>
                                          <ItemIcon className={`w-3 h-3 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-medium text-xs text-gray-900 dark:text-white">{item.label}</span>
                                            {item.badge && (
                                              <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-600 rounded-full">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                  <Link
                                    href={section.href}
                                    className="block text-center p-1.5 text-xs text-primary hover:text-primary/80 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    عرض المزيد ←
                                  </Link>
                                </div>
                              ) : (
                                <Link
                                  href={section.href}
                                  className="block w-full p-2.5 rounded-lg bg-gradient-to-r from-primary/5 to-primary/2 text-primary font-medium text-xs text-center hover:from-primary/10 hover:to-primary/5 transition-all"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {section.label}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
      </div>
    </LazyMotion>
  );
}