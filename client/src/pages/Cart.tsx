import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Trash2, Plus, Minus, ShoppingCart, Zap, ArrowRight, Package, Shield, Truck, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { localCart } from "@/lib/local-cart";
import { toast } from "sonner";

// بيانات وهمية للمنتجات (نفس البيانات من SolarPanels.tsx)
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
    categoryId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
      }
    ],
    description: "لوح شمسي عالي الكفاءة مصنوع من خلايا مونو كريستال أحادية، مناسب للمنازل والمشاريع التجارية.",
    features: ["كفاءة عالية", "ضمان 25 سنة", "مقاوم للأتربة"],
    warranty: "25 سنة",
    delivery: "شحن مجاني"
  },
  {
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
    brandId: 2,
    categoryId: 2,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1598146286984-26d5a7d6d0b5?w=600&h=400&fit=crop"
      }
    ],
    description: "لوح شمسي مرن يمكن تركيبه على الأسطح المنحنية، مقاوم للماء والصدمات.",
    features: ["مرن", "مقاوم للماء", "خفة الوزن"],
    warranty: "15 سنة",
    delivery: "شحن سريع"
  },
  // ... باقي المنتجات بنفس الهيكل
];

export default function Cart() {
  const { isAuthenticated, user } = useAuth();
  const [guestCartItems, setGuestCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(!isAuthenticated);
  
  // جلب سلة المستخدم المسجل
  const { data: userCartItems, isLoading: userCartLoading } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateQuantity = trpc.cart.update.useMutation();
  const removeItem = trpc.cart.remove.useMutation();
  const clearCart = trpc.cart.clear.useMutation();
  const checkoutMutation = trpc.cart.checkout.useMutation();

  // تحميل سلة الزائر
  useEffect(() => {
    if (!isAuthenticated) {
      loadGuestCart();
    } else {
      setIsLoading(userCartLoading);
    }
  }, [isAuthenticated, userCartLoading]);

  // الاستماع لتحديثات السلة
  useEffect(() => {
    const handleCartUpdate = () => {
      if (!isAuthenticated) {
        loadGuestCart();
      }
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [isAuthenticated]);

  const loadGuestCart = () => {
    try {
      const localItems = localCart.getCart();
      
      const cartWithProducts = localItems.map(localItem => {
        // البحث عن المنتج باستخدام ID كـ number
        const product = mockProducts.find(p => p.id === localItem.productId);
        return {
          id: localItem.productId,
          productId: localItem.productId,
          quantity: localItem.quantity,
          variantId: localItem.variantId,
          product: product || null
        };
      }).filter(item => item.product !== null);
      
      setGuestCartItems(cartWithProducts);
      setIsLoading(false);
      
    } catch (error) {
      console.error('خطأ في تحميل سلة الزائر:', error);
      setIsLoading(false);
    }
  };

  // دالة تحديث الكمية للزائر
  const handleGuestUpdate = (productId: number, quantity: number) => {
    localCart.updateItem(productId, quantity);
    toast.success(`تم تحديث الكمية`);
    loadGuestCart(); // إعادة تحميل السلة
  };

  // دالة إزالة منتج للزائر
  const handleGuestRemove = (productId: number) => {
    localCart.removeItem(productId);
    toast.success(`تم إزالة المنتج من السلة`);
    loadGuestCart(); // إعادة تحميل السلة
  };

  // دالة مسح السلة للزائر
  const handleGuestClear = () => {
    localCart.clear();
    setGuestCartItems([]);
    toast.success(`تم مسح السلة`);
  };

  const items = isAuthenticated ? (userCartItems || []) : guestCartItems;
  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const totalInSAR = (total / 100).toFixed(0);

  // دالة لإرسال بيانات السلة
  const sendCartData = async (cartItems: any[]) => {
    try {
      // تحضير بيانات السلة للإرسال
      const cartData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          productName: item.product?.name || "منتج غير معروف",
          quantity: item.quantity,
          price: item.product?.price || 0,
          variantId: item.variantId || null,
          power: item.product?.power || 0,
          brand: mockBrands.find(b => b.id === item.product?.brandId)?.name || "غير معروف"
        })),
        total: total,
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        user: isAuthenticated ? user?.email : "زائر",
        timestamp: new Date().toISOString()
      };

      // هنا يمكنك إرسال البيانات إلى:
      // 1. API خارجي
      // 2. قاعدة بيانات
      // 3. بريد إلكتروني
      // 4. نظام إدارة الطلبات

      // مثال: إرسال إلى API (افتراضي)
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });

      if (response.ok) {
        console.log('تم حفظ بيانات السلة بنجاح:', cartData);
        toast.success("تم حفظ بيانات الطلب");
      }

      // مثال: طباعة البيانات في الكونسول (لأغراض التصحيح)
      console.log('بيانات السلة المرسلة:', cartData);

      // مثال: حفظ في localStorage كنسخة احتياطية
      localStorage.setItem('last_cart_backup', JSON.stringify(cartData));

      return cartData;

    } catch (error) {
      console.error('خطأ في إرسال بيانات السلة:', error);
      toast.error("حدث خطأ في حفظ البيانات");
      return null;
    }
  };

  // دالة الدفع
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    try {
      // أولاً: حفظ بيانات السلة
      const cartData = await sendCartData(items);
      
      if (!cartData) {
        toast.error("فشل في حفظ بيانات الطلب");
        return;
      }

      // للمستخدمين المسجلين: استخدام API الدفع
      if (isAuthenticated) {
        const result = await checkoutMutation.mutateAsync({
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            variantId: item.variantId
          }))
        });

        if (result.success) {
          toast.success("تم إنشاء الطلب بنجاح");
          window.location.href = result.paymentUrl || '/orders';
        }
      } else {
        // للزوار: توجيه إلى صفحة تسجيل الدخول مع بيانات السلة
        const cartQuery = btoa(JSON.stringify(cartData));
        window.location.href = `/login?cart=${cartQuery}&redirect=/checkout`;
      }

    } catch (error) {
      console.error('خطأ في عملية الدفع:', error);
      toast.error("حدث خطأ أثناء عملية الدفع");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل السلة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" className="mr-4">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للمتجر
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">السلة</h1>
          </div>
          
          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <ShoppingCart className="w-4 h-4" />
                <span>تسوق كزائر</span>
              </div>
              <Link href="/login">
                <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="container py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/50">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/60" />
            </div>
            <h2 className="text-3xl font-bold mb-4">سلة التسوق فارغة</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ بالتسوق لاكتشاف منتجاتنا المميزة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solar-panels">
                <Button size="lg" className="bg-accent hover:bg-accent/90 px-8">
                  <Zap className="w-5 h-5 ml-2" />
                  تصفح الألواح الشمسية
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  <ArrowRight className="w-5 h-5 ml-2" />
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
            {!isAuthenticated && (
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl max-w-lg mx-auto">
                <h3 className="font-bold text-lg text-blue-800 mb-3">هل لديك منتجات في سلة سابقة؟</h3>
                <p className="text-blue-700 mb-4">
                  سلة التسوق للزوار مؤقتة. قم بتسجيل الدخول لحفظ منتجاتك والوصول إليها من أي جهاز.
                </p>
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    تسجيل الدخول لحفظ السلة
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              {!isAuthenticated && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-blue-800 mb-2">تسوق كزائر</h3>
                      <p className="text-blue-700 mb-4">
                        سلة التسوق الخاصة بك مؤقتة وتخزن في هذا المتصفح فقط. قم بالتسجيل لحفظ منتجاتك والوصول إليها من أي جهاز.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link href="/login">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            تسجيل الدخول للمتابعة
                          </Button>
                        </Link>
                        <Link href="/register">
                          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                            إنشاء حساب جديد
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">منتجاتك ({items.length})</h2>
                  <span className="text-sm text-muted-foreground">
                    {items.reduce((sum, item) => sum + item.quantity, 0)} وحدة
                  </span>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id || item.productId}
                      item={item}
                      onUpdateQuantity={(quantity) => {
                        if (isAuthenticated) {
                          updateQuantity.mutate({ productId: item.productId, quantity });
                        } else {
                          handleGuestUpdate(item.productId, quantity);
                        }
                      }}
                      onRemove={() => {
                        if (isAuthenticated) {
                          removeItem.mutate({ productId: item.productId });
                        } else {
                          handleGuestRemove(item.productId);
                        }
                      }}
                      isLoading={isAuthenticated ? (updateQuantity.isPending || removeItem.isPending) : false}
                    />
                  ))}
                </div>
              </div>

              {items.length > 0 && (
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                    onClick={() => {
                      if (isAuthenticated) {
                        clearCart.mutate();
                      } else {
                        handleGuestClear();
                      }
                    }}
                    disabled={isAuthenticated ? clearCart.isPending : false}
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    مسح السلة بالكامل
                  </Button>
                  <Link href="/solar-panels" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="w-4 h-4 ml-2" />
                      مواصلة التسوق
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-lg">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border">ملخص الطلب</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد المنتجات</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الوحدات الكلية</span>
                    <span className="font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">السعر الإجمالي</span>
                    <span className="font-semibold">{totalInSAR} ر.س</span>
                  </div>
                </div>

                <div className="mb-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">المبلغ الإجمالي</span>
                    <span className="text-2xl font-bold text-accent">{totalInSAR} ر.س</span>
                  </div>
                  
                  {!isAuthenticated && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">مميزات التسجيل:</span>
                      </div>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          حفظ السلة بشكل دائم
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          متابعة الطلب والدفع الآمن
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          عروض وتخفيضات حصرية
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-lg py-6 mb-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={handleCheckout}
                  disabled={items.length === 0 || checkoutMutation.isPending}
                >
                  {checkoutMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      جاري المعالجة...
                    </div>
                  ) : isAuthenticated ? (
                    <>
                      <ShoppingCart className="w-5 h-5 ml-2" />
                      متابعة الدفع
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 ml-2" />
                      تسجيل الدخول للمتابعة
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  الأسعار تشمل ضريبة القيمة المضافة
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  isLoading,
}: {
  item: any;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  isLoading: boolean;
}) {
  const product = item.product;
  if (!product) return null;

  const priceInSAR = (product.price / 100).toFixed(0);
  const totalInSAR = ((product.price * item.quantity) / 100).toFixed(0);
  const brand = mockBrands.find(b => b.id === product.brandId);

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex gap-4 hover:border-accent/30 transition-all duration-300 group">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
          {product.images && product.images[0] && (
            <img
              src={product.images[0].imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold hover:text-accent transition-colors line-clamp-2 text-lg mb-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Brand */}
        {brand && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-white p-0.5">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm text-muted-foreground">{brand.name}</span>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">{priceInSAR} ر.س للوحدة</span>
          <span className="text-xs px-2 py-1 bg-muted rounded-full">
            {product.power}W
          </span>
          {item.variantId && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              متغير
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.features?.slice(0, 2).map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              {feature}
            </div>
          ))}
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
              disabled={isLoading || item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-x border-border bg-background text-base font-medium py-2 focus:outline-none"
              disabled={isLoading}
              min="1"
            />
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={onRemove}
            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">إزالة</span>
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between min-w-[120px]">
        <span className="text-xl font-bold text-accent">{totalInSAR} ر.س</span>
        {item.quantity > 1 && (
          <div className="text-sm text-muted-foreground">
            {priceInSAR} × {item.quantity}
          </div>
        )}
      </div>
    </div>
  );
}

// إضافة بيانات العلامات التجارية
const mockBrands = [
  { 
    id: 1, 
    name: "SunPower", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/SunPower_logo.svg/320px-SunPower_logo.svg.png"
  },
  { 
    id: 2, 
    name: "LG Solar", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_Solar_logo.svg/320px-LG_Solar_logo.svg.png"
  },
  // ... باقي العلامات التجارية
];