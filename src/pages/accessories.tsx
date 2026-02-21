// app/accessories/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Search, Filter, X, ChevronLeft, ChevronRight, ChevronDown,
  ShoppingCart, Heart, Share2, Star, Eye, Package, Zap, Shield,
  Truck, ShieldCheck, Clock, TrendingUp, Check, Minus, Plus,
  Maximize2, FileText, Download, PlayCircle, MessageCircle,
  Calendar, DownloadCloud, Award, Users, BarChart3, ThumbsUp,
  Settings, Wrench, HelpCircle, Brain, Lightbulb, GitCompare,
  BarChart, ThermometerSun, Target, Cloud, Battery, Droplets,
  Sunrise, Sunset, Rocket, Crown, Navigation, Compass,
  Database, Server, Microchip, CircuitBoard, Satellite,
  Bolt, Flashlight, Lamp, SunDim, CloudSun, CloudFog,
  Gauge, PieChart, DollarSign, Wallet, Folder
} from "lucide-react";
import { localCart } from "@/lib/local-cart";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

// استيراد المكونات المشتركة
// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";
// استيراد نظام التخزين
import {
  loadAccessories,
  loadAccessoryCategories,
  transformAccessoriesForDisplay,
  getSuggestedAccessories
} from "@/lib/accessories-storage";

type ViewMode = 'list' | 'details';

export default function AccessoriesPage() {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedAccessory, setSelectedAccessory] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // الفلاتر
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    categoryIds: [] as string[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    inStock: false as boolean,
    sortBy: "name" as "name" | "price_asc" | "price_desc" | "newest",
    searchQuery: "" as string,
  });

  // البيانات
  const [accessories, setAccessories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [relatedAccessories, setRelatedAccessories] = useState<any[]>([]);

  // تحميل البيانات
  useEffect(() => {
    const accessoriesData = loadAccessories();
    const categoriesData = loadAccessoryCategories();
    
    const transformedAccessories = transformAccessoriesForDisplay(accessoriesData, categoriesData);
    setAccessories(transformedAccessories);
    setCategories(categoriesData.map(cat => ({
      ...cat,
      count: accessoriesData.filter(a => a.categoryId === cat.id).length
    })));
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

  // فلترة الملحقات
  const filteredAccessories = useMemo(() => {
    let filtered = [...accessories];

    // فلترة حسب البحث
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        accessory => 
          accessory.name.toLowerCase().includes(query) ||
          accessory.description.toLowerCase().includes(query)
      );
    }

    // فلترة حسب الفئة
    if (filters.categoryIds.length > 0) {
      filtered = filtered.filter(
        accessory => filters.categoryIds.includes(accessory.category)
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        accessory => accessory.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        accessory => accessory.price <= filters.maxPrice!
      );
    }

    // فلترة حسب المخزون
    if (filters.inStock) {
      filtered = filtered.filter(
        accessory => accessory.stock > 0
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
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [accessories, filters]);

  // عرض تفاصيل الملحق
  const showAccessoryDetails = (accessory: any) => {
    setSelectedAccessory(accessory);
    setQuantity(1);
    setSelectedImage(0);
    setViewMode('details');
    
    // تحميل ملحقات مقترحة من نفس الفئة
    const related = accessories
      .filter(a => a.category === accessory.category && a.id !== accessory.id)
      .slice(0, 6);
    setRelatedAccessories(related);
  };

  // العودة للقائمة
  const backToList = () => {
    setViewMode('list');
    setSelectedAccessory(null);
  };

  // إضافة للسلة
  const handleAddToCart = (accessory: any, qty = quantity) => {
    if (!isAuthenticated) {
      localCart.addItem(accessory.id, qty);
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${accessory.name} إلى سلة التسوق`,
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

  // زيادة/تقليل الكمية
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // مشاركة الملحق
  const shareAccessory = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedAccessory.name,
        text: selectedAccessory.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط الملحق");
    }
  };

  // تحميل ملف PDF
  const downloadPDF = (document: any) => {
    toast.success(`جاري تحميل ${document.name}`, {
      description: "سيبدأ التحميل تلقائياً خلال لحظات",
      duration: 3000,
    });
  };

  // فلاتر الفئات
  const toggleCategory = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryName)
        ? prev.categoryIds.filter((id) => id !== categoryName)
        : [...prev.categoryIds, categoryName],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categoryIds: [],
      minPrice: undefined,
      maxPrice: undefined,
      inStock: false,
      sortBy: "name",
      searchQuery: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.categoryIds.length > 0 ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.inStock
    );
  }, [filters]);

  // مكون Carousel للملحقات
  const AccessoryCarousel = ({ accessories, title }: { accessories: any[], title: string }) => {
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
        const cardWidth = container.querySelector('.accessory-card')?.clientWidth || 320;
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
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">اكتشف أفضل الملحقات لتحسين نظامك الشمسي</p>
          </div>
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

          {/* الملحقات */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={checkScroll}
          >
            {accessories.map((accessory) => (
              <div key={accessory.id} className="flex-shrink-0 w-80">
                <AccessoryCard
                  accessory={accessory}
                  onAddToCart={() => handleAddToCart(accessory)}
                  onClick={() => showAccessoryDetails(accessory)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Filter Modal
  const FilterModal = () => (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="w-6 h-6" />
              فلاتر الملحقات
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
              <h3 className="font-bold text-lg mb-3">ترتيب الملحقات</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "name", label: "حسب الاسم", icon: <FileText className="w-4 h-4" /> },
                  { value: "newest", label: "الأحدث أولاً", icon: <Sparkles className="w-4 h-4" /> },
                  { value: "price_desc", label: "السعر: من الأعلى للأقل", icon: <TrendingUp className="w-4 h-4" /> },
                  { value: "price_asc", label: "السعر: من الأقل للأعلى", icon: <TrendingDown className="w-4 h-4" /> }
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

            {/* الفئات */}
            <div>
              <h3 className="font-bold text-lg mb-3">الفئات</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.name)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.categoryIds.includes(category.name)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                      {category.icon}
                    </div>
                    <div className="flex-1 text-right">
                      <span className="text-sm font-medium block">{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.count} ملحق</span>
                    </div>
                    {filters.categoryIds.includes(category.name) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* السعر */}
            <div>
              <h3 className="font-bold text-lg mb-3">السعر (ر.س)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأدنى</label>
                  <input
                    type="number"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: e.target.value ? parseInt(e.target.value) : undefined,
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
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: e.target.value ? parseInt(e.target.value) : undefined,
                      }))
                    }
                    placeholder="10000"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>

            {/* المخزون */}
            <div className="flex items-center gap-3 p-4 border border-border rounded-xl">
              <input
                type="checkbox"
                id="inStock"
                checked={filters.inStock}
                onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                className="w-5 h-5"
              />
              <label htmlFor="inStock" className="flex-1">
                <div className="font-medium">المتوفرة فقط</div>
                <div className="text-sm text-muted-foreground">عرض الملحقات المتوفرة بالمخزون</div>
              </label>
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

  // عرض صفحة تفاصيل الملحق
  if (viewMode === 'details' && selectedAccessory) {
    const totalPrice = selectedAccessory.price * quantity;

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header cartCount={cartCount} />
        
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={backToList} className="text-primary hover:underline">
              الملحقات الشمسية
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-primary hover:underline">{selectedAccessory.category}</span>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-muted-foreground truncate">{selectedAccessory.name}</span>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* الصور */}
            <div>
              {/* الصورة الرئيسية */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl mb-4">
                <img
                  src={selectedAccessory.image}
                  alt={selectedAccessory.name}
                  className="w-full h-[400px] object-contain"
                />
                
                {/* الفئة */}
                <div className="absolute top-4 right-4">
                  <div className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold">
                    {selectedAccessory.category}
                  </div>
                </div>
                
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
            </div>

            {/* التفاصيل */}
            <div>
              {/* العنوان والتقييم */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-3xl font-bold">{selectedAccessory.name}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={shareAccessory}
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
                    <span className="font-bold text-lg">{selectedAccessory.rating}</span>
                    <span className="text-muted-foreground">({selectedAccessory.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{selectedAccessory.views} مشاهدة</span>
                  </div>
                </div>
              </div>

              {/* الوصف */}
              <div className="mb-6 p-4 bg-muted/30 rounded-xl">
                <p className="text-gray-800">{selectedAccessory.description}</p>
              </div>

              {/* المميزات */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">المميزات الرئيسية</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedAccessory.features?.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-white border border-border rounded-lg">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* السعر والكمية */}
              <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold">{totalPrice.toLocaleString()} ر.س</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {quantity} × {selectedAccessory.price.toLocaleString()} ر.س للقطعة الواحدة
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">المخزون:</div>
                    <div className={`text-lg font-bold ${
                      selectedAccessory.stock > 20 ? 'text-green-600' : 
                      selectedAccessory.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedAccessory.stock > 0 ? `${selectedAccessory.stock} قطعة متوفرة` : 'نفذت الكمية'}
                    </div>
                  </div>
                </div>

                {/* كمية المنتجات الإضافية */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">الكمية:</span>
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
                      onClick={() => handleAddToCart(selectedAccessory, quantity)}
                      disabled={selectedAccessory.stock === 0}
                    >
                      <ShoppingCart className="w-5 h-5 ml-2" />
                      {selectedAccessory.stock === 0 ? 'نفذت الكمية' : `أضف ${quantity} إلى السلة`}
                    </Button>
                  </div>
                </div>
              </div>

              {/* المعلومات الإضافية */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold">شحن مجاني</div>
                    <div className="text-sm text-muted-foreground">2-5 أيام عمل</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold">ضمان {selectedAccessory.warranty}</div>
                    <div className="text-sm text-muted-foreground">ضمان المصنع</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* علامات التبويب */}
          <div className="mt-12">
            <div className="border-b border-border mb-8">
              <div className="flex overflow-x-auto scrollbar-hide">
                {['المواصفات', 'التوافق', 'المستندات'].map((tab) => (
                  <button
                    key={tab}
                    className="px-6 py-3 font-medium hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* المواصفات */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">المواصفات الفنية</h3>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <tbody>
                    {Object.entries(selectedAccessory.specifications || {}).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                        <td className="p-4 font-medium border-r border-border w-1/3">{key}</td>
                        <td className="p-4">{value as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* التوافق */}
            {selectedAccessory.compatibility && selectedAccessory.compatibility.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">التوافق مع المنتجات</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedAccessory.compatibility.map((comp: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-4 border border-border rounded-xl">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* المستندات */}
            {selectedAccessory.documents && selectedAccessory.documents.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">المستندات</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedAccessory.documents.map((doc: any, idx: number) => (
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
                        <div className="text-sm text-muted-foreground">PDF</div>
                      </div>
                      <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ملحقات مقترحة */}
          {relatedAccessories.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">ملحقات أخرى من نفس الفئة</h2>
                  <p className="text-muted-foreground">اكتشف المزيد من الملحقات المشابهة</p>
                </div>
                <button
                  onClick={backToList}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <AccessoryCarousel accessories={relatedAccessories} title="" />
            </div>
          )}

          {/* ملحقات قد تعجبك */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">ملحقات قد تعجبك</h2>
                <p className="text-muted-foreground">اكتشف ملحقات مشابهة بناءً على اختياراتك</p>
              </div>
            </div>
            
            <AccessoryCarousel 
              accessories={getSuggestedAccessories()} 
              title="" 
            />
          </div>

          {/* مشاركة المنتج */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">شارك الملحق</h3>
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
              <button
                onClick={shareAccessory}
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

  // عرض قائمة الملحقات
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={cartCount} />

      {/* Page Header مع الفلتر */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">الملحقات الشمسية</h1>
              <p className="text-muted-foreground">
                اكتشف أفضل الملحقات والأدوات لنظامك الشمسي
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  placeholder="ابحث عن ملحق..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Filter Button */}
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
                  {filters.categoryIds.map(categoryName => (
                    <div key={categoryName} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>{categoryName}</span>
                      <button
                        onClick={() => toggleCategory(categoryName)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {filters.inStock && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>المتوفرة فقط</span>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, inStock: false }))}
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
        {/* عرض الفئات */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">تصفح حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.name)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  filters.categoryIds.includes(category.name)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="text-3xl">{category.icon}</span>
                <div className="text-center">
                  <div className="font-bold text-sm">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.count} ملحق</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* عرض الملحقات حسب الفئة المختارة */}
        {filters.categoryIds.length > 0 ? (
          <div className="space-y-12">
            {categories
              .filter(cat => filters.categoryIds.includes(cat.name))
              .map((category) => {
                const categoryAccessories = filteredAccessories.filter(
                  acc => acc.category === category.name
                );
                
                if (categoryAccessories.length === 0) return null;
                
                return (
                  <AccessoryCarousel
                    key={category.id}
                    accessories={categoryAccessories}
                    title={category.name}
                  />
                );
              })}
          </div>
        ) : (
          // عرض جميع الملحقات
          <AccessoryCarousel
            accessories={filteredAccessories}
            title="جميع الملحقات"
          />
        )}

        {filteredAccessories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">لا توجد ملحقات</h3>
            <p className="text-muted-foreground mb-6">لم نعثر على ملحقات تطابق معايير البحث</p>
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

      {/* الفوتر */}
      <Footer />
    </div>
  );
}

// مكون AccessoryCard
function AccessoryCard({
  accessory,
  onAddToCart,
  onClick,
}: {
  accessory: any;
  onAddToCart: () => void;
  onClick: () => void;
}) {
  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer h-full flex flex-col accessory-card"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {accessory.image && (
          <img
            src={accessory.image}
            alt={accessory.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Category */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold">
            {accessory.category}
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${
            accessory.stock > 20 
              ? "bg-green-500/20 text-green-700" 
              : accessory.stock > 5 
              ? "bg-yellow-500/20 text-yellow-700"
              : "bg-red-500/20 text-red-700"
          }`}>
            {accessory.stock > 20 ? (
              <>
                <Check className="w-3 h-3" />
                متوفر
              </>
            ) : accessory.stock > 5 ? (
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
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{accessory.categoryIcon}</span>
            <span>{accessory.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{accessory.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {accessory.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {accessory.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {accessory.features?.slice(0, 2).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{accessory.price.toLocaleString()} ر.س</span>
            </div>
          </div>

          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              className="flex-1 gap-2 hover:border-primary hover:text-primary"
              onClick={onClick}
            >
              التفاصيل
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={accessory.stock === 0}
            >
              {accessory.stock === 0 ? "غير متوفر" : (
                <>
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  أضف للسلة
                </>
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