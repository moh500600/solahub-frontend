import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
  Zap,
  Cpu,
  Shield,
  ShieldCheck,
  Truck,
  Clock,
  Heart,
  Share2,
  ArrowRight,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Package,
  Users,
  FileText,
  ChevronDown,
  Award,
  Thermometer,
  Ruler,
  Weight,
  Settings,
  BatteryCharging,
  Cable,
  Gauge,
  RotateCw,
  AlertCircle,
  Percent,
  DollarSign,
  Battery
} from "lucide-react";

// بيانات وهمية للملحق
const mockAccessoryDetail = (id: number) => {
  const baseAccessory = {
    id,
    name: "منظم شحن MPPT 60A ذكي",
    price: 85000,
    originalPrice: 100000,
    type: "charge_controller",
    rating: 4.8,
    reviewCount: 89,
    stock: 45,
    warranty: "3 سنوات",
    brand: "Victron Energy",
    category: "منظمات الشحن",
    description: "منظم شحن ذكي بتقنية MPPT (Maximum Power Point Tracking) لكفاءة تحويل تصل إلى 99%. يدعم شاشة LCD لعرض البيانات في الوقت الحقيقي واتصال Bluetooth للتحكم والتعديل عبر التطبيق المخصص. مثالي لأنظمة الطاقة الشمسية المنزلية والتجارية الصغيرة.",
    features: [
      "كفاءة تحويل تصل إلى 99%",
      "تقنية MPPT المتطورة",
      "شاشة LCD لعرض البيانات",
      "اتصال Bluetooth مع تطبيق",
      "حماية متعددة (زيادة الجهد، عكس القطبية، حرارة)",
      "متوافق مع بطاريات الليثيوم والرصاص",
      "نطاق جهد واسع 12V/24V/48V",
      "تركيب سهل ودعم فني متكامل"
    ],
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1629654291660-3c98113a0430?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1598880940080-ff4a6f1d0fa9?w=1200&h=800&fit=crop"
      }
    ],
    videos: [
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "شرح تركيب وتشغيل منظم الشحن"
      },
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "كيفية ربط التطبيق وتعديل الإعدادات"
      }
    ],
    specs: [
      { specName: "النوع", specValue: "MPPT Charge Controller" },
      { specName: "التيار الأقصى", specValue: "60A" },
      { specName: "جهد النظام", specValue: "12V / 24V / 48V" },
      { specName: "أقصى جهد للألواح", specValue: "150V" },
      { specName: "الطاقة القصوى", specValue: "880W (12V) / 1760W (24V) / 3520W (48V)" },
      { specName: "كفاءة التحويل", specValue: "حتى 99%" },
      { specName: "درجة حرارة التشغيل", specValue: "-30°C إلى +60°C" },
      { specName: "درجة حرارة التخزين", specValue: "-40°C إلى +85°C" },
      { specName: "حماية الرطوبة", specValue: "IP43" },
      { specName: "الأبعاد", specValue: "265 × 215 × 85 مم" },
      { specName: "الوزن", specValue: "2.3 كجم" },
      { specName: "حماية زيادة الجهد", specValue: "نعم" },
      { specName: "حماية عكس القطبية", specValue: "نعم" },
      { specName: "حماية ارتفاع الحرارة", specValue: "نعم" },
      { specName: "واجهة المستخدم", specValue: "شاشة LCD + Bluetooth" },
      { specName: "البروتوكول", specValue: "VE.Direct, VE.Can" },
      { specName: "الضمان", specValue: "3 سنوات" }
    ],
    pdfUrl: "https://example.com/specs.pdf",
    deliveryInfo: [
      { icon: Truck, text: "شحن مجاني لجميع الطلبات فوق 500 ر.س" },
      { icon: Clock, text: "توصيل خلال 2-5 أيام عمل" },
      { icon: Package, text: "تغليف متميز ضد الصدمات" },
      { icon: ShieldCheck, text: "إرجاع مجاني خلال 14 يوم" },
      { icon: Users, text: "دعم فني متواصل 24/7" },
      { icon: Award, text: "ضمان مصنع 3 سنوات" }
    ],
    reviews: [
      {
        id: 1,
        title: "منظم شحن ممتاز وكفاءة عالية",
        rating: 5,
        content: "المنظم يعمل بكفاءة عالية جداً، خفضت فاتورة الكهرباء بنسبة 70%. التطبيق سهل الاستخدام ويوفر تحليلات مفصلة. خدمة الدعم الفني ممتازة وسريعة.",
        createdAt: "2024-02-15T10:30:00Z",
        user: { name: "أحمد السبيعي", verified: true }
      },
      {
        id: 2,
        title: "جودة عالمية وأداء متميز",
        rating: 4,
        content: "الأداء جيد جداً والتطبيق مفيد لمتابعة الإنتاج. التوصيل كان سريعاً والتغليف محكم. أنصح به للمشاريع المنزلية الصغيرة والمتوسطة.",
        createdAt: "2024-02-10T14:20:00Z",
        user: { name: "سارة القحطاني", verified: true }
      },
      {
        id: 3,
        title: "استثمار ذكي لأنظمتك الشمسية",
        rating: 5,
        content: "استخدمت المنظم لمدة 6 أشهر، زاد إنتاج النظام الشمسي بنسبة 20%. البيانات دقيقة والتطبيق سهل. الجودة عالية والضمان مطمئن.",
        createdAt: "2024-02-05T08:15:00Z",
        user: { name: "محمد الحربي", verified: false }
      },
      {
        id: 4,
        title: "مثالي للمبتدئين والمحترفين",
        rating: 4,
        content: "سهل التركيب، التعليمات واضحة. يحتاج إلى قراءة الدليل لفهم جميع المميزات. أداء ممتاز في الأيام الغائمة.",
        createdAt: "2024-01-28T16:45:00Z",
        user: { name: "فاطمة العتيبي", verified: true }
      },
      {
        id: 5,
        title: "تكلفة مقابل أداء ممتاز",
        rating: 5,
        content: "رغم أن السعر أعلى من بعض المنافسين، لكن الجودة والأداء يستحقان الثمن. خدمة ما بعد البيع ممتازة والدعم الفني متاح دائماً.",
        createdAt: "2024-01-20T11:30:00Z",
        user: { name: "خالد الجهني", verified: true }
      }
    ],
    compatibility: [
      "جميع أنواع الألواح الشمسية",
      "بطاريات الليثيوم (LiFePO4)",
      "بطاريات الرصاص الحمضية",
      "بطاريات الجل (GEL)",
      "بطاريات AGM",
      "أنظمة 12V، 24V، 48V"
    ],
    installation: {
      difficulty: "متوسط",
      time: "30-60 دقيقة",
      tools: ["مفكات", "مقياس جهد", "أداة تجريد أسلاك"],
      steps: [
        "فصل مصدر الطاقة",
        "توصيل الألواح الشمسية",
        "توصيل البطاريات",
        "توصيل الحمل",
        "تشغيل وضبط الإعدادات"
      ]
    }
  };

  // تعديل البيانات حسب ID
  switch (id) {
    case 1:
      return baseAccessory;
    case 2:
      return {
        ...baseAccessory,
        id: 2,
        name: "محول تيار 3000W نقي",
        price: 120000,
        originalPrice: 150000,
        type: "inverter",
        rating: 4.9,
        reviewCount: 124,
        stock: 30,
        brand: "APC by Schneider Electric",
        category: "محولات التيار",
        description: "محول تيار ذو موجة جيبية نقية (Pure Sine Wave) بقدرة 3000 واط، مثالي للأجهزة الحساسة مثل الحواسيب، الأجهزة الطبية، والمعدات الإلكترونية الدقيقة. يتميز بصمت هادئ وكفاءة عالية.",
        features: [
          "موجة جيبية نقية",
          "قدرة 3000 واط",
          "كفاءة 92%",
          "عمل هادئ",
          "حماية متكاملة",
          "شاشة LCD",
          "منافذ USB",
          "وضع توفير الطاقة"
        ],
        specs: [
          { specName: "النوع", specValue: "Pure Sine Wave Inverter" },
          { specName: "القدرة المستمرة", specValue: "3000W" },
          { specName: "القدرة القصوى", specValue: "6000W" },
          { specName: "جهد الدخل", specValue: "12V DC" },
          { specName: "جهد الخرج", specValue: "220V AC" },
          { specName: "التردد", specValue: "50/60Hz" },
          { specName: "الكفاءة", specValue: "92%" },
          { specName: "الأبعاد", specValue: "350 × 180 × 80 مم" },
          { specName: "الوزن", specValue: "4.2 كجم" }
        ]
      };
    case 3:
      return {
        ...baseAccessory,
        id: 3,
        name: "كابلات توصيل 6mm² معزولة",
        price: 15000,
        originalPrice: 20000,
        type: "cables",
        rating: 4.6,
        reviewCount: 56,
        stock: 200,
        brand: "LAPP",
        category: "كابلات وتوصيلات",
        description: "كابلات نحاسية عالية الجودة بقطر 6 مم² مع عازل PVC مقاوم للحرارة والرطوبة. مثالية لتوصيلات الأنظمة الشمسية ومقاومة للعوامل الجوية.",
        features: [
          "نحاس 100% عالي النقاوة",
          "عازل PVC مقاوم 90°C",
          "مقاوم للأشعة فوق البنفسجية",
          "مرن وسهل التركيب",
          "مقاوم للرطوبة",
          "ألوان متعددة للتمييز"
        ],
        specs: [
          { specName: "المادة", specValue: "نحاس 100%" },
          { specName: "المقطع العرضي", specValue: "6 مم²" },
          { specName: "الطول", specValue: "10 متر" },
          { specName: "مقاومة العزل", specValue: ">20 MΩ/km" },
          { specName: "درجة حرارة التشغيل", specValue: "-40°C إلى +90°C" },
          { specName: "لون العازل", specValue: "أسود/أحمر" }
        ]
      };
    default:
      return baseAccessory;
  }
};

export default function AccessoryDetail() {
  const { id } = useParams<{ id: string }>();
  const accessoryId = id ? parseInt(id) : 1;
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  // استخدام البيانات الوهمية
  const accessory = mockAccessoryDetail(accessoryId);
  const isLoading = false;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // إضافة للسلة المحلية للزوار
      localCart.addItem(accessoryId, quantity);
      
      // إظهار إشعار
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${quantity} من ${accessory.name} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      // للمستخدمين المسجلين
      toast.success(`تمت إضافة ${quantity} من المنتج إلى السلة`);
      console.log(`Adding accessory ${accessoryId} to cart with quantity ${quantity}`);
    }
  };

  const priceInSAR = (accessory.price / 100).toFixed(0);
  const originalPriceInSAR = accessory.originalPrice ? (accessory.originalPrice / 100).toFixed(0) : null;
  const discount = originalPriceInSAR && accessory.originalPrice
    ? Math.round(((accessory.originalPrice - accessory.price) / accessory.originalPrice) * 100)
    : 0;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "charge_controller": return <Cpu className="w-6 h-6" />;
      case "inverter": return <Zap className="w-6 h-6" />;
      case "cables": return <Cable className="w-6 h-6" />;
      case "mounting": return <Settings className="w-6 h-6" />;
      case "monitor": return <Gauge className="w-6 h-6" />;
      case "combiner": return <Shield className="w-6 h-6" />;
      case "meter": return <Thermometer className="w-6 h-6" />;
      case "tools": return <RotateCw className="w-6 h-6" />;
      case "protection": return <ShieldCheck className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل تفاصيل الملحق...</p>
        </div>
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold mb-3">الملحق غير موجود</h3>
          <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على الملحق المطلوب</p>
          <Link href="/accessories">
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <ArrowRight className="w-4 h-4" />
              العودة للملحقات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/accessories">
                <Button variant="ghost" className="hover:bg-muted/50 transition-all duration-200 gap-2">
                  <ArrowRight className="w-4 h-4" />
                  العودة للملحقات
                </Button>
              </Link>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  {getTypeIcon(accessory.type)}
                </div>
                <div>
                  <h1 className="text-lg font-bold line-clamp-1 max-w-xs">{accessory.name}</h1>
                  <p className="text-xs text-muted-foreground">{accessory.brand} • {accessory.category}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden shadow-lg">
              {accessory.images && accessory.images.length > 0 ? (
                <>
                  <img
                    src={accessory.images[selectedImageIndex].imageUrl}
                    alt={accessory.name}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full text-lg font-bold shadow-xl">
                          خصم {discount}%
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-16 right-4">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {getTypeIcon(accessory.type)}
                      <span>{accessory.category}</span>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {accessory.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? accessory.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === accessory.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Stock Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md flex items-center gap-2 ${
                      accessory.stock > 20 
                        ? "bg-green-500/20 text-green-700 border border-green-500/30" 
                        : accessory.stock > 5 
                        ? "bg-yellow-500/20 text-yellow-700 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-700 border border-red-500/30"
                    }`}>
                      {accessory.stock > 20 ? (
                        <>
                          <Check className="w-4 h-4" />
                          متوفر ({accessory.stock} قطعة)
                        </>
                      ) : accessory.stock > 5 ? (
                        <>
                          <Clock className="w-4 h-4" />
                          آخر قطع ({accessory.stock} قطعة)
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          تقريباً نفذ
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96 text-muted-foreground">
                  <Package className="w-12 h-12" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {accessory.images && accessory.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4">
                {accessory.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === idx 
                      ? "border-primary ring-2 ring-primary/30" 
                      : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={`صورة ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                معلومات التوصيل والدعم
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accessory.deliveryInfo?.map((info: any, idx: number) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{info.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Accessory Info Section */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-4 mb-2">
              <div className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                {accessory.category}
              </div>
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4" />
                {accessory.brand}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {accessory.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg mr-2">{accessory.rating}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">({accessory.reviewCount} تقييم)</span>
                </div>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>مبيع {Math.round(accessory.reviewCount * 2.5)} قطعة</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {priceInSAR} ر.س
                </span>
                {originalPriceInSAR && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                    <span className="text-sm text-green-600 font-medium">
                      توفير {((parseInt(originalPriceInSAR) - parseInt(priceInSAR)).toLocaleString())} ر.س
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  شامل ضريبة القيمة المضافة
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{accessory.warranty} ضمان</span>
                </div>
              </div>
            </div>

            {/* Key Specs Grid */}
            {accessory.specs && (
              <div className="grid grid-cols-2 gap-4">
                {accessory.specs.slice(0, 4).map((spec: any, idx: number) => (
                  <div key={idx} className="bg-muted/30 rounded-xl p-4 text-center">
                    <div className="text-lg font-bold text-primary mb-1">{spec.specValue}</div>
                    <div className="text-sm text-muted-foreground">{spec.specName}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-muted transition-colors text-xl"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center text-xl font-bold border-x border-border bg-card focus:outline-none"
                    min="1"
                    max={accessory.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(accessory.stock, quantity + 1))}
                    className="px-5 py-3 hover:bg-muted transition-colors text-xl"
                    disabled={quantity >= accessory.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  متوفر: <span className="font-semibold text-primary">{accessory.stock} قطعة</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-6 gap-3"
                  onClick={handleAddToCart}
                  disabled={accessory.stock === 0}
                >
                  {accessory.stock === 0 ? (
                    "غير متوفر"
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      أضف إلى السلة • {parseInt(priceInSAR) * quantity} ر.س
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" className="w-14">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            {accessory.features && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-bold text-lg mb-4">المميزات الرئيسية</h3>
                <div className="space-y-3">
                  {accessory.features.slice(0, 6).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                مشاركة المنتج
              </Button>
              {accessory.pdfUrl && (
                <a href={accessory.pdfUrl} download className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    تحميل المواصفات
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-12">
          {/* Description Section */}
          <ExpandableSection
            title="الوصف التفصيلي"
            icon={<FileText className="w-5 h-5" />}
            isExpanded={expandedSection === "description"}
            onToggle={() => toggleSection("description")}
          >
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">{accessory.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                يتميز هذا الملحق بتقنيات متطورة تضمن كفاءة عالية وأداء مستقر في جميع الظروف الجوية، 
                مع دعم كامل لأنظمة الطاقة الشمسية المختلفة.
              </p>
            </div>
          </ExpandableSection>

          {/* Compatibility Section */}
          {accessory.compatibility && (
            <ExpandableSection
              title="التوافق"
              icon={<Check className="w-5 h-5" />}
              isExpanded={expandedSection === "compatibility"}
              onToggle={() => toggleSection("compatibility")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accessory.compatibility.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}

          {/* Installation Section */}
          {accessory.installation && (
            <ExpandableSection
              title="دليل التركيب"
              icon={<Settings className="w-5 h-5" />}
              isExpanded={expandedSection === "installation"}
              onToggle={() => toggleSection("installation")}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{accessory.installation.time}</div>
                    <div className="text-sm text-muted-foreground">وقت التركيب</div>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{accessory.installation.difficulty}</div>
                    <div className="text-sm text-muted-foreground">مستوى الصعوبة</div>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{accessory.installation.tools.length}</div>
                    <div className="text-sm text-muted-foreground">أداة مطلوبة</div>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{accessory.installation.steps.length}</div>
                    <div className="text-sm text-muted-foreground">خطوة تركيب</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4">أدوات مطلوبة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {accessory.installation.tools.map((tool: string, idx: number) => (
                      <span key={idx} className="px-3 py-2 bg-muted rounded-lg text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4">خطوات التركيب:</h4>
                  <div className="space-y-3">
                    {accessory.installation.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-muted-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableSection>
          )}

          {/* Videos Section */}
          {accessory.videos && accessory.videos.length > 0 && (
            <ExpandableSection
              title="الفيديوهات التوضيحية"
              icon={<FileText className="w-5 h-5" />}
              isExpanded={expandedSection === "videos"}
              onToggle={() => toggleSection("videos")}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {accessory.videos.map((video: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-lg border border-border">
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={video.videoUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    {video.title && (
                      <div className="p-4 bg-card">
                        <p className="font-semibold">{video.title}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}

          {/* Specs Section */}
          {accessory.specs && accessory.specs.length > 0 && (
            <ExpandableSection
              title="المواصفات الفنية"
              icon={<Settings className="w-5 h-5" />}
              isExpanded={expandedSection === "specs"}
              onToggle={() => toggleSection("specs")}
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {accessory.specs.map((spec: any, idx: number) => (
                    <div key={idx} className={`p-4 ${idx % 2 === 0 ? 'bg-muted/30' : ''} border-l border-border last:border-l-0`}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{spec.specName}</span>
                        <span className="text-muted-foreground">{spec.specValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableSection>
          )}
        </div>

        {/* Reviews Section */}
        {accessory.reviews && accessory.reviews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">تقييمات العملاء</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {accessory.rating}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.round(accessory.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{accessory.reviewCount} تقييم</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary/90 gap-2">
                <Star className="w-4 h-4" />
                أضف تقييمك
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {accessory.reviews.map((review: any) => (
                <div key={review.id} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{review.user.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold">{review.user.name}</p>
                          <div className="flex items-center gap-1">
                            {review.user.verified && (
                              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                عميل موثوق
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("ar-SA", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {review.title && (
                    <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                  )}
                  
                  {review.content && (
                    <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ExpandableSection({
  title,
  icon,
  children,
  isExpanded,
  onToggle
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      
      {isExpanded && (
        <div className="p-6 border-t border-border animate-in fade-in">
          {children}
        </div>
      )}
    </div>
  );
}