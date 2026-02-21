"use client";

import { useState } from "react";
import { 
  FileText, Scale, Gavel, CheckCircle, XCircle, 
  AlertCircle, Clock, DollarSign, Truck, Shield,
  User, Lock, Globe, MessageSquare, Phone, Mail,
  ChevronDown, ChevronUp, BookOpen, Download,
  Printer, Share2, ArrowRight, Users, Building,
  CreditCard, Package, Headphones, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function TermsConditionsPage() {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const termsSections = [
    {
      title: "مقدمة",
      icon: <FileText className="w-6 h-6" />,
      content: `مرحباً بك في موقع سولار تيك. تشكل هذه الشروط والأحكام ("الشروط") اتفاقية قانونية بينك وبين شركة سولار تيك ("الشركة"، "نحن"، "لنا"، أو "خاصتنا") فيما يتعلق باستخدامك لموقعنا الإلكتروني وخدماتنا ("الخدمة").

      من خلال الوصول إلى أو استخدام الخدمة، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك عدم استخدام الخدمة.`
    },
    {
      title: "القبول والأهلية",
      icon: <User className="w-6 h-6" />,
      content: `باستخدامك للخدمة، فإنك تؤكد وتضمن أن:
      
      1. لديك القدرة القانونية للدخول في هذه الشروط
      2. أنت تبلغ من العمر 18 عاماً على الأقل
      3. جميع المعلومات التي تقدمها صحيحة ودقيقة
      4. لن تستخدم الخدمة لأي غرض غير قانوني
      5. ستلتزم بكافة القوانين واللوائح المعمول بها
      
      نحتفظ بالحق في رفض الخدمة لأي شخص لأي سبب في أي وقت.`
    },
    {
      title: "الحسابات والمستخدمين",
      icon: <Lock className="w-6 h-6" />,
      content: `عند إنشاء حساب معنا، يجب عليك:
      
      • تقديم معلومات دقيقة وكاملة وحديثة
      • الحفاظ على أمان حسابك وكلمة المرور
      • إخطارنا على الفور بأي خرق أمني
      • قبول المسؤولية عن جميع الأنشطة تحت حسابك
      
      لا يجوز لك استخدام اسم مستخدم أو حساب مستخدم آخر دون إذن.
      نحتفظ بالحق في تعليق أو إنهاء الحسابات التي تنتهك هذه الشروط.`
    },
    {
      title: "الطلبات والدفع",
      icon: <CreditCard className="w-6 h-6" />,
      content: `جميع الطلبات خاضعة للتوافر والقبول من قبلنا:
      
      • الأسعار قابلة للتغيير دون إشعار مسبق
      • الضرائب والرسوم الإضافية هي مسؤوليتك
      • يجب تقديم معلومات دقيقة للفوترة والدفع
      • نحتفظ بالحق في رفض أو إلغاء أي طلب
      
      طرق الدفع المقبولة:
      • البطاقات الائتمانية (فيزا، ماستركارد)
      • التحويل البنكي
      • الدفع عند التسليم (حسب المنطقة)
      
      جميع المعاملات تتم عبر قنوات آمنة مشفرة.`
    },
    {
      title: "الشحن والتسليم",
      icon: <Truck className="w-6 h-6" />,
      content: `نحن نقدم خدمات الشحن عبر شركات شحن موثوقة:
      
      • أوقات التسليم تقريبية وقد تختلف
      • مسؤولية المنتج تنتقل إليك عند التسليم
      • يجب فحص المنتجات عند الاستلام
      • تقارير التلف يجب تقديمها خلال 48 ساعة
      
      تكاليف الشحن:
      • قد تختلف حسب الموقع والوزن
      • يتم حسابها عند إنهاء الطلب
      • قد تكون هناك رسوم إضافية للمناطق النائية
      
      سياسات الشحن الدولية:
      • قد تخضع المنتجات للرسوم الجمركية
      • العميل مسؤول عن أي رسوم استيراد
      • قد تكون هناك قيود على بعض المنتجات`
    },
    {
      title: "الضمان والإرجاع",
      icon: <Shield className="w-6 h-6" />,
      content: `تخضع جميع المنتجات لسياسة الضمان التالية:
      
      فترة الضمان:
      • الألواح الشمسية: 25 سنة على الأداء
      • العواكس: 5-10 سنوات حسب النموذج
      • البطاريات: 3-10 سنوات حسب النوع
      
      سياسة الإرجاع:
      • يمكن إرجاع المنتجات غير المستخدمة خلال 14 يوماً
      • يجب أن تكون المنتجات في حالتها الأصلية
      • العميل يتحمل تكاليف الشحن للإرجاع
      • تستغرق معالجة الاسترداد 5-10 أيام عمل
      
      الشروط غير المشمولة بالضمان:
      • الأضرار الناتجة عن سوء الاستخدام
      • التثبيت غير الصحيح
      • الكوارث الطبيعية
      • التعديلات غير المصرح بها`
    },
    {
      title: "الملكية الفكرية",
      icon: <Gavel className="w-6 h-6" />,
      content: `جميع محتويات وخصائص الخدمة مملوكة للشركة أو مرخصة لها:
      
      المحتويات المحمية:
      • الشعارات والعلامات التجارية
      • التصاميم والواجهات
      • المحتوى النصي والصور
      • البرامج وقواعد البيانات
      
      قيود الاستخدام:
      • لا يجوز نسخ أو تعديل أو توزيع المحتوى
      • لا يجوز عكس الهندسة لأي جزء من الخدمة
      • لا يجوز استخدام المحتوى لأغراض تجارية
      • يجب الحفاظ على إشعارات حقوق النشر
      
      الإبلاغ عن الانتهاكات:
      • نأخذ انتهاكات الملكية الفكرية على محمل الجد
      • الإبلاغ عبر: legal@solartech.com
      • نستجيب للتقارير خلال 48 ساعة عمل`
    },
    {
      title: "السلوك المحظور",
      icon: <XCircle className="w-6 h-6" />,
      content: `يحظر عليك استخدام الخدمة لأي من الأغراض التالية:
      
      الأنشطة المحظورة:
      • نشر محتوى غير قانوني أو ضار
      • التحرش أو المضايقة أو التهديد
      • إرسال بريد عشوائي أو رسائل غير مرغوب فيها
      • انتحال شخصية أي شخص أو كيان
      • اختراق أو محاولة اختراق أنظمتنا
      
      القيود الفنية:
      • لا يجوز استخدام الروبوتات أو الزواحف
      • لا يجوز تحميل الفيروسات أو البرمجيات الخبيثة
      • لا يجوز تعطيل أو إتلاف الخدمة
      • لا يجوز إجراء هجمات الحرمان من الخدمة
      
      العقوبات:
      • إنهاء فوري للوصول
      • الإبلاغ للسلطات المختصة
      • متابعة قانونية للتعويضات`
    },
    {
      title: "الحد من المسؤولية",
      icon: <Scale className="w-6 h-6" />,
      content: `في أقصى حد يسمح به القانون:
      
      استبعادات المسؤولية:
      • لا نضمن توفر الخدمة دون انقطاع
      • لا نضمن دقة أو اكتمال المحتوى
      • لسنا مسؤولين عن أي أضرار غير مباشرة
      • لسنا مسؤولين عن أخطاء الطرف الثالث
      
      الحد الأقصى للمسؤولية:
      • في حالة المنتجات: قيمة المنتج
      • في حالة الخدمات: المبلغ المدفوع
      • في جميع الحالات: لا تتجاوز 1000 ريال
      
      الإعفاءات:
      • الكوارث الطبيعية
      • أعمال الحرب أو الإرهاب
      • إضرابات أو احتجاجات
      • أعطال في البنية التحتية`
    },
    {
      title: "القانون الحاكم والتسوية",
      icon: <Globe className="w-6 h-6" />,
      content: `تخضع هذه الشروط وتفسر وفقاً للقوانين التالية:
      
      القانون الحاكم:
      • تحكم هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية
      • يتم استبعاد أحكام قانون الأمم المتحدة
      
      حل النزاعات:
      • يجب محاولة الحل الودي أولاً
      • في حالة الفشل: اللجوء للتحكيم
      • مكان التحكيم: الرياض، السعودية
      • لغة التحكيم: العربية
      
      التقادم:
      • يجب رفع أي مطالبة خلال سنة واحدة
      • من تاريخ اكتشاف الحدث
      • أو من تاريخ حدوثه، أيهما أقرب`
    },
    {
      title: "التعديلات والإخطارات",
      icon: <AlertCircle className="w-6 h-6" />,
      content: `نحتفظ بالحق في تعديل هذه الشروط في أي وقت:
      
      الإخطار بالتعديلات:
      • نشر الشروط المعدلة على الموقع
      • إرسال إشعار عبر البريد الإلكتروني
      • تحديث تاريخ "آخر تعديل" أدناه
      
      السريان:
      • تصبح التعديلات سارية عند النشر
      • الاستخدام المستمر يعني القبول
      • إذا كنت لا توافق، توقف عن الاستخدام
      
      الإخطارات:
      • الإخطارات لك: إلى البريد الإلكتروني المسجل
      • الإخطارات لنا: إلى legal@solartech.com
      • تعتبر الإخطارات سارية عند الاستلام`
    },
    {
      title: "أحكام عامة",
      icon: <CheckCircle className="w-6 h-6" />,
      content: `أحكام إضافية تنطبق على هذه الشروط:
      
      الاكتمال:
      • تمثل هذه الشروط الاتفاق الكامل
      • تلغي جميع الاتفاقيات السابقة
      
      القابلية للفصل:
      • إذا اعتبر أي حكم باطلاً، يبقى الباقي
      • يتم استبدال الحكم الباطل بأقرب صحيح
      
      التنازل:
      • لا يعتبر التنازل عن حق بمثابة تنازل دائم
      • يجب أن يكون التنازل خطياً
      
      العلاقة بين الأطراف:
      • لا تنشئ هذه الشروط أي شراكة أو وكالة
      • كل طرف مسؤول مستقل`
    }
  ];

  const importantPoints = [
    {
      title: "الدفع الآمن",
      description: "جميع المعاملات مشفرة ومؤمنة",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      title: "التسليم الموثوق",
      description: "شحن سريع مع التتبع",
      icon: <Truck className="w-5 h-5" />
    },
    {
      title: "الضمان المضمون",
      description: "ضمانات طويلة الأمد على المنتجات",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "الدعم الفني",
      description: "دعم فني متواصل 24/7",
      icon: <Headphones className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              الاتفاقية القانونية
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              الشروط <span className="text-primary">والأحكام</span> العامة
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              تشكل هذه الشروط والأحكام اتفاقية قانونية بينك وبين سولار تيك. 
              يرجى قراءتها بعناية قبل استخدام موقعنا أو خدماتنا.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Download className="w-5 h-5" />
                تنزيل كـ PDF
              </Button>
              <Button className="gap-2">
                <BookOpen className="w-5 h-5" />
                ابدأ القراءة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {importantPoints.map((point, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {point.icon}
                  </div>
                  <h3 className="font-bold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Sections */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-center">بنود الاتفاقية</h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                تفاصيل كاملة لشروط وأحكام استخدام موقع وخدمات سولار تيك
              </p>
            </div>
            
            <div className="space-y-6">
              {termsSections.map((section, index) => (
                <div key={index} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-bold text-right">{section.title}</h3>
                    </div>
                    {openSections.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {openSections.includes(index) && (
                    <div className="p-6 pt-0 border-t border-border animate-in fade-in">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Acceptance Section */}
            <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">قبول الشروط والأحكام</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  باستخدامك لهذا الموقع أو أي من خدماتنا، فإنك تقر بأنك قد قرأت وفهمت 
                  هذه الشروط والأحكام وتوافق على الالتزام بها. إذا كنت لا توافق على أي 
                  جزء من هذه الشروط، فيجب عليك عدم استخدام موقعنا أو خدماتنا.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="gap-2">
                    <Printer className="w-5 h-5" />
                    طباعة الشروط
                  </Button>
                  <Button className="gap-2">
                    <MessageSquare className="w-5 h-5" />
                    استفسارات قانونية
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    معلومات الاتصال
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">المقر الرئيسي</h4>
                      <p className="text-muted-foreground">
                        الرياض، المملكة العربية السعودية<br />
                        صندوق بريد: ١٢٣٤٥
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">الاتصال القانوني</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4" />
                          <span>legal@solartech.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>+966 11 123 4567</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    الأسئلة الشائعة
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">هل يمكنني تعديل هذه الشروط؟</h4>
                      <p className="text-sm text-muted-foreground">
                        لا، هذه شروط قياسية. أي تعديلات تتطلب اتفاقاً خطياً من الطرفين.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">كيف يتم حل النزاعات؟</h4>
                      <p className="text-sm text-muted-foreground">
                        أولاً محاولة الحل الودي، ثم التحكيم في الرياض وفق القانون السعودي.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">مدة سريان الشروط؟</h4>
                      <p className="text-sm text-muted-foreground">
                        سارية من تاريخ أول استخدام وتستمر حتى إنهاء الحساب.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-full">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">آخر تحديث: ١ يناير ٢٠٢٤</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">الإصدار: ٣.٢</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">هل لديك استفسارات حول الشروط؟</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريق الدعم القانوني لدينا جاهز للإجابة على استفساراتك وتوضيح أي غموض 
              في الشروط والأحكام.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                تواصل معنا
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <ArrowRight className="w-5 h-5" />
                سياسة الخصوصية
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}