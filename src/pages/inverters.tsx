// app/inverters/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ChevronDown, X, Star, Zap, Shield, Tag, Filter, Cpu, Power,
  TrendingUp, BadgeCheck, Truck, ShieldCheck, Clock, ArrowRight,
  ShoppingCart, Search, SlidersHorizontal, Check, ChevronLeft, ChevronRight,
  Heart, Share2, Download, PlayCircle, Eye, Package, CheckCircle, AlertCircle,
  FileText, Youtube, Facebook, Twitter, Instagram, Linkedin,
  Maximize2, Minus, Plus, Award, Users, BarChart3, ThumbsUp,
  MessageCircle, Calendar, File, DownloadCloud, BookOpen, Layers, Globe,
  TrendingDown, Thermometer, BatteryCharging, Settings, Wrench, HelpCircle,
  Brain, Lightbulb, GitCompare, BarChart, ThermometerSun, Target, Settings2,
  Cloud, Battery, Droplets, Sunrise, Sunset, Rocket, Crown, Trophy, Medal,
  Gift, Navigation, Compass, Map, Layers2, Database, Server, Network,
  Microchip, CircuitBoard, Router, Satellite, Bluetooth, Signal, SignalHigh,
  BatteryLow, BatteryMedium, PlugZap, Bolt, Flashlight, Lamp, SunDim,
  CloudSun, CloudFog, CloudSnow, Umbrella, Waves, Gauge, PieChart,
  DollarSign, Wallet, Receipt, FileBarChart, FileCode, FileImage,
  Folder, FolderPlus, FolderSearch, Wifi, Smartphone, Monitor,
  Home, Factory, Trees, CloudLightning, Droplet, Info, RocketIcon,
  Cable, Scan, LineChart, TargetIcon, Upload, Moon, BatteryFull,
  Plug, CableIcon, BarChart2, AreaChart, ScatterChart, CandlestickChart,
  Banknote, Coins, PiggyBank, ReceiptText, FileDigit, FileArchive,
  FileSpreadsheet, FileKey, FileLock, FileSearch, FileX, FileCheck,
  FilePlus, FileMinus, FileQuestion, FileWarning, FileSignature,
  FolderMinus, FolderX, FolderCheck, HardDrive, MemoryStick,
  Radio, WifiOff, SignalLow, SignalZero, ZapOff, PowerOff,
  PowerCircle, LampDesk, LampFloor, LampCeiling, LampWallUp,
  LampWallDown, SunMedium, SunSnow, CloudMoon, CloudSunRain,
  CloudMoonRain, CloudDrizzle, CloudHail, Tornado, Snowflake,
  BarChart4, DollarSignIcon, CreditCard, RefreshCw, Clock4,
  StarHalf, Percent, CpuIcon, PackageOpen, Box, Grid, Cctv,
  MousePointerClick, ScanIcon, LineChartIcon, Settings3,
  SmartphoneIcon, Tablet, Building2, BuildingIcon, FactoryIcon,
  CloudRain, ShieldOff, ThermometerIcon, Wind, CloudIcon
} from "lucide-react";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";

// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";

// استيراد نظام التخزين المشترك
import {
  loadInverterManufacturers,
  loadInverters,
  transformInvertersForDisplay,
  getInverterBrandsData
} from "@/lib/shared-storage-inverters";

// نوع المنتج المعروض
type ViewMode = 'list' | 'details';

export default function Inverters() {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [sameBrandProducts, setSameBrandProducts] = useState<any[]>([]);
  
  // إضافة هذه الحالات الجديدة
  const [selectedTab, setSelectedTab] = useState('الوصف');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  // الحالة الجديدة: فلتر الفتحات في الأعلى
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [filters, setFilters] = useState({
    brandIds: [] as number[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minPower: undefined as number | undefined,
    maxPower: undefined as number | undefined,
    minEfficiency: undefined as number | undefined,
    maxEfficiency: undefined as number | undefined,
    inverterType: [] as string[],
    sortBy: "brand" as "brand" | "price_asc" | "price_desc" | "rating" | "newest" | "power_desc" | "efficiency_desc",
    searchQuery: "" as string,
  });

  const [cartCount, setCartCount] = useState(0);
  
  // تحميل البيانات من التخزين المشترك
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allBrands, setAllBrands] = useState<any[]>([]);
  const [productsByBrand, setProductsByBrand] = useState<Record<number, any[]>>({});

  useEffect(() => {
    // تحميل البيانات عند التحميل الأول
    const manufacturers = loadInverterManufacturers();
    const inverters = loadInverters();
    
    // تحويل البيانات للعرض
    const transformedProducts = transformInvertersForDisplay(inverters, manufacturers);
    const transformedBrands = getInverterBrandsData(manufacturers);
    
    setAllProducts(transformedProducts);
    setAllBrands(transformedBrands);
    
    // تجميع المنتجات حسب الشركة
    const brandMap: Record<number, any[]> = {};
    transformedProducts.forEach(product => {
      if (!brandMap[product.manufacturerId]) {
        brandMap[product.manufacturerId] = [];
      }
      brandMap[product.manufacturerId].push(product);
    });
    
    // ترتيب المنتجات داخل كل شركة حسب السعر
    Object.keys(brandMap).forEach(brandId => {
      brandMap[parseInt(brandId)].sort((a, b) => b.price - a.price);
    });
    
    setProductsByBrand(brandMap);
  }, []);

  // الحصول على قائمة الشركات التي لديها منتجات
  const brandsWithProducts = useMemo(() => {
    return allBrands
      .filter(brand => productsByBrand[brand.id]?.length > 0)
      .sort((a, b) => (productsByBrand[b.id]?.length || 0) - (productsByBrand[a.id]?.length || 0));
  }, [allBrands, productsByBrand]);

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

  // عرض تفاصيل المنتج
  const showProductDetails = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedImage(0);
    setSelectedTab('الوصف');
    setReviewRating(0);
    setReviewComment('');
    setNewQuestion('');
    setOpenFaqs([]);
    setActiveVideo(null);
    setViewMode('details');
    
    // تحميل المنتجات المقترحة
    const related = allProducts
      .filter(p => p.manufacturerId === product.manufacturerId && p.id !== product.id)
      .slice(0, 6);
    setRelatedProducts(related);
    
    // تحميل منتجات من نفس الشركة
    const sameBrand = allProducts
      .filter(p => p.manufacturerId === product.manufacturerId && p.id !== product.id)
      .slice(0, 6);
    setSameBrandProducts(sameBrand);
  };

  // العودة للقائمة
  const backToList = () => {
    setViewMode('list');
    setSelectedProduct(null);
  };

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // فلترة حسب البحث
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.manufacturer?.toLowerCase().includes(query)
      );
    }

    // فلترة حسب العلامة التجارية
    if (filters.brandIds.length > 0) {
      filtered = filtered.filter(
        product => filters.brandIds.includes(product.manufacturerId)
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        product => product.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        product => product.price <= filters.maxPrice!
      );
    }

    // فلترة حسب القدرة
    if (filters.minPower !== undefined) {
      filtered = filtered.filter(
        product => product.powerRating >= filters.minPower!
      );
    }
    if (filters.maxPower !== undefined) {
      filtered = filtered.filter(
        product => product.powerRating <= filters.maxPower!
      );
    }

    // فلترة حسب الكفاءة
    if (filters.minEfficiency !== undefined) {
      filtered = filtered.filter(
        product => product.efficiency >= filters.minEfficiency!
      );
    }
    if (filters.maxEfficiency !== undefined) {
      filtered = filtered.filter(
        product => product.efficiency <= filters.maxEfficiency!
      );
    }

    // فلترة حسب نوع العاكس
    if (filters.inverterType.length > 0) {
      filtered = filtered.filter(
        product => filters.inverterType.includes(product.type)
      );
    }

    // الترتيب
    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "power_desc":
        filtered.sort((a, b) => b.powerRating - a.powerRating);
        break;
      case "efficiency_desc":
        filtered.sort((a, b) => b.efficiency - a.efficiency);
        break;
      case "brand":
      default:
        // الترتيب حسب العلامة التجارية أولاً، ثم حسب السعر
        filtered.sort((a, b) => {
          if (a.manufacturerId !== b.manufacturerId) {
            return a.manufacturerId - b.manufacturerId;
          }
          return b.price - a.price;
        });
        break;
    }

    return filtered;
  }, [allProducts, filters]);

  // دالة إضافة للسلة
  const handleAddToCart = (product: any, qty = quantity) => {
    const productName = product.name;
    
    if (!isAuthenticated) {
      // إضافة للسلة المحلية للزوار
      localCart.addItem(product.id, qty);
      
      // إظهار إشعار
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${productName} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      // للمستخدمين المسجلين
      toast.success(`تمت إضافة المنتج إلى السلة`);
      console.log(`Adding product ${product.id} to cart with quantity ${qty}`);
    }
    
    // تحديث عدد السلة
    setCartCount(prev => prev + qty);
  };

  const toggleBrand = (brandId: number) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
    }));
  };

  const toggleInverterType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      inverterType: prev.inverterType.includes(type)
        ? prev.inverterType.filter((t) => t !== type)
        : [...prev.inverterType, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      brandIds: [],
      minPrice: undefined,
      maxPrice: undefined,
      minPower: undefined,
      maxPower: undefined,
      minEfficiency: undefined,
      maxEfficiency: undefined,
      inverterType: [],
      sortBy: "brand",
      searchQuery: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.brandIds.length > 0 ||
      filters.inverterType.length > 0 ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.minPower !== undefined ||
      filters.maxPower !== undefined ||
      filters.minEfficiency !== undefined ||
      filters.maxEfficiency !== undefined
    );
  }, [filters]);

  // مشاركة المنتج
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: selectedProduct.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط المنتج");
    }
  };

  // تحميل ملف PDF
  const downloadPDF = (document: any) => {
    toast.success(`جاري تحميل ${document.name}`, {
      description: "سيبدأ التحميل تلقائياً خلال لحظات",
      duration: 3000,
    });
  };

  // تحميل الكتالوج
  const downloadCatalog = () => {
    toast.success("جاري تحميل الكتالوج", {
      description: "سيتم تحميل ملف PDF يحتوي على جميع تفاصيل المنتج",
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
  const calculateBulkPrice = (product: any, qty: number) => {
    if (!product.bulkPricing) return product.price * qty;
    
    const pricing = product.bulkPricing.find((p: any) => 
      qty >= p.minQty && qty <= p.maxQty
    ) || product.bulkPricing[0];
    
    return pricing.price * qty;
  };

  // مكون Carousel قابل لإعادة الاستخدام
  const BrandCarousel = ({ brand, brandProducts }: { brand: any, brandProducts: any[] }) => {
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
        const cardWidth = container.querySelector('.product-card')?.clientWidth || 320;
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

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white p-2 rounded-xl shadow-md">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{brand.name}</h2>
              <p className="text-muted-foreground">{brand.description}</p>
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

          {/* المنتجات */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={checkScroll}
          >
            {brandProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <InverterCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => showProductDetails(product)}
                  isLoading={false}
                  brand={brand}
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
              الفلاتر والترتيب
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
              <h3 className="font-bold text-lg mb-3">ترتيب المنتجات</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "brand", label: "حسب العلامة التجارية", icon: <Tag className="w-4 h-4" /> },
                  { value: "newest", label: "الأحدث أولاً", icon: <Zap className="w-4 h-4" /> },
                  { value: "rating", label: "الأعلى تقييماً", icon: <Star className="w-4 h-4" /> },
                  { value: "price_desc", label: "السعر: من الأعلى للأقل", icon: <TrendingUp className="w-4 h-4" /> },
                  { value: "price_asc", label: "السعر: من الأقل للأعلى", icon: <TrendingDown className="w-4 h-4" /> },
                  { value: "power_desc", label: "القدرة: من الأعلى للأقل", icon: <Power className="w-4 h-4" /> },
                  { value: "efficiency_desc", label: "الكفاءة: من الأعلى للأقل", icon: <BarChart3 className="w-4 h-4" /> }
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

            {/* العلامات التجارية */}
            <div>
              <h3 className="font-bold text-lg mb-3">العلامات التجارية</h3>
              <div className="grid grid-cols-2 gap-3">
                {allBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => toggleBrand(brand.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.brandIds.includes(brand.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-border overflow-hidden flex items-center justify-center">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium flex-1 text-right">{brand.name}</span>
                    {filters.brandIds.includes(brand.id) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* نوع العاكس */}
            <div>
              <h3 className="font-bold text-lg mb-3">نوع العاكس</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "string", label: "عاكس سترينج", icon: <Cpu className="w-4 h-4" /> },
                  { value: "micro", label: "عاكس مايكرو", icon: <Cpu className="w-4 h-4" /> },
                  { value: "hybrid", label: "عاكس هجين", icon: <Battery className="w-4 h-4" /> },
                  { value: "off-grid", label: "منفصل عن الشبكة", icon: <PowerOff className="w-4 h-4" /> },
                  { value: "central", label: "عاكس مركزي", icon: <Server className="w-4 h-4" /> }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleInverterType(type.value)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.inverterType.includes(type.value)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {type.icon}
                    <span className="text-sm font-medium flex-1 text-right">{type.label}</span>
                    {filters.inverterType.includes(type.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* القدرة */}
            <div>
              <h3 className="font-bold text-lg mb-3">القدرة (كيلووات)</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((power) => (
                  <button
                    key={power}
                    onClick={() => {
                      if (filters.minPower === power - 1 && filters.maxPower === power) {
                        setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minPower: power - 1, 
                          maxPower: power 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minPower === power - 1 && filters.maxPower === power
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

  // وصف المنتج المنظم
  const getProductDescription = (product: any) => {
    const typeNames: Record<string, string> = {
      'string': 'عاكس سترينج',
      'micro': 'عاكس مايكرو',
      'hybrid': 'عاكس هجين',
      'off-grid': 'عاكس منفصل عن الشبكة',
      'central': 'عاكس مركزي'
    };

    return {
      mainDescription: product.description || `${typeNames[product.type] || product.type} بقدرة ${product.powerRating} كيلووات من صنع ${product.manufacturer}. يتميز بكفاءة تصل إلى ${product.efficiency}% مما يجعله من أفضل الخيارات في السوق.`,
      
      features: product.mainFeatures || [
        `كفاءة ${product.efficiency}%`,
        `جهد دخل ${product.inputVoltage?.min || 150}-${product.inputVoltage?.max || 800}V`,
        `${product.mpptCount || 1} MPPT`,
        `ضمان ${product.warranty?.product || '5 سنوات'}`,
        ...product.communication?.wifi ? ["WiFi متصل"] : [],
        ...product.protection?.features?.slice(0, 2) || []
      ],
      
      usageAreas: [
        "المنازل السكنية",
        "المشاريع التجارية الصغيرة",
        "المتاجر والمحال",
        "المكاتب",
        "المشاريع الزراعية"
      ],
      
      technicalAdvantages: [
        `كفاءة تحويل تصل إلى ${product.maxEfficiency || product.efficiency + 0.5}%`,
        "نطاق جهد دخل واسع",
        "تصميم مقاوم للعوامل الجوية",
        "مراقبة ذكية عبر الهاتف",
        "سهولة التركيب والصيانة"
      ]
    };
  };

  // بيانات الأسئلة الشائعة
  const faqs = [
    {
      question: "ما هي مدة الضمان على هذا العاكس؟",
      answer: selectedProduct?.warranty?.product ? `يأتي العاكس بضمان منتج لمدة ${selectedProduct.warranty.product} وضمان أداء لمدة ${selectedProduct.warranty.performance || '10 سنوات'}.` : "يأتي العاكس بضمان منتج لمدة 5 سنوات وضمان أداء لمدة 10 سنوات."
    },
    {
      question: "هل يمكن توصيله مع أي نوع من الألواح الشمسية؟",
      answer: selectedProduct?.compatiblePanels?.length > 0 
        ? `نعم، يتوافق مع الألواح التالية: ${selectedProduct.compatiblePanels.map((p: any) => `${p.brand} (${p.minPower}-${p.maxPower}W)`).join(', ')}.`
        : "نعم، يتوافق مع معظم أنواع الألواح الشمسية الشائعة في السوق."
    },
    {
      question: "هل يحتاج إلى صيانة دورية؟",
      answer: "نعم، ينصح بالصيانة الدورية كل 6-12 شهر حسب شروط التشغيل، وتشمل تنظيف الجهاز وفحص الوصلات الكهربائية."
    },
    {
      question: "ما هي درجة حرارة التشغيل المناسبة؟",
      answer: "يعمل العاكس بكفاءة في درجات حرارة تتراوح بين -25°C إلى +60°C، مع أداء مثالي بين 20°C إلى 40°C."
    },
    {
      question: "هل يدعم المراقبة عن بعد؟",
      answer: selectedProduct?.communication?.wifi || selectedProduct?.communication?.bluetooth 
        ? "نعم، يدعم المراقبة عن بعد عبر تطبيق الهاتف الذكي مع اتصال WiFi/بلوتوث."
        : "هذا الموديل يدعم المراقبة المحلية عبر الشاشة المدمجة، ويتوفر ملحق للمراقبة عن بعد."
    }
  ];

  // عرض صفحة تفاصيل المنتج
  if (viewMode === 'details' && selectedProduct) {
    const brand = allBrands.find(b => b.id === selectedProduct.manufacturerId);
    const basePrice = selectedProduct.price / 100;
    const totalPrice = calculateBulkPrice(selectedProduct, quantity) / 100;
    const originalPriceInSAR = selectedProduct.originalPrice ? (selectedProduct.originalPrice / 100).toFixed(0) : null;
    const discountPercentage = originalPriceInSAR ? Math.round((1 - basePrice / parseInt(originalPriceInSAR)) * 100) : 0;
    const description = getProductDescription(selectedProduct);

    // تحسين التبويبات للجوال
    const tabs = ['الوصف', 'المواصفات', 'التوافق', 'التقييمات', 'الأسئلة الشائعة', 'الفيديوهات', 'المستندات'];

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header cartCount={cartCount} />
        
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={backToList} className="text-primary hover:underline">
              العواكس الشمسية
            </button>
            <ChevronLeft className="w-4 h-4" />
            {brand && (
              <>
                <button onClick={backToList} className="text-primary hover:underline">
                  {brand.name}
                </button>
                <ChevronLeft className="w-4 h-4" />
              </>
            )}
            <span className="text-muted-foreground truncate">{selectedProduct.name}</span>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* الصور */}
            <div>
              {/* الصورة الرئيسية */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl mb-4">
                <img
                  src={selectedProduct.images[selectedImage]?.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-[400px] object-contain"
                />
                
                {/* علامات */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {selectedProduct.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary text-white text-xs rounded-full font-bold">
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-bold">
                    {selectedProduct.type === 'string' ? 'سترينج' : 
                     selectedProduct.type === 'micro' ? 'مايكرو' :
                     selectedProduct.type === 'hybrid' ? 'هجين' :
                     selectedProduct.type === 'off-grid' ? 'منفصل' : 'مركزي'}
                  </span>
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
                {selectedProduct.images?.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${selectedProduct.name} ${idx + 1}`}
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
                  <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={shareProduct}
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
                    <span className="font-bold text-lg">{selectedProduct.rating}</span>
                    <span className="text-muted-foreground">({selectedProduct.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{selectedProduct.views} مشاهدة</span>
                  </div>
                  <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {selectedProduct.sku}
                  </div>
                </div>
              </div>

              {/* العلامة التجارية */}
              {brand && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-xl">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{brand.name}</div>
                    <div className="text-sm text-muted-foreground">{brand.description}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={backToList}>
                    جميع المنتجات
                  </Button>
                </div>
              )}

              {/* المواصفات السريعة */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Power className="w-5 h-5 text-blue-600" />
                    <span className="font-bold">القدرة</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{selectedProduct.powerRating} ك.و</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span className="font-bold">الكفاءة</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">{selectedProduct.efficiency}%</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-purple-600" />
                    <span className="font-bold">MPPT</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700">{selectedProduct.mpptCount}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                    <span className="font-bold">الضمان</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-700">{selectedProduct.warranty?.product}</div>
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
                      {quantity} × {basePrice.toFixed(0)} ر.س للوح الواحد
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">المخزون:</div>
                    <div className={`text-lg font-bold ${
                      selectedProduct.stock > 20 ? 'text-green-600' : 
                      selectedProduct.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} قطعة متوفرة` : 'نفذت الكمية'}
                    </div>
                  </div>
                </div>

                {/* كمية المنتجات الإضافية */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">الكمية:</span>
                    <span className="text-sm text-muted-foreground">
                      {quantity >= 11 ? `خصم ${selectedProduct.bulkPricing?.find((p: any) => quantity >= p.minQty && quantity <= p.maxQty)?.discount || 0}%` : ''}
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
                      onClick={() => handleAddToCart(selectedProduct, quantity)}
                      disabled={selectedProduct.stock === 0}
                    >
                      <ShoppingCart className="w-5 h-5 ml-2" />
                      {selectedProduct.stock === 0 ? 'نفذت الكمية' : `أضف ${quantity} إلى السلة`}
                    </Button>
                  </div>
                </div>
              </div>

              {/* جدول الأسعار بالجملة */}
              {selectedProduct.bulkPricing && (
                <div className="mb-6 p-4 border border-border rounded-xl">
                  <h3 className="font-bold mb-3">أسعار الجملة:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedProduct.bulkPricing.map((pricing: any, idx: number) => (
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
                    <div className="font-bold">{selectedProduct.delivery}</div>
                    <div className="text-sm text-muted-foreground">{selectedProduct.deliveryTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold">ضمان {selectedProduct.warranty?.product}</div>
                    <div className="text-sm text-muted-foreground">على المنتج</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Package className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-bold">سهولة التركيب</div>
                    <div className="text-sm text-muted-foreground">دليل تركيب مفصل</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Wifi className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="font-bold">مراقبة ذكية</div>
                    <div className="text-sm text-muted-foreground">عبر الهاتف</div>
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
                    وصف المنتج
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
                        <Zap className="w-6 h-6" />
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
                        <Home className="w-6 h-6" />
                        مجالات الاستخدام
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {description.usageAreas.map((area: string, idx: number) => (
                          <div key={idx} className="text-center p-6 bg-white border border-blue-200 rounded-xl hover:border-blue-400 transition-colors">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                              <Home className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-800">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* المزايا التقنية */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Cpu className="w-6 h-6" />
                        المزايا التقنية
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {description.technicalAdvantages.map((advantage: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-green-200">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-800">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم المواصفات */}
            {selectedTab === 'المواصفات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    المواصفات الفنية
                  </h2>
                  
                  {/* جدول المواصفات */}
                  <div className="overflow-hidden rounded-xl border border-border mb-8">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(selectedProduct.technicalSpecs || {}).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                            <td className="p-4 font-medium border-r border-border w-1/3">{key}</td>
                            <td className="p-4">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* معلومات إضافية */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">الحماية والسلامة</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {selectedProduct.protection?.features?.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Wifi className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">الاتصالات</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedProduct.communication?.wifi && (
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4" />
                            <span>WiFi</span>
                          </div>
                        )}
                        {selectedProduct.communication?.bluetooth && (
                          <div className="flex items-center gap-2">
                            <Bluetooth className="w-4 h-4" />
                            <span>بلوتوث</span>
                          </div>
                        )}
                        {selectedProduct.communication?.ethernet && (
                          <div className="flex items-center gap-2">
                            <Cable className="w-4 h-4" />
                            <span>إيثرنت</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">الشهادات</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {selectedProduct.certifications?.map((cert: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم التوافق */}
            {selectedTab === 'التوافق' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Cpu className="w-6 h-6" />
                    التوافق مع الألواح الشمسية
                  </h2>

                  {/* جدول التوافق */}
                  {selectedProduct.compatiblePanels && selectedProduct.compatiblePanels.length > 0 && (
                    <div className="overflow-hidden rounded-xl border border-border mb-8">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="p-4 text-right">العلامة التجارية</th>
                            <th className="p-4 text-center">القدرة الدنيا</th>
                            <th className="p-4 text-center">القدرة القصوى</th>
                            <th className="p-4 text-center">الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProduct.compatiblePanels.map((panel: any, idx: number) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                              <td className="p-4 font-medium">{panel.brand}</td>
                              <td className="p-4 text-center">{panel.minPower}W</td>
                              <td className="p-4 text-center">{panel.maxPower}W</td>
                              <td className="p-4 text-center">
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  متوافق
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* نصائح التوافق */}
                  <div className="p-6 border border-border rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">نصائح للتوافق الأمثل</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <span className="font-medium">عدد الألواح المناسب</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedProduct.powerRating * 1000 / 400} لوح شمسي بقدرة 400 واط لكل عاكس
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <span className="font-medium">التوصيل المثالي</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            توصيل الألواح في سلاسل متوازنة للحصول على أفضل أداء
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <span className="font-medium">تجنب الظل</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            تجنب وضع الألواح في مناطق الظل لضمان كفاءة التحويل القصوى
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم التقييمات */}
            {selectedTab === 'التقييمات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    تقييمات العملاء
                  </h2>

                  {/* ملخص التقييمات */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* متوسط التقييم */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{selectedProduct.rating}</div>
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-8 h-8 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-muted-foreground">
                          بناءً على {selectedProduct.reviewCount} تقييم
                        </div>
                      </div>
                    </div>
                  </div>

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
                          placeholder="شاركنا تجربتك مع المنتج..."
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
                    {faqs.map((faq, idx) => (
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
            {selectedTab === 'الفيديوهات' && selectedProduct.videos && selectedProduct.videos.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <PlayCircle className="w-6 h-6" />
                    الفيديوهات التوضيحية
                  </h2>

                  {/* قائمة الفيديوهات */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedProduct.videos.map((video: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="relative rounded-xl overflow-hidden mb-3">
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <PlayCircle className="w-12 h-12 text-gray-400" />
                          </div>
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
            {selectedTab === 'المستندات' && selectedProduct.documents && selectedProduct.documents.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Download className="w-6 h-6" />
                    المستندات والكتالوجات
                  </h2>

                  {/* قائمة المستندات */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {selectedProduct.documents.map((doc: any, idx: number) => (
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
                          <div className="text-sm text-muted-foreground">2.4 MB</div>
                        </div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* منتجات من نفس الشركة */}
          {sameBrandProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">منتجات أخرى من {brand?.name}</h2>
                  <p className="text-muted-foreground">اكتشف المزيد من منتجات هذه العلامة التجارية</p>
                </div>
                <Button variant="outline" className="gap-2" onClick={backToList}>
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Carousel لمنتجات نفس الشركة */}
              <BrandCarousel brand={brand} brandProducts={sameBrandProducts} />
            </div>
          )}

          {/* منتجات قد تعجبك */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">منتجات قد تعجبك</h2>
                  <p className="text-muted-foreground">اكتشف منتجات مشابهة بناءً على اختياراتك</p>
                </div>
                <button
                  onClick={backToList}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Carousel للمنتجات المقترحة */}
              <BrandCarousel 
                brand={{ name: "مقترحة", logo: "https://cdn-icons-png.flaticon.com/512/929/929416.png", description: "منتجات مقترحة لك" }} 
                brandProducts={relatedProducts} 
              />
            </div>
          )}

          {/* مشاركة المنتج */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">شارك المنتج</h3>
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
                onClick={shareProduct}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* معلومات الشركة */}
          {brand && (
            <div className="mt-12 p-6 border border-border rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                  <p className="text-muted-foreground">{brand.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.established}</div>
                  <div className="text-sm text-muted-foreground">سنة التأسيس</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.products}+</div>
                  <div className="text-sm text-muted-foreground">منتج</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.countries}</div>
                  <div className="text-sm text-muted-foreground">دولة</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.rating}</div>
                  <div className="text-sm text-muted-foreground">تقييم</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <FloatingCartButton count={cartCount} />
        <Footer />
      </div>
    );
  }

  // عرض قائمة المنتجات مع التنظيم حسب الشركات
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={cartCount} />

      {/* Page Header مع الفلتر */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">العواكس الشمسية</h1>
              <p className="text-muted-foreground">
                اكتشف أفضل العواكس الشمسية بجودة عالمية وكفاءة تحويل عالية
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  placeholder="ابحث عن عاكس شمسي..."
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
                  {filters.brandIds.map(brandId => (
                    <div key={brandId} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>{allBrands?.find(b => b.id === brandId)?.name}</span>
                      <button
                        onClick={() => toggleBrand(brandId)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {filters.inverterType.map(type => {
                    const typeNames: Record<string, string> = {
                      'string': 'سترينج',
                      'micro': 'مايكرو',
                      'hybrid': 'هجين',
                      'off-grid': 'منفصل',
                      'central': 'مركزي'
                    };
                    return (
                      <div key={type} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                        <span>نوع: {typeNames[type] || type}</span>
                        <button
                          onClick={() => toggleInverterType(type)}
                          className="hover:bg-primary/20 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
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
        {/* عرض المنتجات حسب الشركات */}
        <div className="mb-12">
          {filters.brandIds.length > 0 ? (
            // عرض الشركات المختارة فقط
            <div className="space-y-12">
              {brandsWithProducts
                .filter(brand => filters.brandIds.includes(brand.id))
                .map((brand) => (
                  <BrandCarousel 
                    key={brand.id} 
                    brand={brand} 
                    brandProducts={productsByBrand[brand.id] || []} 
                  />
                ))}
            </div>
          ) : (
            // عرض جميع الشركات مرتبة حسب عدد المنتجات
            <div className="space-y-12">
              {brandsWithProducts.map((brand) => (
                <BrandCarousel 
                  key={brand.id} 
                  brand={brand} 
                  brandProducts={productsByBrand[brand.id] || []} 
                />
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Zap className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">لا توجد منتجات</h3>
            <p className="text-muted-foreground mb-6">لم نعثر على منتجات تطابق معايير البحث</p>
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

// مكون InverterCard المحسن
function InverterCard({
  product,
  onAddToCart,
  onClick,
  isLoading,
  brand,
}: {
  product: any;
  onAddToCart: () => void;
  onClick: () => void;
  isLoading: boolean;
  brand?: any;
}) {
  const priceInSAR = (product.price / 100).toFixed(0);
  const originalPriceInSAR = product.originalPrice ? (product.originalPrice / 100).toFixed(0) : null;
  const typeNames: Record<string, string> = {
    'string': 'سترينج',
    'micro': 'مايكرو',
    'hybrid': 'هجين',
    'off-grid': 'منفصل عن الشبكة',
    'central': 'مركزي'
  };

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer h-full flex flex-col product-card"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {product.images && product.images[0] && (
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Brand Logo */}
        {brand?.logo && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="w-16 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'w-16 h-6 bg-muted flex items-center justify-center rounded';
                fallbackDiv.innerHTML = `<span class="text-xs font-bold">${brand.name}</span>`;
                e.target.parentNode?.appendChild(fallbackDiv);
              }}
            />
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            </div>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 right-16">
          <div className="px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-700">
            {typeNames[product.type] || product.type}
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${
            product.stock > 20 
              ? "bg-green-500/20 text-green-700" 
              : product.stock > 5 
              ? "bg-yellow-500/20 text-yellow-700"
              : "bg-red-500/20 text-red-700"
          }`}>
            {product.stock > 20 ? (
              <>
                <BadgeCheck className="w-3 h-3" />
                متوفر
              </>
            ) : product.stock > 5 ? (
              <>
                <Clock className="w-3 h-3" />
                آخر قطع
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                تقريباً نفذ
              </>
            )}
          </div>
        </div>

        {/* Views */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
            <Power className="w-3 h-3" />
            {product.powerRating} ك.و
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {product.mainFeatures?.slice(0, 2).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {feature}
              </span>
            ))}
            {product.mainFeatures?.length > 2 && (
              <span className="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary">
                +{product.mainFeatures.length - 2}
              </span>
            )}
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
              disabled={isLoading || product.stock === 0}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري...
                </div>
              ) : product.stock === 0 ? (
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