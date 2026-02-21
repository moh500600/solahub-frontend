"use client";

import { useState } from "react";
import { 
  Headphones, Wrench, Clock, MessageSquare, Phone, Mail,
  Video, FileText, Users, CheckCircle, AlertCircle, Zap,
  ArrowRight, Calendar, MapPin, Shield, Star, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function TechnicalSupportPage() {
  const [activeCategory, setActiveCategory] = useState("installation");
  const [showTicketForm, setShowTicketForm] = useState(false);

  const supportCategories = [
    { 
      id: "installation", 
      name: "التركيب والإعداد", 
      icon: <Wrench className="w-6 h-6" />,
      responseTime: "30 دقيقة"
    },
    { 
      id: "troubleshooting", 
      name: "استكشاف الأخطاء", 
      icon: <AlertCircle className="w-6 h-6" />,
      responseTime: "15 دقيقة"
    },
    { 
      id: "maintenance", 
      name: "الصيانة والدعم الفني", 
      icon: <Zap className="w-6 h-6" />,
      responseTime: "1 ساعة"
    },
    { 
      id: "training", 
      name: "التدريب والتعليم", 
      icon: <Users className="w-6 h-6" />,
      responseTime: "24 ساعة"
    }
  ];

  const supportChannels = [
    {
      channel: "الدعم الهاتفي",
      description: "اتصل بفريق الدعم على مدار الساعة",
      icon: <Phone className="w-8 h-8" />,
      availability: "24/7",
      responseTime: "5 دقائق",
      color: "from-blue-500 to-blue-600"
    },
    {
      channel: "الدعم المباشر",
      description: "محادثة فورية مع فني متخصص",
      icon: <MessageSquare className="w-8 h-8" />,
      availability: "8 ص - 10 م",
      responseTime: "2 دقيقة",
      color: "from-green-500 to-green-600"
    },
    {
      channel: "الدعم عن بعد",
      description: "اتصال عن بعد لحل المشكلة مباشرة",
      icon: <Video className="w-8 h-8" />,
      availability: "9 ص - 6 م",
      responseTime: "30 دقيقة",
      color: "from-purple-500 to-purple-600"
    },
    {
      channel: "زيارة موقعية",
      description: "زيارة فني إلى موقعك",
      icon: <MapPin className="w-8 h-8" />,
      availability: "حسب الجدول",
      responseTime: "24-48 ساعة",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const ticketFormFields = [
    {
      label: "نوع المشكلة",
      type: "select",
      options: ["تركيب", "صيانة", "استكشاف أخطاء", "تدريب", "أخرى"],
      required: true
    },
    {
      label: "درجة الأهمية",
      type: "select",
      options: ["عادية", "متوسطة", "عاجلة", "حرجة"],
      required: true
    },
    {
      label: "الجهاز/النظام المتأثر",
      type: "text",
      placeholder: "مثال: نظام شمسي 10 كيلووات",
      required: true
    },
    {
      label: "وصف المشكلة",
      type: "textarea",
      placeholder: "صف المشكلة بالتفصيل...",
      required: true
    },
    {
      label: "المرفقات",
      type: "file",
      description: "صور أو فيديوهات للمشكلة (اختياري)",
      required: false
    }
  ];

  const supportStats = [
    { metric: "98%", label: "رضا العملاء", icon: <Star className="w-6 h-6" /> },
    { metric: "15 دقيقة", label: "متوسط وقت الرد", icon: <Clock className="w-6 h-6" /> },
    { metric: "24/7", label: "دعم على مدار الساعة", icon: <Headphones className="w-6 h-6" /> },
    { metric: "95%", label: "مشاكل تم حلها", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  const commonIssues = [
    {
      issue: "انخفاض كفاءة النظام",
      solution: "تنظيف الألواح وفحص التوصيلات",
      time: "1-2 ساعة",
      difficulty: "سهل"
    },
    {
      issue: "العاكس لا يعمل",
      solution: "إعادة تشغيل وفحص الإعدادات",
      time: "30 دقيقة",
      difficulty: "متوسط"
    },
    {
      issue: "تسرب في النظام",
      solution: "فحص العزل وإصلاح التسريبات",
      time: "2-3 ساعات",
      difficulty: "متقدم"
    },
    {
      issue: "انقطاع التيار",
      solution: "فحص البطاريات والمحولات",
      time: "1 ساعة",
      difficulty: "متوسط"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium mb-4">
                  <Headphones className="w-4 h-4" />
                  دعم فني احترافي
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  الدعم <span className="text-orange-600">الفني المتخصص</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  فريق دعم فني مؤهل على أعلى مستوى جاهز لمساعدتك في حل 
                  أي مشكلة تقنية في أنظمة الطاقة الشمسية على مدار الساعة.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {supportStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{stat.metric}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">الدعم الفوري</h3>
                    <p className="text-muted-foreground">اختر طريقة التواصل المناسبة لك</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600">
                      <Phone className="w-5 h-5" />
                      920000000
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="w-5 h-5" />
                      محادثة
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
                    onClick={() => setShowTicketForm(true)}
                  >
                    <FileText className="w-5 h-5" />
                    فتح تذكرة دعم
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">قنوات الدعم المتاحة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر القناة المناسبة لاحتياجاتك من خيارات الدعم المتنوعة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="group">
                <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white mb-6`}>
                    {channel.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{channel.channel}</h3>
                  <p className="text-muted-foreground mb-4">{channel.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التوفر:</span>
                      <span className="font-bold">{channel.availability}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">وقت الرد:</span>
                      <span className="font-bold text-green-600">{channel.responseTime}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full gap-2" variant="outline">
                    اختر هذه القناة
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مجالات الدعم الفني</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              خدمات دعم شاملة تغطي جميع جوانب أنظمة الطاقة الشمسية
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    activeCategory === category.id
                      ? "border-orange-500 bg-orange-500/10 text-orange-700"
                      : "border-border hover:border-orange-500/30"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    {category.icon}
                    <div className="font-bold text-center">{category.name}</div>
                    <div className="text-sm text-muted-foreground">رد خلال {category.responseTime}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {supportCategories.find(c => c.id === activeCategory)?.name}
                  </h3>
                  <p className="text-muted-foreground">تفاصيل الخدمة والمزايا</p>
                </div>
                <div className="text-lg font-bold text-orange-600">
                  رد خلال {supportCategories.find(c => c.id === activeCategory)?.responseTime}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>دعم فني متخصص في المجال</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>حلول مضمونة وفعالة</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>متابعة حتى التأكد من الحل</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span>ضمان على الإصلاحات</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>دعم على مدار الساعة</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span>توصيات لتحسين الأداء</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Issues */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مشاكل شائعة وحلولها</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              استكشف حلولاً سريعة للمشاكل الأكثر شيوعاً في أنظمة الطاقة الشمسية
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2">{issue.issue}</h3>
                    <p className="text-muted-foreground">{issue.solution}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    issue.difficulty === "سهل" ? "bg-green-500/10 text-green-700" :
                    issue.difficulty === "متوسط" ? "bg-yellow-500/10 text-yellow-700" :
                    "bg-red-500/10 text-red-700"
                  }`}>
                    {issue.difficulty}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>الوقت المتوقع: {issue.time}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    عرض الحل التفصيلي
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">فتح تذكرة دعم جديد</h2>
                  <p className="text-muted-foreground">أدخل تفاصيل مشكلتك وسنساعدك في حلها</p>
                </div>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <form className="space-y-6">
                {ticketFormFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === "select" ? (
                      <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500/30">
                        <option value="">اختر {field.label.toLowerCase()}</option>
                        {field.options?.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 min-h-[120px]"
                        placeholder={field.placeholder}
                      />
                    ) : field.type === "file" ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">{field.description}</p>
                        <Button variant="outline" size="sm">
                          اختيار ملف
                        </Button>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowTicketForm(false)}
                  >
                    إلغاء
                  </Button>
                  <Button className="w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600">
                    <FileText className="w-5 h-5" />
                    إرسال التذكرة
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-orange-500/5 to-orange-600/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 mb-6">
              <Headphones className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6">لست متأكداً من المشكلة؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريق الدعم الفني لدينا جاهز لتشخيص مشكلتك وإيجاد الحل المناسب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600">
                <Phone className="w-5 h-5" />
                اتصل بنا الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowTicketForm(true)}
              >
                <FileText className="w-5 h-5" />
                فتح تذكرة دعم
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Video className="w-5 h-5" />
                دعم عن بعد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}