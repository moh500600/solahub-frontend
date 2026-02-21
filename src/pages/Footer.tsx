import { Link, useLocation } from "wouter";
import {
  Sun,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  Battery,
  Zap,
  PanelTop,
  Settings,
  Package,
  Globe,
  Award,
  Clock,
  CheckCircle,
  CreditCard as CardIcon,
  Smartphone,
  Lock,
  ChevronUp,
  Heart,
  MessageSquare,
  Building,
  Users,
  FileText,
  ArrowLeft,
  Smartphone as SmartphoneIcon,
  ShoppingBag,
  Cpu,
  LifeBuoy
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterLink {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  external?: boolean;
}

interface SocialLink {
  icon: React.ComponentType<any>;
  href: string;
  label: string;
  color: string;
  bgColor: string;
}

interface ContactInfo {
  icon: React.ComponentType<any>;
  text: string;
  subtext: string;
  href: string | null;
  external?: boolean;
}

interface PaymentMethod {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  delay: number;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const newsletterRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const paymentMethods: PaymentMethod[] = [
    { 
      name: "Visa", 
      icon: CreditCard, 
      color: "text-[#1A1F71]", 
      bgColor: "bg-blue-50/80", 
      borderColor: "border-blue-100/50" 
    },
    { 
      name: "MasterCard", 
      icon: CardIcon, 
      color: "text-[#EB001B]", 
      bgColor: "bg-red-50/80", 
      borderColor: "border-red-100/50" 
    },
    { 
      name: "Mada", 
      icon: Smartphone, 
      color: "text-[#00A64F]", 
      bgColor: "bg-green-50/80", 
      borderColor: "border-green-100/50" 
    },
    { 
      name: "Apple Pay", 
      icon: SmartphoneIcon, 
      color: "text-[#000000]", 
      bgColor: "bg-gray-50/80", 
      borderColor: "border-gray-100/50" 
    },
    { 
      name: "PayPal", 
      icon: Globe, 
      color: "text-[#003087]", 
      bgColor: "bg-blue-50/80", 
      borderColor: "border-blue-100/50" 
    },
  ];

  const socialLinks: SocialLink[] = [
    { 
      icon: Facebook, 
      href: "https://facebook.com/solarstore", 
      label: "Facebook",
      color: "text-white",
      bgColor: "bg-[#1877F2] hover:bg-[#166FE5]"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/solarstore", 
      label: "Twitter",
      color: "text-white",
      bgColor: "bg-[#1DA1F2] hover:bg-[#1A91DA]"
    },
    { 
      icon: Instagram, 
      href: "https://instagram.com/solarstore", 
      label: "Instagram",
      color: "text-white",
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90"
    },
    { 
      icon: Youtube, 
      href: "https://youtube.com/solarstore", 
      label: "YouTube",
      color: "text-white",
      bgColor: "bg-[#FF0000] hover:bg-[#E60000]"
    },
    { 
      icon: MessageSquare, 
      href: "https://wa.me/966500000000", 
      label: "WhatsApp",
      color: "text-white",
      bgColor: "bg-[#25D366] hover:bg-[#20BD5A]"
    },
  ];

  const features: Feature[] = [
    {
      icon: Truck,
      title: "شحن مجاني",
      description: "لجميع الطلبات فوق 500 ر.س في المملكة",
      delay: 100
    },
    {
      icon: Award,
      title: "ضمان ممتد",
      description: "ضمان 30 سنة على الألواح، 10 سنوات على المحولات",
      delay: 200
    },
    {
      icon: Shield,
      title: "جودة معتمدة",
      description: "شهادات TÜV, IEC, UL العالمية",
      delay: 300
    },
    {
      icon: Headphones,
      title: "دعم متكامل",
      description: "دعم فني 24/7 مع متابعة عن بعد",
      delay: 400
    }
  ];

  const productLinks: FooterLink[] = [
    { 
      name: "الألواح الشمسية", 
      href: "/products/solar-panels", 
      icon: PanelTop,
      description: "ألواح مونو وبولي كريستال" 
    },
    { 
      name: "أنظمة التخزين", 
      href: "/products/batteries", 
      icon: Battery,
      description: "بطاريات ليثيوم وجيل" 
    },
    { 
      name: "المحولات الشمسية", 
      href: "/products/inverters", 
      icon: Cpu,
      description: "محولات مركزية ومركبة" 
    },
    { 
      name: "أنظمة المراقبة", 
      href: "/products/monitoring", 
      icon: Settings,
      description: "أنظمة ذكية للمراقبة" 
    },
    { 
      name: "الحلول المتكاملة", 
      href: "/products/systems", 
      icon: Zap,
      description: "حلول سكنية وتجارية" 
    },
  ];

  const companyLinks: FooterLink[] = [
    { name: "رؤيتنا ورسالتنا", href: "/about/vision", icon: Sun },
    { name: "فريق الخبراء", href: "/about/team", icon: Users },
    { name: "المشاريع المنفذة", href: "/projects", icon: Building },
    { name: "الشهادات والجوائز", href: "/certificates", icon: Award },
    { name: "الشركاء الاستراتيجيون", href: "/partners", icon: Globe },
  ];

  const supportLinks: FooterLink[] = [
    { name: "الأسئلة الشائعة", href: "/support/faq", icon: LifeBuoy },
    { name: "الدليل التقني", href: "/support/guides", icon: FileText },
    { name: "الشحن والتوصيل", href: "/support/shipping", icon: Truck },
    { name: "سياسة الإرجاع", href: "/support/returns", icon: Clock },
    { name: "طلب دعم فني", href: "/support/technical", icon: Headphones },
  ];

  const legalLinks: FooterLink[] = [
    { name: "الشروط والأحكام", href: "/legal/terms", icon: FileText },
    { name: "سياسة الخصوصية", href: "/legal/privacy", icon: Lock },
    { name: "سياسة الكوكيز", href: "/legal/cookies", icon: Shield },
    { name: "إخلاء المسؤولية", href: "/legal/disclaimer", icon: Building },
  ];

  const contactInfo: ContactInfo[] = [
    { 
      icon: Phone, 
      text: "+966 11 000 0000", 
      subtext: "الخط المباشر",
      href: "tel:+966110000000"
    },
    { 
      icon: Mail, 
      text: "info@solarstore.sa", 
      subtext: "البريد الرسمي",
      href: "mailto:info@solarstore.sa"
    },
    { 
      icon: Clock, 
      text: "8:00 ص - 8:00 م", 
      subtext: "من السبت إلى الخميس",
      href: null
    },
    { 
      icon: MapPin, 
      text: "الرياض - حي العليا", 
      subtext: "المقر الرئيسي",
      href: "https://goo.gl/maps/example",
      external: true
    },
  ];

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscribed(true);
      setEmail("");
      
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
      scrollToTop();
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative">
        {/* Features Section */}
        <section className="py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/15 dark:to-primary/10 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                    onMouseEnter={() => setIsHovering(`feature-${index}`)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                        isHovering === `feature-${index}` 
                          ? 'bg-primary/20' 
                          : 'bg-primary/10'
                      }`}>
                        <Icon className={`w-6 h-6 transition-colors duration-300 ${
                          isHovering === `feature-${index}` 
                            ? 'text-primary' 
                            : 'text-primary/80'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Footer */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-12 mb-16">
              {/* Brand & Contact Section */}
              <div className="xl:col-span-2 space-y-8">
                {/* Brand */}
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center shadow-lg">
                        <Sun className="w-8 h-8 text-primary dark:text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
                        متجر الطاقة الشمسية
                      </h2>
                      <p className="text-primary dark:text-primary font-semibold text-lg mb-1">
                        شركاؤك نحو مستقبل طاقة مستدام
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        الشركة الرائدة في حلول الطاقة المتجددة بالمملكة العربية السعودية
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-base max-w-2xl">
                    نقدم حلول طاقة شمسية متكاملة بجودة عالمية، مدعومة بفريق من الخبراء المعتمدين دولياً. 
                    نضمن لكم أنظمة مستدامة وفعالة مع خدمة شاملة تشمل الدراسة، التصميم، التركيب، والصيانة.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    معلومات الاتصال
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="group"
                        >
                          <button
                            onClick={() => info.href && handleNavigation(info.href, info.external)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                              info.href 
                                ? 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer' 
                                : 'bg-gray-50/50 dark:bg-gray-900/50'
                            } border border-gray-200 dark:border-gray-800`}
                            disabled={!info.href}
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                              info.href 
                                ? 'bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20' 
                                : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                info.href 
                                  ? 'text-primary dark:text-primary group-hover:text-primary' 
                                  : 'text-gray-400 dark:text-gray-500'
                              }`} />
                            </div>
                            <div className="flex-1 text-right">
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {info.text}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {info.subtext}
                              </p>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    تابعنا على وسائل التواصل
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg ${social.bgColor} ${social.color}`}
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Links Grid */}
              <div className="xl:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Products */}
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white">منتجاتنا</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">حلول الطاقة المتكاملة</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {productLinks.map((link, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ x: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <button
                            onClick={() => handleNavigation(link.href)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 group text-right"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <ArrowLeft className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
                              </div>
                              <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors text-sm">
                                {link.name}
                              </span>
                            </div>
                            {link.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                                {link.description}
                              </span>
                            )}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Company & Support */}
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 flex items-center justify-center">
                        <Building className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white">الشركة</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">تعرف علينا أكثر</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-8">
                      {companyLinks.map((link, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleNavigation(link.href)}
                            className="w-full text-right p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 group"
                          >
                            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors flex items-center justify-end gap-2 text-sm">
                              {link.name}
                              <link.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800 mt-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white">الدعم</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">مساعدة واستفسارات</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {supportLinks.map((link, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleNavigation(link.href)}
                            className="w-full text-right p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 group"
                          >
                            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors flex items-center justify-end gap-2 text-sm">
                              {link.name}
                              <link.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                            اشترك في نشرتنا
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            كن أول من يعرف العروض
                          </p>
                        </div>
                      </div>
                      
                      <form 
                        ref={newsletterRef}
                        onSubmit={handleNewsletter} 
                        className="space-y-4"
                      >
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="بريدك الإلكتروني"
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm placeholder-gray-500 dark:placeholder-gray-400"
                            required
                          />
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {subscribed ? (
                            <motion.div
                              key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl"
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                <div className="text-right">
                                  <p className="font-semibold text-green-700 dark:text-green-300 text-sm">
                                    تم الاشتراك بنجاح!
                                  </p>
                                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                    شكراً لك، سنرسل إليك آخر العروض
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="submit"
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
                            >
                              اشتراك الآن
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </motion.button>
                          )}
                        </AnimatePresence>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                          باشتراكك، فإنك توافق على{" "}
                          <button
                            type="button"
                            onClick={() => handleNavigation("/legal/privacy")}
                            className="text-primary hover:underline font-medium"
                          >
                            سياسة الخصوصية
                          </button>
                          {" "}وسنرسل إليك عروضنا الحصرية
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Download Section */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center lg:text-right">
                    طرق الدفع الآمنة
                  </h5>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {paymentMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          className={`px-4 py-3 rounded-xl border ${method.borderColor} ${method.bgColor} flex items-center justify-center gap-3 min-w-[110px]`}
                        >
                          <Icon className={`w-5 h-5 ${method.color}`} />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {method.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Download Apps */}
                <div className="text-center lg:text-right">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    حمل تطبيقنا
                  </h5>
                  <div className="flex gap-3">
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-3 text-sm font-medium min-w-[140px] shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.85 3.51 7.94 9.08 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.03-.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      App Store
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-sm font-medium min-w-[140px] shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13 8.5c.53.35.84.95.84 1.59 0 .64-.31 1.24-.84 1.59l-13 8.5c-.5.34-1.16.27-1.59-.16C3.11 21.46 3 21.01 3 20.5z"/>
                      </svg>
                      Google Play
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-10 mt-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Copyright */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      © {new Date().getFullYear()} SolarStore. جميع الحقوق محفوظة.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      شركة مسجلة بوزارة التجارة السعودية - سجل تجاري: 1010666999
                    </p>
                  </div>
                </div>
                
                {/* Legal Links */}
                <div className="flex items-center flex-wrap justify-center gap-6">
                  {legalLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(link.href)}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 hover:gap-3"
                    >
                      {link.name}
                      <link.icon className="w-3 h-3" />
                    </button>
                  ))}
                </div>
                
                {/* Made with Love */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                    <Heart className="w-4 h-4 text-red-500 dark:text-red-400 animate-pulse" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">صنع في</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg"
                      alt="علم اليمن"
                      className="w-5 h-5 rounded-sm shadow-sm"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">اليمن</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20"
            aria-label="العودة إلى الأعلى"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}