"use client";

import { useState } from "react";
import { 
  Shield, Lock, Eye, EyeOff, User, Mail, Phone, 
  MapPin, Database, Server, Key, Fingerprint,
  Bell, AlertCircle, CheckCircle, XCircle, Clock,
  Download, Share2, Printer, Search, Filter,
  ChevronDown, ChevronUp, Globe, Users, Building,
  FileText, ArrowRight, MessageSquare, Target  // إضافة Target هنا
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function PrivacyPolicyPage() {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const privacySections = [
    {
      title: "مقدمة",
      icon: <Shield className="w-6 h-6" />,
      content: `تلتزم شركة سولار تيك بحماية خصوصية مستخدمي موقعنا الإلكتروني. تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية. نستخدم معلوماتك الشخصية لتقديم وتحسين الخدمة. باستخدام الخدمة، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة.`
    },
    {
      title: "المعلومات التي نجمعها",
      icon: <Database className="w-6 h-6" />,
      content: `نجمع عدة أنواع مختلفة من المعلومات لأغراض مختلفة لتقديم وتحسين خدمتنا لك:
      
      • معلومات الهوية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف
      • معلومات الدخول: اسم المستخدم، كلمة المرور (مشفرة)
      • معلومات الاستخدام: صفحات الموقع التي تزورها، الوقت والتاريخ
      • معلومات الجهاز: نوع المتصفح، عنوان IP، نظام التشغيل
      • معلومات الموقع: الدولة، المدينة، المنطقة الزمنية
      
      نحن لا نجمع معلومات حساسة مثل البيانات المالية أو الصحية إلا عندما تكون ضرورية للخدمة.`
    },
    {
      title: "كيف نستخدم المعلومات",
      icon: <Target className="w-6 h-6" />, // هنا كان الخطأ - Target لم يكن مستورداً
      content: `نستخدم المعلومات التي نجمعها لأغراض مختلفة:
      
      • لتقديم وصيانة وتحسين خدمتنا
      • لإعلامك بالتغييرات على خدمتنا
      • للسماح لك بالمشاركة في الميزات التفاعلية
      • لتقديم الدعم للعملاء
      • لجمع التحليلات أو معلومات قيمة لتحسين خدمتنا
      • لمراقبة استخدام خدمتنا
      • للكشف عن الأخطاء التقنية والوقاية منها
      • للوفاء بالالتزامات القانونية
      
      نحن نستخدم معلوماتك فقط للأغراض المعلنة ولا نبيعها لأطراف ثالثة.`
    },
    {
      title: "مشاركة المعلومات",
      icon: <Share2 className="w-6 h-6" />,
      content: `قد نشارك معلوماتك الشخصية في الحالات التالية:
      
      • مع موفري الخدمة: لمراقبة وتحليل استخدام خدمتنا
      • لأغراض العمل: في حال الاندماج أو الاستحواذ أو البيع
      • مع الشركاء: مع شركائنا الموثوقين الذين يساعدوننا في تشغيل خدمتنا
      • للأغراض القانونية: للامتثال للقوانين أو حماية حقوقنا
      
      نضمن أن جميع الأطراف الثالثة تلتزم بمعايير خصوصية مماثلة لمعاييرنا.`
    },
    {
      title: "أمن المعلومات",
      icon: <Lock className="w-6 h-6" />,
      content: `نحن نستخدم إجراءات أمنية فنية وإدارية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير:
      
      • تشفير البيانات في النقل والسكون
      • جدران الحماية وأنظمة الكشف عن التسلل
      • التحكم في الوصول بناءً على الحاجة للمعرفة
      • تدريب الموظفين على ممارسات الأمان
      • عمليات التدقيق والمراجعة المنتظمة
      • النسخ الاحتياطي المنتظم للبيانات
      
      ومع ذلك، لا يمكن ضمان أمان المعلومات المنقولة عبر الإنترنت بنسبة 100%.`
    },
    {
      title: "حقوقك",
      icon: <User className="w-6 h-6" />,
      content: `لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية:
      
      • الحق في الوصول: يمكنك طلب نسخة من معلوماتك الشخصية
      • الحق في التصحيح: يمكنك طلب تصحيح معلومات غير دقيقة
      • الحق في الحذف: يمكنك طلب حذف معلوماتك الشخصية
      • الحق في الاعتراض: يمكنك الاعتراض على معالجة معلوماتك
      • الحق في التنقل: يمكنك طلب نقل معلوماتك إلى منظمة أخرى
      • الحق في سحب الموافقة: يمكنك سحب موافقتك في أي وقت
      
      لممارسة أي من هذه الحقوق، يرجى الاتصال بنا عبر معلومات الاتصال المذكورة أدناه.`
    },
    {
      title: "الاحتفاظ بالبيانات",
      icon: <Clock className="w-6 h-6" />,
      content: `نحتفظ بمعلوماتك الشخصية فقط طالما كانت ضرورية للأغراض المنصوص عليها في سياسة الخصوصية هذه. سنحتفظ ونستخدم معلوماتك الشخصية بالقدر اللازم للامتثال لالتزاماتنا القانونية وحل النزاعات وإنفاذ سياساتنا.
      
      فترات الاحتفاظ النموذجية:
      
      • معلومات الحساب: طالما الحساب نشط + ٣ سنوات
      • معلومات المعاملات: ٧ سنوات للأغراض الضريبية
      • بيانات الاتصال: ٥ سنوات بعد آخر تفاعل
      • سجلات النظام: ٢ سنة لأغراض الأمان
      
      نقوم بإجراء مراجعات منتظمة لبياناتنا وحذف البيانات غير الضرورية.`
    },
    {
      title: "روابط لمواقع أخرى",
      icon: <Globe className="w-6 h-6" />,
      content: `قد يحتوي موقعنا على روابط لمواقع أخرى لا تديرها سولار تيك. إذا نقرت على رابط لطرف ثالث، فسيتم توجيهك إلى موقع ذلك الطرف الثالث. ننصحك بشدة بمراجعة سياسة الخصوصية لكل موقع تزوره.
      
      ليس لدينا أي سيطرة على محتوى أو سياسات خصوصية أو ممارسات أي مواقع أو خدمات تابعة لأطراف ثالثة، ولا نتحمل أي مسؤولية عنها.`
    },
    {
      title: "خصوصية الأطفال",
      icon: <Users className="w-6 h-6" />,
      content: `لا يتوجه موقعنا إلى أي شخص يقل عمره عن ١٣ عاماً. نحن لا نجمع عن قصد معلومات تعريف شخصية من الأطفال الذين تقل أعمارهم عن ١٣ عاماً. إذا كنت والداً أو وصياً ولديك سبب للاعتقاد بأن طفلك قد زودنا بمعلومات شخصية، يرجى الاتصال بنا.
      
      إذا اكتشفنا أننا جمعنا معلومات شخصية من الأطفال دون التحقق من موافقة الوالدين، فإننا نتخذ خطوات لإزالة تلك المعلومات من خوادمنا.`
    },
    {
      title: "التغييرات على سياسة الخصوصية",
      icon: <AlertCircle className="w-6 h-6" />,
      content: `قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة.
      
      سنخطرك عبر البريد الإلكتروني و/أو إشعار بارز على خدمتنا، قبل أن يصبح التغيير سارياً ونقوم بتحديث "تاريخ آخر تحديث" في أسفل سياسة الخصوصية هذه.
      
      ننصحك بمراجعة سياسة الخصوصية هذه بشكل دوري لأي تغييرات. تصبح التغييرات على سياسة الخصوصية هذه سارية عند نشرها على هذه الصفحة.`
    }
  ];

  const dataProtectionMeasures = [
    {
      measure: "التشفير المتقدم",
      description: "تشفير AES-256 للبيانات الحساسة",
      icon: <Lock className="w-5 h-5" />
    },
    {
      measure: "الوصول الآمن",
      description: "مصادقة متعددة العوامل للموظفين",
      icon: <Key className="w-5 h-5" />
    },
    {
      measure: "المراقبة المستمرة",
      description: "أنظمة كشف التسلل والتطفل",
      icon: <Eye className="w-5 h-5" />
    },
    {
      measure: "التدقيق المنتظم",
      description: "مراجعات أمنية ربع سنوية",
      icon: <FileText className="w-5 h-5" />
    },
    {
      measure: "التدريب المستمر",
      description: "تدريب الموظفين على أمن البيانات",
      icon: <Users className="w-5 h-5" />
    },
    {
      measure: "النسخ الاحتياطي",
      description: "نسخ احتياطية يومية مشفرة",
      icon: <Database className="w-5 h-5" />
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
              <Shield className="w-4 h-4" />
              حماية بياناتك الشخصية
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              سياسة <span className="text-primary">الخصوصية</span> وحماية البيانات
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              نعتبر خصوصيتك من أولوياتنا القصوى. تشرح هذه السياسة كيفية جمع معلوماتك الشخصية 
              واستخدامها وحمايتها عند استخدامك لموقعنا وخدماتنا.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Download className="w-5 h-5" />
                تنزيل السياسة كـ PDF
              </Button>
              <Button className="gap-2">
                <MessageSquare className="w-5 h-5" />
                استفسارات الخصوصية
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">ملخص سريع</h2>
                  <p className="text-muted-foreground">النقاط الرئيسية في سياسة الخصوصية</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "لا نبيع بياناتك لأطراف ثالثة",
                  "نستخدم التشفير المتقدم لحماية بياناتك",
                  "لديك حقوق كاملة في الوصول والتحكم في بياناتك",
                  "نحتفظ ببياناتك فقط للفترة الضرورية",
                  "نخطرك بأي تغييرات في السياسة",
                  "نلتزم بالمعايير الدولية لحماية البيانات"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Sections */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">تفاصيل سياسة الخصوصية</h2>
            
            <div className="space-y-6">
              {privacySections.map((section, index) => (
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

            {/* Data Protection Measures */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">إجراءات حماية البيانات</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataProtectionMeasures.map((measure, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {measure.icon}
                    </div>
                    <h3 className="font-bold mb-2">{measure.measure}</h3>
                    <p className="text-sm text-muted-foreground">{measure.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Rights & Controls */}
            <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">حقوقك وضوابطك</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  لديك سيطرة كاملة على معلوماتك الشخصية. إليك كيفية ممارسة حقوقك:
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">الوصول والمراجعة</h4>
                  <p className="text-sm text-muted-foreground">
                    اطلب نسخة من بياناتك الشخصية
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Download className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">التصحيح والتحديث</h4>
                  <p className="text-sm text-muted-foreground">
                    صحح أي معلومات غير دقيقة
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">الحذف والنسيان</h4>
                  <p className="text-sm text-muted-foreground">
                    احذف بياناتك الشخصية
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  ممارسة حقوق الخصوصية
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-card border border-border rounded-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">مسؤول حماية البيانات</h3>
                  <p className="text-muted-foreground">
                    للاستفسارات أو ممارسة حقوق الخصوصية، يمكنك الاتصال بمسؤول حماية البيانات:
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>privacy@solartech.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>+966 11 123 4567</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="w-5 h-5" />
                  نموذج طلب الخصوصية
                </Button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm">آخر تحديث: ١ يناير ٢٠٢٤</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}