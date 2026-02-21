import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";
import {
  Star,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  ShieldCheck,
  Truck,
  Package,
  Check,
  ArrowRight,
  ShoppingCart,
  Thermometer,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  BadgeCheck,
  Heart,
  Share2,
  ArrowLeft,
  Info,
  Battery
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

// نفس بيانات البطاريات المستخدمة في صفحة Batteries
const mockBatteries = [
  {
    id: 10,
    name: "بطارية ليثيوم 5 كيلووات ساعة",
    price: 85000,
    originalPrice: 95000,
    capacity: 5,
    voltage: 48,
    maxPower: 5,
    cycles: 6000,
    warranty: "10 سنة",
    rating: 4.7,
    reviewCount: 67,
    stock: 25,
    brandId: 1,
    typeId: 1,
    images: [{
      imageUrl: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=600&h=400&fit=crop"
    }],
    description: "بطارية ليثيوم أيون عالية السعة لتخزين الطاقة الشمسية، مثالية للمنازل والمشاريع الصغيرة.",
    detailedDescription: `
      <p>بطارية ليثيوم أيون 5 كيلووات ساعة هي حل تخزين طاقة متقدم مصمم خصيصاً للأنظمة الشمسية المنزلية والتجارية الصغيرة. تتميز بكفاءة عالية تصل إلى 98% وعمر افتراضي طويل يصل إلى 15 سنة.</p>
      <p>تتميز هذه البطارية بتقنية إدارة البطارية الذكية (BMS) التي تضمان:</p>
      <ul>
        <li>الحماية من الشحن الزائد والتفريغ العميق</li>
        <li>موازنة الخلايا تلقائياً</li>
        <li>مراقبة درجة الحرارة والجهد</li>
        <li>توصيل عن بعد عبر تطبيق الهاتف</li>
      </ul>
      <p>مثالية للاستخدام مع الأنظمة الشمسية حتى 5 كيلووات.</p>
    `,
    features: ["سعة 5 كيلووات ساعة", "6000 دورة شحن", "كفاءة 98%", "ضمان 10 سنوات", "تحكم ذكي"],
    specifications: [
      { label: "السعة الاسمية", value: "5 كيلووات ساعة", unit: "" },
      { label: "الجهد الاسمي", value: "48", unit: "فولت" },
      { label: "الطاقة القصوى", value: "5", unit: "كيلووات" },
      { label: "دورات الشحن", value: "6000", unit: "دورة" },
      { label: "عمر الافتراضي", value: "15", unit: "سنة" },
      { label: "درجة حرارة التشغيل", value: "-10 إلى 50", unit: "°م" },
      { label: "الكفاءة", value: "98", unit: "%" },
      { label: "الوزن", value: "45", unit: "كجم" },
      { label: "الأبعاد", value: "60×45×20", unit: "سم" }
    ],
    delivery: "شحن مجاني",
    installation: "دعم فني مجاني للتركيب",
    returnPolicy: "30 يوم إرجاع مجاني"
  },
  {
    id: 11,
    name: "بطارية ليثيوم 10 كيلووات ساعة",
    price: 150000,
    originalPrice: 170000,
    capacity: 10,
    voltage: 48,
    maxPower: 10,
    cycles: 5000,
    warranty: "10 سنة",
    rating: 4.8,
    reviewCount: 34,
    stock: 15,
    brandId: 2,
    typeId: 1,
    images: [{
      imageUrl: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=600&h=400&fit=crop"
    }],
    description: "بطارية ليثيوم أيون متوسطة السعة، مثالية للاستخدام المنزلي والشركات الصغيرة.",
    detailedDescription: `
      <p>بطارية ليثيوم أيون 10 كيلووات ساعة توفر سعة تخزين متميزة للمنازل الكبيرة والمتاجر الصغيرة. بنظام تبريد متطور يضمن استقرار الأداء حتى في درجات الحرارة العالية.</p>
    `,
    features: ["سعة 10 كيلووات ساعة", "5000 دورة شحن", "كفاءة 96%", "ضمان 10 سنوات", "نظام تبريد فعال"],
    specifications: [
      { label: "السعة الاسمية", value: "10", unit: "كيلووات ساعة" },
      { label: "الجهد الاسمي", value: "48", unit: "فولت" },
      { label: "الطاقة القصوى", value: "10", unit: "كيلووات" },
      { label: "دورات الشحن", value: "5000", unit: "دورة" }
    ],
    delivery: "توصيل سريع"
  },
  // باقي البطاريات بنفس الهيكل...
];

// أنواع البطاريات
const mockBatteryTypes = [
  { id: 1, name: "ليثيوم أيون", icon: BatteryCharging, color: "blue" },
  { id: 2, name: "رصاص-حمض", icon: BatteryMedium, color: "gray" },
  { id: 3, name: "ليثيوم فوسفات حديد", icon: BatteryFull, color: "green" },
  { id: 4, name: "هجين", icon: Battery, color: "purple" }
];

// العلامات التجارية
const mockBatteryBrands = [
  { 
    id: 1, 
    name: "Tesla Powerwall", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/320px-Tesla_Motors.svg.png",
    description: "رائدة في حلول تخزين الطاقة المنزلية"
  },
  { 
    id: 2, 
    name: "LG Chem", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_Solar_logo.svg/320px-LG_Solar_logo.svg.png",
    description: "تقنية ليثيوم أيون متطورة"
  },
  // ... باقي العلامات التجارية
];

export default function BatteryDetail() {
  const [match, params] = useRoute("/battery/:id");
  const batteryId = params ? parseInt(params.id) : null;
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // العثور على البطارية المحددة
  const battery = mockBatteries.find(b => b.id === batteryId);
  const brand = battery ? mockBatteryBrands.find(b => b.id === battery.brandId) : null;
  const type = battery ? mockBatteryTypes.find(t => t.id === battery.typeId) : null;

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

  const handleAddToCart = () => {
    if (!battery) return;

    if (!isAuthenticated) {
      // إضافة للسلة المحلية للزوار
      localCart.addItem(battery.id, quantity);
      
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${battery.name} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      // للمستخدمين المسجلين
      toast.success(`تمت إضافة ${quantity} من ${battery.name} إلى السلة`);
    }
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(!isInWishlist ? "تمت الإضافة إلى المفضلة" : "تمت الإزالة من المفضلة");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: battery?.name,
          text: battery?.description,
          url: window.location.href,
        });
        toast.success("تم مشاركة المنتج");
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: نسخ الرابط
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط المنتج");
    }
  };

  if (!battery) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header />
        <div className="container py-20 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Battery className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h1 className="text-3xl font-bold mb-4">البطارية غير موجودة</h1>
          <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على البطارية المطلوبة</p>
          <Button asChild>
            <a href="/batteries">تصفح جميع البطاريات</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const priceInSAR = (battery.price / 100).toFixed(0);
  const originalPriceInSAR = battery.originalPrice ? (battery.originalPrice / 100).toFixed(0) : null;
  const discount = originalPriceInSAR 
    ? Math.round((1 - battery.price / battery.originalPrice) * 100)
    : 0;

  // تحديد أيقونة حسب سعة البطارية
  const getBatteryIcon = (capacity: number) => {
    if (capacity <= 3) return BatteryLow;
    if (capacity <= 8) return BatteryMedium;
    if (capacity <= 15) return BatteryFull;
    return BatteryCharging;
  };

  const BatteryIcon = getBatteryIcon(battery.capacity);

  // زر السلة العائم
  const FloatingCartButton = ({ count }: { count: number }) => {
    return (
      <a href="/cart">
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
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
            <ArrowLeft className="w-3 h-3 rotate-180" />
            <a href="/batteries" className="hover:text-primary transition-colors">البطاريات</a>
            <ArrowLeft className="w-3 h-3 rotate-180" />
            <span className="text-foreground font-medium">{battery.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* الصور */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 mb-4 h-[400px] lg:h-[500px]">
              <img
                src={battery.images[0].imageUrl}
                alt={battery.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              {discount > 0 && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
                    <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      خصم {discount}%
                    </div>
                  </div>
                </div>
              )}

              {brand && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-20 h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = 'w-20 h-8 bg-muted flex items-center justify-center rounded';
                      fallbackDiv.innerHTML = `<span class="text-sm font-bold">${brand.name}</span>`;
                      e.target.parentNode?.appendChild(fallbackDiv);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div>
            {/* العلامة التجارية والنوع */}
            <div className="flex items-center gap-3 mb-4">
              {type && (
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${
                  type.id === 1 ? "bg-blue-500" :
                  type.id === 2 ? "bg-gray-500" :
                  type.id === 3 ? "bg-green-500" : "bg-purple-500"
                }`}>
                  {type.name}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{battery.rating}</span>
                <span className="text-sm text-muted-foreground">({battery.reviewCount} تقييم)</span>
              </div>
            </div>

            {/* العنوان */}
            <h1 className="text-3xl font-bold mb-4">{battery.name}</h1>

            {/* الوصف المختصر */}
            <p className="text-muted-foreground mb-6">{battery.description}</p>

            {/* السعر */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {priceInSAR} ر.س
                </span>
                {originalPriceInSAR && (
                  <span className="text-xl text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                )}
              </div>
              {originalPriceInSAR && (
                <div className="text-green-600 font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  وفرت {((parseInt(originalPriceInSAR) - parseInt(priceInSAR)).toLocaleString())} ر.س
                </div>
              )}
            </div>

            {/* المميزات */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">المميزات الرئيسية</h3>
              <div className="grid grid-cols-2 gap-2">
                {battery.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* الكمية والإضافة */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium">الكمية:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className={`px-3 py-1 rounded-full ${
                    battery.stock > 10 
                      ? "bg-green-500/20 text-green-700" 
                      : "bg-yellow-500/20 text-yellow-700"
                  }`}>
                    {battery.stock > 10 ? "متوفر" : "آخر القطع"}
                  </div>
                  <span className="text-muted-foreground">المخزون: {battery.stock}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                  onClick={handleAddToCart}
                  disabled={battery.stock === 0}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-lg">أضف إلى السلة</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* معلومات التوصيل والضمان */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold">{battery.delivery}</div>
                  <div className="text-xs text-muted-foreground">التوصيل</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold">ضمان {battery.warranty}</div>
                  <div className="text-xs text-muted-foreground">الضمان</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* التبويبات */}
        <div className="mb-12">
          <div className="border-b border-border">
            <div className="flex gap-8">
              <button className="py-3 border-b-2 border-primary font-bold">
                المواصفات الفنية
              </button>
              <button className="py-3 text-muted-foreground hover:text-foreground">
                معلومات التركيب
              </button>
              <button className="py-3 text-muted-foreground hover:text-foreground">
                التقييمات
              </button>
              <button className="py-3 text-muted-foreground hover:text-foreground">
                الأسئلة الشائعة
              </button>
            </div>
          </div>

          <div className="py-8">
            {/* المواصفات الفنية */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl mb-6">المواصفات التقنية</h3>
                <div className="space-y-4">
                  {(battery.specifications || []).map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-bold">
                        {spec.value} {spec.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6">معلومات إضافية</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      الوصف التفصيلي
                    </h4>
                    <div 
                      className="text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: battery.detailedDescription || battery.description }}
                    />
                  </div>

                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      محتويات العلبة
                    </h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>وحدة البطارية الرئيسية</li>
                      <li>نظام إدارة البطارية (BMS)</li>
                      <li>كابل توصيل 2 متر</li>
                      <li>دليل التركيب والاستخدام</li>
                      <li>شهادة الضمان</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بطاريات مشابهة */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">بطاريات مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBatteries
              .filter(b => b.id !== battery.id && b.typeId === battery.typeId)
              .slice(0, 3)
              .map(similarBattery => (
                <div key={similarBattery.id} className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={similarBattery.images[0].imageUrl}
                      alt={similarBattery.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">{similarBattery.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <BatteryIcon className="w-4 h-4" />
                        <span className="text-sm">{similarBattery.capacity} ك.و.س</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{similarBattery.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{(similarBattery.price / 100).toFixed(0)} ر.س</span>
                      <a 
                        href={`/battery/${similarBattery.id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                      >
                        التفاصيل
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <FloatingCartButton count={cartCount} />
      <Footer />
    </div>
  );
}