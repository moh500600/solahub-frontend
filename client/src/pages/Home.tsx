import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Sparkles,
  Battery,
  PanelTop,
  ChevronRight,
  Award,
  Truck,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
  Plus,
  ShoppingCart,
  Filter,
  RefreshCw,
  Settings,
  Zap,
  CheckCircle,
  ArrowLeft,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Sun,
  Zap as Lightning,
  Shield,
  Target
} from "lucide-react";

// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  // بيانات وهمية للشركاء المميزين
  const featuredCompanies = [
    {
      id: 1,
      name: "Jinko Solar",
      description: "رائدة في تصنيع الألواح الشمسية عالية الكفاءة",
      logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop",
      url: "/solar-panels?brand=jinko"
    },
    {
      id: 2,
      name: "Longi Solar",
      description: "متخصصة في تكنولوجيا الخلايا الأحادية",
      logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=100&fit=crop",
      url: "/solar-panels?brand=longi"
    },
    {
      id: 3,
      name: "Canadian Solar",
      description: "حلول شمسية متكاملة بجودة عالمية",
      logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=100&fit=crop",
      url: "/solar-panels?brand=canadian"
    },
    {
      id: 4,
      name: "Tesla Powerwall",
      description: "أنظمة تخزين طاقة متطورة",
      logo: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=200&h=100&fit=crop",
      url: "/batteries?brand=tesla"
    }
  ];

  // بيانات وهمية للمنتجات المميزة
  const solarProducts = [
    {
      id: 1,
      name: "لوح شمسي 400 واط مونو كريستال",
      price: 45000,
      originalPrice: 50000,
      rating: 4.8,
      reviewCount: 124,
      power: "400W",
      efficiency: "21.5%",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
      }],
      features: ["كفاءة عالية", "ضمان 25 سنة", "مقاوم للأتربة"],
      brand: "Jinko Solar",
      brandLogo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=50&fit=crop",
      inStock: true,
      category: "solar-panels"
    },
    {
      id: 2,
      name: "لوح شمسي 550 واط بي فليكس",
      price: 65000,
      originalPrice: 72000,
      rating: 4.9,
      reviewCount: 89,
      power: "550W",
      efficiency: "22.8%",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1598146286984-26d5a7d6d0b5?w=600&h=400&fit=crop"
      }],
      features: ["مرن", "مقاوم للماء", "خفة الوزن"],
      brand: "Longi Solar",
      brandLogo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=50&fit=crop",
      inStock: true,
      category: "solar-panels"
    },
    {
      id: 3,
      name: "لوح شمسي 600 واط Half-Cell",
      price: 85000,
      originalPrice: 95000,
      rating: 4.9,
      reviewCount: 45,
      power: "600W",
      efficiency: "23.2%",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1544468266-6a8948006d18?w=600&h=400&fit=crop"
      }],
      features: ["أداء في الظل", "كفاءة عالية", "تحمل درجات حرارة مرتفعة"],
      brand: "Canadian Solar",
      brandLogo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=50&fit=crop",
      inStock: false,
      category: "solar-panels"
    }
  ];

  // بيانات وهمية للبطاريات
  const batteryProducts = [
    {
      id: 7,
      name: "بطارية ليثيوم 5 كيلووات",
      price: 85000,
      originalPrice: 95000,
      rating: 4.7,
      reviewCount: 67,
      capacity: "5kW",
      voltage: "48V",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=600&h=400&fit=crop"
      }],
      features: ["سعة عالية", "دورة حياة طويلة", "شحن سريع"],
      brand: "Tesla",
      brandLogo: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=100&h=50&fit=crop",
      inStock: true,
      category: "batteries"
    },
    {
      id: 8,
      name: "بطارية ليثيوم 10 كيلووات",
      price: 150000,
      originalPrice: 170000,
      rating: 4.8,
      reviewCount: 34,
      capacity: "10kW",
      voltage: "48V",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=600&h=400&fit=crop"
      }],
      features: ["سعة كبيرة", "مثالي للمنازل", "ضمان 10 سنوات"],
      brand: "LG Energy",
      brandLogo: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=100&h=50&fit=crop",
      inStock: true,
      category: "batteries"
    },
    {
      id: 9,
      name: "بطارية ليثيوم 3 كيلووات",
      price: 45000,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 89,
      capacity: "3kW",
      voltage: "24V",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1622549037543-49cf7d34b3b8?w=600&h=400&fit=crop"
      }],
      features: ["مثالي للمشاريع الصغيرة", "سهل التركيب", "اقتصادي"],
      brand: "BYD",
      brandLogo: "https://images.unsplash.com/photo-1622549037543-49cf7d34b3b8?w=100&h=50&fit=crop",
      inStock: true,
      category: "batteries"
    }
  ];

  // بيانات وهمية للملحقات
  const accessories = [
    {
      id: 10,
      name: "عاكس كهربائي 3000 واط",
      price: 12000,
      originalPrice: 15000,
      rating: 4.6,
      reviewCount: 56,
      type: "عاكس",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=400&fit=crop"
      }],
      features: ["كفاءة 98%", "حماية من زيادة الحمل", "واجهة ذكية"],
      brand: "SMA",
      brandLogo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=50&fit=crop",
      inStock: true,
      category: "accessories"
    },
    {
      id: 11,
      name: "حامل ألواح شمسية معدني",
      price: 8000,
      originalPrice: 9500,
      rating: 4.4,
      reviewCount: 78,
      type: "حامل",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
      }],
      features: ["مقاوم للصدأ", "سهل التركيب", "متعدد الاستخدامات"],
      brand: "IronRidge",
      brandLogo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=50&fit=crop",
      inStock: true,
      category: "accessories"
    },
    {
      id: 12,
      name: "كابل توصيل 10 متر",
      price: 2500,
      originalPrice: 3000,
      rating: 4.3,
      reviewCount: 92,
      type: "كابلات",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop"
      }],
      features: ["مقاوم للحرارة", "عازل ممتاز", "ضمان 5 سنوات"],
      brand: "PV-Kabel",
      brandLogo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=50&fit=crop",
      inStock: true,
      category: "accessories"
    }
  ];

  // الفلاتر المتاحة
  const filters = {
    category: ["الكل", "ألواح شمسية", "بطاريات", "ملحقات"],
    brand: ["الكل", "Jinko Solar", "Longi Solar", "Canadian Solar", "Tesla", "LG Energy", "BYD"],
    priceRange: [
      { label: "الكل", min: 0, max: 1000000 },
      { label: "اقتصادي", min: 0, max: 50000 },
      { label: "متوسط", min: 50000, max: 100000 },
      { label: "متقدم", min: 100000, max: 1000000 }
    ],
    sortBy: [
      { label: "الأكثر مبيعاً", value: "popular" },
      { label: "الأعلى تقييماً", value: "rating" },
      { label: "الأقل سعراً", value: "price-low" },
      { label: "الأعلى سعراً", value: "price-high" },
      { label: "الأحدث", value: "newest" }
    ]
  };

  // صور الهيرو المتحركة - صور عالية الجودة احترافية
  const heroImages = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1920&q=80",
      title: "تقنيات الطاقة المتقدمة",
      subtitle: "حلول طاقة شمسية متكاملة للقرن الحادي والعشرين"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80",
      title: "تصاميم حديثة",
      subtitle: "أنظمة الطاقة الشمسية بتصميم عصري وأنيق"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1920&q=80",
      title: "كفاءة استثنائية",
      subtitle: "أعلى معدلات التحويل وأطول عمر تشغيلي"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1567177662142-20646cb1479a?auto=format&fit=crop&w=1920&q=80",
      title: "تصميم مستدام",
      subtitle: "حلول صديقة للبيئة لمستقبل أفضل"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80",
      title: "تكنولوجيا المستقبل",
      subtitle: "ابتكارات تقنية في مجال الطاقة النظيفة"
    }
  ];

  // شركات عالمية للهيرو
  const globalBrands = [
    { name: "Tesla", icon: "⚡" },
    { name: "SunPower", icon: "☀️" },
    { name: "LG", icon: "🔋" },
    { name: "Panasonic", icon: "🔌" },
    { name: "Samsung", icon: "📊" },
    { name: "SMA", icon: "🔄" }
  ];

  const [cart, setCart] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "الكل",
    brand: "الكل",
    priceRange: "الكل",
    sortBy: "popular"
  });
  const [converterType, setConverterType] = useState("single");
  const [accessoryType, setAccessoryType] = useState("all");
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [brandScrollPosition, setBrandScrollPosition] = useState(0);

  const allProducts = [...solarProducts, ...batteryProducts, ...accessories];

  // التحكم في الصور المتحركة
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
        setProgress(0);
      }, 6000); // تغيير الصورة كل 6 ثواني
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, heroImages.length]);

  // شريط التقدم
  useEffect(() => {
    let timer;
    
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(progress + 0.2);
        }
      }, 10);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [progress, isAutoPlaying]);

  // حركة الشركات العالمية
  useEffect(() => {
    const interval = setInterval(() => {
      setBrandScrollPosition((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    setRecentlyAdded(product);
    setShowCartNotification(true);
    
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      category: "الكل",
      brand: "الكل",
      priceRange: "الكل",
      sortBy: "popular"
    });
    setConverterType("single");
    setAccessoryType("all");
  };

  // تطبيق الفلاتر
  const filteredProducts = allProducts.filter(product => {
    if (selectedFilters.category !== "الكل") {
      const categoryMap = {
        "ألواح شمسية": "solar-panels",
        "بطاريات": "batteries",
        "ملحقات": "accessories"
      };
      if (product.category !== categoryMap[selectedFilters.category]) {
        return false;
      }
    }

    if (selectedFilters.brand !== "الكل") {
      if (product.brand !== selectedFilters.brand) {
        return false;
      }
    }

    if (selectedFilters.priceRange !== "الكل") {
      const priceRange = filters.priceRange.find(p => p.label === selectedFilters.priceRange);
      if (priceRange && (product.price < priceRange.min || product.price > priceRange.max)) {
        return false;
      }
    }

    if (product.category === "accessories" && accessoryType !== "all") {
      const typeMap = {
        "inverters": "عاكس",
        "mounts": "حامل",
        "cables": "كابلات"
      };
      if (product.type !== typeMap[accessoryType]) {
        return false;
      }
    }

    return true;
  });

  // تطبيق الترتيب
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedFilters.sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const converterOptions = [
    { value: "single", label: "مرحلة واحدة", icon: <Zap className="w-4 h-4" /> },
    { value: "three-phase", label: "ثلاث مراحل", icon: <Settings className="w-4 h-4" /> }
  ];

  const accessoryTypes = [
    { value: "all", label: "جميع الملحقات" },
    { value: "inverters", label: "العواكس" },
    { value: "mounts", label: "الحوامل" },
    { value: "cables", label: "الكابلات" }
  ];

  // التحكم في الصور
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    setProgress(0);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setProgress(0);
  };

  const goToImage = (index) => {
    setActiveImageIndex(index);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/5">
      {/* استيراد الهيدر */}
      <Header cartItems={cart} />

      {/* Hero Section - تصميم احترافي */}
      <section className="relative h-screen min-h-[800px] overflow-hidden">
        {/* خلفية متدرجة متطورة */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0"></div>
        
        {/* شبكة خلفية دقيقة */}
        <div className="absolute inset-0 bg-grid-white/5 z-0"></div>
        
        {/* تأثيرات جزيئات متحركة */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            />
          ))}
        </div>
        
        {/* الصور المتحركة */}
        <div className="absolute inset-0 z-10">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === activeImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* تظليل متدرج احترافي */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
            </div>
          ))}
        </div>

        {/* شعار عائم متحرك */}
        <div className="absolute top-12 left-12 z-30">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl animate-float">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center shadow-lg">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <div className="text-white">
                <div className="text-lg font-bold tracking-wider">SOLAR TECH</div>
                <div className="text-xs text-gray-300">Premium Energy Solutions</div>
              </div>
            </div>
          </div>
        </div>

        {/* شريط الشركات العالمية المتحرك */}
        <div className="absolute bottom-32 left-0 right-0 z-30 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20"></div>
            <div 
              className="flex gap-12 py-4"
              style={{
                transform: `translateX(-${brandScrollPosition}%)`,
                transition: 'transform 0.1s linear'
              }}
            >
              {[...globalBrands, ...globalBrands].map((brand, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors duration-300 px-6 py-3 rounded-xl hover:bg-white/5 backdrop-blur-sm"
                >
                  <span className="text-2xl">{brand.icon}</span>
                  <span className="text-sm font-medium tracking-wider">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* عناصر التحكم في الصور - تصميم احترافي */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          {/* شريط التقدم */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-100 ease-linear shadow-lg shadow-primary/30"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* لوحة تحكم احترافية */}
          <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-xl">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between py-6">
                {/* معلومات الصورة */}
                <div className="text-white">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-light tracking-wider">{activeImageIndex + 1}</div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                    <div>
                      <div className="text-lg font-medium tracking-wide">{heroImages[activeImageIndex].title}</div>
                      <div className="text-sm text-gray-300 mt-1">{heroImages[activeImageIndex].subtitle}</div>
                    </div>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevImage}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-4 rounded-full bg-gradient-to-r from-primary to-primary/90 backdrop-blur-sm text-white hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-110 shadow-lg shadow-primary/30"
                    aria-label={isAutoPlaying ? "إيقاف التشغيل التلقائي" : "تشغيل تلقائي"}
                  >
                    {isAutoPlaying ? (
                      <div className="flex items-center gap-2">
                        <Pause className="w-6 h-6" />
                        <span className="text-sm">إيقاف</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Play className="w-6 h-6" />
                        <span className="text-sm">تشغيل</span>
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label="الصورة التالية"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* النقاط التنقلية */}
                <div className="flex gap-3">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`transition-all duration-300 ${
                        index === activeImageIndex 
                          ? 'w-12 h-2 rounded-full bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/30' 
                          : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`اذهب إلى الصورة ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* مؤشر التمرير */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="flex flex-col items-center text-white/90">
            <div className="text-xs tracking-wider mb-3 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              SCROLL TO EXPLORE
            </div>
            <div className="relative">
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* تأثيرات بصرية متقدمة */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-float delay-1000"></div>
        
        {/* خطوط الشبكة الديناميكية */}
        <div className="absolute inset-0 z-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_95%,_rgba(255,255,255,0.02)_100%)] bg-[length:100px_100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,_transparent_95%,_rgba(255,255,255,0.02)_100%)] bg-[length:100px_100px]"></div>
        </div>
      </section>

      {/* إحصائيات سريعة - تصميم احترافي */}
      <section className="relative py-20 bg-gradient-to-b from-background via-background to-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">99.8%</div>
                  <div className="text-sm text-muted-foreground mt-1">معدل كفاءة</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center border border-blue-500/20">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">25+</div>
                  <div className="text-sm text-muted-foreground mt-1">سنة ضمان</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center border border-green-500/20">
                  <Lightning className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">500MW+</div>
                  <div className="text-sm text-muted-foreground mt-1">طاقة مركبة</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center border border-amber-500/20">
                  <TrendingUp className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">1000+</div>
                  <div className="text-sm text-muted-foreground mt-1">مشروع ناجح</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Section - محسّنة احترافية */}
      <section className="py-20 bg-gradient-to-b from-background via-background to-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 text-primary text-sm font-medium mb-8 shadow-xl border border-primary/20 backdrop-blur-sm">
              <Building2 className="w-4 h-4" />
              <span className="tracking-wide">شبكة الشركاء العالميين</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">شراكات استراتيجية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              نتعاون مع أبرز العلامات العالمية لضمان أعلى معايير الجودة والابتكار في كل منتج
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={company.url}>
                <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer hover:-translate-y-2 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center space-y-8">
                    <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-6 flex items-center justify-center overflow-hidden border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-primary text-sm font-medium group-hover:gap-4 transition-all duration-300">
                      <span className="tracking-wide">استكشاف التقنيات</span>
                      <div className="relative">
                        <ExternalLink className="w-4 h-4" />
                        <div className="absolute inset-0 bg-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Solar Panels - تصميم احترافي */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 shadow-xl border border-primary/20 backdrop-blur-sm">
                <PanelTop className="w-4 h-4" />
                <span className="tracking-wide">التكنولوجيا المتقدمة</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">الألواح الشمسية الذكية</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                تصاميم مبتكرة تعيد تعريف مفهوم كفاءة الطاقة الشمسية
              </p>
            </div>
            <Link href="/solar-panels">
              <Button className="gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 rounded-xl">
                <span className="font-medium">استعراض المجموعة</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts
              .filter(p => p.category === "solar-panels")
              .map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Filters Section - محسّنة احترافية */}
      <section className="py-20 bg-gradient-to-b from-background via-background to-card/30">
        <div className="container mx-auto px-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-border/50">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Filter className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">تصفية متقدمة</h3>
                  <p className="text-muted-foreground">اختر ما يناسب احتياجاتك بدقة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  className="gap-3 border border-border hover:border-primary/30 hover:text-primary transition-all duration-300"
                  onClick={resetFilters}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="font-medium">إعادة التعيين</span>
                </Button>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">ترتيب حسب:</span>
                  <select 
                    className="bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={selectedFilters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  >
                    {filters.sortBy.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* فلترة حسب النوع */}
              <div>
                <label className="block text-sm font-medium mb-4">فئة المنتج</label>
                <div className="flex flex-wrap gap-3">
                  {filters.category.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange("category", category)}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                        selectedFilters.category === category
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground border border-border"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* فلترة حسب الماركة */}
              <div>
                <label className="block text-sm font-medium mb-4">العلامة التجارية</label>
                <select 
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={selectedFilters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                >
                  {filters.brand.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* فلترة حسب نطاق السعر */}
              <div>
                <label className="block text-sm font-medium mb-4">نطاق السعر</label>
                <select 
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={selectedFilters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                >
                  {filters.priceRange.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* فلترة حسب التوفر */}
              <div>
                <label className="block text-sm font-medium mb-4">حالة التوفر</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFilterChange("inStock", "all")}
                    className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                      !selectedFilters.inStock || selectedFilters.inStock === "all"
                        ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground border border-border"
                    }`}
                  >
                    جميع المنتجات
                  </button>
                  <button
                    onClick={() => handleFilterChange("inStock", "available")}
                    className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                      selectedFilters.inStock === "available"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground border border-border"
                    }`}
                  >
                    متوفر الآن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Converter Type Selector - محسّنة احترافية */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-muted/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 shadow-xl border border-primary/20 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span className="tracking-wide">أنظمة التحويل المتطورة</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">اختر نظام التحويل المناسب</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              حلول تحويل متكاملة تصمم خصيصاً لمتطلباتك الفريدة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {converterOptions.map(option => (
              <Button
                key={option.value}
                size="lg"
                variant={converterType === option.value ? "default" : "outline"}
                className={`h-28 flex-col gap-4 text-lg transition-all duration-300 rounded-2xl ${
                  converterType === option.value 
                  ? 'bg-gradient-to-r from-primary to-primary/90 shadow-2xl shadow-primary/30' 
                  : 'bg-background hover:bg-muted text-muted-foreground border-2 border-border hover:border-primary/30'
                }`}
                onClick={() => setConverterType(option.value)}
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border-2 border-border/50">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {converterType === "single" 
                  ? "⏻ نظام التحويل أحادي الطور - مثالي للمنازل والمشاريع الصغيرة، يوفر كفاءة تصل إلى 98% مع أنظمة حماية متكاملة ومراقبة ذكية للأداء"
                  : "⏻ نظام التحويل ثلاثي الطور - مصمم للمصانع والمرافق التجارية الكبيرة، يدعم السعات العالية مع تقنيات موازنة متطورة لضمان الاستقرار الأمثل"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - محسّنة احترافية */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 text-primary text-sm font-medium mb-8 shadow-xl border border-primary/20 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="tracking-wide">مميزاتنا الفريدة</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">لماذا نختلف؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              نهجنا المختلف في تقديم حلول الطاقة الشمسية يجعلنا الخيار الأمثل
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300">تصنيع متقدم</h3>
              <p className="text-muted-foreground leading-relaxed">
                تقنيات تصنيع حاصلة على براءات اختراع تضمن أداء استثنائي وطول عمر التشغيل
              </p>
            </div>

            <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-blue-500 transition-colors duration-300">ضمان ممتد</h3>
              <p className="text-muted-foreground leading-relaxed">
                ضمان أداء يصل إلى 30 سنة مع تغطية شاملة وخدمة صيانة استباقية
              </p>
            </div>

            <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-green-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                <Truck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-green-500 transition-colors duration-300">شحن عالمي</h3>
              <p className="text-muted-foreground leading-relaxed">
                شبكة لوجستية عالمية تضمن وصول المنتجات بسرعة وأمان لأي مكان في العالم
              </p>
            </div>

            <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-amber-500/20">
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-amber-500 transition-colors duration-300">دعم متكامل</h3>
              <p className="text-muted-foreground leading-relaxed">
                فريق دعم فني متخصص متاح على مدار الساعة مع حلول ذكية للمراقبة والصيانة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Batteries - تصميم احترافي */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 shadow-xl border border-primary/20 backdrop-blur-sm">
                <Battery className="w-4 h-4" />
                <span className="tracking-wide">تخزين الطاقة الذكي</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">أنظمة البطاريات المتطورة</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                تقنيات تخزين حديثة تضمن استمرارية الطاقة بأعلى كفاءة
              </p>
            </div>
            <Link href="/batteries">
              <Button className="gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 rounded-xl">
                <span className="font-medium">استعراض الأنظمة</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts
              .filter(p => p.category === "batteries")
              .map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Accessories Section - محسّنة احترافية */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 shadow-xl border border-primary/20 backdrop-blur-sm">
                <Settings className="w-4 h-4" />
                <span className="tracking-wide">المكونات الأساسية</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">ملحقات النظام المتكاملة</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                كل ما تحتاجه لإكمال نظام الطاقة الشمسية بكفاءة وأمان
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {accessoryTypes.map(type => (
                <Button
                  key={type.value}
                  size="sm"
                  variant={accessoryType === type.value ? "default" : "outline"}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                    accessoryType === type.value
                      ? "bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/30"
                      : "bg-background hover:bg-muted text-muted-foreground border-2 border-border"
                  }`}
                  onClick={() => setAccessoryType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts
              .filter(p => p.category === "accessories")
              .filter(p => {
                if (accessoryType === "all") return true;
                const typeMap = {
                  "inverters": "عاكس",
                  "mounts": "حامل",
                  "cables": "كابلات"
                };
                return p.type === typeMap[accessoryType];
              })
              .map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Cart Summary - محسّن احترافي */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-border/50 p-6 min-w-[340px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">سلة المشتريات</h3>
                  <p className="text-xs text-muted-foreground">{cart.length} منتج في السلة</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full"></div>
                <span className="relative bg-gradient-to-r from-primary to-primary/90 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto mb-6 pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden border border-border">
                      <img 
                        src={item.images?.[0]?.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="max-w-[140px]">
                      <div className="font-medium text-sm line-clamp-1">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">الكمية: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-bold text-primary">
                    {((item.price * item.quantity) / 100).toFixed(0)} ر.س
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/cart">
                <Button className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all rounded-xl py-3">
                  <span className="font-medium">اتمام الطلب</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all rounded-xl py-3"
                onClick={() => setCart([])}
              >
                <span className="font-medium">تفريغ السلة</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* إشعار إضافة إلى السلة - محسّن */}
      {showCartNotification && recentlyAdded && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-5 min-w-[320px] border-2 border-green-400/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold mb-1 tracking-wide">تمت الإضافة بنجاح</div>
                <div className="text-sm opacity-90 line-clamp-1">{recentlyAdded.name}</div>
                <div className="text-xs opacity-80 mt-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                  متاح في سلة المشتريات
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - تصميم احترافي */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"></div>
        <div className="container relative">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">استعد لمستقبل الطاقة</h2>
              <p className="text-white/90 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
                انضم إلى آلاف العملاء الذين اختاروا الحلول الذكية للطاقة الشمسية
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-10 py-6 rounded-xl text-lg">
                    <ArrowRight className="w-5 h-5" />
                    <span className="font-medium tracking-wide">ابدأ رحلتك الآن</span>
                  </Button>
                </Link>
                <Link href="/solar-panels">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white/10 gap-4 hover:scale-105 transition-all duration-300 px-10 py-6 rounded-xl text-lg backdrop-blur-sm">
                    <PanelTop className="w-5 h-5" />
                    <span className="font-medium tracking-wide">استكشاف المنتجات</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* استيراد الفوتر */}
      <Footer />
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const priceInSAR = (product.price / 100).toFixed(0);
  const originalPriceInSAR = product.originalPrice ? (product.originalPrice / 100).toFixed(0) : null;

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/40 hover:translate-y-[-5px]">
      <div className="relative h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {product.images && product.images[0] && (
          <Link href={`/product/${product.id}`}>
            <img
              src={product.images[0].imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
            />
          </Link>
        )}
        
        {/* تظليل متدرج */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* خصم المنتج */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-4 right-4 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-70"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-2xl">
                خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            </div>
          </div>
        )}
        
        {/* حالة التوفر */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
          product.inStock 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          {product.inStock ? 'متوفر' : 'غير متوفر'}
        </div>
        
        {/* زر الإضافة السريعة */}
        <button
          onClick={() => product.inStock && onAddToCart(product)}
          disabled={!product.inStock}
          className={`absolute bottom-4 left-4 p-3 rounded-xl shadow-2xl transition-all duration-300 hover:scale-110 transform ${
            product.inStock 
              ? 'bg-gradient-to-r from-primary to-primary/90 text-white hover:shadow-2xl opacity-0 group-hover:opacity-100' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
          }`}
          title={product.inStock ? "إضافة إلى السلة" : "غير متوفر حالياً"}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        {/* العلامة التجارية */}
        {product.brand && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-muted overflow-hidden border border-border">
              <img 
                src={product.brandLogo} 
                alt={product.brand}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {product.power || product.capacity || product.type}
          </span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-xl mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer h-[56px]">
            {product.name}
          </h3>
        </Link>

        {/* الميزات */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features?.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground border border-border">
              {feature}
            </span>
          ))}
        </div>

        {/* السعر والإجراءات */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {priceInSAR} ر.س
              </span>
              {originalPriceInSAR && (
                <span className="text-sm text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
              )}
            </div>
            {product.efficiency && (
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                كفاءة {product.efficiency}
              </span>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex gap-3">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-12 gap-2 hover:border-primary hover:text-primary transition-all duration-300 group/btn hover:bg-primary/5"
              >
                <span>التفاصيل</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button
              onClick={() => product.inStock && onAddToCart(product)}
              disabled={!product.inStock}
              className={`flex-1 h-12 gap-2 transition-all duration-300 ${
                product.inStock 
                  ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed'
              }`}
            >
              {product.inStock ? (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-medium">إضافة للسلة</span>
                </>
              ) : (
                <span className="font-medium">غير متوفر</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}