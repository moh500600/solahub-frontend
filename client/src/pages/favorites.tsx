// client/src/pages/Favorites.tsx
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Eye,
  Share2,
  Filter,
  Search,
  Grid3x3,
  List,
  Star,
  Package,
  PanelTop,
  Zap,
  Clock,
  Tag,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Calendar,
  TrendingUp,
  BarChart3,
  Download,
  Printer,
  Mail,
  MessageSquare,
  ShoppingBag,
  X,
  Users,
  Award,
  Leaf,
  BatteryFull,
  Cpu,
  Wrench,
  Headphones,
  Sparkles,
  Bell,
  MessageCircle,
  Settings,
  User,
  Home,
  ArrowRight,
  RotateCw,
  ExternalLink,
  Loader2,
  Plus,
  Minus,
  HeartOff,
  GitCompare,
  Scale,
  MapPin,
  Truck,
  ShieldCheck,
  PackageOpen,
  Battery,
  Car,
  FolderKanban,
  LifeBuoy,
  Info,
  Building
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// استخدم GitCompare بدلاً من Compare
const Compare = GitCompare;

interface FavoriteItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory: string;
  image: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  features: string[];
  warranty: string;
  brand: string;
  addedAt: Date;
  lastViewed?: Date;
  variants?: ProductVariant[];
  isCompared?: boolean;
  isInCart?: boolean;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  energyEfficiency?: string;
  installationComplexity?: "سهل" | "متوسط" | "متقدم";
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CategoryCount {
  category: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  inStock: boolean;
  onSale: boolean;
  rating: number | null;
  installationComplexity: string[];
  energyEfficiency: string[];
}

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "price" | "rating" | "price-desc">("date");
  const [showFilters, setShowFilters] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPriceDropAlerts, setShowPriceDropAlerts] = useState(false);

  // حالة الفلاتر
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50000],
    brands: [],
    inStock: false,
    onSale: false,
    rating: null,
    installationComplexity: [],
    energyEfficiency: []
  });

  // استخدام React Query لاسترجاع المفضلات
  const { data: favoritesData, isLoading, refetch } = trpc.favorites.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // حالة محلية للمفضلات
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "1",
      productId: "solar-panel-001",
      name: "لوح شمسي مونو كريستال 550 وات - الجيل الجديد",
      description: "لوح شمسي عالي الكفاءة مع ضمان 30 سنة وكفاءة تصل إلى 22.5%، مقاوم للملوحة والغبار",
      price: 1250,
      originalPrice: 1450,
      discount: 14,
      category: "الطاقة الشمسية",
      subcategory: "الألواح الشمسية",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 342,
      stock: 28,
      tags: ["الأكثر مبيعاً", "عالية الكفاءة", "ضمان طويل", "مقاوم للملوحة"],
      features: ["كفاءة 22.5%", "ضمان 30 سنة أداء", "مقاومة الغبار", "خلايا PERC"],
      warranty: "30 سنة أداء، 12 سنة منتج",
      brand: "SunPower",
      addedAt: new Date("2024-02-15"),
      lastViewed: new Date("2024-02-20"),
      variants: [
        { id: "v1", name: "550 وات", price: 1250, stock: 15 },
        { id: "v2", name: "600 وات", price: 1450, stock: 13 }
      ],
      isCompared: false,
      isInCart: true,
      isBestSeller: true,
      isRecommended: true,
      energyEfficiency: "A++",
      installationComplexity: "سهل"
    },
    {
      id: "2",
      productId: "inverter-003",
      name: "محول هجين 8 كيلو وات - نظام ذكي متكامل",
      description: "محول هجين ذكي مع مراقبة عن بعد، تطبيق جوال، ودعم بطاريات ليثيوم متعددة",
      price: 5800,
      originalPrice: 6500,
      discount: 11,
      category: "الطاقة الشمسية",
      subcategory: "المحولات",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 189,
      stock: 8,
      tags: ["ذكي", "مراقبة عن بعد", "هجين", "شبكة ذكية"],
      features: ["مراقبة ذكية عبر السحابة", "دعم بطاريات ليثيوم", "تطبيق جوال", "حماية متقدمة"],
      warranty: "10 سنوات شاملة",
      brand: "Growatt",
      addedAt: new Date("2024-02-10"),
      lastViewed: new Date("2024-02-18"),
      isCompared: true,
      isRecommended: true,
      energyEfficiency: "A+",
      installationComplexity: "متوسط"
    },
    {
      id: "3",
      productId: "battery-002",
      name: "بطارية ليثيوم 10.24 كيلو واط ساعة - نظام تخزين متقدم",
      description: "بطارية ليثيوم فوسفات حديدية مع عمر طويل يصل إلى 6000 دورة وأمان عالي، نظام إدارة ذكي",
      price: 9800,
      originalPrice: 11500,
      discount: 15,
      category: "الطاقة الشمسية",
      subcategory: "البطاريات",
      image: "https://images.unsplash.com/photo-1629654291660-3c98113a0438?w=600&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 256,
      stock: 5,
      tags: ["ليثيوم", "عمر طويل", "أمان عالي", "نظام إدارة"],
      features: ["عمر 6000 دورة", "نظام إدارة BMS", "تركيب سهل", "متوافق مع معظم المحولات"],
      warranty: "10 سنوات",
      brand: "BYD",
      addedAt: new Date("2024-02-05"),
      isCompared: false,
      isBestSeller: true,
      energyEfficiency: "A++",
      installationComplexity: "متوسط"
    },
    {
      id: "4",
      productId: "car-charger-001",
      name: "محطة شحن منزلية 22 كيلو واط - شحن ذكي للسيارات الكهربائية",
      description: "محطة شحن ذكية 22 كيلو واط مع تطبيق تحكم متقدم، جدولة الشحن، وإدارة الطاقة",
      price: 4500,
      category: "السيارات الكهربائية",
      subcategory: "محطات الشحن",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=600&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 167,
      stock: 12,
      tags: ["شحن منزلي", "ذكي", "22 كيلو واط", "تطبيق تحكم"],
      features: ["شحن سريع 22kW", "تطبيق تحكم عن بعد", "جدولة الشحن", "مراقبة الاستهلاك"],
      warranty: "5 سنوات",
      brand: "ChargePoint",
      addedAt: new Date("2024-02-12"),
      isRecommended: true,
      energyEfficiency: "A",
      installationComplexity: "متقدم"
    },
    {
      id: "5",
      productId: "system-003",
      name: "نظام طاقة شمسية منزلي 15 كيلو واط - حل متكامل",
      description: "نظام متكامل للمنازل الكبيرة مع جميع المكونات والتركيب والصيانة",
      price: 42500,
      originalPrice: 48000,
      discount: 11,
      category: "أنظمة متكاملة",
      subcategory: "أنظمة منزلية",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      rating: 5.0,
      reviewCount: 78,
      stock: 2,
      tags: ["نظام متكامل", "جاهز", "تركيب شامل", "صيانة مجانية"],
      features: ["ألواح 15 كيلو واط", "محول هجين 10kW", "بطارية 20kWh", "تركيب شامل"],
      warranty: "25 سنة شاملة",
      brand: "طاقة المستقبل",
      addedAt: new Date("2024-02-03"),
      isBestSeller: true,
      energyEfficiency: "A++",
      installationComplexity: "متقدم"
    },
    {
      id: "6",
      productId: "accessory-012",
      name: "مجموعة تركيب احترافية - أدوات ومثبتات شاملة",
      description: "مجموعة كاملة من أدوات ومثبتات التركيب الاحترافية مع ضمان 5 سنوات",
      price: 3200,
      category: "ملحقات",
      subcategory: "أدوات التركيب",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 89,
      stock: 25,
      tags: ["مجموعة تركيب", "أدوات احترافية", "مثبتات", "ضمان 5 سنوات"],
      features: ["مثبتات ألومنيوم", "أدوات تركيب", "كابلات توصيل", "حماية ضد الصدأ"],
      warranty: "5 سنوات",
      brand: "IronRidge",
      addedAt: new Date("2024-02-08"),
      installationComplexity: "سهل"
    }
  ]);

  // إحصائيات الفئات
  const categoryCounts: CategoryCount[] = [
    { category: "الطاقة الشمسية", count: 3, icon: PanelTop, color: "from-amber-500 to-yellow-500" },
    { category: "السيارات الكهربائية", count: 1, icon: Car, color: "from-blue-500 to-cyan-500" },
    { category: "ملحقات", count: 1, icon: Package, color: "from-gray-500 to-gray-700" },
    { category: "أنظمة متكاملة", count: 1, icon: Zap, color: "from-primary to-primary/80" }
  ];

  // العلامات التجارية
  const brands = ["SunPower", "Growatt", "BYD", "ChargePoint", "طاقة المستقبل", "IronRidge", "SolarEdge", "Huawei"];

  // حساب إحصائيات المفضلات
  const totalItems = favorites.length;
  const itemsInStock = favorites.filter(item => item.stock > 0).length;
  const itemsOnSale = favorites.filter(item => item.discount).length;
  const totalValue = favorites.reduce((sum, item) => sum + item.price, 0);
  const estimatedSavings = favorites.reduce((sum, item) => 
    sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0
  );

  // تصفية وترتيب المفضلات
  const filteredFavorites = favorites
    .filter(item => {
      // التبويب النشط
      if (activeTab !== "all") {
        if (activeTab === "in-stock" && item.stock <= 0) return false;
        if (activeTab === "on-sale" && !item.discount) return false;
        if (activeTab === "solar" && item.category !== "الطاقة الشمسية") return false;
        if (activeTab === "cars" && item.category !== "السيارات الكهربائية") return false;
        if (activeTab === "recommended" && !item.isRecommended) return false;
        if (activeTab === "best-seller" && !item.isBestSeller) return false;
      }

      // البحث
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) &&
          !item.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // الفلاتر
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
        return false;
      }
      if (filters.inStock && item.stock <= 0) {
        return false;
      }
      if (filters.onSale && !item.discount) {
        return false;
      }
      if (filters.rating && item.rating < filters.rating) {
        return false;
      }
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.installationComplexity.length > 0 && item.installationComplexity && 
          !filters.installationComplexity.includes(item.installationComplexity)) {
        return false;
      }
      if (filters.energyEfficiency.length > 0 && item.energyEfficiency && 
          !filters.energyEfficiency.includes(item.energyEfficiency)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // تبديل تحديد العنصر
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // تحديد/إلغاء تحديد الكل
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map(item => item.id));
    }
  };

  // حذف العناصر المحددة
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    const dialog = confirm(`هل أنت متأكد من حذف ${selectedItems.length} عنصر من المفضلات؟`);
    if (dialog) {
      setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      toast.success(`تم حذف ${selectedItems.length} عنصر من المفضلات`, {
        description: "يمكنك استرجاع العناصر من سلة المحذوفات خلال 30 يوم",
        action: {
          label: "تراجع",
          onClick: () => console.log("تراجع عن الحذف")
        }
      });
    }
  };

  // إضافة العناصر المحددة للسلة
  const addSelectedToCart = () => {
    const itemsToAdd = favorites.filter(item => 
      selectedItems.includes(item.id) && item.stock > 0 && !item.isInCart
    );

    if (itemsToAdd.length === 0) {
      toast.info("جميع العناصر المحددة موجودة بالفعل في السلة أو غير متوفرة");
      return;
    }

    itemsToAdd.forEach(item => {
      localCart.addItem({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      });
    });

    // تحديث حالة العناصر
    setFavorites(prev =>
      prev.map(item =>
        selectedItems.includes(item.id) ? { ...item, isInCart: true } : item
      )
    );

    toast.success(`تم إضافة ${itemsToAdd.length} عنصر إلى السلة`, {
      description: "يمكنك مراجعة طلبك في صفحة السلة",
      action: {
        label: "عرض السلة",
        onClick: () => window.location.href = "/cart"
      }
    });
    
    window.dispatchEvent(new Event('cart-updated'));
  };

  // تبديل حالة المقارنة
  const toggleCompare = (itemId: string) => {
    setFavorites(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isCompared: !item.isCompared } : item
      )
    );

    if (compareItems.includes(itemId)) {
      setCompareItems(prev => prev.filter(id => id !== itemId));
      toast.info("تمت إزالة المنتج من المقارنة");
    } else {
      if (compareItems.length < 4) {
        setCompareItems(prev => [...prev, itemId]);
        toast.success("تمت إضافة المنتج للمقارنة", {
          description: `يمكنك مقارنة ${4 - compareItems.length - 1} منتجات أخرى`
        });
      } else {
        toast.error("يمكنك مقارنة 4 منتجات كحد أقصى", {
          description: "قم بإزالة أحد المنتجات لإضافة منتج جديد"
        });
      }
    }
  };

  // مكون بطاقة المنتج
  const ProductCard = ({ item }: { item: FavoriteItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [quantity, setQuantity] = useState(1);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group"
      >
        <Card className={cn(
          "overflow-hidden border-2 transition-all duration-300 h-full flex flex-col",
          selectedItems.includes(item.id) 
            ? "border-primary shadow-xl shadow-primary/20" 
            : "border-gray-200 dark:border-gray-800 hover:border-primary/50 hover:shadow-lg"
        )}>
          {/* شارة المنتج المميز */}
          {item.isBestSeller && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                الأكثر مبيعاً
              </Badge>
            </div>
          )}

          {/* علامات خاصة */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
            {item.discount && (
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg animate-pulse">
                خصم {item.discount}%
              </Badge>
            )}
            {item.stock <= 0 && (
              <Badge variant="outline" className="bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <AlertCircle className="w-3 h-3 mr-1" />
                غير متوفر
              </Badge>
            )}
            {item.isCompared && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                <Compare className="w-3 h-3 mr-1" />
                للمقارنة
              </Badge>
            )}
            {item.isRecommended && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                موصى به
              </Badge>
            )}
          </div>

          {/* صورة المنتج */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* أزرار التحكم على الصورة */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-4 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
                        onClick={() => window.open(`/product/${item.productId}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>معاينة سريعة</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
                        onClick={() => toggleCompare(item.id)}
                      >
                        <Compare className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>مقارنة المنتج</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
                      onClick={() => {
                        setFavorites(prev => prev.filter(fav => fav.id !== item.id));
                        toast.success("تمت إزالة المنتج من المفضلات", {
                          description: "يمكنك استرجاعه من سجل التصفح",
                          action: {
                            label: "تراجع",
                            onClick: () => console.log("تراجع عن الحذف")
                          }
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>إزالة من المفضلات</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* محتوى البطاقة */}
          <CardContent className="p-5 flex-1">
            {/* الفئة والعلامة التجارية */}
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs font-medium">
                {item.category}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.brand}</span>
                {item.energyEfficiency && (
                  <Badge variant="outline" className="text-xs border-green-200 dark:border-green-800">
                    {item.energyEfficiency}
                  </Badge>
                )}
              </div>
            </div>

            {/* اسم المنتج */}
            <CardTitle className="text-base font-bold mb-2 line-clamp-2 leading-tight">
              {item.name}
            </CardTitle>

            {/* الوصف */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {item.description}
            </p>

            {/* التقييم والميزات */}
            <div className="space-y-3">
              {/* التقييم */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(item.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({item.reviewCount})</span>
                </div>
                {item.installationComplexity && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      item.installationComplexity === "سهل" && "border-green-200 text-green-700",
                      item.installationComplexity === "متوسط" && "border-amber-200 text-amber-700",
                      item.installationComplexity === "متقدم" && "border-red-200 text-red-700"
                    )}
                  >
                    {item.installationComplexity}
                  </Badge>
                )}
              </div>

              {/* الميزات */}
              <div className="flex flex-wrap gap-1.5">
                {item.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {item.features.length > 2 && (
                  <span className="text-xs text-primary font-medium">
                    +{item.features.length - 2}
                  </span>
                )}
              </div>

              {/* المخزون */}
              <div className="flex items-center gap-2">
                {item.stock > 0 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      متوفر ({item.stock} قطعة)
                    </span>
                    {item.stock < 10 && (
                      <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                        كميات محدودة
                      </Badge>
                    )}
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">غير متوفر</span>
                    <Badge variant="outline" className="text-xs">
                      <Bell className="w-3 h-3 mr-1" />
                      إشعار عند التوفر
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* السعر */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl font-bold text-primary">
                  {item.price.toLocaleString()} ر.س
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {item.originalPrice.toLocaleString()} ر.س
                  </span>
                )}
              </div>
              {item.discount && (
                <div className="text-sm text-green-600 font-medium">
                  وفر {((item.originalPrice! - item.price) / item.originalPrice! * 100).toFixed(0)}%
                </div>
              )}
            </div>
          </CardContent>

          {/* أزرار الأفعال */}
          <CardFooter className="p-5 pt-0 border-t">
            <div className="flex flex-col gap-3 w-full">
              {/* كمية والزر */}
              <div className="flex gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= item.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button
                  className="flex-1"
                  disabled={item.stock <= 0 || item.isInCart}
                  onClick={() => {
                    localCart.addItem({
                      id: item.productId,
                      name: item.name,
                      price: item.price,
                      quantity: quantity,
                      image: item.image
                    });
                    setFavorites(prev =>
                      prev.map(fav =>
                        fav.id === item.id ? { ...fav, isInCart: true } : fav
                      )
                    );
                    toast.success("تمت إضافة المنتج إلى السلة", {
                      description: "تمت إضافة " + quantity + " قطعة"
                    });
                    window.dispatchEvent(new Event('cart-updated'));
                  }}
                >
                  {item.isInCart ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      في السلة
                    </>
                  ) : item.stock > 0 ? (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      أضف للسلة
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      غير متوفر
                    </>
                  )}
                </Button>
              </div>

              {/* أزرار إضافية */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9"
                  onClick={() => window.open(`/product/${item.productId}`, '_blank')}
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  التفاصيل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9"
                  onClick={() => toggleCompare(item.id)}
                >
                  <Compare className="w-3.5 h-3.5 mr-1.5" />
                  {item.isCompared ? "إزالة" : "مقارنة"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* خانة الاختيار */}
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={selectedItems.includes(item.id)}
            onCheckedChange={() => toggleItemSelection(item.id)}
            className="h-5 w-5 border-2 border-white shadow-lg bg-white/90 backdrop-blur-sm"
          />
        </div>
      </motion.div>
    );
  };

  // مكون قائمة المنتج
  const ProductListItem = ({ item }: { item: FavoriteItem }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative"
      >
        <Card className="overflow-hidden border mb-4 hover:border-primary/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row">
            {/* الصورة */}
            <div className="md:w-1/4 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleItemSelection(item.id)}
                />
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-1">
                {item.discount && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    خصم {item.discount}%
                  </Badge>
                )}
              </div>
            </div>

            {/* المحتوى */}
            <div className="md:w-3/4 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{item.category}</Badge>
                    {item.isBestSeller && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        الأكثر مبيعاً
                      </Badge>
                    )}
                    {item.isRecommended && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600">
                        <Sparkles className="w-3 h-3 mr-1" />
                        موصى به
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < Math.floor(item.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                            )}
                          />
                        ))}
                      </div>
                      <div>
                        <span className="font-medium">{item.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-sm"> ({item.reviewCount} تقييم)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.stock > 0 ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-medium">متوفر</span>
                          <span className="text-gray-500 text-sm">({item.stock} قطعة)</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 font-medium">غير متوفر</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{item.warranty}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500">
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        أضيف في: {new Date(item.addedAt).toLocaleDateString('ar-SA')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building className="w-4 h-4" />
                        العلامة: {item.brand}
                      </span>
                      {item.energyEfficiency && (
                        <span className="flex items-center gap-1.5">
                          <Leaf className="w-4 h-4" />
                          كفاءة: {item.energyEfficiency}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* الجانب الأيمن - السعر والأزرار */}
                <div className="mt-6 md:mt-0 md:ml-6 flex flex-col items-end min-w-[200px]">
                  <div className="mb-6 text-right">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {item.price.toLocaleString()} ر.س
                    </div>
                    {item.originalPrice && (
                      <>
                        <div className="text-lg text-gray-500 line-through mb-1">
                          {item.originalPrice.toLocaleString()} ر.س
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          وفر {(item.originalPrice - item.price).toLocaleString()} ر.س
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={item.stock <= 0 || item.isInCart}
                      onClick={() => {
                        localCart.addItem({
                          id: item.productId,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image: item.image
                        });
                        setFavorites(prev =>
                          prev.map(fav =>
                            fav.id === item.id ? { ...fav, isInCart: true } : fav
                          )
                        );
                        toast.success("تمت إضافة المنتج إلى السلة");
                        window.dispatchEvent(new Event('cart-updated'));
                      }}
                    >
                      {item.isInCart ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          في السلة
                        </>
                      ) : item.stock > 0 ? (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          أضف للسلة
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 mr-2" />
                          غير متوفر
                        </>
                      )}
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/product/${item.productId}`, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        التفاصيل
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCompare(item.id)}
                      >
                        <Compare className="w-4 h-4 mr-1.5" />
                        مقارنة
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setFavorites(prev => prev.filter(fav => fav.id !== item.id));
                          toast.success("تمت إزالة المنتج من المفضلات");
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1.5" />
                        إزالة
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Share2 className="w-4 h-4 mr-1.5" />
                        مشاركة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  // مكون لوحة المقارنة
  const ComparePanel = () => {
    const compareProducts = favorites.filter(item => compareItems.includes(item.id));

    if (compareItems.length === 0) return null;

    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-2xl z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Compare className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">لوحة المقارنة</h3>
                <Badge className="bg-primary text-white">{compareItems.length} / 4</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                اختر حتى 4 منتجات للمقارنة بين مواصفاتها وأسعارها
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareItems([])}
                disabled={compareItems.length === 0}
              >
                <X className="w-4 h-4 mr-1" />
                مسح الكل
              </Button>
              <Button
                size="sm"
                onClick={() => window.open('/compare', '_blank')}
                disabled={compareItems.length < 2}
                className="bg-gradient-to-r from-primary to-primary/90"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                مقارنة الآن ({compareItems.length})
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsComparing(false)}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {compareProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="border rounded-lg p-3 hover:border-primary transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => toggleCompare(product.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
                <div className="text-lg font-bold text-primary mb-1">
                  {product.price.toLocaleString()} ر.س
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({product.reviewCount})</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.features[0]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // مكونات تحميل
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-56 w-full" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // إذا كان في حالة تحميل
  if (isLoading && isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4 py-8">
            <LoadingSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm mb-2">
                      <Sparkles className="w-3 h-3 mr-1" />
                      قائمة المفضلات
                    </Badge>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  منتجاتك المفضلة<br />
                  <span className="text-white/90">في مكان واحد</span>
                </h1>
                <p className="text-lg text-white/80 mb-6 max-w-2xl">
                  ادخر منتجات الطاقة الشمسية والمركبات الكهربائية المفضلة لديك، قارن بينها، 
                  واحصل على إشعارات عند انخفاض الأسعار
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {totalItems} منتج
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Package className="w-3 h-3 mr-1" />
                    {itemsInStock} متوفر
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Tag className="w-3 h-3 mr-1" />
                    {itemsOnSale} عرض
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    وفر {estimatedSavings.toLocaleString()} ر.س
                  </Badge>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                        >
                          <Heart className="w-6 h-6 text-white/80" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white to-white/50 backdrop-blur-sm flex items-center justify-center shadow-xl">
                      <span className="text-2xl font-bold text-primary">♥</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* الإحصائيات السريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "إجمالي المنتجات", 
                value: totalItems, 
                icon: Heart, 
                color: "from-pink-500 to-rose-500",
                description: "منتج في المفضلات"
              },
              { 
                title: "القيمة الإجمالية", 
                value: totalValue.toLocaleString() + " ر.س", 
                icon: TrendingUp, 
                color: "from-primary to-primary/80",
                description: "قيمة منتجاتك المفضلة"
              },
              { 
                title: "المنتجات المتوفرة", 
                value: itemsInStock, 
                icon: Package, 
                color: "from-green-500 to-emerald-500",
                description: "جاهزة للشراء الآن"
              },
              { 
                title: "وفرت حتى الآن", 
                value: estimatedSavings.toLocaleString() + " ر.س", 
                icon: Tag, 
                color: "from-amber-500 to-yellow-500",
                description: "من التخفيضات"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className={`bg-gradient-to-br ${stat.color} h-2`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}/10`}>
                        <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[0].replace('from-', 'text-')}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* شريط التحكم الرئيسي */}
          <Card className="mb-8 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* البحث والتصفية */}
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="ابحث في المفضلات عن منتج، علامة تجارية، أو مواصفة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-12 h-12 text-base border-2 focus:border-primary"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 h-12 px-4 border-2"
                    >
                      <Filter className="w-5 h-5" />
                      الفلاتر
                      {Object.values(filters).some(val => 
                        Array.isArray(val) ? val.length > 0 : 
                        typeof val === 'boolean' ? val : 
                        val !== null
                      ) && (
                        <Badge className="h-6 w-6 p-0 flex items-center justify-center bg-primary">!</Badge>
                      )}
                    </Button>
                    
                    <Dialog open={showPriceDropAlerts} onOpenChange={setShowPriceDropAlerts}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="h-12 px-4 border-2">
                          <Bell className="w-5 h-5 mr-2" />
                          تنبيهات الأسعار
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>تنبيهات انخفاض الأسعار</DialogTitle>
                          <DialogDescription>
                            سنخطرك عند انخفاض سعر أي منتج في قائمة المفضلات
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">سيتم إرسال إشعارات عبر البريد الإلكتروني والتطبيق</p>
                          <Button className="w-full">تفعيل التنبيهات</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* التحكم في العرض والترتيب */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-md"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className="h-10 w-10 rounded-md"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-5 h-5" />
                    </Button>
                  </div>

                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="h-12 w-48 border-2">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">الأحدث أولاً</SelectItem>
                      <SelectItem value="name">حسب الاسم (أ-ي)</SelectItem>
                      <SelectItem value="price">الأقل سعراً أولاً</SelectItem>
                      <SelectItem value="price-desc">الأعلى سعراً أولاً</SelectItem>
                      <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setIsComparing(!isComparing)}
                    className="flex items-center gap-2 h-12 px-4 border-2"
                  >
                    <Compare className="w-5 h-5" />
                    المقارنة
                    {compareItems.length > 0 && (
                      <Badge className="ml-1 bg-primary">{compareItems.length}</Badge>
                    )}
                  </Button>
                </div>
              </div>

              {/* الفلاتر المتقدمة */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* الفئات */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          الفئات
                        </h4>
                        <div className="space-y-3">
                          {categoryCounts.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <div key={cat.category} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <label className="flex items-center gap-3 cursor-pointer flex-1">
                                  <Checkbox
                                    checked={filters.categories.includes(cat.category)}
                                    onCheckedChange={(checked) => {
                                      setFilters(prev => ({
                                        ...prev,
                                        categories: checked
                                          ? [...prev.categories, cat.category]
                                          : prev.categories.filter(c => c !== cat.category)
                                      }));
                                    }}
                                  />
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color}/10`}>
                                      <Icon className={`w-5 h-5 ${cat.color.split(' ')[0].replace('from-', 'text-')}`} />
                                    </div>
                                    <div>
                                      <span className="font-medium">{cat.category}</span>
                                      <p className="text-sm text-gray-500">{cat.count} منتج</p>
                                    </div>
                                  </div>
                                </label>
                                <Badge variant="outline">{cat.count}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* النطاق السعري */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Tag className="w-5 h-5 text-primary" />
                          النطاق السعري
                        </h4>
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm text-gray-600">السعر الأدنى</div>
                              <div className="text-lg font-bold text-primary">{filters.priceRange[0].toLocaleString()} ر.س</div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm text-gray-600">السعر الأقصى</div>
                              <div className="text-lg font-bold text-primary">{filters.priceRange[1].toLocaleString()} ر.س</div>
                            </div>
                            <Slider
                              value={filters.priceRange}
                              min={0}
                              max={100000}
                              step={1000}
                              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                              className="my-6"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                              <Checkbox
                                checked={filters.inStock}
                                onCheckedChange={(checked) => 
                                  setFilters(prev => ({ ...prev, inStock: checked as boolean }))
                                }
                              />
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>المنتجات المتوفرة فقط</span>
                              </div>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                              <Checkbox
                                checked={filters.onSale}
                                onCheckedChange={(checked) => 
                                  setFilters(prev => ({ ...prev, onSale: checked as boolean }))
                                }
                              />
                              <div className="flex items-center gap-2">
                                <Tag className="w-5 h-5 text-amber-500" />
                                <span>العروض والتخفيضات فقط</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* التقييم والعلامات التجارية */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          التقييم والعلامات
                        </h4>
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-medium mb-3">التقييم</h5>
                            <div className="space-y-2">
                              {[5, 4, 3, 2].map((rating) => (
                                <label key={rating} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                                  <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.rating === rating}
                                    onChange={() => setFilters(prev => ({
                                      ...prev,
                                      rating: prev.rating === rating ? null : rating
                                    }))}
                                    className="h-4 w-4"
                                  />
                                  <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          "w-4 h-4",
                                          i < rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                                        )}
                                      />
                                    ))}
                                    <span className="text-sm">فأكثر</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium mb-3">العلامات التجارية</h5>
                            <div className="flex flex-wrap gap-2">
                              {brands.slice(0, 6).map((brand) => (
                                <Badge
                                  key={brand}
                                  variant={filters.brands.includes(brand) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setFilters(prev => ({
                                      ...prev,
                                      brands: prev.brands.includes(brand)
                                        ? prev.brands.filter(b => b !== brand)
                                        : [...prev.brands, brand]
                                    }));
                                  }}
                                >
                                  {brand}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => setFilters({
                                categories: [],
                                priceRange: [0, 50000],
                                brands: [],
                                inStock: false,
                                onSale: false,
                                rating: null,
                                installationComplexity: [],
                                energyEfficiency: []
                              })}
                            >
                              مسح الكل
                            </Button>
                            <Button
                              className="flex-1 bg-gradient-to-r from-primary to-primary/90"
                              onClick={() => setShowFilters(false)}
                            >
                              تطبيق الفلاتر
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* التبويبات */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 h-12">
                <TabsTrigger value="all" className="text-sm md:text-base">
                  الكل ({totalItems})
                </TabsTrigger>
                <TabsTrigger value="in-stock" className="text-sm md:text-base">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  المتوفرة ({itemsInStock})
                </TabsTrigger>
                <TabsTrigger value="on-sale" className="text-sm md:text-base">
                  <Tag className="w-4 h-4 mr-1" />
                  العروض ({itemsOnSale})
                </TabsTrigger>
                <TabsTrigger value="solar" className="text-sm md:text-base">
                  <PanelTop className="w-4 h-4 mr-1" />
                  الطاقة الشمسية (3)
                </TabsTrigger>
                <TabsTrigger value="cars" className="text-sm md:text-base">
                  <Car className="w-4 h-4 mr-1" />
                  السيارات (1)
                </TabsTrigger>
                <TabsTrigger value="recommended" className="text-sm md:text-base">
                  <Sparkles className="w-4 h-4 mr-1" />
                  موصى به (3)
                </TabsTrigger>
                <TabsTrigger value="best-seller" className="text-sm md:text-base">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  الأكثر مبيعاً (3)
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span>عرض:</span>
                <span className="font-bold text-primary">{filteredFavorites.length}</span>
                <span>من</span>
                <span className="font-bold">{totalItems}</span>
                <span>منتج</span>
              </div>
            </div>

            {/* أدوات المجموعة */}
            {filteredFavorites.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                        <span className="font-medium">
                          {selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0
                            ? "إلغاء تحديد الكل"
                            : "تحديد الكل"}
                        </span>
                      </div>
                      
                      {selectedItems.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary text-white">
                            {selectedItems.length} منتج محدد
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={deleteSelectedItems}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            حذف المحدد
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedItems.length === 0}
                        onClick={addSelectedToCart}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        أضف المحدد للسلة
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowShareModal(true)}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        مشاركة القائمة
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        طباعة
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تصدير
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </Tabs>

          {/* محتوى المفضلات */}
          {filteredFavorites.length === 0 ? (
            <Card className="text-center py-16 shadow-lg border-0">
              <CardContent>
                <HeartOff className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold mb-3">قائمة المفضلات فارغة</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  {searchQuery 
                    ? "لم نتمكن من العثور على منتجات تطابق بحثك. حاول البحث بكلمات أخرى."
                    : "ابدأ بإضافة منتجاتك المفضلة لتسهيل الوصول إليها ومقارنتها لاحقاً."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery ? (
                    <Button 
                      onClick={() => setSearchQuery("")}
                      className="bg-gradient-to-r from-primary to-primary/90"
                    >
                      عرض جميع المنتجات
                    </Button>
                  ) : (
                    <Link href="/products">
                      <Button className="bg-gradient-to-r from-primary to-primary/90">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        تصفح المنتجات
                      </Button>
                    </Link>
                  )}
                  <Link href="/recommendations">
                    <Button variant="outline">
                      <Sparkles className="w-5 h-5 mr-2" />
                      اكتشف منتجات مميزة
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* عرض النتائج */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    عرض <span className="font-bold text-primary">{filteredFavorites.length}</span> من أصل{" "}
                    <span className="font-bold">{totalItems}</span> منتج
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">القيمة الإجمالية:</span>
                    <span className="font-bold text-primary text-lg">
                      {filteredFavorites.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ر.س
                    </span>
                  </div>
                </div>
              </div>

              {/* عرض المنتجات */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFavorites.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFavorites.map((item) => (
                    <ProductListItem key={item.id} item={item} />
                  ))}
                </div>
              )}

              {/* أزرار إضافية */}
              <div className="mt-12 flex flex-col items-center">
                <div className="flex gap-4 mb-8">
                  <Button
                    variant="outline"
                    className="px-8"
                    onClick={() => {
                      setIsLoadingMore(true);
                      setTimeout(() => {
                        setIsLoadingMore(false);
                        toast.info("تم تحميل المزيد من المنتجات");
                      }, 1000);
                    }}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري التحميل...
                      </>
                    ) : (
                      "تحميل المزيد"
                    )}
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="px-8 bg-gradient-to-r from-primary to-primary/90">
                        <Share2 className="w-5 h-5 mr-2" />
                        مشاركة قائمة المفضلات
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>مشاركة قائمة المفضلات</DialogTitle>
                        <DialogDescription>
                          شارك قائمة منتجاتك المفضلة مع الأصدقاء أو فريق العمل
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Mail className="w-4 h-4 mr-2" />
                            بريد إلكتروني
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            رسالة
                          </Button>
                        </div>
                        <Input placeholder="رابط المشاركة" value="https://taqa-almostaqbal.com/favorites/share/123" readOnly />
                        <Button className="w-full">نسخ الرابط</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <p className="text-sm text-gray-500 text-center max-w-2xl">
                  💡 نصيحة: يمكنك مقارنة حتى 4 منتجات في وقت واحد لاتخاذ أفضل قرار شراء. 
                  كما يمكنك تفعيل تنبيهات الأسعار لتلقي إشعارات عند انخفاض أسعار منتجاتك المفضلة.
                </p>
              </div>
            </>
          )}

          {/* قسم الفئات */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">استكشف حسب الفئة</h2>
              <Link href="/products">
                <Button variant="link" className="text-primary">
                  عرض الكل
                  <ChevronLeft className="w-4 h-4 mr-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryCounts.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.category} href={`/products?category=${cat.category}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0">
                      <CardContent className="p-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${cat.color}/10 mb-4 w-fit`}>
                          <Icon className={`w-8 h-8 ${cat.color.split(' ')[0].replace('from-', 'text-')}`} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{cat.category}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {cat.count} منتج في المفضلات
                        </p>
                        <div className="flex items-center text-primary font-medium">
                          <span>استعرض المنتجات</span>
                          <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* لوحة المقارنة */}
      <AnimatePresence>
        {isComparing && <ComparePanel />}
      </AnimatePresence>

      {/* زر العودة للأعلى */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-20 left-4 z-30"
      >
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-xl bg-white dark:bg-gray-900 border-2 hover:border-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronLeft className="w-5 h-5 transform rotate-90" />
        </Button>
      </motion.div>
    </>
  );
}