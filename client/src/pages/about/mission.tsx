// app/vision-mission/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight, Award, Brain, Compass, Eye, Flag, 
  Globe, Heart, Lightbulb, Rocket, Star, Target, 
  TrendingUp, Trophy, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";
export default function VisionMissionPage() {
  const [activeTab, setActiveTab] = useState("vision");
  const [animatedStats, setAnimatedStats] = useState({
    countries: 0,
    projects: 0,
    clients: 0,
    quality: 0
  });

  // تأثير عد الإحصائيات
  useEffect(() => {
    const targetStats = {
      countries: 15,
      projects: 1200,
      clients: 85000,
      quality: 98
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      
      setAnimatedStats({
        countries: Math.min(Math.floor((currentStep / steps) * targetStats.countries), targetStats.countries),
        projects: Math.min(Math.floor((currentStep / steps) * targetStats.projects), targetStats.projects),
        clients: Math.min(Math.floor((currentStep / steps) * targetStats.clients), targetStats.clients),
        quality: Math.min(Math.floor((currentStep / steps) * targetStats.quality), targetStats.quality)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const visionData = {
    title: "رؤيتنا: قيادة مستقبل الطاقة المستدامة",
    description: "نسعى لبناء عالم يعتمد على الطاقة النظيفة والمتجددة، حيث تكون الطاقة الشمسية المصدر الرئيسي للطاقة في المنطقة.",
    goals: [
      {
        title: "الريادة الإقليمية",
        description: "أن نكون الشركة الرائدة في مجال الطاقة الشمسية في الشرق الأوسط وشمال أفريقيا بحلول 2030",
        icon: <Trophy className="w-6 h-6" />,
        progress: 75
      },
      {
        title: "التأثير البيئي",
        description: "المساهمة في خفض انبعاثات الكربون بمقدار 1 مليون طن سنوياً بحلول 2028",
        icon: <Globe className="w-6 h-6" />,
        progress: 60
      },
      {
        title: "الابتكار التكنولوجي",
        description: "إطلاق 5 تقنيات مبتكرة في مجال الطاقة الشمسية خلال السنوات الثلاث القادمة",
        icon: <Lightbulb className="w-6 h-6" />,
        progress: 40
      },
      {
        title: "الوصول المجتمعي",
        description: "تمكين مليون منزل من استخدام الطاقة الشمسية بحلول 2030",
        icon: <Heart className="w-6 h-6" />,
        progress: 25
      }
    ],
    milestones: [
      { year: "2024", title: "الوصول إلى 15 دولة", achieved: true },
      { year: "2025", title: "إطلاق منصة الذكاء الاصطناعي", achieved: false },
      { year: "2026", title: "توسيع خط الإنتاج المحلي", achieved: false },
      { year: "2027", title: "الوصول إلى 50 ألف عميل", achieved: false },
      { year: "2028", title: "تأسيس معهد البحوث", achieved: false }
    ]
  };

  const missionData = {
    title: "رسالتنا: تمكين التحول نحو الطاقة النظيفة",
    description: "نحن ملتزمون بتقديم حلول طاقة شمسية مبتكرة وعالية الجودة تجمع بين الكفاءة التقنية والاستدامة الاقتصادية والمسؤولية البيئية.",
    pillars: [
      {
        title: "الابتكار المستمر",
        description: "نسعى دائماً لتطوير وتقديم أحدث التقنيات والحلول الذكية في مجال الطاقة الشمسية",
        icon: <Brain className="w-8 h-8" />,
        points: [
          "مركز بحث وتطوير متخصص",
          "شراكات مع الجامعات العالمية",
          "استثمار 15% من الأرباح في البحث والتطوير"
        ]
      },
      {
        title: "الجودة المطلقة",
        description: "نلتزم بأعلى معايير الجودة العالمية في كل منتج وخدمة نقدمها",
        icon: <Award className="w-8 h-8" />,
        points: [
          "معايير ISO العالمية",
          "اختبارات جودة صارمة",
          "ضمان أداء 25 سنة"
        ]
      },
      {
        title: "خدمة العملاء الاستثنائية",
        description: "نضع رضا عملائنا في صميم كل ما نقوم به، من الاستشارة إلى ما بعد البيع",
        icon: <Heart className="w-8 h-8" />,
        points: [
          "دعم فني متواصل 24/7",
          "تدريب وتأهيل العملاء",
          "خدمة صيانة سريعة"
        ]
      },
      {
        title: "المسؤولية المجتمعية",
        description: "نساهم في تنمية المجتمع وبناء مستقبل مستدام للأجيال القادمة",
        icon: <Globe className="w-8 h-8" />,
        points: [
          "برامج توعية مجتمعية",
          "مشاريع للطاقة في المناطق النائية",
          "شراكات مع المؤسسات التعليمية"
        ]
      }
    ],
    commitments: [
      "نقل المعرفة والخبرة لعملائنا",
      "توفير حلول مالية مرنة",
      "دعم التحول الرقمي في قطاع الطاقة",
      "الشفافية في كل التعاملات",
      "الالتزام بالمواعيد والتسليم"
    ]
  };

  const values = [
    {
      title: "التفاني",
      description: "نعطي كل مشروع 100% من جهدنا واهتمامنا",
      icon: "💪",
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      title: "الشفافية",
      description: "صراحة تامة مع عملائنا في كل التفاصيل",
      icon: "🔍",
      color: "from-green-500/10 to-green-600/10"
    },
    {
      title: "العمل الجماعي",
      description: "نؤمن بقوة الفريق في تحقيق الأهداف الكبيرة",
      icon: "🤝",
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      title: "التعلم المستمر",
      description: "نسعى دائماً لتطوير مهاراتنا ومعارفنا",
      icon: "📚",
      color: "from-orange-500/10 to-orange-600/10"
    },
    {
      title: "الاستدامة",
      description: "كل قرار نتخذه يأخذ المستقبل في الاعتبار",
      icon: "🌱",
      color: "from-emerald-500/10 to-emerald-600/10"
    },
    {
      title: "التميز",
      description: "لا نرضى إلا بالأفضل في كل ما نقدمه",
      icon: "⭐",
      color: "from-yellow-500/10 to-yellow-600/10"
    }
  ];

  const impactAreas = [
    {
      area: "الاقتصاد",
      impact: "توفير فرص عمل وتنمية اقتصادية محلية",
      icon: <TrendingUp className="w-8 h-8" />,
      metrics: ["خلق 500+ فرصة عمل", "دعم 100+ مورد محلي"]
    },
    {
      area: "البيئة",
      impact: "المساهمة في الحد من التلوث والحفاظ على الموارد",
      icon: <Globe className="w-8 h-8" />,
      metrics: ["تخفيض 50K+ طن انبعاثات", "توفير 1M+ لتر مياه"]
    },
    {
      area: "المجتمع",
      impact: "تحسين جودة الحياة وتمكين المجتمعات",
      icon: <Heart className="w-8 h-8" />,
      metrics: ["توعية 10K+ أسرة", "دعم 50+ مدرسة"]
    },
    {
      area: "التكنولوجيا",
      impact: "دفع عجلة الابتكار ونقل المعرفة",
      icon: <Lightbulb className="w-8 h-8" />,
      metrics: ["5+ براءات اختراع", "تدريب 1000+ فني"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-24">
        {/* خلفية SVG مع تصحيح علامات الاقتباس */}
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M30%205a25%2025%200%201%201%200%2050%2025%2025%200%200%201%200-50z%22%20fill%3D%22%230ea5e9%22%20fill-opacity%3D%220.05%22%2F%3E%3C%2Fsvg%3E')]" 
        />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              الطريق نحو مستقبل أفضل
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              نرسم <span className="text-primary">مستقبل الطاقة</span><br />
              بكل ثقة وطموح
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              في سولار تيك، نحن لا نبيع منتجات فقط، بل نقدم رؤية لمستقبل أكثر إشراقاً واستدامة. 
              رؤيتنا ورسالتنا هما البوصلة التي توجه كل قرار نتخذه وكل خطوة نخطوها.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant={activeTab === "vision" ? "default" : "outline"}
                className="gap-2"
                onClick={() => setActiveTab("vision")}
              >
                <Eye className="w-5 h-5" />
                رؤيتنا
              </Button>
              <Button 
                size="lg" 
                variant={activeTab === "mission" ? "default" : "outline"}
                className="gap-2"
                onClick={() => setActiveTab("mission")}
              >
                <Compass className="w-5 h-5" />
                رسالتنا
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const valuesSection = document.getElementById('values');
                  if (valuesSection) {
                    valuesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Star className="w-5 h-5" />
                قيمنا
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-12 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {animatedStats.countries}<span className="text-2xl">+</span>
              </div>
              <div className="text-sm text-muted-foreground">دولة نخدمها</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {animatedStats.projects.toLocaleString()}<span className="text-2xl">+</span>
              </div>
              <div className="text-sm text-muted-foreground">مشروع مكتمل</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {animatedStats.clients.toLocaleString()}<span className="text-2xl">+</span>
              </div>
              <div className="text-sm text-muted-foreground">عميل واثق</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {animatedStats.quality}<span className="text-2xl">%</span>
              </div>
              <div className="text-sm text-muted-foreground">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Content */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Vision Section */}
            {activeTab === "vision" && (
              <div className="space-y-16 animate-in fade-in duration-500">
                {/* Vision Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 mb-6">
                    <Eye className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{visionData.title}</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {visionData.description}
                  </p>
                </div>

                {/* Strategic Goals */}
                <div>
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Target className="w-8 h-8 text-primary" />
                    الأهداف الاستراتيجية
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {visionData.goals.map((goal, index) => (
                      <div key={index} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                            {goal.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-2">{goal.title}</h4>
                            <p className="text-muted-foreground">{goal.description}</p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>مستوى الإنجاز</span>
                            <span className="font-bold">{goal.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones Timeline */}
                <div>
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Flag className="w-8 h-8 text-primary" />
                    المعالم الزمنية
                  </h3>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 to-primary/10" />
                    
                    <div className="space-y-8">
                      {visionData.milestones.map((milestone, index) => (
                        <div key={index} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                          <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'} relative`}>
                            <div className={`bg-card rounded-xl p-6 border ${milestone.achieved ? 'border-green-500/30 bg-green-500/5' : 'border-border'} relative`}>
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${milestone.achieved ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                  {milestone.achieved ? "✓" : index + 1}
                                </div>
                                <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                              </div>
                              <h4 className="text-lg font-bold mb-2">{milestone.title}</h4>
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${milestone.achieved ? 'bg-green-500/10 text-green-700' : 'bg-blue-500/10 text-blue-700'}`}>
                                {milestone.achieved ? "تم الإنجاز" : "قيد التنفيذ"}
                              </div>
                            </div>
                            
                            {/* Connector Line */}
                            <div className={`absolute top-1/2 w-12 h-1 ${index % 2 === 0 ? '-right-12' : '-left-12'} bg-gradient-to-r ${index % 2 === 0 ? 'from-card to-primary/20' : 'from-primary/20 to-card'}`} />
                          </div>
                          
                          {/* Center Dot */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <div className={`w-6 h-6 rounded-full ${milestone.achieved ? 'bg-green-500' : 'bg-primary'} border-4 border-background`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vision Statement */}
                <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-3xl p-8 md:p-12">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:block flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">بيان الرؤية</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        "نسعى لبناء عالم يعتمد على الطاقة النظيفة، حيث تكون الطاقة الشمسية المصدر الرئيسي للطاقة. 
                        نطمح لأن نكون رواد التحول نحو الاستدامة، من خلال تقديم حلول مبتكرة تجمع بين التكنولوجيا المتقدمة 
                        والمسؤولية البيئية والاستدامة الاقتصادية. هدفنا هو تمكين الأفراد والمجتمعات من التحكم في مستقبلهم 
                        الطاقي، وبناء إرث مستدام للأجيال القادمة."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mission Section */}
            {activeTab === "mission" && (
              <div className="space-y-16 animate-in fade-in duration-500">
                {/* Mission Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 mb-6">
                    <Compass className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{missionData.title}</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {missionData.description}
                  </p>
                </div>

                {/* Mission Pillars */}
                <div>
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-primary" />
                    دعائم رسالتنا
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {missionData.pillars.map((pillar, index) => (
                      <div key={index} className="group">
                        <div className="bg-card rounded-2xl p-6 border border-border hover:border-emerald-500/30 transition-all duration-300 h-full">
                          <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                              {pillar.icon}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-2">{pillar.title}</h4>
                              <p className="text-muted-foreground">{pillar.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {pillar.points.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-sm">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Our Commitments */}
                <div>
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-primary" />
                    التزاماتنا تجاهكم
                  </h3>
                  
                  <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 rounded-3xl p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {missionData.commitments.map((commitment, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <div className="text-lg">✓</div>
                          </div>
                          <span className="font-medium">{commitment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mission in Action */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">رسالتنا في العمل</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        نترجم رسالتنا إلى أفعال ملموسة من خلال:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                          <Rocket className="w-5 h-5 text-primary" />
                          <span>برامج تدريب وتأهيل مكثفة</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          <span>استشارات مجانية للمشاريع</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                          <Award className="w-5 h-5 text-primary" />
                          <span>ضمانات ممتدة على المنتجات</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                          <Globe className="w-5 h-5 text-primary" />
                          <span>دعم المشاريع المجتمعية</span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/3">
                      <div className="p-6 bg-white rounded-2xl shadow-lg">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-primary mb-2">100%</div>
                          <div className="text-lg font-bold mb-2">التزام بالجودة</div>
                          <p className="text-sm text-muted-foreground">
                            نلتزم بنسبة 100% بمعايير الجودة في كل مشروع
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div id="values" className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">قيمنا الأساسية</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              المبادئ التي نؤمن بها ونسير عليها في كل ما نقوم به
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 border border-border hover:scale-[1.02] transition-all duration-300 h-full`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{value.icon}</div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              هذه القيم ليست مجرد كلمات نرددها، بل هي مبادئ نعيشها يومياً وتوجه قراراتنا 
              وتصرفاتنا في كل تفاعل مع عملائنا وشركائنا ومجتمعنا.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Areas */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مجالات تأثيرنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              كيف نساهم في صنع الفرق وبناء مستقبل أفضل
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{area.area}</h3>
                <p className="text-muted-foreground mb-4">{area.impact}</p>
                <div className="space-y-2">
                  {area.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">انضم إلى رحلتنا</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              سواء كنت عميلاً تبحث عن حلول طاقة مستدامة، أو شريكاً تريد الانضمام إلى رحلتنا، 
              أو موهبة تبحث عن فرصة لتغيير العالم، نحن نرحب بك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                تواصل معنا <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                انضم لفريقنا <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                استعرض المنتجات <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}