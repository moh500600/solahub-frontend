// app/technical-guide/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, ChevronDown, BookOpen, Download, 
  FileText, Video, Calculator, BarChart, Settings,
  Zap, Sun, Battery, Cpu, Home, Building, Factory,
  Thermometer, Wind, Droplets, Cloud, Globe, AlertCircle,
  CheckCircle, XCircle, Info, Clock, DollarSign,
  ArrowRight, Heart, Share2, Bookmark, Printer,
  Layers, Target, Shield, TrendingUp, Users,
  MessageSquare, Phone, Mail, Calendar, Award,
  Lightbulb, Wrench, Tool, Star, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

// نقل تعريف الفئات خارج المكون الرئيسي (في أعلى الملف)
const categories = [
  { 
    id: "all", 
    name: "جميع الأدلة", 
    icon: <BookOpen className="w-5 h-5" />, 
    count: 50,
    color: "from-blue-500 to-blue-600"
  },
  { 
    id: "basics", 
    name: "أساسيات الطاقة الشمسية", 
    icon: <Sun className="w-5 h-5" />, 
    count: 12,
    color: "from-yellow-500 to-orange-500"
  },
  { 
    id: "design", 
    name: "التصميم والتركيب", 
    icon: <Settings className="w-5 h-5" />, 
    count: 15,
    color: "from-purple-500 to-purple-600"
  },
  { 
    id: "components", 
    name: "مكونات الأنظمة", 
    icon: <Cpu className="w-5 h-5" />, 
    count: 10,
    color: "from-green-500 to-green-600"
  },
  { 
    id: "maintenance", 
    name: "الصيانة والسلامة", 
    icon: <Wrench className="w-5 h-5" />, 
    count: 8,
    color: "from-red-500 to-red-600"
  },
  { 
    id: "calculation", 
    name: "الحسابات التقنية", 
    icon: <Calculator className="w-5 h-5" />, 
    count: 7,
    color: "from-cyan-500 to-cyan-600"
  },
  { 
    id: "projects", 
    name: "دراسة المشاريع", 
    icon: <Building className="w-5 h-5" />, 
    count: 8,
    color: "from-indigo-500 to-indigo-600"
  }
];

// أنواع الأنظمة
const systemTypes = [
  { type: "residential", name: "منزلي", icon: <Home className="w-4 h-4" /> },
  { type: "commercial", name: "تجاري", icon: <Building className="w-4 h-4" /> },
  { type: "industrial", name: "صناعي", icon: <Factory className="w-4 h-4" /> },
  { type: "agricultural", name: "زراعي", icon: <Droplets className="w-4 h-4" /> }
];

// مستويات الصعوبة
const difficultyLevels = [
  { level: "beginner", name: "مبتدئ", color: "bg-green-500" },
  { level: "intermediate", name: "متوسط", color: "bg-yellow-500" },
  { level: "advanced", name: "متقدم", color: "bg-red-500" }
];

// الدليل التقني
const guides = [
  {
    id: 1,
    title: "الدليل الشامل لأنظمة الطاقة الشمسية المنزلية",
    category: "basics",
    description: "دليل شامل يشرح مكونات النظام الشمسي المنزلي وكيفية عمله من الألف إلى الياء",
    difficulty: "beginner",
    duration: "15 دقيقة",
    author: "فريق سولار تيك",
    views: 12450,
    rating: 4.8,
    downloads: 3250,
    updated: "2024-01-15",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800",
    content: {
      sections: 5,
      videos: 3,
      calculators: 2,
      files: 5
    },
    tags: ["أنظمة منزلية", "توفير الطاقة", "تركيب", "مبتدئ"]
  },
  {
    id: 2,
    title: "كيفية حساب احتياجات الطاقة الشمسية",
    category: "calculation",
    description: "دليل عملي لحساب احتياجات الطاقة وتصميم النظام الشمسي المناسب",
    difficulty: "intermediate",
    duration: "25 دقيقة",
    author: "د. أحمد السديس",
    views: 8920,
    rating: 4.9,
    downloads: 2100,
    updated: "2024-01-10",
    coverImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800",
    content: {
      sections: 7,
      videos: 2,
      calculators: 5,
      files: 3
    },
    tags: ["حسابات", "تصميم", "تخطيط", "متوسط"]
  },
  {
    id: 3,
    title: "دليل صيانة الأنظمة الشمسية",
    category: "maintenance",
    description: "إجراءات الصيانة الدورية والكشف عن الأعطال وحلولها",
    difficulty: "intermediate",
    duration: "20 دقيقة",
    author: "م. محمد العتيبي",
    views: 7540,
    rating: 4.7,
    downloads: 1890,
    updated: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800",
    content: {
      sections: 6,
      videos: 4,
      calculators: 1,
      files: 4
    },
    tags: ["صيانة", "أعطال", "سلامة", "متوسط"]
  },
  {
    id: 4,
    title: "أنواع الألواح الشمسية ومقارنة الكفاءة",
    category: "components",
    description: "مقارنة شاملة بين أنواع الألواح الشمسية وكفاءتها في الظروف المختلفة",
    difficulty: "beginner",
    duration: "12 دقيقة",
    author: "م. سارة القحطاني",
    views: 10320,
    rating: 4.6,
    downloads: 2780,
    updated: "2024-01-12",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800",
    content: {
      sections: 4,
      videos: 3,
      calculators: 2,
      files: 6
    },
    tags: ["ألواح شمسية", "كفاءة", "مقارنة", "مبتدئ"]
  },
  {
    id: 5,
    title: "تصميم أنظمة الطاقة الشمسية للمصانع",
    category: "design",
    description: "دليل متخصص في تصميم الأنظمة الشمسية للمنشآت الصناعية الكبيرة",
    difficulty: "advanced",
    duration: "40 دقيقة",
    author: "م. فهد الرشيد",
    views: 4320,
    rating: 4.9,
    downloads: 1560,
    updated: "2024-01-08",
    coverImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800",
    content: {
      sections: 8,
      videos: 5,
      calculators: 3,
      files: 7
    },
    tags: ["صناعي", "تصميم", "متقدم", "مشاريع كبيرة"]
  },
  {
    id: 6,
    title: "دليل أنظمة تخزين الطاقة (البطاريات)",
    category: "components",
    description: "كل ما تحتاج معرفته عن بطاريات تخزين الطاقة وكيفية اختيارها",
    difficulty: "intermediate",
    duration: "18 دقيقة",
    author: "م. عمر الجهني",
    views: 6890,
    rating: 4.7,
    downloads: 1920,
    updated: "2024-01-03",
    coverImage: "https://images.unsplash.com/photo-1629654291660-3c98113a0438?auto=format&fit=crop&w=800",
    content: {
      sections: 5,
      videos: 2,
      calculators: 4,
      files: 3
    },
    tags: ["بطاريات", "تخزين", "أنظمة هجين", "متوسط"]
  },
  {
    id: 7,
    title: "التحليل المالي لمشاريع الطاقة الشمسية",
    category: "projects",
    description: "كيفية حساب العائد على الاستثمار وفترة الاسترداد للمشاريع الشمسية",
    difficulty: "intermediate",
    duration: "22 دقيقة",
    author: "أ. ليان الحربي",
    views: 5670,
    rating: 4.8,
    downloads: 1740,
    updated: "2024-01-18",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800",
    content: {
      sections: 6,
      videos: 3,
      calculators: 6,
      files: 4
    },
    tags: ["تحليل مالي", "استثمار", "عائد", "متوسط"]
  },
  {
    id: 8,
    title: "دليل المعايير والمواصفات الفنية",
    category: "design",
    description: "المعايير العالمية والمواصفات الفنية المطلوبة في الأنظمة الشمسية",
    difficulty: "advanced",
    duration: "30 دقيقة",
    author: "فريق الجودة",
    views: 3450,
    rating: 4.9,
    downloads: 1320,
    updated: "2024-01-20",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800",
    content: {
      sections: 7,
      videos: 4,
      calculators: 2,
      files: 8
    },
    tags: ["معايير", "مواصفات", "جودة", "متقدم"]
  }
];

// الأدوات الحسابية
const calculators = [
  {
    id: 1,
    title: "حاسبة احتياجات الطاقة",
    description: "احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك الحالي",
    icon: <Calculator className="w-6 h-6" />,
    category: "calculation"
  },
  {
    id: 2,
    title: "حاسبة العائد على الاستثمار",
    description: "احسب فترة استرداد رأس المال والعائد السنوي لمشروعك",
    icon: <DollarSign className="w-6 h-6" />,
    category: "projects"
  },
  {
    id: 3,
    title: "حاسبة مساحة الأسطح",
    description: "حدد المساحة المطلوبة لتركيب الألواح الشمسية",
    icon: <Home className="w-6 h-6" />,
    category: "design"
  },
  {
    id: 4,
    title: "حاسبة توفير الفواتير",
    description: "احسب مقدار التوفير المتوقع في فواتير الكهرباء",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "projects"
  }
];

// الفيديوهات التعليمية
const videos = [
  {
    id: 1,
    title: "كيف تعمل الطاقة الشمسية",
    duration: "5:30",
    views: "25K",
    category: "basics"
  },
  {
    id: 2,
    title: "خطوات تركيب النظام الشمسي",
    duration: "8:15",
    views: "18K",
    category: "design"
  },
  {
    id: 3,
    title: "صيانة الألواح الشمسية",
    duration: "6:45",
    views: "12K",
    category: "maintenance"
  },
  {
    id: 4,
    title: "اختيار العاكس المناسب",
    duration: "7:20",
    views: "15K",
    category: "components"
  }
];

// Guide Card Component - قبل المكون الرئيسي
function GuideCard({ 
  guide, 
  isBookmarked, 
  onBookmark, 
  onClick, 
  onDownload,
  onShare 
}: { 
  guide: any; 
  isBookmarked: boolean; 
  onBookmark: () => void;
  onClick: () => void;
  onDownload: () => void;
  onShare: () => void;
}) {
  const category = categories.find(c => c.id === guide.category);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
      {/* Guide Image */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category & Difficulty */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {category && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm"
              style={{ background: `linear-gradient(135deg, ${category.color})` }}
            >
              {category.name}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            guide.difficulty === "beginner" ? "bg-green-500/90 text-white" :
            guide.difficulty === "intermediate" ? "bg-yellow-500/90 text-white" :
            "bg-red-500/90 text-white"
          }`}>
            {difficultyLevels.find(l => l.level === guide.difficulty)?.name}
          </span>
        </div>
        
        {/* Stats */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{(guide.views / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{(guide.downloads / 1000).toFixed(1)}K</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>{guide.rating}</span>
          </div>
        </div>
      </div>

      {/* Guide Info */}
      <div className="p-6">
        <div className="mb-4 cursor-pointer" onClick={onClick}>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {guide.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {guide.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{guide.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{guide.content.sections} قسم</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {guide.tags.slice(0, 2).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {guide.tags.length > 2 && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                +{guide.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title={isBookmarked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="مشاركة"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Eye className="w-4 h-4" />
              معاينة
            </Button>
            <Button
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
            >
              <Download className="w-4 h-4" />
              تنزيل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Guide List Item Component - قبل المكون الرئيسي
function GuideListItem({ 
  guide, 
  isBookmarked, 
  onBookmark, 
  onClick,
  onDownload 
}: { 
  guide: any; 
  isBookmarked: boolean; 
  onBookmark: () => void;
  onClick: () => void;
  onDownload: () => void;
}) {
  const category = categories.find(c => c.id === guide.category);

  return (
    <div 
      className="bg-card rounded-2xl border border-border hover:border-primary/30 p-6 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-start gap-6">
        {/* Guide Image */}
        <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Guide Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {category && (
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${category.color})` }}
                  >
                    {category.name}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  guide.difficulty === "beginner" ? "bg-green-500/10 text-green-700" :
                  guide.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-700" :
                  "bg-red-500/10 text-red-700"
                }`}>
                  {difficultyLevels.find(l => l.level === guide.difficulty)?.name}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1 cursor-pointer hover:text-primary transition-colors">
                {guide.title}
              </h3>
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {guide.description}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{guide.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{(guide.views / 1000).toFixed(1)}K مشاهدة</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>{(guide.downloads / 1000).toFixed(1)}K تحميل</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{guide.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                معاينة
              </Button>
              <Button
                size="sm"
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload();
                }}
              >
                <Download className="w-4 h-4" />
                تنزيل
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// المكون الرئيسي
export default function TechnicalGuidePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // تصفية الأدلة
  const filteredGuides = guides.filter(guide => {
    const matchesCategory = activeCategory === "all" || guide.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // إضافة/إزالة من المفضلة
  const toggleBookmark = (guideId: number) => {
    setBookmarks(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  // عرض تفاصيل الدليل
  const showGuideDetails = (guide: any) => {
    setSelectedGuide(guide);
  };

  // إغلاق التفاصيل
  const closeGuideDetails = () => {
    setSelectedGuide(null);
  };

  // تنزيل الدليل
  const downloadGuide = (guide: any) => {
    // في التطبيق الحقيقي، هنا سيتم تحميل الملف
    console.log(`Downloading guide: ${guide.title}`);
    alert(`جاري تحميل دليل "${guide.title}"`);
  };

  // مشاركة الدليل
  const shareGuide = (guide: any) => {
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط الدليل");
    }
  };

  // الإحصائيات
  const stats = {
    totalGuides: guides.length,
    totalViews: guides.reduce((sum, guide) => sum + guide.views, 0),
    totalDownloads: guides.reduce((sum, guide) => sum + guide.downloads, 0),
    averageRating: (guides.reduce((sum, guide) => sum + guide.rating, 0) / guides.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Cpath d='M30 5a25 25 0 1 1 0 50 25 25 0 0 1 0-50z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  مكتبة المعرفة التقنية
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  دليلك <span className="text-primary">التقني الشامل</span> للطاقة الشمسية
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  اكتشف مكتبتنا الشاملة من الأدلة التقنية، الحاسبات، والفيديوهات التعليمية 
                  التي تساعدك على فهم وتصميم وتنفيذ مشاريع الطاقة الشمسية بثقة.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{stats.totalGuides}+</div>
                  <div className="text-sm text-muted-foreground">دليل تقني</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">
                    {(stats.totalViews / 1000).toFixed(1)}K
                  </div>
                  <div className="text-sm text-muted-foreground">مشاهدة</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">
                    {(stats.totalDownloads / 1000).toFixed(1)}K
                  </div>
                  <div className="text-sm text-muted-foreground">تحميل</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-primary">{stats.averageRating}</div>
                  <div className="text-sm text-muted-foreground">تقييم</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ابدأ رحلتك الآن</h3>
                    <p className="text-muted-foreground">اختر مسار التعلم المناسب لك</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: <Sun className="w-5 h-5" />, text: "مبتدئ: تعرف على الأساسيات" },
                    { icon: <Settings className="w-5 h-5" />, text: "متوسط: تعلم التصميم والتركيب" },
                    { icon: <Target className="w-5 h-5" />, text: "متقدم: احتراف المشاريع الكبيرة" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 cursor-pointer">
                      {item.icon}
                      <span>{item.text}</span>
                      <ArrowRight className="w-4 h-4 mr-auto text-muted-foreground" />
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6 gap-2">
                  <BookOpen className="w-5 h-5" />
                  ابدأ التعلم المجاني
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-0 z-30 bg-card border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في الأدلة التقنية، الفيديوهات، أو الحاسبات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
              
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                المزيد من الفلاتر
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">الفئات:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all min-w-fit ${
                    activeCategory === category.id
                      ? "text-white shadow-lg"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  style={activeCategory === category.id ? {
                    background: `linear-gradient(135deg, ${category.color})`
                  } : {}}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">نوع النظام</div>
              <div className="flex flex-wrap gap-2">
                {systemTypes.map((system) => (
                  <button
                    key={system.type}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm hover:bg-muted/80"
                  >
                    {system.icon}
                    <span>{system.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">مستوى الصعوبة</div>
              <div className="flex gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.level}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${level.color} text-white`}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span>{level.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">نوع المحتوى</div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm">
                  <FileText className="w-4 h-4" />
                  أدلة
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm">
                  <Video className="w-4 h-4" />
                  فيديوهات
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm">
                  <Calculator className="w-4 h-4" />
                  حاسبات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="container">
          {/* Tools Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">أدوات وحاسبات</h2>
                <p className="text-muted-foreground">استخدم أدواتنا التفاعلية لحساب احتياجات مشروعك</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Calculator className="w-4 h-4" />
                جميع الأدوات
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculators.map((calc) => (
                <div key={calc.id} className="group">
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      {calc.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{calc.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Calculator className="w-4 h-4" />
                      فتح الأداة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Guides */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">الأدلة التقنية</h2>
                <p className="text-muted-foreground">
                  {filteredGuides.length} دليل متاح
                  {activeCategory !== "all" && ` في ${categories.find(c => c.id === activeCategory)?.name}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bookmark className="w-4 h-4" />
                  <span>{bookmarks.length} مفضلة</span>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  تنزيل الكل
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <GuideCard
                    key={guide.id}
                    guide={guide}
                    isBookmarked={bookmarks.includes(guide.id)}
                    onBookmark={() => toggleBookmark(guide.id)}
                    onClick={() => showGuideDetails(guide)}
                    onDownload={() => downloadGuide(guide)}
                    onShare={() => shareGuide(guide)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGuides.map((guide) => (
                  <GuideListItem
                    key={guide.id}
                    guide={guide}
                    isBookmarked={bookmarks.includes(guide.id)}
                    onBookmark={() => toggleBookmark(guide.id)}
                    onClick={() => showGuideDetails(guide)}
                    onDownload={() => downloadGuide(guide)}
                  />
                ))}
              </div>
            )}

            {filteredGuides.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground mb-6">
                  لم نعثر على أدلة تطابق معايير البحث
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  عرض جميع الأدلة
                </Button>
              </div>
            )}
          </div>

          {/* Video Tutorials */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">فيديوهات تعليمية</h2>
                <p className="text-muted-foreground">شاهد وتعلم من خلال الفيديوهات التوضيحية</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Video className="w-4 h-4" />
                جميع الفيديوهات
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="group">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all">
                    <div className="relative h-40 bg-gray-200 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-primary ml-1" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{video.views} مشاهدة</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          {categories.find(c => c.id === video.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Guide Details Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedGuide.difficulty === "beginner" ? "bg-green-500/10 text-green-700" :
                      selectedGuide.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-700" :
                      "bg-red-500/10 text-red-700"
                    }`}>
                      {difficultyLevels.find(l => l.level === selectedGuide.difficulty)?.name}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {categories.find(c => c.id === selectedGuide.category)?.name}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedGuide.title}</h2>
                </div>
                <button
                  onClick={closeGuideDetails}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              {/* Cover Image */}
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedGuide.coverImage}
                  alt={selectedGuide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedGuide.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{selectedGuide.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedGuide.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    آخر تحديث: {selectedGuide.updated}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">وصف الدليل</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedGuide.description}
                    </p>
                  </div>

                  {/* Content Overview */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">محتويات الدليل</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedGuide.content.sections}
                        </div>
                        <div className="text-sm text-muted-foreground">قسم</div>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedGuide.content.videos}
                        </div>
                        <div className="text-sm text-muted-foreground">فيديو</div>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedGuide.content.calculators}
                        </div>
                        <div className="text-sm text-muted-foreground">آلة حاسبة</div>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedGuide.content.files}
                        </div>
                        <div className="text-sm text-muted-foreground">ملف</div>
                      </div>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">جدول المحتويات</h3>
                    <div className="space-y-3">
                      {[
                        "مقدمة عن الطاقة الشمسية",
                        "مكونات النظام الأساسية",
                        "كيفية اختيار المكونات",
                        "حساب الاحتياجات",
                        "خطوات التركيب",
                        "الصيانة الدورية"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                            {idx + 1}
                          </div>
                          <span>{item}</span>
                          <Clock className="w-4 h-4 ml-auto text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">5 دقائق</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Author Info */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">مؤلف الدليل</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold">{selectedGuide.author}</div>
                        <div className="text-sm text-muted-foreground">خبير الطاقة الشمسية</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button className="w-full gap-2" onClick={() => downloadGuide(selectedGuide)}>
                      <Download className="w-5 h-5" />
                      تنزيل الدليل كـ PDF
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={() => toggleBookmark(selectedGuide.id)}>
                      <Bookmark className={`w-5 h-5 ${bookmarks.includes(selectedGuide.id) ? 'fill-current' : ''}`} />
                      {bookmarks.includes(selectedGuide.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={() => shareGuide(selectedGuide)}>
                      <Share2 className="w-5 h-5" />
                      مشاركة الدليل
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Printer className="w-5 h-5" />
                      طباعة الدليل
                    </Button>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">الكلمات المفتاحية</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuide.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related Guides */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">أدلة ذات صلة</h3>
                    <div className="space-y-3">
                      {guides
                        .filter(g => g.category === selectedGuide.category && g.id !== selectedGuide.id)
                        .slice(0, 2)
                        .map((guide) => (
                          <div
                            key={guide.id}
                            className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => showGuideDetails(guide)}
                          >
                            <div className="font-bold text-sm mb-1 line-clamp-1">{guide.title}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{guide.duration}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{guide.rating}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path */}
      <div className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مسار التعلم الموصى به</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          اتبع هذه الخطوات لإتقان الطاقة الشمسية خطوة بخطوة
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 to-primary/10" />
              
              <div className="space-y-12">
                {[
                  {
                    step: "المرحلة ١",
                    title: "أساسيات الطاقة الشمسية",
                    description: "تعرف على مبادئ الطاقة الشمسية ومكونات النظام الأساسية",
                    guides: ["الدليل الشامل لأنظمة الطاقة الشمسية", "أنواع الألواح الشمسية"],
                    duration: "2 ساعة",
                    icon: <Sun className="w-6 h-6" />
                  },
                  {
                    step: "المرحلة ٢",
                    title: "التصميم والحسابات",
                    description: "تعلم كيفية حساب الاحتياجات وتصميم النظام المناسب",
                    guides: ["كيفية حساب احتياجات الطاقة الشمسية", "حاسبة مساحة الأسطح"],
                    duration: "3 ساعات",
                    icon: <Calculator className="w-6 h-6" />
                  },
                  {
                    step: "المرحلة ٣",
                    title: "التركيب والتنفيذ",
                    description: "إجراءات التركيب والتوصيل والاختبار",
                    guides: ["دليل تركيب الأنظمة الشمسية", "معايير السلامة في التركيب"],
                    duration: "4 ساعات",
                    icon: <Settings className="w-6 h-6" />
                  },
                  {
                    step: "المرحلة ٤",
                    title: "الصيانة والإدارة",
                    description: "صيانة النظام وإدارة الأداء والكشف عن الأعطال",
                    guides: ["دليل صيانة الأنظمة الشمسية", "مراقبة أداء النظام"],
                    duration: "2 ساعة",
                    icon: <Wrench className="w-6 h-6" />
                  },
                  {
                    step: "المرحلة ٥",
                    title: "المشاريع المتقدمة",
                    description: "تصميم وإدارة المشاريع الكبيرة والأنظمة الهجينة",
                    guides: ["تصميم أنظمة الطاقة الشمسية للمصانع", "أنظمة التخزين المتقدمة"],
                    duration: "5 ساعات",
                    icon: <Target className="w-6 h-6" />
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'} relative`}>
                      <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm text-primary font-bold">{item.step}</div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                          </div>
                          <div className="ml-auto px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {item.duration}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">الأدلة الموصى بها:</div>
                          {item.guides.map((guide, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                              <span>{guide}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Step Circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                        {index + 1}
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

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك التعليمية اليوم</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المحترفين والمهتمين الذين طوروا مهاراتهم في الطاقة الشمسية 
              من خلال أدلتنا التقنية الشاملة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                استعراض جميع الأدلة
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="w-5 h-5" />
                تنزيل المكتبة الكاملة
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                استشارة مع خبير
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}