// app/solar-systems/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ChevronDown, X, Star, Zap, Shield, Tag, Filter, Sun, PanelTop, Sparkles,
  TrendingUp, Power, BadgeCheck, Truck, ShieldCheck, Clock, ArrowRight,
  ShoppingCart, Search, SlidersHorizontal, Check, ChevronLeft, ChevronRight,
  Heart, Share2, Download, PlayCircle, Eye, Package, CheckCircle, AlertCircle,
  ExternalLink, FileText, Youtube, Facebook, Twitter, Instagram, Linkedin,
  Maximize2, Minus, Plus, RotateCw, Award, Users, BarChart3, ThumbsUp,
  MessageCircle, Calendar, File, DownloadCloud, BookOpen, Layers, Globe,
  TrendingDown, Thermometer, BatteryCharging, Settings, Wrench, HelpCircle,
  Brain, Lightbulb, GitCompare, BarChart, ThermometerSun, Target, Settings2,
  Cloud, Battery, Droplets, Sunrise, Sunset, Rocket, Crown, Trophy, Medal,
  Gift, Navigation, Compass, Map, Layers2, Database, Server, Network,
  Microchip, CircuitBoard, Router, Satellite, Bluetooth, Signal, SignalHigh,
  BatteryLow, BatteryMedium, PlugZap, Bolt, Flashlight, Lamp, SunDim,
  CloudSun, CloudFog, CloudSnow, Umbrella, Waves, Gauge, PieChart,
  DollarSign, Wallet, Receipt, FileBarChart, FileCode, FileImage,
  Folder, FolderPlus, FolderSearch, Home, Building, Factory, TreePine,
  Cpu, Monitor, Smartphone, Wifi, HardDrive, MemoryStick
} from "lucide-react";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";

// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";

// استيراد نظام التخزين
import {
  loadSolarSystems,
  transformSystemsForDisplay
} from "@/lib/solar-systems-storage";

// نوع العرض
type ViewMode = 'list' | 'details';

export default function SolarSystems() {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedSystem, setSelectedSystem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedSystems, setRelatedSystems] = useState<any[]>([]);
  
  // الحالات الجديدة
  const [selectedTab, setSelectedTab] = useState('الوصف');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  // الفلاتر
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    minPower: undefined as number | undefined,
    maxPower: undefined as number | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    sortBy: "power_desc" as "power_desc" | "power_asc" | "price_desc" | "price_asc" | "newest" | "rating",
    searchQuery: "" as string,
  });

  const [cartCount, setCartCount] = useState(0);
  
  // تحميل البيانات
  const [allSystems, setAllSystems] = useState<any[]>([]);
  const [systemsByType, setSystemsByType] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const systems = loadSolarSystems();
    const transformedSystems = transformSystemsForDisplay(systems);
    setAllSystems(transformedSystems);
    
    // تجميع النظم حسب النوع
    const typeMap: Record<string, any[]> = {};
    transformedSystems.forEach(system => {
      if (!typeMap[system.type]) {
        typeMap[system.type] = [];
      }
      typeMap[system.type].push(system);
    });
    setSystemsByType(typeMap);
  }, []);

  // تحديث عدد العناصر في السلة
  useEffect(() => {
    const updateCartCount = () => {
      const count = localCart.getItemCount();
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  // عرض تفاصيل النظام
  const showSystemDetails = (system: any) => {
    setSelectedSystem(system);
    setQuantity(1);
    setSelectedImage(0);
    setSelectedTab('الوصف');
    setReviewRating(0);
    setReviewComment('');
    setNewQuestion('');
    setOpenFaqs([]);
    setActiveVideo(null);
    setViewMode('details');
    
    // تحميل النظم المقترحة
    const related = allSystems
      .filter(s => s.type === system.type && s.id !== system.id)
      .slice(0, 6);
    setRelatedSystems(related);
  };

  // العودة للقائمة
  const backToList = () => {
    setViewMode('list');
    setSelectedSystem(null);
  };

  // فلترة النظم
  const filteredSystems = useMemo(() => {
    let filtered = [...allSystems];

    // فلترة حسب البحث
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        system => 
          system.name.toLowerCase().includes(query) ||
          system.description.toLowerCase().includes(query) ||
          system.features.some((f: string) => f.toLowerCase().includes(query))
      );
    }

    // فلترة حسب النوع
    if (filters.types.length > 0) {
      filtered = filtered.filter(
        system => filters.types.includes(system.type)
      );
    }

    // فلترة حسب القدرة
    if (filters.minPower !== undefined) {
      filtered = filtered.filter(
        system => system.powerCapacity >= filters.minPower!
      );
    }
    if (filters.maxPower !== undefined) {
      filtered = filtered.filter(
        system => system.powerCapacity <= filters.maxPower!
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        system => system.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        system => system.price <= filters.maxPrice!
      );
    }

    // الترتيب
    switch (filters.sortBy) {
      case "power_desc":
        filtered.sort((a, b) => b.powerCapacity - a.powerCapacity);
        break;
      case "power_asc":
        filtered.sort((a, b) => a.powerCapacity - b.powerCapacity);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [allSystems, filters]);

  // دالة إضافة للسلة
  const handleAddToCart = (system: any, qty = quantity) => {
    if (!isAuthenticated) {
      localCart.addItem(system.id, qty);
      
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${system.name} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      toast.success(`تمت إضافة المنتج إلى السلة`);
    }
    
    setCartCount(prev => prev + qty);
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      minPower: undefined,
      maxPower: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: "power_desc",
      searchQuery: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.types.length > 0 ||
      filters.minPower !== undefined ||
      filters.maxPower !== undefined ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined
    );
  }, [filters]);

  // مشاركة النظام
  const shareSystem = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedSystem.name,
        text: selectedSystem.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط النظام");
    }
  };

  // تحميل ملف PDF
  const downloadPDF = (document: any) => {
    toast.success(`جاري تحميل ${document.name}`, {
      description: "سيبدأ التحميل تلقائياً خلال لحظات",
      duration: 3000,
    });
  };

  // زيادة/تقليل الكمية
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // تبديل فتح/إغلاق السؤال
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // إرسال تقييم
  const submitReview = () => {
    if (reviewRating === 0) {
      toast.error("الرجاء اختيار تقييم");
      return;
    }
    toast.success("شكراً لتقييمك!", {
      description: "تم إرسال تقييمك بنجاح",
    });
    setReviewRating(0);
    setReviewComment('');
  };

  // إرسال سؤال
  const submitQuestion = () => {
    if (!newQuestion.trim()) {
      toast.error("الرجاء كتابة سؤالك");
      return;
    }
    toast.success("تم إرسال سؤالك", {
      description: "سيتم الرد عليك في أقرب وقت",
    });
    setNewQuestion('');
  };

  // حساب السعر بناءً على الكمية
  const calculateBulkPrice = (system: any, qty: number) => {
    if (!system.bulkPricing) return system.price * qty;
    
    const pricing = system.bulkPricing.find((p: any) => 
      qty >= p.minQty && qty <= p.maxQty
    ) || system.bulkPricing[0];
    
    return pricing.price * qty;
  };

  // مكون Carousel للنظم
  const SystemCarousel = ({ type, typeSystems }: { type: string, typeSystems: any[] }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const cardWidth = container.querySelector('.system-card')?.clientWidth || 320;
        const scrollAmount = cardWidth + 24;
        
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });

        setTimeout(checkScroll, 300);
      }
    };

    useEffect(() => {
      checkScroll();
      window.addEventListener('resize', checkScroll);
      
      return () => {
        window.removeEventListener('resize', checkScroll);
      };
    }, []);

    const typeNames: Record<string, string> = {
      'residential': 'المنزلية',
      'commercial': 'التجارية',
      'industrial': 'الصناعية',
      'agricultural': 'الزراعية',
      'hybrid': 'الهجينة'
    };

    const typeIcons: Record<string, any> = {
      'residential': Home,
      'commercial': Building,
      'industrial': Factory,
      'agricultural': TreePine,
      'hybrid': Cpu
    };

    const TypeIcon = typeIcons[type] || Package;

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white p-3 rounded-xl shadow-md">
              <TypeIcon className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">المنظومات {typeNames[type]}</h2>
              <p className="text-muted-foreground">
                {typeSystems.length} منظومة متاحة
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={backToList}>
            عرض الكل
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          {/* أزرار التمرير */}
          {showLeftArrow && (
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          
          {showRightArrow && (
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* النظم */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={checkScroll}
          >
            {typeSystems.map((system) => (
              <div key={system.id} className="flex-shrink-0 w-80">
                <SystemCard
                  system={system}
                  onAddToCart={() => handleAddToCart(system)}
                  onClick={() => showSystemDetails(system)}
                  isLoading={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // الفلتر في الأعلى
  const FilterButton = () => (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => setShowFilterModal(true)}
    >
      <Filter className="w-4 h-4" />
      الفلاتر
      {hasActiveFilters && (
        <span className="w-2 h-2 bg-primary rounded-full"></span>
      )}
    </Button>
  );

  const FilterModal = () => (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="w-6 h-6" />
              فلاتر المنظومات
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilterModal(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              className="w-full gap-2 mb-6"
              onClick={clearFilters}
            >
              <X className="w-4 h-4" />
              مسح جميع الفلاتر
            </Button>
          )}

          <div className="space-y-6">
            {/* الترتيب */}
            <div>
              <h3 className="font-bold text-lg mb-3">ترتيب المنظومات</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "power_desc", label: "الأعلى قدرة", icon: <Zap className="w-4 h-4" /> },
                  { value: "power_asc", label: "الأقل قدرة", icon: <Zap className="w-4 h-4" /> },
                  { value: "price_desc", label: "الأعلى سعراً", icon: <DollarSign className="w-4 h-4" /> },
                  { value: "price_asc", label: "الأقل سعراً", icon: <DollarSign className="w-4 h-4" /> },
                  { value: "rating", label: "الأعلى تقييماً", icon: <Star className="w-4 h-4" /> },
                  { value: "newest", label: "الأحدث", icon: <Sparkles className="w-4 h-4" /> }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as any }))}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      filters.sortBy === option.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {option.icon}
                    <span className="text-sm font-medium text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* أنواع المنظومات */}
            <div>
              <h3 className="font-bold text-lg mb-3">نوع المنظومة</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "residential", label: "منزلية", icon: <Home className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
                  { value: "commercial", label: "تجارية", icon: <Building className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
                  { value: "industrial", label: "صناعية", icon: <Factory className="w-4 h-4" />, color: "bg-orange-100 text-orange-800" },
                  { value: "agricultural", label: "زراعية", icon: <TreePine className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
                  { value: "hybrid", label: "هجينة", icon: <Cpu className="w-4 h-4" />, color: "bg-purple-100 text-purple-800" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => toggleType(item.value)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.types.includes(item.value)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium flex-1 text-right">{item.label}</span>
                    {filters.types.includes(item.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* القدرة */}
            <div>
              <h3 className="font-bold text-lg mb-3">القدرة (كيلووات)</h3>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 5, 10, 20, 50, 100, 200].map((power) => (
                  <button
                    key={power}
                    onClick={() => {
                      if (filters.minPower === power - 2 && filters.maxPower === power) {
                        setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minPower: power - 2, 
                          maxPower: power 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minPower === power - 2 && filters.maxPower === power
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{power} ك.و</span>
                  </button>
                ))}
              </div>
            </div>

            {/* أزرار التطبيق */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowFilterModal(false)}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1"
                onClick={() => setShowFilterModal(false)}
              >
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // وصف النظام المنظم
  const getSystemDescription = (system: any) => {
    const typeNames: Record<string, string> = {
      'residential': 'منزلي',
      'commercial': 'تجاري',
      'industrial': 'صناعي',
      'agricultural': 'زراعي',
      'hybrid': 'هجين'
    };

    return {
      mainDescription: `${system.description || `منظومة شمسية ${typeNames[system.type]} متكاملة تنتج ${system.dailyProduction} كيلووات ساعة يومياً.`}`,
      
      features: system.features || [
        `توفير يصل إلى ${Math.round((system.dailyProduction * 0.8) / 10) * 10}% من فاتورة الكهرباء`,
        `ضمان ${system.warranty || '10 سنوات'} على المكونات`,
        "تركيب احترافي وشامل",
        "صيانة دورية ومتابعة"
      ],
      
      usageAreas: system.suitableFor || [
        "المنازل السكنية",
        "المصانع",
        "المزارع",
        "المجمعات التجارية"
      ],
      
      investmentBenefits: system.benefits || [
        "توفير مالي طويل المدى",
        "طاقة نظيفة ومستدامة",
        "استقلالية عن شبكة الكهرباء",
        "عائد استثماري خلال 3-5 سنوات"
      ]
    };
  };

  // بيانات الأسئلة الشائعة
  const faqs = selectedSystem?.faqs || [
    {
      question: "ما هي مدة تركيب النظام؟",
      answer: selectedSystem?.installationTime || "تتراوح مدة التركيب بين 3-7 أيام عمل حسب حجم النظام وتعقيد التركيب."
    },
    {
      question: "هل يتطلب النظام صيانة دورية؟",
      answer: "نعم، يحتاج النظام إلى صيانة دورية تشمل تنظيف الألواح كل 6 أشهر وفحص التوصيلات سنوياً لضمان كفاءة الأداء."
    },
    {
      question: "ما هي فترة استرداد التكلفة؟",
      answer: `فترة استرداد التكلفة تتراوح بين ${selectedSystem?.performanceData?.paybackPeriod || 4}-6 سنوات حسب معدل الاستهلاك.`
    }
  ];

  // عرض صفحة تفاصيل النظام
  if (viewMode === 'details' && selectedSystem) {
    const typeNames: Record<string, string> = {
      'residential': 'منزلي',
      'commercial': 'تجاري',
      'industrial': 'صناعي',
      'agricultural': 'زراعي',
      'hybrid': 'هجين'
    };

    const typeColors: Record<string, string> = {
      'residential': 'bg-blue-100 text-blue-800',
      'commercial': 'bg-green-100 text-green-800',
      'industrial': 'bg-orange-100 text-orange-800',
      'agricultural': 'bg-yellow-100 text-yellow-800',
      'hybrid': 'bg-purple-100 text-purple-800'
    };

    const basePrice = selectedSystem.price / 100;
    const totalPrice = calculateBulkPrice(selectedSystem, quantity) / 100;
    const originalPriceInSAR = selectedSystem.originalPrice ? (selectedSystem.originalPrice / 100).toFixed(0) : null;
    const discountPercentage = originalPriceInSAR ? Math.round((1 - basePrice / parseInt(originalPriceInSAR)) * 100) : 0;
    const description = getSystemDescription(selectedSystem);

    // تحسين التبويبات للجوال
    const tabs = ['الوصف', 'المكونات', 'الأداء', 'التقييمات', 'الأسئلة الشائعة', 'الفيديوهات', 'المستندات'];

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header cartCount={cartCount} />
        
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={backToList} className="text-primary hover:underline">
              المنظومات الشمسية
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-muted-foreground truncate">{selectedSystem.name}</span>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* الصور */}
            <div>
              {/* الصورة الرئيسية */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl mb-4">
                <img
                  src={selectedSystem.images[selectedImage] || "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop"}
                  alt={selectedSystem.name}
                  className="w-full h-[400px] object-cover"
                />
                
                {/* علامات */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 ${typeColors[selectedSystem.type]} text-xs rounded-full font-bold`}>
                    {typeNames[selectedSystem.type]}
                  </span>
                  {selectedSystem.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary text-white text-xs rounded-full font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* خصم */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
                      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        خصم {discountPercentage}%
                      </div>
                    </div>
                  </div>
                )}
                
                {/* زر القلب */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>

                {/* زر التكبير */}
                <button
                  onClick={() => toast.info("تم تفعيل وضع التكبير")}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* الصور المصغرة */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedSystem.images?.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${selectedSystem.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* التفاصيل */}
            <div>
              {/* العنوان والتقييم */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-3xl font-bold">{selectedSystem.name}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={shareSystem}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="مشاركة"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="حفظ"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{selectedSystem.rating}</span>
                    <span className="text-muted-foreground">({selectedSystem.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{selectedSystem.views} مشاهدة</span>
                  </div>
                  <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {selectedSystem.sku}
                  </div>
                </div>
              </div>

              {/* معلومات سريعة */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-bold">{selectedSystem.powerCapacity} كيلووات</div>
                      <div className="text-sm text-muted-foreground">القدرة القصوى</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Sun className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-bold">{selectedSystem.dailyProduction} ك.و.س</div>
                      <div className="text-sm text-muted-foreground">الإنتاج اليومي</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-bold">{selectedSystem.warranty}</div>
                      <div className="text-sm text-muted-foreground">فترة الضمان</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-bold">{selectedSystem.installationTime}</div>
                      <div className="text-sm text-muted-foreground">وقت التركيب</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* السعر والكمية */}
              <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold">{totalPrice.toLocaleString()} ر.س</span>
                      {originalPriceInSAR && (
                        <span className="text-xl text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                      )}
                    </div>
                    {originalPriceInSAR && (
                      <div className="text-green-600 font-bold mt-2">
                        وفرت {((parseInt(originalPriceInSAR) * quantity - totalPrice).toLocaleString())} ر.س
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      {quantity} × {basePrice.toFixed(0)} ر.س للنظام الواحد
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">المخزون:</div>
                    <div className={`text-lg font-bold ${
                      selectedSystem.stock > 10 ? 'text-green-600' : 
                      selectedSystem.stock > 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedSystem.stock > 0 ? `${selectedSystem.stock} منظومة متوفرة` : 'نفذت الكمية'}
                    </div>
                  </div>
                </div>

                {/* كمية المنتجات الإضافية */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">الكمية:</span>
                    <span className="text-sm text-muted-foreground">
                      {quantity >= 3 ? `خصم ${selectedSystem.bulkPricing?.find((p: any) => quantity >= p.minQty && quantity <= p.maxQty)?.discount || 0}%` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button
                      size="lg"
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl"
                      onClick={() => handleAddToCart(selectedSystem, quantity)}
                      disabled={selectedSystem.stock === 0}
                    >
                      <ShoppingCart className="w-5 h-5 ml-2" />
                      {selectedSystem.stock === 0 ? 'نفذت الكمية' : `أضف ${quantity} إلى السلة`}
                    </Button>
                  </div>
                </div>
              </div>

              {/* جدول الأسعار بالجملة */}
              {selectedSystem.bulkPricing && (
                <div className="mb-6 p-4 border border-border rounded-xl">
                  <h3 className="font-bold mb-3">أسعار الجملة:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedSystem.bulkPricing.map((pricing: any, idx: number) => (
                      <div key={idx} className={`p-3 rounded-lg text-center ${
                        quantity >= pricing.minQty && quantity <= pricing.maxQty
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted/30'
                      }`}>
                        <div className="font-bold">{pricing.minQty}+</div>
                        <div className="text-sm">{(pricing.price / 100).toFixed(0)} ر.س</div>
                        {pricing.discount > 0 && (
                          <div className="text-xs text-green-600 mt-1">خصم {pricing.discount}%</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* المميزات السريعة */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold">{selectedSystem.delivery}</div>
                    <div className="text-sm text-muted-foreground">{selectedSystem.deliveryTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold">ضمان {selectedSystem.warranty}</div>
                    <div className="text-sm text-muted-foreground">على المكونات</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Package className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-bold">تركيب شامل</div>
                    <div className="text-sm text-muted-foreground">شامل جميع المكونات</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="font-bold">توفير الطاقة</div>
                    <div className="text-sm text-muted-foreground">يصل إلى 90%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* علامات التبويب التفاعلية */}
          <div className="sticky top-0 z-10 bg-card border-b border-border mt-8">
            <div className="flex overflow-x-auto scrollbar-hide py-2">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  className="px-4 py-3 font-medium whitespace-nowrap hover:text-primary transition-colors border-b-2 data-[active=true]:border-primary data-[active=true]:text-primary text-sm md:text-base"
                  data-active={selectedTab === tab}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* محتوى علامات التبويب */}
          <div className="mt-12">
            
            {/* قسم الوصف */}
            {selectedTab === 'الوصف' && (
              <div className="space-y-8">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    وصف المنظومة
                  </h2>
                  
                  <div className="space-y-8">
                    {/* الوصف الرئيسي */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                      <p className="text-lg leading-relaxed text-gray-800">
                        {description.mainDescription}
                      </p>
                    </div>

                    {/* المميزات الرئيسية */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        المميزات الرئيسية
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {description.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-gray-800">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* مجالات الاستخدام */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        مجالات الاستخدام
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {description.usageAreas.map((area: string, idx: number) => (
                          <div key={idx} className="text-center p-6 bg-white border border-blue-200 rounded-xl hover:border-blue-400 transition-colors">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                              <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-800">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* فوائد الاستثمار */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6" />
                        فوائد الاستثمار
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {description.investmentBenefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-green-200">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              {idx === 0 && <DollarSign className="w-5 h-5 text-green-600" />}
                              {idx === 1 && <Globe className="w-5 h-5 text-green-600" />}
                              {idx === 2 && <ShieldCheck className="w-5 h-5 text-green-600" />}
                              {idx === 3 && <TrendingUp className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">{benefit}</span>
                              <div className="text-sm text-gray-600 mt-1">
                                {idx === 0 && "توفير مباشر في فواتير الكهرباء الشهرية"}
                                {idx === 1 && "تقليل الانبعاثات الكربونية"}
                                {idx === 2 && "عدم الاعتماد على شبكة الكهرباء العامة"}
                                {idx === 3 && "عائد استثماري مرتفع على المدى الطويل"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم المكونات */}
            {selectedTab === 'المكونات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    مكونات المنظومة
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {selectedSystem.components?.map((component: any, idx: number) => (
                      <div key={idx} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                          {component.image ? (
                            <img 
                              src={component.image} 
                              alt={component.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg">{component.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {component.type === 'panel' ? 'لوح شمسي' :
                               component.type === 'inverter' ? 'انفرتر' :
                               component.type === 'battery' ? 'بطارية' :
                               component.type === 'charger' ? 'شاحن' :
                               component.type === 'monitor' ? 'مراقبة' : 'ملحق'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{component.brand}</p>
                          
                          <div className="space-y-2 mb-4">
                            {Object.entries(component.specifications || {}).map(([key, value], specIdx) => (
                              <div key={specIdx} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value as string}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-bold">{(component.price / 100).toLocaleString()} ر.س</div>
                              <div className="text-sm text-muted-foreground">× {component.quantity} قطعة</div>
                            </div>
                            <div className="text-lg font-bold text-primary">
                              {((component.price * component.quantity) / 100).toLocaleString()} ر.س
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">ملخص التكلفة</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>تكلفة المكونات:</span>
                        <span className="font-bold">
                          {selectedSystem.components?.reduce((sum: number, comp: any) => sum + (comp.price * comp.quantity), 0) / 100} ر.س
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>تكلفة التركيب:</span>
                        <span className="font-bold">{(selectedSystem.price * 0.2) / 100} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-3">
                        <span className="text-lg font-bold">السعر الإجمالي:</span>
                        <span className="text-2xl font-bold text-primary">
                          {basePrice.toLocaleString()} ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الأداء */}
            {selectedTab === 'الأداء' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    بيانات الأداء
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* تصميم النظام */}
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">تصميم النظام</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>نظام التوصيل:</span>
                            <span className="font-bold">{selectedSystem.systemDesign?.layout || 'متوازي'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>عدد المكونات:</span>
                            <span className="font-bold">{selectedSystem.systemDesign?.componentsCount || selectedSystem.components?.length || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>كفاءة النظام:</span>
                            <span className="font-bold">{selectedSystem.systemDesign?.efficiency || 85}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>العمر الافتراضي:</span>
                            <span className="font-bold">{selectedSystem.systemDesign?.lifetime || 25} سنة</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">توقعات التوفير</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>التوفير الشهري:</span>
                            <span className="font-bold text-green-600">
                              {selectedSystem.performanceData?.savings[0] || 1500} ر.س
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>التوفير السنوي:</span>
                            <span className="font-bold text-green-600">
                              {(selectedSystem.performanceData?.savings.reduce((a: number, b: number) => a + b, 0) || 18000).toLocaleString()} ر.س
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>فترة استرداد التكلفة:</span>
                            <span className="font-bold">
                              {selectedSystem.performanceData?.paybackPeriod || 4.5} سنة
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* الإنتاج الشهري */}
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">الإنتاج الشهري المتوقع (كيلووات ساعة)</h3>
                        <div className="space-y-2">
                          {selectedSystem.performanceData?.monthlyProduction?.map((production: number, idx: number) => {
                            const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", 
                                           "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
                            const percentage = (production / 1000) * 100;
                            
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{months[idx]}</span>
                                  <span className="font-bold">{production} ك.و.س</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">نصائح لزيادة الكفاءة</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>تنظيف الألواح كل 3 أشهر لضمان أقصى امتصاص للضوء</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>تجنب الظل على الألواح خلال ساعات الذروة (10 صباحاً - 3 مساءً)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>تركيب الألواح بزاوية 20-30 درجة باتجاه الجنوب</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>مراقبة أداء النظام أسبوعياً لاكتشاف أي انخفاض مبكراً</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* باقي الأقسام بنفس نمط صفحة الألواح الشمسية */}
            {/* قسم التقييمات */}
            {selectedTab === 'التقييمات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    تقييمات العملاء
                  </h2>

                  {/* نموذج إضافة تقييم */}
                  <div className="p-6 border border-border rounded-xl">
                    <h3 className="font-bold text-lg mb-4">أضف تقييمك</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">التقييم</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="text-3xl hover:scale-110 transition-transform"
                              onClick={() => setReviewRating(star)}
                            >
                              {star <= reviewRating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">التعليق</label>
                        <textarea 
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          rows={4}
                          placeholder="شاركنا تجربتك مع المنظومة..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </div>
                      <Button className="gap-2" onClick={submitReview}>
                        <Star className="w-4 h-4" />
                        إرسال التقييم
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الأسئلة الشائعة */}
            {selectedTab === 'الأسئلة الشائعة' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    الأسئلة الشائعة
                  </h2>

                  <div className="space-y-4 mb-8">
                    {faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="border border-border rounded-xl overflow-hidden">
                        <button
                          className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                          onClick={() => toggleFaq(idx)}
                        >
                          <span className="font-medium text-right flex-1">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaqs.includes(idx) && (
                          <div className="p-6 pt-0 animate-in fade-in">
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* سؤال جديد */}
                  <div className="p-6 border border-border rounded-xl">
                    <h3 className="font-bold text-lg mb-4">اطرح سؤالك</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">سؤالك</label>
                        <textarea 
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          rows={3}
                          placeholder="اكتب سؤالك هنا..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="gap-2" onClick={submitQuestion}>
                        <MessageCircle className="w-4 h-4" />
                        إرسال السؤال
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الفيديوهات */}
            {selectedTab === 'الفيديوهات' && selectedSystem.videos && selectedSystem.videos.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <PlayCircle className="w-6 h-6" />
                    الفيديوهات التوضيحية
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedSystem.videos.map((video: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="relative rounded-xl overflow-hidden mb-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                              onClick={() => setActiveVideo(idx)}
                            >
                              <PlayCircle className="w-6 h-6 text-primary" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="flex items-center gap-2 text-white">
                              <Youtube className="w-4 h-4" />
                              <span className="text-sm">{video.title}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* قسم المستندات */}
            {selectedTab === 'المستندات' && selectedSystem.documents && selectedSystem.documents.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Download className="w-6 h-6" />
                    المستندات والكتالوجات
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {selectedSystem.documents.map((doc: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary transition-colors group cursor-pointer"
                        onClick={() => downloadPDF(doc)}
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.size}</div>
                        </div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* منظومات مشابهة */}
          {relatedSystems.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">منظومات مشابهة</h2>
                  <p className="text-muted-foreground">اكتشف منظومات أخرى بنفس النوع</p>
                </div>
                <button
                  onClick={backToList}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Carousel للمنظومات المقترحة */}
              <SystemCarousel 
                type={selectedSystem.type}
                typeSystems={relatedSystems}
              />
            </div>
          )}

          {/* مشاركة النظام */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">شارك النظام</h3>
            <div className="flex gap-3 flex-wrap">
              <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800">
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={shareSystem}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <FloatingCartButton count={cartCount} />
        <Footer />
      </div>
    );
  }

  // عرض قائمة النظم مع التنظيم حسب النوع
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={cartCount} />

      {/* Page Header مع الفلتر */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">المنظومات الشمسية</h1>
              <p className="text-muted-foreground">
                أنظمة شمسية متكاملة بجميع الأحجام والاستخدامات
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  placeholder="ابحث عن منظومة شمسية..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Filter Button */}
              <FilterButton />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="bg-card border-b border-border">
          <div className="container py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">الفلاتر المطبقة:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.searchQuery && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>بحث: "{filters.searchQuery}"</span>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {filters.types.map(type => (
                    <div key={type} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>
                        {type === 'residential' ? 'منزلية' :
                         type === 'commercial' ? 'تجارية' :
                         type === 'industrial' ? 'صناعية' :
                         type === 'agricultural' ? 'زراعية' : 'هجينة'}
                      </span>
                      <button
                        onClick={() => toggleType(type)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(filters.minPower || filters.maxPower) && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>قدرة: {filters.minPower || 0}-{filters.maxPower || '∞'} ك.و</span>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }))}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
                onClick={clearFilters}
              >
                <X className="w-4 h-4" />
                مسح الكل
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}

      <div className="container py-8">
        {/* عرض النظم حسب النوع */}
        <div className="mb-12">
          {filters.types.length > 0 ? (
            // عرض الأنواع المختارة فقط
            <div className="space-y-12">
              {Object.entries(systemsByType)
                .filter(([type]) => filters.types.includes(type))
                .map(([type, typeSystems]) => (
                  <SystemCarousel 
                    key={type}
                    type={type}
                    typeSystems={typeSystems}
                  />
                ))}
            </div>
          ) : (
            // عرض جميع الأنواع مرتبة
            <div className="space-y-12">
              {Object.entries(systemsByType).map(([type, typeSystems]) => (
                <SystemCarousel 
                  key={type}
                  type={type}
                  typeSystems={typeSystems}
                />
              ))}
            </div>
          )}
        </div>

        {filteredSystems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Zap className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">لا توجد منظومات</h3>
            <p className="text-muted-foreground mb-6">لم نعثر على منظومات تطابق معايير البحث</p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={clearFilters}
            >
              <X className="w-4 h-4" />
              مسح جميع الفلاتر
            </Button>
          </div>
        )}
      </div>

      {/* زر السلة العائم */}
      <FloatingCartButton count={cartCount} />

      {/* استيراد الفوتر */}
      <Footer />
    </div>
  );
}

// مكون SystemCard المحسن
function SystemCard({
  system,
  onAddToCart,
  onClick,
  isLoading,
}: {
  system: any;
  onAddToCart: () => void;
  onClick: () => void;
  isLoading: boolean;
}) {
  const priceInSAR = (system.price / 100).toFixed(0);
  const originalPriceInSAR = system.originalPrice ? (system.originalPrice / 100).toFixed(0) : null;

  const typeNames: Record<string, string> = {
    'residential': 'منزلي',
    'commercial': 'تجاري',
    'industrial': 'صناعي',
    'agricultural': 'زراعي',
    'hybrid': 'هجين'
  };

  const typeColors: Record<string, string> = {
    'residential': 'bg-blue-100 text-blue-800',
    'commercial': 'bg-green-100 text-green-800',
    'industrial': 'bg-orange-100 text-orange-800',
    'agricultural': 'bg-yellow-100 text-yellow-800',
    'hybrid': 'bg-purple-100 text-purple-800'
  };

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer h-full flex flex-col system-card"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {system.images && system.images[0] && (
          <img
            src={system.images[0]}
            alt={system.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${typeColors[system.type]}`}>
            {typeNames[system.type]}
          </div>
        </div>

        {/* Discount Badge */}
        {system.originalPrice && system.originalPrice > system.price && (
          <div className="absolute top-4 left-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                خصم {Math.round((1 - system.price / system.originalPrice) * 100)}%
              </div>
            </div>
          </div>
        )}

        {/* Power */}
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {system.powerCapacity} ك.و
          </div>
        </div>

        {/* Views */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {system.views}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* System Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {system.components?.length || 0} مكون
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{system.rating}</span>
            <span className="text-xs text-muted-foreground">({system.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {system.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {system.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {system.features?.slice(0, 2).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground line-clamp-1">
                {feature}
              </span>
            ))}
            {system.features?.length > 2 && (
              <span className="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary">
                +{system.features.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <span>إنتاج: {system.dailyProduction} ك.و.س</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>ضمان: {system.warranty}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {priceInSAR} ر.س
                </span>
                {originalPriceInSAR && (
                  <span className="text-sm text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                )}
              </div>
              {originalPriceInSAR && (
                <div className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  وفرت {((parseInt(originalPriceInSAR) - parseInt(priceInSAR)).toLocaleString())} ر.س
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              className="flex-1 gap-2 hover:border-primary hover:text-primary transition-all group/details"
              onClick={onClick}
            >
              <span>التفاصيل</span>
              <ArrowRight className="w-4 h-4 group-hover/details:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group/add"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={isLoading || system.stock === 0}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري...
                </div>
              ) : system.stock === 0 ? (
                "غير متوفر"
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 group-hover/add:scale-110 transition-transform" />
                  أضف للسلة
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCartButton({ count }: { count: number }) {
  return (
    <Link href="/cart">
      <div className="fixed bottom-6 left-6 z-50 group">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/90 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          {count > 0 && (
            <>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {count > 9 ? '9+' : count}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </>
          )}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-card text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            عرض السلة ({count} منتج)
          </div>
        </div>
      </div>
    </Link>
  );
}