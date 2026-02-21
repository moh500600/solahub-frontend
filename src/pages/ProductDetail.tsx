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
  Battery,
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
  Copy,
  CheckCircle
} from "lucide-react";

// بيانات وهمية للمنتج
const mockProductDetail = (id: number) => {
  const baseProduct = {
    id,
    name: "لوح شمسي 400 واط مونو كريستال",
    price: 45000,
    originalPrice: 50000,
    power: 400,
    efficiency: 21.5,
    voltage: 40,
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    warranty: "25 سنة",
    capacity: "2000",
    brand: "SunPower",
    category: "مونو كريستال",
    description: "لوح شمسي عالي الكفاءة مصنوع من خلايا مونو كريستال أحادية. يتميز بمقاومة عالية للأتربة والماء، مع ضمان 25 سنة على الأداء. مناسب للمنازل والمشاريع التجارية الصغيرة والمتوسطة.",
    features: [
      "كفاءة خلايا عالية 21.5%",
      "مقاوم للأتربة والغبار",
      "مقاوم للماء IP67",
      "تحمل الظروف الجوية القاسية",
      "أداء ثابت على المدى الطويل"
    ],
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1598146286984-26d5a7d6d0b5?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop"
      }
    ],
    videos: [
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "شرح تركيب اللوح الشمسي"
      },
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "اختبار الكفاءة في ظروف مختلفة"
      }
    ],
    specs: [
      { specName: "النوع", specValue: "مونو كريستال" },
      { specName: "القدرة القصوى", specValue: "400W" },
      { specName: "كفاءة الخلايا", specValue: "21.5%" },
      { specName: "جهد الدائرة المفتوحة", specValue: "49.5V" },
      { specName: "تيار الدائرة القصيرة", specValue: "10.2A" },
      { specName: "جهد التشغيل الأمثل", specValue: "40V" },
      { specName: "تيار التشغيل الأمثل", specValue: "10A" },
      { specName: "درجة حرارة التشغيل", specValue: "-40°C إلى +85°C" },
      { specName: "معامل درجة الحرارة للطاقة", specValue: "-0.35%/°C" },
      { specName: "الأبعاد", specValue: "1700 × 1000 × 35 مم" },
      { specName: "الوزن", specValue: "18.5 كجم" },
      { specName: "لون الإطار", specValue: "أسود" },
      { specName: "لون الخلفية", specValue: "أبيض" },
      { specName: "نوع الزجاج", specValue: "مقوى عالي الشفافية" },
      { specName: "ضمان المنتج", specValue: "12 سنة" },
      { specName: "ضمان الأداء", specValue: "25 سنة" }
    ],
    pdfUrl: "https://example.com/specs.pdf",
    deliveryInfo: [
      { icon: Truck, text: "شحن مجاني لجميع الطلبات فوق 500 ر.س" },
      { icon: Clock, text: "توصيل خلال 2-5 أيام عمل" },
      { icon: Package, text: "تغليف متميز ضد الكسر" },
      { icon: ShieldCheck, text: "إرجاع مجاني خلال 14 يوم" }
    ],
    reviews: [
      {
        id: 1,
        title: "منتج ممتاز وكفاءة عالية",
        rating: 5,
        content: "اللوح يعمل بكفاءة عالية، التوصيل كان سريعاً والتغليف جيد جداً. خفض فاتورة الكهرباء بنسبة 70% خلال أول شهر. أنصح به بشدة للمنازل والمشاريع الصغيرة.",
        createdAt: "2024-01-15T10:30:00Z",
        user: { name: "محمد أحمد", verified: true }
      },
      {
        id: 2,
        title: "جودة عالمية بسعر معقول",
        rating: 4,
        content: "الأداء جيد جداً ولكن السعر أعلى قليلاً من المنافسين. الكفاءة ممتازة في الأيام المشمسة. التركيب كان سهلاً بمساعدة الفني المختص.",
        createdAt: "2024-01-10T14:20:00Z",
        user: { name: "سالم القحطاني", verified: true }
      },
      {
        id: 3,
        title: "استثمار ذكي للطاقة",
        rating: 5,
        content: "استخدمت المنتج لمدة 3 أشهر، خفض فاتورة الكهرباء بشكل ملحوظ. جودة التصنيع عالية والضمان مطمئن. خدمة العملاء ممتازة.",
        createdAt: "2024-01-05T08:15:00Z",
        user: { name: "نورة السبيعي", verified: false }
      },
      {
        id: 4,
        title: "مثالي للمشاريع الصغيرة",
        rating: 4,
        content: "سهل التركيب، الإرشادات واضحة. يحتاج إلى تنظيف دوري للحفاظ على الكفاءة. أنصح به للمبتدئين في مجال الطاقة الشمسية.",
        createdAt: "2023-12-28T16:45:00Z",
        user: { name: "خالد الحربي", verified: true }
      }
    ]
  };

  // تعديل البيانات حسب ID
  switch (id) {
    case 1:
      return baseProduct;
    case 2:
      return {
        ...baseProduct,
        id: 2,
        name: "لوح شمسي 550 واط بي فليكس",
        price: 65000,
        originalPrice: 72000,
        power: 550,
        efficiency: 22.8,
        voltage: 48,
        rating: 4.9,
        reviewCount: 89,
        stock: 30,
        brand: "LG Solar",
        category: "بي فليكس",
        description: "لوح شمسي مرن يمكن تركيبه على الأسطح المنحنية. مقاوم للماء والصدمات، مثالي للقوارب والكارافانات والأسطح غير المستوية. يتميز بخفة الوزن وسهولة التركيب.",
        features: [
          "مرن وقابل للطي",
          "مقاوم للماء IP68",
          "خفة الوزن وسهولة التركيب",
          "أداء عالي في الظروف الصعبة",
          "مثالي للأسطح المنحنية"
        ]
      };
    case 3:
      return {
        ...baseProduct,
        id: 3,
        name: "لوح شمسي 320 واط بولي كريستال",
        price: 35000,
        originalPrice: null,
        power: 320,
        efficiency: 18.5,
        voltage: 36,
        rating: 4.5,
        reviewCount: 67,
        stock: 100,
        brand: "Canadian Solar",
        category: "بولي كريستال",
        description: "لوح شمسي اقتصادي مناسب للمشاريع محدودة الميزانية. ذو جودة عالية وسعر مناسب للمبتدئين. مثالي للاستخدام المنزلي والحدائق.",
        features: [
          "سعر اقتصادي",
          "مثالي للمشاريع الصغيرة",
          "سهل التركيب والصيانة",
          "تحمل درجات الحرارة العالية",
          "ضمان 10 سنوات"
        ]
      };
    case 4:
      return {
        ...baseProduct,
        id: 4,
        name: "لوح شمسي 600 واط Half-Cell",
        price: 85000,
        originalPrice: 95000,
        power: 600,
        efficiency: 23.2,
        voltage: 50,
        rating: 4.9,
        reviewCount: 45,
        stock: 25,
        brand: "Jinko Solar",
        category: "هالف سيل",
        description: "تقنية Half-Cell للكفاءة الأعلى في الظل والأيام الغائمة. مثالي للمناطق ذات الإشعاع الشمسي المتوسط. يتميز بأداء مستقر على مدار اليوم.",
        features: [
          "تقنية Half-Cell المتقدمة",
          "أداء ممتاز في الظل",
          "كفاءة 23.2%",
          "مقاوم للتشقق والتلف",
          "ضمان 30 سنة"
        ]
      };
    case 5:
      return {
        ...baseProduct,
        id: 5,
        name: "لوح شمسي 480 واط Black Frame",
        price: 58000,
        originalPrice: 62000,
        power: 480,
        efficiency: 21.8,
        voltage: 42,
        rating: 4.7,
        reviewCount: 156,
        stock: 40,
        brand: "Trina Solar",
        category: "مونو كريستال",
        description: "إطار أسود أنيق مع خلايا سوداء للحصول على مظهر جمالي متناسق. مناسب للواجهات المعمارية الحديثة. يتميز بمقاومة الصدأ والتآكل.",
        features: [
          "تصميم أنيق أسود بالكامل",
          "مقاوم للصدأ والتآكل",
          "كفاءة عالية 21.8%",
          "مثالي للواجهات المعمارية",
          "ضمان 25 سنة"
        ]
      };
    case 6:
      return {
        ...baseProduct,
        id: 6,
        name: "لوح شمسي 700 واط للمشاريع التجارية",
        price: 120000,
        originalPrice: null,
        power: 700,
        efficiency: 24.1,
        voltage: 55,
        rating: 5.0,
        reviewCount: 34,
        stock: 15,
        warranty: "30 سنة",
        brand: "JA Solar",
        category: "مونو كريستال",
        description: "مصمم خصيصاً للمشاريع التجارية والصناعية الكبيرة. يتميز بمقاومة عالية للظروف القاسية وكفاءة عالية. مثالي للمصانع والشركات الكبرى.",
        features: [
          "مخصص للمشاريع التجارية",
          "أعلى كفاءة 24.1%",
          "تحمل الظروف القاسية",
          "إنتاجية عالية ومستقرة",
          "ضمان 30 سنة"
        ]
      };
    default:
      return baseProduct;
  }
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 1;
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // استخدام البيانات الوهمية
  const product = mockProductDetail(productId);
  const isLoading = false;

  // توليد رابط المشاركة
  const productLink = `${window.location.origin}/product/${productId}`;

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productLink)
      .then(() => {
        setCopied(true);
        toast.success("تم نسخ الرابط", {
          description: "تم نسخ رابط المنتج إلى الحافظة",
        });
        
        // إخفاء رسالة النسخ بعد 3 ثواني
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch(err => {
        console.error('فشل نسخ الرابط: ', err);
        toast.error("فشل نسخ الرابط");
      });
  };

  const shareViaWhatsApp = () => {
    const text = `تفضل رابط المنتج: ${product.name}\n${productLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `منتج: ${product.name}`;
    const body = `مرحباً،\n\nأود مشاركة هذا المنتج معك:\n\n${product.name}\n\n${product.description?.substring(0, 150)}...\n\nرابط المنتج: ${productLink}\n\nمع خالص التحيات`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const shareViaTwitter = () => {
    const text = `${product.name} - ${productLink}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // إضافة للسلة المحلية للزوار
      localCart.addItem(productId, quantity);
      
      // إظهار إشعار
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${quantity} من ${product.name} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      // للمستخدمين المسجلين
      toast.success(`تمت إضافة ${quantity} من المنتج إلى السلة`);
      console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
    }
  };

  const priceInSAR = (product.price / 100).toFixed(0);
  const originalPriceInSAR = product.originalPrice ? (product.originalPrice / 100).toFixed(0) : null;
  const discount = originalPriceInSAR && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // إغلاق قائمة المشاركة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.share-container') && !target.closest('.share-button')) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareOptions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold mb-3">المنتج غير موجود</h3>
          <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
          <Link href="/">
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <ArrowRight className="w-4 h-4" />
              العودة للمتجر
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
              <Link href="/">
                <Button variant="ghost" className="hover:bg-muted/50 transition-all duration-200 gap-2">
                  <ArrowRight className="w-4 h-4" />
                  العودة للمتجر
                </Button>
              </Link>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-bold line-clamp-1 max-w-xs">{product.name}</h1>
                  <p className="text-xs text-muted-foreground">{product.brand} • {product.category}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleShareClick} 
                className="share-button relative"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              
              {/* قائمة المشاركة المنبثقة */}
              {showShareOptions && (
                <div className="share-container absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-5">
                  <div className="p-4">
                    <h3 className="font-bold mb-4 text-right text-lg">مشاركة المنتج</h3>
                    
                    {/* رابط المنتج مع زر النسخ */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-3 text-right">رابط المنتج:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted/30 px-4 py-3 rounded-lg border border-border overflow-hidden">
                          <p className="text-sm truncate ltr text-left">{productLink}</p>
                        </div>
                        <Button
                          variant={copied ? "default" : "outline"}
                          size="icon"
                          onClick={copyToClipboard}
                          className="flex-shrink-0 h-11"
                        >
                          {copied ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                      {copied && (
                        <p className="text-xs text-green-600 mt-2 text-right animate-in fade-in">✓ تم نسخ الرابط</p>
                      )}
                    </div>

                    {/* خيارات المشاركة */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-12 flex items-center gap-3 justify-center hover:bg-green-50 hover:border-green-200"
                        onClick={shareViaWhatsApp}
                      >
                        <span className="text-green-600 font-semibold">واتساب</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 flex items-center gap-3 justify-center hover:bg-blue-50 hover:border-blue-200"
                        onClick={shareViaEmail}
                      >
                        <span className="text-blue-600 font-semibold">بريد</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 flex items-center gap-3 justify-center hover:bg-sky-50 hover:border-sky-200"
                        onClick={shareViaTwitter}
                      >
                        <span className="text-sky-500 font-semibold">تويتر</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 flex items-center gap-3 justify-center hover:bg-primary/5 hover:border-primary/30"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: product.name,
                              text: product.description?.substring(0, 100),
                              url: productLink,
                            });
                          } else {
                            copyToClipboard();
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="font-semibold">مشاركة</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* زر مشاركة عائم للجوال */}
      <div className="fixed bottom-4 left-4 z-40 md:hidden">
        <Button
          variant="default"
          size="icon"
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-primary to-primary/90 share-button"
          onClick={handleShareClick}
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>

      {/* نافذة المشاركة للجوال */}
      {showShareOptions && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 animate-in fade-in" onClick={() => setShowShareOptions(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-6 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">مشاركة المنتج</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowShareOptions(false)}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* رابط المنتج مع زر النسخ */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">رابط المنتج:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted/30 px-4 py-3 rounded-lg border border-border overflow-hidden">
                  <p className="text-sm truncate ltr text-left">{productLink}</p>
                </div>
                <Button
                  variant={copied ? "default" : "outline"}
                  size="icon"
                  onClick={copyToClipboard}
                  className="flex-shrink-0 h-11"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-2 animate-in fade-in">✓ تم نسخ الرابط إلى الحافظة</p>
              )}
            </div>

            {/* خيارات المشاركة */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-200"
                onClick={shareViaWhatsApp}
              >
                <span className="text-green-600 text-lg font-semibold">واتساب</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={shareViaEmail}
              >
                <span className="text-blue-600 text-lg font-semibold">بريد</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-2 hover:bg-sky-50 hover:border-sky-200"
                onClick={shareViaTwitter}
              >
                <span className="text-sky-500 text-lg font-semibold">تويتر</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description?.substring(0, 100),
                      url: productLink,
                    });
                  } else {
                    copyToClipboard();
                  }
                }}
              >
                <Share2 className="w-6 h-6" />
                <span className="font-semibold">مشاركة</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden shadow-lg">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[selectedImageIndex].imageUrl}
                    alt={product.name}
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

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? product.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === product.images.length - 1 ? 0 : prev + 1
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
                      product.stock > 20 
                        ? "bg-green-500/20 text-green-700 border border-green-500/30" 
                        : product.stock > 5 
                        ? "bg-yellow-500/20 text-yellow-700 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-700 border border-red-500/30"
                    }`}>
                      {product.stock > 20 ? (
                        <>
                          <Check className="w-4 h-4" />
                          متوفر ({product.stock} قطعة)
                        </>
                      ) : product.stock > 5 ? (
                        <>
                          <Clock className="w-4 h-4" />
                          آخر قطع ({product.stock} قطعة)
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
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4">
                {product.images.map((img: any, idx: number) => (
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
                معلومات التوصيل
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {product.deliveryInfo?.map((info: any, idx: number) => {
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

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-4 mb-2">
              <div className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                {product.category}
              </div>
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4" />
                {product.brand}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg mr-2">{product.rating}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">({product.reviewCount} تقييم)</span>
                </div>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>مبيع {Math.round(product.reviewCount * 3.5)} قطعة</span>
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
                  <span className="font-medium">{product.warranty} ضمان</span>
                </div>
              </div>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{product.power}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4" />
                  القدرة (W)
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{product.efficiency}%</div>
                <div className="text-sm text-muted-foreground">الكفاءة</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{product.voltage}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <BatteryCharging className="w-4 h-4" />
                  الجهد (V)
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">25</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" />
                  سنة ضمان
                </div>
              </div>
            </div>

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
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-5 py-3 hover:bg-muted transition-colors text-xl"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  متوفر: <span className="font-semibold text-primary">{product.stock} قطعة</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-6 gap-3"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? (
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
            {product.features && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-bold text-lg mb-4">المميزات الرئيسية</h3>
                <div className="space-y-3">
                  {product.features.map((feature: string, idx: number) => (
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
              <Button 
                variant="outline" 
                className="flex-1 gap-2" 
                onClick={handleShareClick}
              >
                <Share2 className="w-4 h-4" />
                مشاركة المنتج
              </Button>
              {product.pdfUrl && (
                <a href={product.pdfUrl} download className="flex-1">
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
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                يتميز هذا اللوح الشمسي بتقنية متطورة تزيد من كفاءة تحويل الطاقة الشمسية إلى كهرباء، 
                مع مقاومة عالية للظروف الجوية القاسية والعوامل البيئية المختلفة.
              </p>
            </div>
          </ExpandableSection>

          {/* Videos Section */}
          {product.videos && product.videos.length > 0 && (
            <ExpandableSection
              title="الفيديوهات التوضيحية"
              icon={<FileText className="w-5 h-5" />}
              isExpanded={expandedSection === "videos"}
              onToggle={() => toggleSection("videos")}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {product.videos.map((video: any, idx: number) => (
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
          {product.specs && product.specs.length > 0 && (
            <ExpandableSection
              title="المواصفات الفنية"
              icon={<Settings className="w-5 h-5" />}
              isExpanded={expandedSection === "specs"}
              onToggle={() => toggleSection("specs")}
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {product.specs.map((spec: any, idx: number) => (
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
        {product.reviews && product.reviews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">تقييمات العملاء</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {product.rating}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{product.reviewCount} تقييم</p>
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
              {product.reviews.map((review: any) => (
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