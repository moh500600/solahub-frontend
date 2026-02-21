"use client";

import { useState } from "react";
import { 
  ArrowRight, Award, CheckCircle, Clock, Compass, Globe, 
  Heart, Lightbulb, Map, Rocket, Shield, Star, Target, 
  TrendingUp, Trophy, Users, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function AboutPage() {
  const [activeMission, setActiveMission] = useState("vision");

  const stats = [
    { number: "2010", label: "سنة التأسيس", icon: <Award className="w-8 h-8" /> },
    { number: "50K+", label: "عملاء راضون", icon: <Users className="w-8 h-8" /> },
    { number: "15+", label: "علامات تجارية", icon: <Shield className="w-8 h-8" /> },
    { number: "98%", label: "رضا العملاء", icon: <Star className="w-8 h-8" /> },
    { number: "500+", label: "مشروع مكتمل", icon: <CheckCircle className="w-8 h-8" /> },
    { number: "10+", label: "دول نخدمها", icon: <Globe className="w-8 h-8" /> },
  ];

  const values = [
    {
      title: "الجودة أولاً",
      description: "نلتزم بأعلى معايير الجودة في كل منتج وخدمة نقدمها",
      icon: <Award className="w-10 h-10" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "الابتكار المستمر",
      description: "نسعى دائماً لتقديم أحدث التقنيات والحلول الذكية",
      icon: <Lightbulb className="w-10 h-10" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "خدمة العملاء",
      description: "راحة ورضا عملائنا هو هدفنا الأساسي",
      icon: <Heart className="w-10 h-10" />,
      color: "from-red-500 to-red-600"
    },
    {
      title: "الاستدامة",
      description: "نساهم في بناء مستقبل أخضر ومستدام للأجيال القادمة",
      icon: <Zap className="w-10 h-10" />,
      color: "from-green-500 to-green-600"
    },
  ];

  const timeline = [
    {
      year: "2010",
      title: "بداية الرحلة",
      description: "تأسيس الشركة بفريق صغير وطموحات كبيرة",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      year: "2013",
      title: "التوسع الأول",
      description: "إضافة أول خط إنتاج للألواح الشمسية المحلية",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: "2016",
      title: "التحول الرقمي",
      description: "إطلاق أول منصة إلكترونية للتجارة في الطاقة الشمسية",
      icon: <Zap className="w-6 h-6" />
    },
    {
      year: "2019",
      title: "التميز الإقليمي",
      description: "فوزنا بجائزة أفضل مزود للطاقة الشمسية في الشرق الأوسط",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "التوسع الدولي",
      description: "بدء عملياتنا في 10 دول حول العالم",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "الريادة التكنولوجية",
      description: "إطلاق منصة الذكاء الاصطناعي للطاقة الشمسية",
      icon: <Lightbulb className="w-6 h-6" />
    },
  ];

  const team = [
    {
      name: "أحمد السديس",
      position: "المدير التنفيذي",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400",
      description: "خبرة 15 عاماً في مجال الطاقة المتجددة"
    },
    {
      name: "سارة القحطاني",
      position: "رئيسة قسم الجودة",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w-400",
      description: "مستشارة معتمدة في أنظمة الجودة العالمية"
    },
    {
      name: "محمد العتيبي",
      position: "مدير المشاريع",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400",
      description: "إدارة أكثر من 200 مشروع طاقة شمسية"
    },
    {
      name: "نورة الغامدي",
      position: "رئيسة التصميم",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400",
      description: "تصميم حلول طاقة مبتكرة منذ 10 سنوات"
    },
  ];

  const certifications = [
    { name: "ISO 9001", description: "نظام إدارة الجودة" },
    { name: "ISO 14001", description: "نظام إدارة البيئة" },
    { name: "UL Certified", description: "معايير السلامة العالمية" },
    { name: "TÜV Rheinland", description: "اعتماد الجودة الألمانية" },
    { name: "Solar Scorecard", description: "التصنيف الذهبي للطاقة الشمسية" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  رائدون في مجال الطاقة الشمسية منذ 2010
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  نبني <span className="text-primary">مستقبل الطاقة</span> معاً
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  نحن شركة سولار تيك، رواد في مجال الطاقة الشمسية والحلول المستدامة. 
                  نقدم منتجات وخدمات مبتكرة تساعد الأفراد والشركات على التحول إلى الطاقة النظيفة.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  تواصل معنا <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  استعراض المنتجات <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800"
                  alt="عن الشركة"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">14+</div>
                    <div className="text-sm">سنوات خبرة</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm">مشروع مكتمل</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm">عميل راضٍ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">رسالتنا ورؤيتنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نسعى لتحقيق أهداف كبيرة وتقديم قيمة حقيقية لعملائنا ومجتمعنا
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full p-1 bg-muted">
                <button
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                    activeMission === "vision" 
                      ? "bg-primary text-white shadow-lg" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveMission("vision")}
                >
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    رؤيتنا
                  </div>
                </button>
                <button
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                    activeMission === "mission" 
                      ? "bg-primary text-white shadow-lg" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveMission("mission")}
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5" />
                    رسالتنا
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12">
              {activeMission === "vision" ? (
                <div className="space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">رؤيتنا</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    نطمح لأن نكون الشركة الرائدة في مجال الطاقة الشمسية والحلول المستدامة في منطقة الشرق الأوسط وشمال أفريقيا، 
                    من خلال تقديم تقنيات مبتكرة وخدمات استثنائية تساهم في بناء مستقبل أخضر ومستدام للمجتمع.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="p-4 bg-white rounded-xl">
                      <h4 className="font-bold mb-2">التأثير المجتمعي</h4>
                      <p className="text-sm text-muted-foreground">المساهمة في خفض انبعاثات الكربون بنسبة 40% بحلول 2030</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <h4 className="font-bold mb-2">التوسع الجغرافي</h4>
                      <p className="text-sm text-muted-foreground">الوصول إلى 20 دولة في المنطقة خلال السنوات الخمس القادمة</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10">
                    <Compass className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">رسالتنا</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    نسعى لتوفير حلول طاقة شمسية مبتكرة وعالية الجودة تساهم في تحقيق الاستدامة البيئية والاقتصادية، 
                    من خلال فريق عمل متميز وشراكات استراتيجية وتركيز دائم على رضا العملاء والابتكار التكنولوجي.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="p-4 bg-white rounded-xl">
                      <h4 className="font-bold mb-2">جودة المنتجات</h4>
                      <p className="text-sm text-muted-foreground">ضمان أعلى معايير الجودة والكفاءة في كل منتج</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <h4 className="font-bold mb-2">دعم العملاء</h4>
                      <p className="text-sm text-muted-foreground">تقديم دعم فني واستشاري مميز طوال دورة حياة المنتج</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">أرقام تتحدث عنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إنجازاتنا ومسار نمونا على مر السنين
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">قيمنا الأساسية</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              المبادئ التي نؤمن بها ونسير عليها في كل ما نقوم به
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ background: `linear-gradient(135deg, ${value.color})` }}
                />
                <div className="relative bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">رحلة التميز</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مسيرة النجاح والإنجازات على مر السنين
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{item.year}</div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary border-4 border-background shadow-lg" />
                  </div>
                  
                  {/* Empty Space for alternating */}
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">فريقنا المتميز</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نخبة من الخبراء والمتخصصين الذين يقودون مسيرة التميز
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-primary font-medium mb-2">{member.position}</div>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">الشهادات والاعتمادات</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اعتراف عالمي بجودة منتجاتنا وخدماتنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center border border-border hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-6">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">انضم إلى رحلة التحول إلى الطاقة النظيفة</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              سواء كنت فرداً يبحث عن توفير في فاتورة الكهرباء أو شركة تسعى للاستدامة، 
              نحن هنا لمساعدتك في كل خطوة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                تواصل معنا <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                طلب عرض سعر <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                استعراض المنتجات <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}