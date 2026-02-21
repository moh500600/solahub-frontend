// app/batteries/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ChevronDown, X, Star, Battery as BatteryIcon, Zap, Shield, Tag, Filter,
  Power, BatteryCharging, Thermometer, Clock, TrendingUp,
  Truck, ShieldCheck, Package, Eye, ShoppingCart, Search,
  SlidersHorizontal, Check, ChevronLeft, ChevronRight,
  Heart, Share2, Download, PlayCircle, CheckCircle, AlertCircle,
  FileText, Youtube, Facebook, Twitter, Instagram, Linkedin,
  Maximize2, Minus, Plus, Award, Users, BarChart3, ThumbsUp,
  MessageCircle, Calendar, File, DownloadCloud, BookOpen,
  Globe, Settings, Wrench, HelpCircle, Brain, Lightbulb,
  GitCompare, BarChart, ThermometerSun, Target, Settings2,
  Cloud, Droplets, Sunrise, Sunset, Rocket, Crown, Trophy,
  Medal, Gift, Navigation, Compass, Map, Layers2, Database,
  Server, Network, Microchip, CircuitBoard, Router, Satellite,
  Bluetooth, Signal, SignalHigh, Bolt, Flashlight, Lamp, SunDim,
  CloudSun, CloudFog, CloudSnow, Umbrella, Waves, Gauge, PieChart,
  DollarSign, Wallet, Receipt, FileBarChart, FileCode, FileImage,
  Folder, FolderPlus, FolderSearch, BadgeCheck, Cpu, Store, Building,
  Factory, TreePine, Home, Hospital
} from "lucide-react";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";

// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";

// استيراد نظام تخزين البطاريات - القيم فقط
import {
  loadBatteryManufacturers,
  loadBatteries,
  getBatteryBrandsData,
  defaultBatteries,
  defaultBatteryManufacturers
} from "@/lib/battery-storage";

// استيراد الأنواع فقط مع إعادة تسميتها
import type { Battery as BatteryType, BatteryManufacturer as BatteryManufacturerType } from "@/lib/battery-storage";

// نوع المنتج المعروض
type ViewMode = 'list' | 'details';

// تحويل نوع البطارية إلى اسم عربي
const getBatteryTypeName = (type: string): string => {
  const typeMap: Record<string, string> = {
    "LiFePO4": "فوسفات حديد ليثيوم",
    "Lithium-ion": "ليثيوم أيون",
    "Lead-acid": "رصاص حمضي",
    "Gel": "بطارية الجل",
    "AGM": "بطارية AGM"
  };
  return typeMap[type] || type;
};

// دالة تحميل الانفرترات
export const loadInverters = (): any[] => {
  return [
    {
      id: "inv1",
      name: "انفرتر هجين 5كيلوواط",
      type: "Hybrid",
      power: 5000,
      price: 450000 // بالسنت
    },
    {
      id: "inv2",
      name: "انفرتر منفصل 3كيلوواط",
      type: "Off-grid",
      power: 3000,
      price: 280000
    },
    {
      id: "inv3",
      name: "انفرتر متصل 10كيلوواط",
      type: "On-grid",
      power: 10000,
      price: 850000
    }
  ];
};

// دالة تحويل البطاريات للعرض
export const transformBatteriesForDisplay = (batteries: BatteryType[], manufacturers: BatteryManufacturerType[]): any[] => {
  return batteries.map(battery => {
    const manufacturer = manufacturers.find(m => m.id === battery.manufacturerId);
    const priceInCents = battery.price * 100; // تحويل للعملة المحلية
    const originalPrice = battery.discount > 0 ? priceInCents * (100 / (100 - battery.discount)) : null;
    
    return {
      id: parseInt(battery.id),
      brandId: parseInt(battery.manufacturerId),
      brandName: manufacturer?.name || 'غير معروف',
      name: battery.name,
      description: battery.description,
      price: priceInCents,
      originalPrice: originalPrice ? Math.round(originalPrice) : null,
      capacity: battery.capacity,
      voltage: battery.voltage,
      power: battery.power * 1000, // تحويل للواط
      type: battery.type,
      efficiency: battery.efficiency,
      cycleLife: battery.cycleLife,
      depthOfDischarge: battery.depthOfDischarge,
      rating: battery.rating,
      reviewCount: battery.reviews,
      stock: battery.quantity,
      images: battery.images.map((url: string, index: number) => ({
        id: index + 1,
        imageUrl: url,
        isPrimary: index === 0
      })),
      warranty: battery.warranty,
      delivery: "توصيل مجاني",
      deliveryTime: "3-5 أيام عمل",
      weight: battery.weight,
      dimensions: battery.dimensions,
      temperatureRange: battery.temperatureRange,
      views: Math.floor(Math.random() * 500) + 100,
      sku: battery.sku || `SKU-${battery.id}`,
      certifications: battery.certifications,
      features: battery.features,
      specifications: battery.specifications,
      applications: battery.applications,
      accessories: battery.accessories,
      installationTime: battery.installationTime,
      maintenanceServices: battery.maintenanceServices,
      maintenancePackages: battery.maintenancePackages,
      faqs: battery.faqs,
      videos: battery.videos,
      documents: battery.documents,
      bulkPricing: battery.pricing?.bulkDiscounts.map(d => ({
        minQty: d.quantity,
        maxQty: d.quantity * 2,
        price: (battery.price * 100) * (1 - d.discount / 100),
        discount: d.discount
      })) || []
    };
  });
};

// مكون BatteryCard المحسن
function BatteryCard({
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
  const batteryTypeName = getBatteryTypeName(product.type);
  const powerInKwh = (product.power / 1000).toFixed(1);

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
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        )}
        
        {/* نوع البطارية */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full">
            {batteryTypeName}
          </div>
        </div>
        
        {/* Brand Logo */}
        {brand?.logo && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="w-16 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-12 right-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            </div>
          </div>
        )}

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
                <CheckCircle className="w-3 h-3" />
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
        {/* Battery Type & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
            <BatteryIcon className="w-3 h-3" />
            {product.capacity}ك.و.س / {product.voltage}فولت
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

        {/* Technical Specs */}
        <div className="mb-4 flex-1">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-600 mb-1">الطاقة</div>
              <div className="font-bold">{powerInKwh} ك.و.س</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-xs text-green-600 mb-1">الكفاءة</div>
              <div className="font-bold">{product.efficiency}%</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="text-xs text-purple-600 mb-1">الدورات</div>
              <div className="font-bold">{product.cycleLife.toLocaleString()}</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-xs text-orange-600 mb-1">التفريغ</div>
              <div className="font-bold">{product.depthOfDischarge}%</div>
            </div>
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
              <ChevronLeft className="w-4 h-4 group-hover/details:-translate-x-1 transition-transform" />
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

export default function BatteriesPage() {
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

  // الحالة الجديدة: فلتر الفتحات في الأعلى
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [filters, setFilters] = useState({
    brandIds: [] as number[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minCapacity: undefined as number | undefined,
    maxCapacity: undefined as number | undefined,
    types: [] as string[],
    minEfficiency: undefined as number | undefined,
    maxEfficiency: undefined as number | undefined,
    sortBy: "brand" as "brand" | "price_asc" | "price_desc" | "rating" | "capacity_desc",
    searchQuery: "" as string,
  });

  const [cartCount, setCartCount] = useState(0);
  
  // تحميل البيانات من التخزين
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allBrands, setAllBrands] = useState<any[]>([]);
  const [productsByBrand, setProductsByBrand] = useState<Record<number, any[]>>({});
  const [inverters, setInverters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      // تحميل البيانات عند التحميل الأول
      const manufacturers = loadBatteryManufacturers();
      const batteries = loadBatteries();
      const inverterData = loadInverters();
      
      // استخدام البيانات الافتراضية إذا كانت localStorage فارغة
      const finalManufacturers = manufacturers.length > 0 ? manufacturers : defaultBatteryManufacturers;
      const finalBatteries = batteries.length > 0 ? batteries : defaultBatteries;
      
      // تحويل البيانات للعرض
      const transformedProducts = transformBatteriesForDisplay(finalBatteries, finalManufacturers);
      const transformedBrands = getBatteryBrandsData(finalManufacturers);
      
      setAllProducts(transformedProducts);
      setAllBrands(transformedBrands);
      setInverters(inverterData);
      
      // تجميع المنتجات حسب الشركة
      const brandMap: Record<number, any[]> = {};
      transformedProducts.forEach(product => {
        if (!brandMap[product.brandId]) {
          brandMap[product.brandId] = [];
        }
        brandMap[product.brandId].push(product);
      });
      
      // ترتيب المنتجات داخل كل شركة حسب السعر
      Object.keys(brandMap).forEach(brandId => {
        brandMap[parseInt(brandId)].sort((a, b) => b.price - a.price);
      });
      
      setProductsByBrand(brandMap);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("حدث خطأ في تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
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
    setViewMode('details');
    
    // تحميل المنتجات المقترحة
    const related = allProducts
      .filter(p => p.brandId === product.brandId && p.id !== product.id)
      .slice(0, 6);
    setRelatedProducts(related);
    
    // تحميل منتجات من نفس الشركة
    const sameBrand = allProducts
      .filter(p => p.brandId === product.brandId && p.id !== product.id)
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
          product.description.toLowerCase().includes(query)
      );
    }

    // فلترة حسب العلامة التجارية
    if (filters.brandIds.length > 0) {
      filtered = filtered.filter(
        product => filters.brandIds.includes(product.brandId)
      );
    }

    // فلترة حسب السعة
    if (filters.minCapacity !== undefined) {
      filtered = filtered.filter(
        product => product.capacity >= filters.minCapacity!
      );
    }
    if (filters.maxCapacity !== undefined) {
      filtered = filtered.filter(
        product => product.capacity <= filters.maxCapacity!
      );
    }

    // فلترة حسب النوع
    if (filters.types.length > 0) {
      filtered = filtered.filter(
        product => filters.types.includes(product.type)
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
      case "capacity_desc":
        filtered.sort((a, b) => b.capacity - a.capacity);
        break;
      case "brand":
      default:
        // الترتيب حسب العلامة التجارية أولاً، ثم حسب السعر
        filtered.sort((a, b) => {
          if (a.brandId !== b.brandId) {
            return a.brandId - b.brandId;
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

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      brandIds: [],
      minPrice: undefined,
      maxPrice: undefined,
      minCapacity: undefined,
      maxCapacity: undefined,
      types: [],
      minEfficiency: undefined,
      maxEfficiency: undefined,
      sortBy: "brand",
      searchQuery: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.brandIds.length > 0 ||
      filters.types.length > 0 ||
      filters.minCapacity !== undefined ||
      filters.maxCapacity !== undefined ||
      filters.minEfficiency !== undefined ||
      filters.maxEfficiency !== undefined
    );
  }, [filters]);

  // مشاركة المنتج
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct?.name || '',
        text: selectedProduct?.description || '',
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
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Logo';
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{brand.name}</h2>
              <p className="text-muted-foreground">{brand.description}</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            عرض الكل
            <ChevronLeft className="w-4 h-4" />
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
                <BatteryCard
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
                  { value: "capacity_desc", label: "الأعلى سعة أولاً", icon: <BatteryIcon className="w-4 h-4" /> },
                  { value: "rating", label: "الأعلى تقييماً", icon: <Star className="w-4 h-4" /> },
                  { value: "price_desc", label: "السعر: من الأعلى للأقل", icon: <TrendingUp className="w-4 h-4" /> },
                  { value: "price_asc", label: "السعر: من الأقل للأعلى", icon: <TrendingUp className="w-4 h-4 rotate-180" /> }
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
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Logo';
                        }}
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

            {/* أنواع البطاريات */}
            <div>
              <h3 className="font-bold text-lg mb-3">نوع البطارية</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "LiFePO4", label: "فوسفات حديد ليثيوم", icon: <BatteryCharging className="w-4 h-4" /> },
                  { value: "Lithium-ion", label: "ليثيوم أيون", icon: <BatteryIcon className="w-4 h-4" /> },
                  { value: "Lead-acid", label: "رصاص حمضي", icon: <BatteryIcon className="w-4 h-4" /> },
                  { value: "Gel", label: "جل", icon: <Droplets className="w-4 h-4" /> },
                  { value: "AGM", label: "AGM", icon: <Shield className="w-4 h-4" /> }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleType(type.value)}
                    className={`p-3 rounded-lg border flex items-center gap-2 text-center transition-all ${
                      filters.types.includes(type.value)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {type.icon}
                    <span className="text-sm font-medium flex-1">{type.label}</span>
                    {filters.types.includes(type.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* السعة */}
            <div>
              <h3 className="font-bold text-lg mb-3">السعة (ك.و.س)</h3>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15, 20, 30, 50].map((capacity) => (
                  <button
                    key={capacity}
                    onClick={() => {
                      if (filters.minCapacity === capacity - 5 && filters.maxCapacity === capacity) {
                        setFilters(prev => ({ ...prev, minCapacity: undefined, maxCapacity: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minCapacity: capacity - 5, 
                          maxCapacity: capacity 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minCapacity === capacity - 5 && filters.maxCapacity === capacity
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{capacity}ك.و.س</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأدنى</label>
                  <input
                    type="number"
                    value={filters.minCapacity || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minCapacity: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))
                    }
                    placeholder="0"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأعلى</label>
                  <input
                    type="number"
                    value={filters.maxCapacity || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxCapacity: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))
                    }
                    placeholder="100"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>

            {/* الكفاءة */}
            <div>
              <h3 className="font-bold text-lg mb-3">الكفاءة (%)</h3>
              <div className="grid grid-cols-3 gap-2">
                {[85, 90, 95, 98, 99].map((eff) => (
                  <button
                    key={eff}
                    onClick={() => {
                      if (filters.minEfficiency === eff - 5 && filters.maxEfficiency === eff) {
                        setFilters(prev => ({ ...prev, minEfficiency: undefined, maxEfficiency: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minEfficiency: eff - 5, 
                          maxEfficiency: eff 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minEfficiency === eff - 5 && filters.maxEfficiency === eff
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{eff}%</span>
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
      "LiFePO4": "فوسفات حديد ليثيوم",
      "Lithium-ion": "ليثيوم أيون",
      "Lead-acid": "رصاص حمضي",
      "Gel": "جل",
      "AGM": "AGM"
    };

    return {
      mainDescription: product.description || `${product.name} هي بطارية ${typeNames[product.type] || product.type} عالية الجودة من صنع شركة ${allBrands.find(b => b.id === product.brandId)?.name || "الشركة المصنعة"}. تتميز بكفاءة عالية تصل إلى ${product.efficiency}% وسعة ${product.capacity} ك.و.س.`,
      
      features: product.features || [
        `كفاءة عالية ${product.efficiency}%`,
        `عمر طويل ${product.cycleLife.toLocaleString()} دورة`,
        `عمق تفريغ ${product.depthOfDischarge}%`,
        "تصميم آمن ومتين",
        "شاشة عرض ذكية",
        "مراقبة عن بعد"
      ],
      
      applications: product.applications || [
        "المنازل السكنية",
        "المتاجر والمراكز التجارية",
        "المستشفيات والعيادات",
        "المصانع والورش",
        "المشاريع الزراعية",
        "المرافق الحكومية"
      ],
      
      investmentBenefits: [
        `توفير يصل إلى ${Math.round(product.efficiency * 0.9)}% من فاتورة الكهرباء`,
        `عائد استثماري خلال ${Math.round(product.price / 100000)} سنوات`,
        "حماية من انقطاع التيار الكهربائي",
        "مساهمة في حماية البيئة",
        "زيادة قيمة العقار"
      ]
    };
  };

  // حساب سعر الكيلوواط ساعة
  const calculatePricePerKwh = (product: any): number => {
    const kwh = product.power / 1000;
    const priceInRiyals = product.price / 100;
    return priceInRiyals / kwh;
  };

  // عرض صفحة تفاصيل المنتج
  if (viewMode === 'details' && selectedProduct) {
    const brand = allBrands.find(b => b.id === selectedProduct.brandId);
    const totalPrice = calculateBulkPrice(selectedProduct, quantity) / 100;
    const originalPriceInSAR = selectedProduct.originalPrice ? (selectedProduct.originalPrice / 100).toFixed(0) : null;
    const discountPercentage = originalPriceInSAR ? Math.round((1 - (selectedProduct.price / 100) / parseInt(originalPriceInSAR)) * 100) : 0;
    const description = getProductDescription(selectedProduct);
    const batteryTypeName = getBatteryTypeName(selectedProduct.type);
    const pricePerKwh = calculatePricePerKwh(selectedProduct).toFixed(2);

    // تحسين التبويبات للجوال
    const tabs = ['الوصف', 'المواصفات', 'التقييمات', 'الأسئلة الشائعة'];

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header cartCount={cartCount} />
        
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={backToList} className="text-primary hover:underline">
              البطاريات الشمسية
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
                  className="w-full h-[400px] object-contain p-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
                
                {/* نوع البطارية */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full">
                    {batteryTypeName}
                  </div>
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image';
                      }}
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=Logo';
                    }}
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

              {/* معلومات تقنية سريعة */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <BatteryIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">السعة</span>
                  </div>
                  <div className="text-xl font-bold">{selectedProduct.capacity}ك.و.س</div>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">الطاقة</span>
                  </div>
                  <div className="text-xl font-bold">{(selectedProduct.power / 1000).toFixed(1)}ك.و.س</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">الكفاءة</span>
                  </div>
                  <div className="text-xl font-bold">{selectedProduct.efficiency}%</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">الدورات</span>
                  </div>
                  <div className="text-xl font-bold">{selectedProduct.cycleLife.toLocaleString()}</div>
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
                      سعر الكيلوواط ساعة: {pricePerKwh} ر.س
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
              {selectedProduct.bulkPricing && selectedProduct.bulkPricing.length > 0 && (
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
                    <div className="font-bold">ضمان {selectedProduct.warranty}</div>
                    <div className="text-sm text-muted-foreground">على الأداء</div>
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
            {selectedTab === 'الوصف' && (
              <div className="space-y-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">{description.mainDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4">المميزات</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {description.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">الاستخدامات</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {description.applications.map((app: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                        <Home className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">فوائد استثمارية</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {description.investmentBenefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'المواصفات' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProduct.specifications?.map((spec: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-primary">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">الشهادات</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.certifications.map((cert: string, idx: number) => (
                        <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'التقييمات' && (
              <div className="space-y-8">
                {/* نموذج إضافة تقييم */}
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">أضف تقييمك</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-8 h-8 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="اكتب تقييمك هنا..."
                    className="w-full p-4 border border-border rounded-xl bg-background min-h-[100px] mb-4"
                  />
                  <Button onClick={submitReview}>إرسال التقييم</Button>
                </div>

                {/* التقييمات السابقة */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">تقييمات العملاء</h3>
                  {/* هنا يمكن إضافة التقييمات من API */}
                </div>
              </div>
            )}

            {selectedTab === 'الأسئلة الشائعة' && (
              <div className="space-y-8">
                {/* الأسئلة الشائعة */}
                <div className="space-y-3">
                  {selectedProduct.faqs?.map((faq: any, idx: number) => (
                    <div key={idx} className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-bold">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaqs.includes(idx) && (
                        <div className="p-4 bg-card">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* نموذج إضافة سؤال */}
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">هل لديك سؤال؟</h3>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="اكتب سؤالك هنا..."
                    className="w-full p-4 border border-border rounded-xl bg-background min-h-[100px] mb-4"
                  />
                  <Button onClick={submitQuestion}>إرسال السؤال</Button>
                </div>
              </div>
            )}
          </div>

          {/* منتجات من نفس الشركة */}
          {sameBrandProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">منتجات أخرى من {brand?.name}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {sameBrandProducts.slice(0, 3).map((product) => (
                  <BatteryCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onClick={() => showProductDetails(product)}
                    isLoading={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* انفرترات مقترحة */}
          {inverters.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">انفرترات مقترحة</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {inverters.map((inverter) => (
                  <div key={inverter.id} className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-2">{inverter.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {(inverter.price / 100).toFixed(0)} ر.س
                    </p>
                    <Button variant="outline" className="w-full">عرض التفاصيل</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* مشاركة المنتج */}
          <div className="mt-12 p-6 bg-muted/30 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">شارك هذا المنتج</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* معلومات الشركة */}
          {brand && (
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-16 h-16 object-contain bg-white p-2 rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Logo';
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold">عن {brand.name}</h3>
                  <p className="text-muted-foreground">{brand.description}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{brand.productsCount || 0}+</div>
                  <div className="text-sm text-muted-foreground">منتج</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{brand.yearsOfExperience || 10}+</div>
                  <div className="text-sm text-muted-foreground">سنة خبرة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{brand.countries || 15}+</div>
                  <div className="text-sm text-muted-foreground">دولة</div>
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

      {/* Page Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">البطاريات الشمسية</h1>
              <p className="text-muted-foreground">
                أفضل البطاريات لتخزين الطاقة الشمسية من أشهر الماركات العالمية
              </p>
            </div>
            <div className="flex gap-3">
              {/* Search Input */}
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="بحث عن بطارية..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full h-12 pl-4 pr-12 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              
              {/* Filter Button */}
              <FilterButton />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
            {filters.searchQuery && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                بحث: {filters.searchQuery}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                />
              </span>
            )}
            {filters.brandIds.map(id => {
              const brand = allBrands.find(b => b.id === id);
              return brand ? (
                <span key={id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                  {brand.name}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleBrand(id)}
                  />
                </span>
              ) : null;
            })}
            {filters.types.map(type => (
              <span key={type} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                {getBatteryTypeName(type)}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleType(type)}
                />
              </span>
            ))}
            {filters.minCapacity !== undefined && filters.maxCapacity !== undefined && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                سعة: {filters.minCapacity}-{filters.maxCapacity} ك.و.س
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, minCapacity: undefined, maxCapacity: undefined }))}
                />
              </span>
            )}
            {filters.minEfficiency !== undefined && filters.maxEfficiency !== undefined && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                كفاءة: {filters.minEfficiency}-{filters.maxEfficiency}%
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, minEfficiency: undefined, maxEfficiency: undefined }))}
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}

      {/* Products Display */}
      <div className="container py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل المنتجات...</p>
            </div>
          </div>
        ) : allProducts.length === 0 ? (
          <div className="text-center py-16">
            <BatteryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">لا توجد منتجات</h3>
            <p className="text-muted-foreground">لم يتم إضافة أي بطاريات بعد</p>
          </div>
        ) : hasActiveFilters ? (
          // عرض النتائج المفلترة
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                نتائج البحث ({filteredProducts.length})
              </h2>
              {filteredProducts.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  تم العثور على {filteredProducts.length} منتج
                </p>
              )}
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <BatteryCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onClick={() => showProductDetails(product)}
                    isLoading={false}
                    brand={allBrands.find(b => b.id === product.brandId)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-2xl">
                <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground mb-4">لم نتمكن من العثور على منتجات تطابق معايير البحث</p>
                <Button onClick={clearFilters}>مسح جميع الفلاتر</Button>
              </div>
            )}
          </div>
        ) : (
          // عرض المنتجات منظمة حسب الشركات
          <div className="space-y-12">
            {brandsWithProducts.map(brand => (
              <BrandCarousel 
                key={brand.id} 
                brand={brand} 
                brandProducts={productsByBrand[brand.id] || []} 
              />
            ))}
          </div>
        )}
      </div>

      <FloatingCartButton count={cartCount} />
      <Footer />
    </div>
  );
}