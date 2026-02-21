"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, ChevronDown, Mail, Phone, MapPin, 
  Linkedin, Twitter, Globe, Award, Calendar, BookOpen,
  Star, Users, Zap, Briefcase, GraduationCap, Target,
  MessageSquare, ArrowRight, Shield, Heart, Lightbulb,
  BarChart, Settings, Cpu, Home, Building, Factory
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function ExpertsTeamPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // فريق الخبراء
  const experts = [
    {
      id: 1,
      name: "د. أحمد السديس",
      title: "خبير الطاقة الشمسية",
      position: "المدير التنفيذي",
      experience: "15+ سنة",
      specialization: ["الطاقة الشمسية", "أنظمة التخزين", "التخطيط الاستراتيجي"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400",
      rating: 4.9,
      projects: 200,
      bio: "حاصل على دكتوراه في هندسة الطاقة المتجددة من جامعة ستانفورد. قاد أكثر من 200 مشروع طاقة شمسية في المنطقة.",
      skills: ["تخطيط المشاريع", "التحليل الفني", "إدارة الفرق", "التفاوض"],
      contact: {
        email: "ahmed@solartech.com",
        phone: "+966500000001",
        location: "الرياض، السعودية"
      },
      social: {
        linkedin: "ahmed-alsudais",
        twitter: "ahmed_alsudais"
      },
      availability: "متاح للاستشارات",
      languages: ["العربية", "الإنجليزية", "الألمانية"],
      certifications: ["LEED AP", "PVIP", "PMI-PMP"],
      category: "leadership"
    },
    {
      id: 2,
      name: "م. سارة القحطاني",
      title: "مهندسة أنظمة شمسية",
      position: "رئيسة قسم الجودة",
      experience: "12+ سنة",
      specialization: ["أنظمة الجودة", "الضمان", "المعايير العالمية"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400",
      rating: 4.8,
      projects: 150,
      bio: "مهندسة معتمدة في أنظمة الجودة العالمية، حاصلة على 5 شهادات عالمية في مجال الطاقة الشمسية.",
      skills: ["مراقبة الجودة", "التدقيق الفني", "تطوير المعايير", "إدارة المخاطر"],
      contact: {
        email: "sarah@solartech.com",
        phone: "+966500000002",
        location: "جدة، السعودية"
      },
      social: {
        linkedin: "sarah-alqahtani",
        twitter: "sarah_alqahtani"
      },
      availability: "متاحة للتدريب",
      languages: ["العربية", "الإنجليزية", "الفرنسية"],
      certifications: ["ISO 9001 Lead Auditor", "Six Sigma Black Belt", "TQM"],
      category: "engineering"
    },
    {
      id: 3,
      name: "م. محمد العتيبي",
      title: "خبير أنظمة التخزين",
      position: "مدير المشاريع",
      experience: "10+ سنة",
      specialization: ["بطاريات الطاقة", "أنظمة الهجين", "إدارة الطاقة"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400",
      rating: 4.7,
      projects: 180,
      bio: "متخصص في أنظمة تخزين الطاقة وتكاملها مع الشبكات الذكية. صمم أكبر نظام تخزين في المنطقة.",
      skills: ["تصميم الأنظمة", "التحليل الاقتصادي", "إدارة التشغيل", "الصيانة"],
      contact: {
        email: "mohammed@solartech.com",
        phone: "+966500000003",
        location: "الدمام، السعودية"
      },
      social: {
        linkedin: "mohammed-alotaibi",
        twitter: "mohammed_otaibi"
      },
      availability: "متاح للتصميم",
      languages: ["العربية", "الإنجليزية"],
      certifications: ["ESS Expert", "Battery Storage Pro", "Grid Integration"],
      category: "storage"
    },
    {
      id: 4,
      name: "م. نورة الغامدي",
      title: "مهندسة تصميم أنظمة",
      position: "رئيسة التصميم",
      experience: "8+ سنة",
      specialization: ["التصميم ثلاثي الأبعاد", "محاكاة الأنظمة", "التحسين"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&h=400",
      rating: 4.9,
      projects: 120,
      bio: "متخصصة في تصميم الأنظمة الشمسية باستخدام أحدث برامج المحاكاة والتصميم ثلاثي الأبعاد.",
      skills: ["AutoCAD", "PVsyst", "SketchUp", "تحليل البيانات"],
      contact: {
        email: "noura@solartech.com",
        phone: "+966500000004",
        location: "الرياض، السعودية"
      },
      social: {
        linkedin: "noura-alghamdi",
        twitter: "noura_alghamdi"
      },
      availability: "متاحة للتصميم",
      languages: ["العربية", "الإنجليزية", "الإسبانية"],
      certifications: ["AutoCAD Expert", "PVsyst Professional", "3D Modeling"],
      category: "design"
    },
    {
      id: 5,
      name: "د. خالد الفهيد",
      title: "خبير الاستدامة",
      position: "مدير الاستدامة",
      experience: "14+ سنة",
      specialization: ["الاستدامة", "تقييم الأثر البيئي", "الطاقة الخضراء"],
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?auto=format&fit=crop&w=400&h=400",
      rating: 4.8,
      projects: 90,
      bio: "خبير في تطبيق معايير الاستدامة وتحليل الأثر البيئي للمشاريع الكبرى.",
      skills: ["تقييم الأثر", "الاستدامة", "التقارير البيئية", "التخطيط"],
      contact: {
        email: "khaled@solartech.com",
        phone: "+966500000005",
        location: "الخبر، السعودية"
      },
      social: {
        linkedin: "khaled-alfahad",
        twitter: "khaled_alfahad"
      },
      availability: "متاح للاستشارات",
      languages: ["العربية", "الإنجليزية", "الألمانية"],
      certifications: ["LEED Fellow", "ESG Expert", "Sustainability Pro"],
      category: "sustainability"
    },
    {
      id: 6,
      name: "م. فهد الرشيد",
      title: "مهندس تركيب",
      position: "مدير العمليات",
      experience: "11+ سنة",
      specialization: ["التركيب", "الصيانة", "سلامة الأنظمة"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400",
      rating: 4.7,
      projects: 250,
      bio: "متخصص في تركيب وصيانة الأنظمة الشمسية الكبرى. أشرف على تركيب أكثر من 250 نظام.",
      skills: ["التركيب", "الصيانة", "السلامة", "إدارة العمليات"],
      contact: {
        email: "fahad@solartech.com",
        phone: "+966500000006",
        location: "الرياض، السعودية"
      },
      social: {
        linkedin: "fahad-alrasheed",
        twitter: "fahad_alrasheed"
      },
      availability: "متاح للمشاريع",
      languages: ["العربية", "الإنجليزية"],
      certifications: ["OSHA Certified", "Installation Pro", "Maintenance Expert"],
      category: "operations"
    },
    {
      id: 7,
      name: "أ. ليان الحربي",
      title: "استشارية مالية",
      position: "مديرة الشؤون المالية",
      experience: "9+ سنة",
      specialization: ["التمويل", "التحليل الاقتصادي", "تقييم المشاريع"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400",
      rating: 4.8,
      projects: 130,
      bio: "متخصصة في التمويل والتحليل الاقتصادي لمشاريع الطاقة الشمسية. حاصلة على ماجستير في التمويل.",
      skills: ["التحليل المالي", "تقييم المشاريع", "تمويل الطاقة", "إدارة المخاطر"],
      contact: {
        email: "layan@solartech.com",
        phone: "+966500000007",
        location: "جدة، السعودية"
      },
      social: {
        linkedin: "layan-alharbi",
        twitter: "layan_alharbi"
      },
      availability: "متاحة للاستشارات",
      languages: ["العربية", "الإنجليزية", "الصينية"],
      certifications: ["CFA", "Financial Modeling", "Project Finance"],
      category: "finance"
    },
    {
      id: 8,
      name: "م. عمر الجهني",
      title: "مهندس بحوث",
      position: "رئيس قسم البحث والتطوير",
      experience: "7+ سنة",
      specialization: ["البحث", "التطوير", "التقنيات الناشئة"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400",
      rating: 4.6,
      projects: 60,
      bio: "متخصص في البحث والتطوير في مجال التقنيات الشمسية الناشئة. نشر أكثر من 20 بحثاً علمياً.",
      skills: ["البحث العلمي", "تطوير المنتجات", "الابتكار", "براءات الاختراع"],
      contact: {
        email: "omar@solartech.com",
        phone: "+966500000008",
        location: "الرياض، السعودية"
      },
      social: {
        linkedin: "omar-aljohani",
        twitter: "omar_aljohani"
      },
      availability: "متاح للأبحاث",
      languages: ["العربية", "الإنجليزية", "اليابانية"],
      certifications: ["PhD in Energy", "Research Methodologies", "Patent Law"],
      category: "research"
    }
  ];

  // التخصصات
  const specializations = [
    { id: "all", name: "جميع الخبراء", count: experts.length, icon: <Users className="w-5 h-5" /> },
    { id: "leadership", name: "القيادة والإدارة", count: experts.filter(e => e.category === "leadership").length, icon: <Briefcase className="w-5 h-5" /> },
    { id: "engineering", name: "الهندسة والجودة", count: experts.filter(e => e.category === "engineering").length, icon: <Settings className="w-5 h-5" /> },
    { id: "storage", name: "أنظمة التخزين", count: experts.filter(e => e.category === "storage").length, icon: <Cpu className="w-5 h-5" /> },
    { id: "design", name: "التصميم والمحاكاة", count: experts.filter(e => e.category === "design").length, icon: <Target className="w-5 h-5" /> },
    { id: "sustainability", name: "الاستدامة", count: experts.filter(e => e.category === "sustainability").length, icon: <Heart className="w-5 h-5" /> },
    { id: "operations", name: "العمليات والتركيب", count: experts.filter(e => e.category === "operations").length, icon: <Zap className="w-5 h-5" /> },
    { id: "finance", name: "التمويل والاقتصاد", count: experts.filter(e => e.category === "finance").length, icon: <BarChart className="w-5 h-5" /> },
    { id: "research", name: "البحث والتطوير", count: experts.filter(e => e.category === "research").length, icon: <Lightbulb className="w-5 h-5" /> }
  ];

  // المشاريع
  const projectTypes = [
    { type: "residential", name: "منزلي", icon: <Home className="w-4 h-4" /> },
    { type: "commercial", name: "تجاري", icon: <Building className="w-4 h-4" /> },
    { type: "industrial", name: "صناعي", icon: <Factory className="w-4 h-4" /> }
  ];

  // تصفية الخبراء
  const filteredExperts = experts.filter(expert => {
    const matchesFilter = activeFilter === "all" || expert.category === activeFilter;
    const matchesSearch = searchQuery === "" || 
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // عرض تفاصيل الخبير
  const showExpertDetails = (expert: any) => {
    setSelectedExpert(expert);
  };

  // إغلاق التفاصيل
  const closeExpertDetails = () => {
    setSelectedExpert(null);
  };

  // إحصائيات الفريق
  const teamStats = {
    totalExperts: experts.length,
    totalExperience: experts.reduce((sum, expert) => sum + parseInt(expert.experience), 0),
    totalProjects: experts.reduce((sum, expert) => sum + expert.projects, 0),
    averageRating: (experts.reduce((sum, expert) => sum + expert.rating, 0) / experts.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Users className="w-4 h-4" />
                  فريق من الخبراء والمتخصصين
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  لقاء مع <span className="text-primary">عقول الطاقة الشمسية</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  تعرف على فريقنا من الخبراء والمتخصصين الذين يجمعون بين المعرفة الأكاديمية العميقة 
                  والخبرة العملية الواسعة في مجال الطاقة الشمسية والحلول المستدامة.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{teamStats.totalExperts}+</div>
                  <div className="text-sm text-muted-foreground">خبير متخصص</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{teamStats.totalExperience}+</div>
                  <div className="text-sm text-muted-foreground">سنة خبرة</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{teamStats.totalProjects}+</div>
                  <div className="text-sm text-muted-foreground">مشروع ناجح</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{teamStats.averageRating}</div>
                  <div className="text-sm text-muted-foreground">متوسط التقييم</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-4">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">خبرة عملية</h3>
                    <p className="text-sm text-muted-foreground">مشاريع واقعية بمختلف الأحجام</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">شهادات عالمية</h3>
                    <p className="text-sm text-muted-foreground">اعتراف دولي بالخبرة</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-4">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">ابتكار مستمر</h3>
                    <p className="text-sm text-muted-foreground">بحث وتطوير دائم</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">عمل جماعي</h3>
                    <p className="text-sm text-muted-foreground">فريق متكامل المهارات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-0 z-30 bg-card border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن خبير بالاسم، التخصص، أو المهارات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">عرض:</span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-white" : "hover:bg-muted"}`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-1">
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-muted"}`}
                >
                  <div className="w-5 h-5 flex flex-col gap-1">
                    <div className="w-full h-1 bg-current rounded-full" />
                    <div className="w-full h-1 bg-current rounded-full" />
                    <div className="w-full h-1 bg-current rounded-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Specialization Filters */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">التخصصات:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveFilter(spec.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeFilter === spec.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {spec.icon}
                  <span>{spec.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === spec.id
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {spec.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experts Grid/List */}
      <div className="py-12">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">فريق الخبراء</h2>
                <p className="text-muted-foreground">
                  {filteredExperts.length} خبير متخصص
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">المشاريع:</span>
                <div className="flex gap-2">
                  {projectTypes.map((project) => (
                    <div
                      key={project.type}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm"
                    >
                      {project.icon}
                      <span>{project.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExperts.map((expert) => (
                <ExpertCard
                  key={expert.id}
                  expert={expert}
                  onClick={() => showExpertDetails(expert)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExperts.map((expert) => (
                <ExpertListItem
                  key={expert.id}
                  expert={expert}
                  onClick={() => showExpertDetails(expert)}
                />
              ))}
            </div>
          )}

          {filteredExperts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-6">
                لم نعثر على خبراء يطابقون معايير البحث
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
              >
                عرض جميع الخبراء
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Expert Details Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={selectedExpert.image}
                      alt={selectedExpert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedExpert.name}</h2>
                    <p className="text-primary font-medium">{selectedExpert.title}</p>
                  </div>
                </div>
                <button
                  onClick={closeExpertDetails}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Bio */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      السيرة المهنية
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedExpert.bio}
                    </p>
                  </div>

                  {/* Experience Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {selectedExpert.experience}
                      </div>
                      <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {selectedExpert.projects}+
                      </div>
                      <div className="text-sm text-muted-foreground">مشروع</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {selectedExpert.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">تقييم</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {selectedExpert.languages.length}
                      </div>
                      <div className="text-sm text-muted-foreground">لغة</div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      التخصصات
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.specialization.map((spec: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      المهارات الرئيسية
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedExpert.skills.map((skill: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">البريد الإلكتروني</div>
                          <div className="font-medium">{selectedExpert.contact.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">الهاتف</div>
                          <div className="font-medium">{selectedExpert.contact.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">الموقع</div>
                          <div className="font-medium">{selectedExpert.contact.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">الحالة</h3>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="font-medium">{selectedExpert.availability}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">الشهادات</h3>
                    <div className="space-y-3">
                      {selectedExpert.certifications.map((cert: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
                        >
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">وسائل التواصل</h3>
                    <div className="flex gap-3">
                      <a
                        href={`https://linkedin.com/in/${selectedExpert.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`https://twitter.com/${selectedExpert.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full gap-2">
                    <MessageSquare className="w-5 h-5" />
                    طلب استشارة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Features */}
      <div className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">لماذا تختار فريقنا؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مزايا تجعلنا الخيار الأمثل لمشاريعك الشمسية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">خبرة أكاديمية</h3>
              <p className="text-muted-foreground">
                جميع أعضاء الفريق حاصلون على مؤهلات علمية متقدمة من أفضل الجامعات العالمية
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-6">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">خبرة عملية واسعة</h3>
              <p className="text-muted-foreground">
                أكثر من 1000 مشروع ناجح في مختلف أنحاء المنطقة
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">شهادات عالمية</h3>
              <p className="text-muted-foreground">
                أكثر من 50 شهادة احترافية معترف بها دولياً في مجال الطاقة الشمسية
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">فريق متكامل</h3>
              <p className="text-muted-foreground">
                مجموعة متكاملة من التخصصات تغطي جميع جوانب مشاريع الطاقة الشمسية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How We Work */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">كيف نعمل معك؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              خطوات بسيطة لتحويل فكرتك إلى مشروع ناجح
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 to-primary/10" />
              
              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "الاستشارة الأولية",
                    description: "نستمع لمتطلباتك ونقيم احتياجاتك مع خبير متخصص",
                    icon: <MessageSquare className="w-6 h-6" />
                  },
                  {
                    step: "2",
                    title: "الدراسة والتحليل",
                    description: "نقوم بدراسة موقعك وتحليل البيانات والظروف المناخية",
                    icon: <BarChart className="w-6 h-6" />
                  },
                  {
                    step: "3",
                    title: "التصميم والتخطيط",
                    description: "نصمم لك النظام الأمثل بناءً على دراسة متكاملة",
                    icon: <Target className="w-6 h-6" />
                  },
                  {
                    step: "4",
                    title: "التنفيذ والتركيب",
                    description: "فريق تركيب متخصص ينفذ المشروع بأعلى معايير الجودة",
                    icon: <Settings className="w-6 h-6" />
                  },
                  {
                    step: "5",
                    title: "الدعم والمتابعة",
                    description: "نواصل دعمك ومراقبة أداء النظام بعد التسليم",
                    icon: <Shield className="w-6 h-6" />
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm text-primary font-bold">الخطوة {item.step}</div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Step Circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">تواصل مع خبير اليوم</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              لديك استفسار أو تحتاج إلى استشارة متخصصة؟ فريقنا من الخبراء جاهز للإجابة على أسئلتك 
              ومساعدتك في اختيار الحل الأمثل لمشروعك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                طلب استشارة مجانية
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="w-5 h-5" />
                اتصل بنا الآن
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

// Expert Card Component
function ExpertCard({ expert, onClick }: { expert: any, onClick: () => void }) {
  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Expert Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={expert.image}
          alt={expert.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Rating & Projects */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{expert.rating}</span>
          </div>
          <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {expert.projects}+ مشروع
          </div>
        </div>
      </div>

      {/* Expert Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {expert.name}
            </h3>
            <p className="text-primary font-medium text-sm">{expert.title}</p>
          </div>
          <div className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
            {expert.experience}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {expert.bio}
        </p>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expert.specialization.slice(0, 2).map((spec: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
              >
                {spec}
              </span>
            ))}
            {expert.specialization.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                +{expert.specialization.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Contact & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{expert.contact.location}</span>
          </div>
          <button className="text-primary hover:text-primary/80 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Expert List Item Component
function ExpertListItem({ expert, onClick }: { expert: any, onClick: () => void }) {
  return (
    <div 
      className="bg-card rounded-2xl border border-border hover:border-primary/30 p-6 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center gap-6">
        {/* Expert Image */}
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
          <img
            src={expert.image}
            alt={expert.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Expert Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
              <p className="text-primary font-medium">{expert.title} • {expert.position}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">الخبرة</div>
                <div className="font-bold">{expert.experience}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">المشاريع</div>
                <div className="font-bold">{expert.projects}+</div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">
            {expert.bio}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{expert.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{expert.contact.location}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {expert.specialization.slice(0, 3).map((spec: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <button className="text-primary hover:text-primary/80">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}