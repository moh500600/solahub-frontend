"use client";

import { useState } from "react";
import { 
  Cookie, Shield, Settings, CheckCircle, XCircle, 
  Info, AlertCircle, Clock, RefreshCw, Eye, EyeOff,
  ChevronDown, ChevronUp, Database, BarChart, Target,
  Users, Lock, Globe, Bell, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function CookiesPolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false
  });

  const updatePreference = (key: keyof typeof cookiePreferences, value: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    // في التطبيق الحقيقي، هنا سيتم حفظ التفضيلات
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert("تم حفظ تفضيلات الكوكيز بنجاح");
  };

  const acceptAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true
    });
    alert("تم قبول جميع الكوكيز");
  };

  const rejectAll = () => {
    setCookiePreferences({
      essential: true, // الكوكيز الأساسية ضرورية ولا يمكن رفضها
      analytics: false,
      marketing: false,
      personalization: false
    });
    alert("تم رفض جميع الكوكيز غير الأساسية");
  };

  const cookieTypes = [
    {
      id: "essential",
      name: "الكوكيز الأساسية",
      description: "ضرورية لتشغيل الموقع ولا يمكن تعطيلها. تضمن الأمان والوظائف الأساسية.",
      icon: <Shield className="w-6 h-6" />,
      required: true,
      duration: "حتى نهاية الجلسة"
    },
    {
      id: "analytics",
      name: "كوكيز التحليلات",
      description: "تجمع معلومات حول كيفية استخدام الزوار للموقع لتحسين تجربة المستخدم.",
      icon: <BarChart className="w-6 h-6" />,
      required: false,
      duration: "٢٤ شهراً"
    },
    {
      id: "marketing",
      name: "كوكيز التسويق",
      description: "تستخدم لتقديم إعلانات ذات صلة بناءً على اهتمامات المستخدمين.",
      icon: <Target className="w-6 h-6" />,
      required: false,
      duration: "١٢ شهراً"
    },
    {
      id: "personalization",
      name: "كوكيز التخصيص",
      description: "تذكر تفضيلاتك وإعداداتك لتخصيص تجربتك على الموقع.",
      icon: <Settings className="w-6 h-6" />,
      required: false,
      duration: "٦ أشهر"
    }
  ];

  const cookieDetails = [
    {
      name: "__cf_bm",
      purpose: "حماية من هجمات DDOS",
      provider: "Cloudflare",
      duration: "٣٠ دقيقة"
    },
    {
      name: "_ga",
      purpose: "تمييز المستخدمين الفريدين",
      provider: "Google Analytics",
      duration: "٢٤ شهراً"
    },
    {
      name: "_gid",
      purpose: "تمييز الجلسات",
      provider: "Google Analytics",
      duration: "٢٤ ساعة"
    },
    {
      name: "cookie_consent",
      purpose: "تذكر تفضيلات الكوكيز",
      provider: "سولار تيك",
      duration: "١٢ شهراً"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-700 text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" />
              سياسة استخدام الكوكيز
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              سياسة <span className="text-primary">الكوكيز</span> والخصوصية
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتك على موقعنا. 
              تشرح هذه الصفحة أنواع الكوكيز التي نستخدمها وكيف يمكنك التحكم فيها.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Eye className="w-5 h-5" />
                إدارة التفضيلات
              </Button>
              <Button className="gap-2" onClick={acceptAll}>
                <CheckCircle className="w-5 h-5" />
                قبول الكل
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Control Panel */}
      <div className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">لوحة التحكم في الكوكيز</h2>
                  <p className="text-muted-foreground">اختر أنواع الكوكيز التي تريد قبولها</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={rejectAll}>
                    رفض الكل
                  </Button>
                  <Button size="sm" onClick={acceptAll}>
                    قبول الكل
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="p-4 border border-border rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {cookie.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{cookie.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            المدة: {cookie.duration}
                            {cookie.required && " • إلزامي"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {cookie.required ? (
                          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            إلزامي
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="checkbox"
                              id={`cookie-${cookie.id}`}
                              checked={cookiePreferences[cookie.id as keyof typeof cookiePreferences]}
                              onChange={(e) => updatePreference(cookie.id as keyof typeof cookiePreferences, e.target.checked)}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`cookie-${cookie.id}`}
                              className={`flex items-center cursor-pointer ${
                                cookiePreferences[cookie.id as keyof typeof cookiePreferences] 
                                  ? 'text-green-600' 
                                  : 'text-gray-400'
                              }`}
                            >
                              <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                                cookiePreferences[cookie.id as keyof typeof cookiePreferences]
                                  ? 'bg-green-500 justify-end'
                                  : 'bg-gray-300 justify-start'
                              }`}>
                                <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                              </div>
                              <span className="ml-3 text-sm font-medium">
                                {cookiePreferences[cookie.id as keyof typeof cookiePreferences] ? 'مفعل' : 'معطل'}
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{cookie.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    يتم حفظ تفضيلاتك لمدة ١٢ شهراً
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={rejectAll}>
                      حفظ التفضيلات الحالية
                    </Button>
                    <Button onClick={savePreferences}>
                      <CheckCircle className="w-5 h-5 ml-2" />
                      تأكيد وحفظ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">معلومات تفصيلية عن الكوكيز</h2>
            
            <div className="space-y-8">
              {/* What are cookies */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ما هي ملفات الكوكيز؟</h3>
                    <p className="text-muted-foreground mt-1">تعرف على ماهية الكوكيز وكيف تعمل</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground mb-4">
                    ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة يتم تخزينها على جهازك 
                    عندما تزور موقعاً إلكترونياً. تساعد هذه الملفات الموقع في تذكر معلومات 
                    معينة عن زيارتك، مما يجعل زيارتك التالية أسهل ويجعل الموقع أكثر فائدة لك.
                  </p>
                  <p className="text-muted-foreground">
                    الكوكيز لا تضر بجهازك ولا تحتوي على فيروسات. معظم الكوكيز تختفي تلقائياً 
                    عند إغلاق المتصفح (كوكيز الجلسة)، بينما تبقى بعض الكوكيز لفترة أطول 
                    (كوكيز دائمة) حتى تقوم بحذفها يدوياً أو تنتهي صلاحيتها.
                  </p>
                </div>
              </div>

              {/* Why we use cookies */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">لماذا نستخدم الكوكيز؟</h3>
                    <p className="text-muted-foreground mt-1">الأهداف والفوائد</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "تحسين الأداء",
                      description: "تحسين سرعة الموقع وتجربة التصفح"
                    },
                    {
                      title: "تحليل الاستخدام",
                      description: "فهم كيفية استخدام الزوار للموقع"
                    },
                    {
                      title: "التخصيص",
                      description: "تذكر تفضيلاتك وإعداداتك"
                    },
                    {
                      title: "الأمان",
                      description: "حماية حساباتك ومعلوماتك"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cookie Details Table */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">الكوكيز التي نستخدمها</h3>
                    <p className="text-muted-foreground mt-1">تفاصيل الكوكيز المحددة</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 font-bold">اسم الكوكي</th>
                        <th className="text-right py-3 px-4 font-bold">الغرض</th>
                        <th className="text-right py-3 px-4 font-bold">المزود</th>
                        <th className="text-right py-3 px-4 font-bold">المدة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieDetails.map((cookie, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4 font-mono text-sm">{cookie.name}</td>
                          <td className="py-3 px-4">{cookie.purpose}</td>
                          <td className="py-3 px-4">{cookie.provider}</td>
                          <td className="py-3 px-4">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* How to control cookies */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">كيف تتحكم في الكوكيز؟</h3>
                    <p className="text-muted-foreground mt-1">خيارات التحكم والمراجعة</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">إعدادات المتصفح</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكنك ضبط إعدادات متصفحك لقبول أو رفض الكوكيز، أو لتنبيهك عند 
                        إرسال الكوكيز. تختلف الطريقة حسب المتصفح، ويمكنك العثور على 
                        التعليمات في قسم المساعدة بمتصفحك.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">تحديث التفضيلات</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكنك تحديث تفضيلات الكوكيز في أي وقت باستخدام لوحة التحكم 
                        أعلى هذه الصفحة. يتم حفظ تفضيلاتك لمدة ١٢ شهراً.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">حذف الكوكيز</h4>
                      <p className="text-sm text-muted-foreground">
                        يمكنك حذف الكوكيز المخزنة على جهازك في أي وقت من خلال إعدادات 
                        متصفحك. لاحظ أن حذف الكوكيز قد يؤثر على وظائف الموقع.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates and Contact */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">التحديثات والاتصال</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    قد نقوم بتحديث سياسة الكوكيز هذه من وقت لآخر. سنخطرك بأي تغييرات 
                    جوهرية من خلال نشر السياسة الجديدة على هذا الموقع. نوصي بمراجعة 
                    هذه الصفحة بانتظام للبقاء على اطلاع.
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>آخر تحديث: ١ يناير ٢٠٢٤</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bell className="w-4 h-4" />
                      <span>نقوم بالمراجعة ربع السنوية</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}