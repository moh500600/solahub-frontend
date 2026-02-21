"use client";

import { useState } from "react";
import { 
  RefreshCw, Shield, Clock, CheckCircle, XCircle,
  AlertCircle, FileText, CreditCard, Truck, Package,
  ArrowRight, Phone, Mail, MessageSquare, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function ReturnPolicyPage() {
  const [activeSection, setActiveSection] = useState("conditions");

  const policySections = [
    { id: "conditions", name: "شروط الإرجاع", icon: <CheckCircle className="w-5 h-5" /> },
    { id: "process", name: "خطوات الإرجاع", icon: <RefreshCw className="w-5 h-5" /> },
    { id: "refund", name: "استرداد المبالغ", icon: <CreditCard className="w-5 h-5" /> },
    { id: "exceptions", name: "حالات الاستثناء", icon: <XCircle className="w-5 h-5" /> }
  ];

  const returnConditions = [
    {
      condition: "مدة الإرجاع",
      value: "14 يوم",
      description: "من تاريخ استلام المنتج",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      condition: "حالة المنتج",
      value: "جديد",
      description: "يجب أن يكون بحالته الأصلية",
      icon: <Package className="w-6 h-6" />
    },
    {
      condition: "التغليف",
      value: "كامل",
      description: "مع كافة الملحقات والوثائق",
      icon: <Shield className="w-6 h-6" />
    },
    {
      condition: "مدة الاسترداد",
      value: "5-7 أيام",
      description: "بعد استلام المنتج",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: "طلب الإرجاع",
      description: "قم بطلب الإرجاع من خلال حسابك أو تواصل مع الدعم",
      time: "24 ساعة",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: "موافقة الطلب",
      description: "نراجع طلبك ونوافق عليه خلال 24 ساعة عمل",
      time: "24 ساعة",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 3,
      title: "استلام المنتج",
      description: "نرسل مندوبنا لاستلام المنتج من موقعك",
      time: "1-3 أيام",
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 4,
      title: "فحص المنتج",
      description: "فحص المنتج في مركز الفحص الخاص بنا",
      time: "48 ساعة",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: 5,
      title: "استرداد المبلغ",
      description: "استرداد المبلغ بنفس طريقة الدفع الأصلية",
      time: "3-5 أيام",
      icon: <CreditCard className="w-6 h-6" />
    }
  ];

  const refundMethods = [
    {
      method: "بطاقة الائتمان",
      time: "3-5 أيام عمل",
      icon: <CreditCard className="w-8 h-8" />,
      description: "إلى نفس البطاقة المستخدمة في الشراء"
    },
    {
      method: "التحويل البنكي",
      time: "2-3 أيام عمل",
      icon: <RefreshCw className="w-8 h-8" />,
      description: "إلى حسابك البنكي المسجل"
    },
    {
      method: "رصيد محفظة",
      time: "فوري",
      icon: <Shield className="w-8 h-8" />,
      description: "إلى محفظتك في الموقع للاستخدام في مشتريات قادمة"
    }
  ];

  const exceptions = [
    {
      title: "المنتجات المخصصة",
      description: "المنتجات المصممة خصيصاً حسب الطلب لا يمكن إرجاعها",
      icon: <XCircle className="w-5 h-5" />
    },
    {
      title: "المنتجات المفتوحة",
      description: "المنتجات التي تم فتح تغليفها الأصلي قد لا تكون قابلة للإرجاع",
      icon: <XCircle className="w-5 h-5" />
    },
    {
      title: "تلف المستخدم",
      description: "المنتجات المتضررة بسبب سوء الاستخدام لا يمكن إرجاعها",
      icon: <XCircle className="w-5 h-5" />
    },
    {
      title: "تعديل المنتج",
      description: "المنتجات التي تم تعديلها أو تركيبها لا يمكن إرجاعها",
      icon: <XCircle className="w-5 h-5" />
    }
  ];

  const faqs = [
    {
      question: "كيف أطلب إرجاع منتج؟",
      answer: "يمكنك طلب الإرجاع من خلال حسابك في الموقع أو التواصل مع خدمة العملاء على الرقم 920000000"
    },
    {
      question: "هل تتحملون تكاليف الإرجاع؟",
      answer: "نعم، في حال كان المنتج معيباً أو غير مطابق للمواصفات، نتحمل جميع تكاليف الإرجاع"
    },
    {
      question: "متى يتم استرداد المبلغ؟",
      answer: "يتم استرداد المبلغ خلال 5-7 أيام عمل بعد فحص المنتج واستلامه"
    },
    {
      question: "هل يمكن استبدال المنتج بدلاً من الإرجاع؟",
      answer: "نعم، يمكنك اختيار استبدال المنتج بمنتج آخر من نفس القيمة أو أعلى"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500/10 via-green-400/5 to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
                  <Shield className="w-4 h-4" />
                  سياسة إرجاع مرنة
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  سياسة <span className="text-green-600">الإرجاع والاستبدال</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  نحن نضمن لك راحة البال مع سياسة إرجاع مرنة لمدة 14 يوم. 
                  هدفنا هو ضمان رضاك الكامل عن كل عملية شراء.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-green-600">14</div>
                  <div className="text-sm text-muted-foreground">يوم للإرجاع</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-muted-foreground">استرداد نقدي</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-green-600">مجاني</div>
                  <div className="text-sm text-muted-foreground">إرجاع المنتجات المعيبة</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-muted-foreground">دعم الإرجاع</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ابدأ عملية الإرجاع</h3>
                    <p className="text-muted-foreground">إرجاع سهل خلال 5 خطوات</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">خطوات الإرجاع</span>
                      <span className="text-sm text-green-600">سهلة وسريعة</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>الوقت المتوقع</span>
                      <span>7-10 أيام</span>
                    </div>
                  </div>
                  
                  <Button className="w-full gap-2 bg-gradient-to-r from-green-500 to-green-600">
                    <RefreshCw className="w-5 h-5" />
                    بدء إرجاع منتج
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="py-12 bg-white border-b border-border">
        <div className="container">
          <div className="flex overflow-x-auto gap-4 pb-2">
            {policySections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="container">
          {activeSection === "conditions" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">شروط الإرجاع</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  شروط واضحة وشفافة لضمان عملية إرجاع سلسة وناجحة
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {returnConditions.map((condition, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                      {condition.icon}
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">{condition.value}</div>
                    <div className="font-bold mb-2">{condition.condition}</div>
                    <p className="text-sm text-muted-foreground">{condition.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="hidden md:block flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">ملاحظات مهمة</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>يجب الاحتفاظ بالفواتير الأصلية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>يجب أن تكون جميع الملحقات والوثائق موجودة</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>المنتج يجب أن يكون غير مستخدم وفي حالته الأصلية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>يجب ألا يكون المنتج من المنتجات الاستثنائية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "process" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">خطوات عملية الإرجاع</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  عملية مبسطة ومباشرة لإرجاع منتجاتك بسهولة
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-green-500/20 via-green-500/20 to-green-500/20" />
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                  {returnSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                        {step.icon}
                      </div>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">
                        {step.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-6">كيفية طلب الإرجاع</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="font-bold mb-2">طريقة 1: عبر الموقع</div>
                    <p className="text-sm text-muted-foreground">
                      سجل الدخول لحسابك → طلباتي → اختر المنتج → طلب إرجاع
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="font-bold mb-2">طريقة 2: عبر الهاتف</div>
                    <p className="text-sm text-muted-foreground">
                      اتصل بنا على 920000000 وسنساعدك في بدء عملية الإرجاع
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="font-bold mb-2">طريقة 3: عبر البريد</div>
                    <p className="text-sm text-muted-foreground">
                      أرسل بريداً إلى returns@solartech.com مع رقم الطلب
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "refund" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">طرق استرداد المبالغ</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  خيارات متنوعة لاسترداد مبلغك بأسرع وقت ممكن
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {refundMethods.map((method, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{method.method}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">المدة المتوقعة</span>
                      <span className="font-bold text-green-600">{method.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="hidden md:block flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">معلومات مهمة عن الاسترداد</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">الرسوم البنكية</div>
                          <p className="text-muted-foreground">لا تتحمل أي رسوم بنكية إضافية</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">التأخير في الاسترداد</div>
                          <p className="text-muted-foreground">في حالة تأخر الاسترداد أكثر من 10 أيام، يمكنك التواصل مع الدعم</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">استبدال بدلاً من الاسترداد</div>
                          <p className="text-muted-foreground">يمكنك اختيار استبدال المنتج بمنتج آخر من متجرنا</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "exceptions" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">حالات الاستثناء</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  منتجات وظروف لا تنطبق عليها سياسة الإرجاع القياسية
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {exceptions.map((exception, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-red-200">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 flex-shrink-0">
                        {exception.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{exception.title}</h3>
                        <p className="text-muted-foreground">{exception.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-6">المنتجات التي لا يمكن إرجاعها</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>المنتجات المخصصة حسب الطلب</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>المنتجات المفتوحة أو المستخدمة</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>البرامج والتراخيص الرقمية</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>المنتجات المتضررة بسبب سوء الاستخدام</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>المنتجات التي انتهت صلاحيتها</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>المنتجات المفقودة أو المسروقة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      <div className="py-20 bg-gradient-to-r from-green-500/5 to-green-600/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">أسئلة شائعة عن الإرجاع</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إجابات على أكثر الأسئلة شيوعاً حول سياسة الإرجاع
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 flex-shrink-0">
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
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 mb-6">
              <MessageSquare className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6">هل تحتاج إلى مساعدة في الإرجاع؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريق الدعم لدينا متاح على مدار الساعة لمساعدتك في أي استفسار حول الإرجاع
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-green-500 to-green-600">
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