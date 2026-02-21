import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ChevronDown,
  X,
  Star,
  Zap,
  Filter,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Search,
  ArrowRight,
  Eye,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Sparkles,
  Tag,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Heart,
  Share2
} from "lucide-react";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";

// استيراد المكونات المشتركة
import Header from "./Header";
import Footer from "./Footer";

// بيانات وهمية للمنتجات (موسعة)
const mockProducts = [
  {
    id: 1,
    name: "لوح شمسي 400 واط مونو كريستال",
    price: 45000,
    originalPrice: 50000,
    power: 400,
    efficiency: 21.5,
    voltage: 40,
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    brandId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
      }
    ],
    description: "لوح شمسي عالي الكفاءة مصنوع من خلايا مونو كريستال أحادية، مناسب للمنازل والمشاريع التجارية.",
    features: ["كفاءة عالية 21.5%", "ضمان 25 سنة", "مقاوم للأتربة IP68", "سهل التركيب"],
    warranty: "25 سنة",
    delivery: "شحن مجاني",
    deliveryTime: "2-5 أيام عمل",
    sku: "SP-400-MONO",
    tags: ["جديد", "الأكثر مبيعاً", "أفضل كفاءة", "توفير طاقة"],
    views: 1250
  },
  // ... باقي المنتجات (يمكن تقليص العدد للمثال)
];

// صور حقيقية للعلامات التجارية
const mockBrands = [
  { 
    id: 1, 
    name: "SunPower", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/SunPower_logo.svg/320px-SunPower_logo.svg.png",
    description: "شركة رائدة في مجال الطاقة الشمسية",
    established: 1985,
    products: 150,
    countries: 100,
    rating: 4.9
  },
  // ... باقي العلامات التجارية
];

export default function ProductsPage() {
  const { isAuthenticated } = useAuth();
  
  const [filters, setFilters] = useState({
    brandIds: [] as number[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minPower: undefined as number | undefined,
    maxPower: undefined as number | undefined,
    minEfficiency: undefined as number | undefined,
    maxEfficiency: undefined as number | undefined,
    sortBy: "brand" as "brand" | "price_asc" | "price_desc" | "rating" | "newest",
    searchQuery: "" as string,
  });

  const [cartCount, setCartCount] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // تجميع المنتجات حسب الشركة
  const productsByBrand = useMemo(() => {
    const brandMap: Record<number, any[]> = {};
    
    mockProducts.forEach(product => {
      if (!brandMap[product.brandId]) {
        brandMap[product.brandId] = [];
      }
      brandMap[product.brandId].push(product);
    });
    
    Object.keys(brandMap).forEach(brandId => {
      brandMap[parseInt(brandId)].sort((a, b) => b.price - a.price);
    });
    
    return brandMap;
  }, []);

  // الحصول على قائمة الشركات التي لديها منتجات
  const brandsWithProducts = useMemo(() => {
    return mockBrands
      .filter(brand => productsByBrand[brand.id]?.length > 0)
      .sort((a, b) => (productsByBrand[b.id]?.length || 0) - (productsByBrand[a.id]?.length || 0));
  }, [productsByBrand]);

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

  // فلترة وترتيب المنتجات
  const allProducts = useMemo(() => {
    let filteredProducts = [...mockProducts];

    // فلترة حسب البحث
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // فلترة حسب العلامة التجارية
    if (filters.brandIds.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => filters.brandIds.includes(product.brandId)
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= filters.maxPrice!
      );
    }

    // فلترة حسب القدرة
    if (filters.minPower !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.power >= filters.minPower!
      );
    }
    if (filters.maxPower !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.power <= filters.maxPower!
      );
    }

    // فلترة حسب الكفاءة
    if (filters.minEfficiency !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.efficiency >= filters.minEfficiency!
      );
    }
    if (filters.maxEfficiency !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.efficiency <= filters.maxEfficiency!
      );
    }

    // الترتيب
    switch (filters.sortBy) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "brand":
      default:
        filteredProducts.sort((a, b) => {
          if (a.brandId !== b.brandId) {
            return a.brandId - b.brandId;
          }
          return b.price - a.price;
        });
        break;
    }

    return filteredProducts;
  }, [filters]);

  // حساب المنتجات للصفحة الحالية
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProducts.slice(startIndex, endIndex);
  }, [allProducts, currentPage, itemsPerPage]);

  // حساب إجمالي عدد الصفحات
  const totalPages = useMemo(() => {
    return Math.ceil(allProducts.length / itemsPerPage);
  }, [allProducts, itemsPerPage]);

  // توليد أرقام الصفحات للعرض
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = Math.min(totalPages, maxVisiblePages);
      }
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (startPage > 1) {
        if (startPage > 2) pages.unshift("...");
        pages.unshift(1);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  // إعادة تعيين الصفحة عند تغيير الفلاتر
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // دالة إضافة للسلة
  const handleAddToCart = (product: any, qty = 1) => {
    if (!isAuthenticated) {
      localCart.addItem(product.id, qty);
      
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${product.name} إلى سلة التسوق`,
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

  const toggleBrand = (brandId: number) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
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
      sortBy: "brand",
      searchQuery: "",
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.brandIds.length > 0 ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.minPower !== undefined ||
      filters.maxPower !== undefined ||
      filters.minEfficiency !== undefined ||
      filters.maxEfficiency !== undefined
    );
  }, [filters]);

  // دالة تغيير الصفحة
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // دالة للصفحة التالية
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // دالة للصفحة السابقة
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // مكون Carousel
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
      return () => window.removeEventListener('resize', checkScroll);
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
          <Link href={`/brands/${brand.id}`}>
            <Button variant="outline" className="gap-2">
              عرض الكل
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
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

          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={checkScroll}
          >
            {brandProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <div 
                  className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer product-card h-full"
                  onClick={() => window.location.href = `/products/${product.id}`}
                >
                  <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-16 h-6 object-contain"
                      />
                    </div>

                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
                          <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </div>
                        </div>
                      </div>
                    )}

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
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {product.power}W
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <div className="font-bold text-lg">{(product.price / 100).toFixed(0)} ر.س</div>
                        {product.originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            {(product.originalPrice / 100).toFixed(0)} ر.س
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="gap-1 bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span className="text-xs">أضف</span>
                      </Button>
                    </div>
                  </div>
                </div>
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
                  { value: "newest", label: "الأحدث أولاً", icon: <Sparkles className="w-4 h-4" /> },
                  { value: "rating", label: "الأعلى تقييماً", icon: <Star className="w-4 h-4" /> },
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

            {/* العلامات التجارية */}
            <div>
              <h3 className="font-bold text-lg mb-3">العلامات التجارية</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockBrands.map((brand) => (
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

            {/* القدرة */}
            <div>
              <h3 className="font-bold text-lg mb-3">القدرة (واط)</h3>
              <div className="grid grid-cols-3 gap-3">
                {[300, 400, 500, 600, 700, 800, 900, 1000].map((power) => (
                  <button
                    key={power}
                    onClick={() => {
                      if (filters.minPower === power - 100 && filters.maxPower === power) {
                        setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minPower: power - 100, 
                          maxPower: power 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minPower === power - 100 && filters.maxPower === power
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{power}W</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأدنى</label>
                  <input
                    type="number"
                    value={filters.minPower || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPower: e.target.value ? parseInt(e.target.value) : undefined,
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
                    value={filters.maxPower || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPower: e.target.value ? parseInt(e.target.value) : undefined,
                      }))
                    }
                    placeholder="1000"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={cartCount} />

      {/* Page Header مع الفلتر */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">الألواح الشمسية</h1>
              <p className="text-muted-foreground">
                اكتشف أفضل الألواح الشمسية بجودة عالمية وأسعار تنافسية
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن لوح شمسي..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full md:w-64 pr-10 pl-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
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
                      <span>{mockBrands?.find(b => b.id === brandId)?.name}</span>
                      <button
                        onClick={() => toggleBrand(brandId)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
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

        {/* عرض المنتجات بالشكل التقليدي (للتصفية) */}
        {allProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">جميع المنتجات ({allProducts.length})</h2>
              <div className="text-sm text-muted-foreground">
                مرتبة حسب: {filters.sortBy === 'brand' ? 'العلامة التجارية' : 
                filters.sortBy === 'newest' ? 'الأحدث' :
                filters.sortBy === 'rating' ? 'التقييم' :
                filters.sortBy === 'price_desc' ? 'السعر من الأعلى' : 'السعر من الأقل'}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => window.location.href = `/products/${product.id}`}
                  isLoading={false}
                  brand={mockBrands.find(b => b.id === product.brandId)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <nav className="flex items-center justify-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  {pageNumbers.map((pageNum, index) => (
                    pageNum === "..." ? (
                      <span key={`dots-${index}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={`w-10 h-10 ${currentPage === pageNum ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => goToPage(pageNum as number)}
                      >
                        {pageNum}
                      </Button>
                    )
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </nav>
                
                <div className="text-sm text-muted-foreground mt-4 text-center">
                  الصفحة <span className="font-bold text-primary">{currentPage}</span> من <span className="font-bold">{totalPages}</span>
                  <span className="mx-2">•</span>
                  المنتجات <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> إلى <span className="font-bold">{Math.min(currentPage * itemsPerPage, allProducts.length)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {allProducts?.length === 0 && (
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

      <FloatingCartButton count={cartCount} />
      <Footer />
    </div>
  );
}

// مكون ProductCard
function ProductCard({
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

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {product.images && product.images[0] && (
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {brand?.logo && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="w-16 h-6 object-contain"
            />
          </div>
        )}

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

        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {product.power}W
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {product.features?.slice(0, 2).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {feature}
              </span>
            ))}
            {product.features?.length > 2 && (
              <span className="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary">
                +{product.features.length - 2}
              </span>
            )}
          </div>
        </div>

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