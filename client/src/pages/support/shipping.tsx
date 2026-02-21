"use client";

import { useState } from "react";
import { 
  Truck, Clock, MapPin, Shield, Package, CheckCircle,
  AlertCircle, CreditCard, Headphones, ArrowRight,
  Star, Users, Calendar, Phone, Mail, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function ShippingDeliveryPage() {
  const [activeRegion, setActiveRegion] = useState("riyadh");

  const regions = [
    { id: "riyadh", name: "الرياض والوسطى", deliveryTime: "1-2 أيام" },
    { id: "eastern", name: "المنطقة الشرقية", deliveryTime: "2-3 أيام" },
    { id: "western", name: "المنطقة الغربية", deliveryTime: "3-4 أيام" },
    { id: "southern", name: "المنطقة الجنوبية", deliveryTime: "4-5 أيام" },
    { id: "northern", name: "المنطقة الشمالية", deliveryTime: "5-6 أيام" }
  ];

  const shippingMethods = [
    {
      name: "التوصيل السريع",
      description: "توصيل خلال 24 ساعة للمدن الرئيسية",
      price: "50 ر.س",
      features: ["تتبع مباشر", "توصيل منزل", "تأمين على الشحنة"],
      icon: <Truck className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "التوصيل العادي",
      description: "توصيل خلال 2-3 أيام عمل",
      price: "مجاني",
      features: ["تتبع الشحنة", "توصيل لمنطقة الشحن", "تأمين جزئي"],
      icon: <Package className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      name: "توصيل المشاريع",
      description: "توصيل للمشاريع الكبيرة والمصانع",
      price: "حسب الاتفاق",
      features: ["رفع وتحميل", "تركيب أولي", "تأمين كامل"],
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const trackingSteps = [
    { step: 1, title: "استلام الطلب", description: "نستلم طلبك ونبدأ التحضير" },
    { step: 2, title: "التجهيز والتغليف", description: "تجري مراقبة الجودة والتغليف الآمن" },
    { step: 3, title: "التسليم للشحن", description: "تسليم الطلب لشركة الشحن" },
    { step: 4, title: "في الطريق إليك", description: "تتبع شحنتك لحظة بلحظة" },
    { step: 5, title: "تم التسليم", description: "تأكيد استلام الطلب بنجاح" }
  ];

  const faqs = [
    {
      question: "كم تستغرق مدة التوصيل؟",
      answer: "تتراوح مدة التوصيل من 1-6 أيام حسب المنطقة. الرياض والوسطى 1-2 أيام، والمناطق البعيدة حتى 6 أيام."
    },
    {
      question: "هل الشحن مجاني؟",
      answer: "نعم، الشحن مجاني للطلبات فوق 2000 ريال للتوصيل العادي. التوصيل السريع يتطلب رسوم إضافية."
    },
    {
      question: "كيف أتابع شحن طلبي؟",
      answer: "سنرسل لك رقم التتبع على جوالك وبريدك الإلكتروني فور شحن الطلب."
    },
    {
      question: "ماذا لو تأخر التوصيل؟",
      answer: "نضمن التعويض في حالة التأخير غير المبرر. يمكنك التواصل مع فريق الدعم لمتابعة طلبك."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4">
                  <Truck className="w-4 h-4" />
                  شحن آمن وسريع
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  شحن <span className="text-blue-600">وتوصيل</span> موثوق
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  نضمن وصول منتجات الطاقة الشمسية بجودة عالية وبأسرع وقت ممكن 
                  إلى أي مكان في المملكة بأسعار تنافسية وخدمة استثنائية.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">24-48</div>
                  <div className="text-sm text-muted-foreground">ساعة توصيل</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-muted-foreground">رضا العملاء</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-muted-foreground">شحنة ناجحة</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">تتبع شحنتك</h3>
                    <p className="text-muted-foreground">أدخل رقم التتبع لمتابعة طلبك</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">رقم التتبع</label>
                    <input
                      type="text"
                      placeholder="أدخل رقم التتبع المكون من 12 رقم"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                  
                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-500 to-blue-600">
                    <Truck className="w-5 h-5" />
                    تتبع الشحنة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Time by Region */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">أوقات التوصيل حسب المنطقة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نضمن وصول طلباتك في الوقت المحدد مع خدمة تتبع مباشرة
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    activeRegion === region.id
                      ? "border-blue-500 bg-blue-500/10 text-blue-700"
                      : "border-border hover:border-blue-500/30"
                  }`}
                >
                  <div className="font-bold mb-1">{region.name}</div>
                  <div className="text-sm text-muted-foreground">{region.deliveryTime}</div>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">
                    {regions.find(r => r.id === activeRegion)?.name}
                  </h3>
                  <p className="text-muted-foreground">تفاصيل التوصيل للمنطقة</p>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {regions.find(r => r.id === activeRegion)?.deliveryTime}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>توصيل مجاني للطلبات فوق 2000 ريال</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>توصيل منزل/مكتب/موقع المشروع</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>تأمين كامل على الشحنة</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>أوقات العمل: 8 صباحاً - 10 مساءً</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span>دعم على مدار الساعة</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span>ضمان عدم التلف أو الضياع</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">طرق الشحن المتاحة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر الطريقة المناسبة لاحتياجاتك من خيارات الشحن المتنوعة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <div key={index} className="group">
                <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-6`}>
                    {method.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  
                  <div className="text-2xl font-bold mb-6">{method.price}</div>
                  
                  <div className="space-y-3 mb-6">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full gap-2" variant="outline">
                    اختر هذه الطريقة
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Process */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">كيفية تتبع شحنتك</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              خطوات بسيطة لمتابعة طلبك من اللحظة التي تضعها حتى وصولها إليك
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
              {trackingSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-20 bg-gradient-to-r from-blue-500/5 to-blue-600/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">أسئلة شائعة عن الشحن</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعاً حول عملية الشحن والتوصيل
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 mb-6">
              <Headphones className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6">هل لديك استفسار عن الشحن؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريق الدعم لدينا جاهز للإجابة على استفساراتك على مدار الساعة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600">
                <Phone className="w-5 h-5" />
                اتصل بنا الآن
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                محادثة مباشرة
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="w-5 h-5" />
                راسلنا عبر البريد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}