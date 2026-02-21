import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Shield,
  ShieldCheck,
  Truck,
  Clock,
  Heart,
  Share2,
  ArrowRight,
  ShoppingCart,
  Check,
  Package,
  Users,
  FileText,
  ChevronDown,
  Award,
  Thermometer,
  Settings,
  BatteryCharging,
  MapPin,
  Calendar,
  DollarSign,
  Battery,
  PanelTop,
  Wind,
  Eye,
  Download,
  Phone,
  Mail,
  Building,
  Home,
  Factory,
  Store,
  School,
  ThermometerSun,
  Sun,
  Droplets
} from "lucide-react";

// بيانات وهمية للمشروع
const mockProjectDetail = (id: number) => {
  const baseProject = {
    id,
    name: "مشروع منزل سكني - الرياض",
    type: "residential",
    location: "الرياض - حي النخيل",
    address: "حي النخيل، شارع الملك فهد، الرياض 13521",
    budget: 1500000,
    capacity: 10,
    duration: 15,
    startDate: "2024-02-28",
    completedDate: "2024-03-15",
    rating: 4.9,
    reviewCount: 24,
    status: "completed",
    description: "تركيب نظام شمسي متكامل لمنزل سكني فاخر في الرياض. تم تصميم النظام لتحقيق أقصى قدر من الكفاءة والتوفير مع الحفاظ على الجماليات المعمارية للمنزل.",
    detailedDescription: `
      هذا المشروع يعد مثالاً رائعاً على كيفية دمج الطاقة الشمسية في المنازل السكنية الفاخرة. تم تنفيذ المشروع على مرحلتين:
      
      المرحلة الأولى: دراسة وتصميم
      - دراسة استهلاك الطاقة للمنزل لمدة 3 أشهر
      - تصميم النظام المناسب بناءً على الاحتياجات الفعلية
      - اختيار المعدات عالية الكفاءة
      - الحصول على التصاريح والموافقات اللازمة
      
      المرحلة الثانية: التنفيذ
      - تركيب 30 لوحاً شمسياً من نوع مونو كريستال بقدرة 400 واط لكل لوح
      - تركيب محول هجين بقدرة 8 كيلووات
      - تركيب نظام تخزين بأربع بطاريات ليثيوم
      - تركيب نظام مراقبة ذكي
      - اختبار وتشغيل النظام
      
      تم تنفيذ المشروع خلال 15 يوماً عمل مع الحفاظ على نظافة الموقع وعدم إزعاج سكان المنزل.
    `,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop",
        title: "المظهر العام بعد التركيب"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1622549037543-49cf7d34b3b8?w=1200&h=800&fit=crop",
        title: "الألواح الشمسية على السطح"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=1200&h=800&fit=crop",
        title: "غرفة المعدات والتحكم"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop",
        title: "نظام المراقبة والتحكم"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=1200&h=800&fit=crop",
        title: "الأداء والتوفير"
      }
    ],
    videos: [
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "جولة في المشروع قبل وبعد"
      },
      {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "شرح نظام المراقبة الذكي"
      }
    ],
    features: [
      "نظام 10 كيلووات بكفاءة عالية",
      "30 لوح شمسي مونو كريستال 400W",
      "محول هجين 8KW مع تقنية MPPT",
      "4 بطاريات ليثيوم للتخزين",
      "نظام مراقبة ذكي عبر التطبيق",
      "تحكم ذكي في الأحمال",
      "حماية متكاملة ضد الأعطال",
      "تصميم جمالي متناسق مع المنزل",
      "تركيب احترافي بضمان 10 سنوات",
      "دعم فني متواصل 24/7"
    ],
    specifications: {
      general: [
        { name: "نوع المشروع", value: "سكني" },
        { name: "القدرة الإجمالية", value: "10 كيلووات" },
        { name: "المساحة المستخدمة", value: "150 متر مربع" },
        { name: "فترة التنفيذ", value: "15 يوم عمل" },
        { name: "تاريخ البدء", value: "28 فبراير 2024" },
        { name: "تاريخ الانتهاء", value: "15 مارس 2024" }
      ],
      equipment: [
        { name: "الألواح الشمسية", value: "30 لوح × 400W = 12KW" },
        { name: "نوع الألواح", value: "مونو كريستال عالي الكفاءة" },
        { name: "المحول", value: "هجين 8KW مع MPPT" },
        { name: "الشركة المصنعة", value: "SunPower" },
        { name: "البطاريات", value: "4 بطاريات ليثيوم 5KWh" },
        { name: "نظام المراقبة", value: "ذكي مع تطبيق جوال" }
      ],
      performance: [
        { name: "الإنتاج اليومي", value: "50-60 كيلووات/ساعة" },
        { name: "الإنتاج الشهري", value: "1500-1800 كيلووات/ساعة" },
        { name: "الإنتاج السنوي", value: "18000 كيلووات/ساعة" },
        { name: "كفاءة النظام", value: "21.5%" },
        { name: "عمر النظام", value: "25+ سنة" },
        { name: "الضمان", value: "10 سنوات على المعدات" }
      ]
    },
    savings: {
      before: {
        monthlyBill: 1500,
        annualBill: 18000
      },
      after: {
        monthlyBill: 300,
        annualBill: 3600
      },
      monthlySavings: 1200,
      annualSavings: 14400,
      roi: 4.2,
      paybackPeriod: "4 سنوات و 3 أشهر",
      co2Reduction: "12 طن سنوياً"
    },
    client: {
      name: "عائلة أحمد السبيعي",
      type: "سكني",
      contact: "+966500123456",
      email: "ahmed@example.com",
      feedback: "مشروع ممتاز بكل المقاييس. فريق العمل كان محترفاً جداً، والتنفيذ تم في الوقت المحدد. خفض النظام فاتورة الكهرباء من 1500 ريال إلى 300 ريال فقط شهرياً. أنصح به بشدة لكل من يريد توفيراً حقيقياً في فواتير الكهرباء.",
      rating: 5,
      testimonial: "بعد تركيب النظام الشمسي، شعرنا براحة كبيرة وثقة في توفير الطاقة. النظام يعمل بكفاءة عالية، والتطبيق سهل الاستخدام لمتابعة الإنتاج والاستهلاك. شكراً لفريق العمل المتميز."
    },
    team: [
      { name: "المهندس محمد", role: "مدير المشروع", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "المهندس خالد", role: "مهندس كهرباء", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "الفني سعيد", role: "فني تركيب", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { name: "أحمد", role: "مشرف موقع", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop" }
    ],
    documents: [
      { name: "تصميم النظام", url: "https://example.com/design.pdf", type: "PDF" },
      { name: "جدول التنفيذ", url: "https://example.com/schedule.pdf", type: "PDF" },
      { name: "صور المشروع", url: "https://example.com/photos.zip", type: "ZIP" },
      { name: "شهادة الضمان", url: "https://example.com/warranty.pdf", type: "PDF" }
    ],
    challenges: [
      "محدودية المساحة على السطح",
      "ضرورة الحفاظ على الجماليات المعمارية",
      "توصيل التيار بدون انقطاع عن المنزل",
      "التأقلم مع الأحوال الجوية في الرياض"
    ],
    solutions: [
      "استخدام ألواح عالية الكفاءة لزيادة الإنتاج في مساحة أقل",
      "تصميم إطارات خاصة متناسقة مع لون السطح",
      "تنفيذ العمل على مراحل مع استخدام مولد احتياطي",
      "استخدام مواد مقاومة للحرارة والغبار"
    ]
  };

  // تعديل البيانات حسب ID
  switch (id) {
    case 1:
      return baseProject;
    case 2:
      return {
        ...baseProject,
        id: 2,
        name: "مصنع ألبان - جدة",
        type: "industrial",
        location: "جدة - المدينة الصناعية",
        address: "المدينة الصناعية الأولى، جدة 21434",
        budget: 4500000,
        capacity: 50,
        duration: 45,
        completedDate: "2024-02-28",
        description: "نظام شمسي متكامل لمصنع ألبان بقدرة 50 كيلووات. صمم خصيصاً لتحمل الأحمال الصناعية الثقيلة والتشغيل المستمر.",
        specifications: {
          ...baseProject.specifications,
          general: [
            { name: "نوع المشروع", value: "صناعي" },
            { name: "القدرة الإجمالية", value: "50 كيلووات" },
            { name: "المساحة المستخدمة", value: "600 متر مربع" },
            { name: "فترة التنفيذ", value: "45 يوم عمل" },
            { name: "تاريخ البدء", value: "15 يناير 2024" },
            { name: "تاريخ الانتهاء", value: "28 فبراير 2024" }
          ]
        }
      };
    case 3:
      return {
        ...baseProject,
        id: 3,
        name: "مركز تسوق - الدمام",
        type: "commercial",
        location: "الدمام - مركز الملك فهد",
        address: "مركز الملك فهد التجاري، الدمام 32241",
        budget: 3200000,
        capacity: 35,
        duration: 30,
        completedDate: "2024-01-20",
        description: "نظام طاقة شمسية لمركز تسوق كبير في الدمام. يوفر الطاقة للإضاءة والتكييف والمصاعد والمتاجر.",
        specifications: {
          ...baseProject.specifications,
          general: [
            { name: "نوع المشروع", value: "تجاري" },
            { name: "القدرة الإجمالية", value: "35 كيلووات" },
            { name: "المساحة المستخدمة", value: "450 متر مربع" },
            { name: "فترة التنفيذ", value: "30 يوم عمل" },
            { name: "تاريخ البدء", value: "21 ديسمبر 2023" },
            { name: "تاريخ الانتهاء", value: "20 يناير 2024" }
          ]
        }
      };
    default:
      return baseProject;
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id) : 1;
  const { isAuthenticated } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  // استخدام البيانات الوهمية
  const project = mockProjectDetail(projectId);
  const isLoading = false;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const budgetInSAR = (project.budget / 100).toFixed(0);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "residential": return <Home className="w-6 h-6" />;
      case "industrial": return <Factory className="w-6 h-6" />;
      case "commercial": return <Store className="w-6 h-6" />;
      case "educational": return <School className="w-6 h-6" />;
      case "agricultural": return <ThermometerSun className="w-6 h-6" />;
      case "mosque": return <Mosque className="w-6 h-6" />;
      case "medical": return <ShieldCheck className="w-6 h-6" />;
      default: return <Building className="w-6 h-6" />;
    }
  };

  const getProjectTypeName = (type: string) => {
    switch (type) {
      case "residential": return "سكني";
      case "industrial": return "صناعي";
      case "commercial": return "تجاري";
      case "educational": return "تعليمي";
      case "agricultural": return "زراعي";
      case "mosque": return "ديني";
      case "medical": return "طبي";
      default: return "عام";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل تفاصيل المشروع...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Building className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold mb-3">المشروع غير موجود</h3>
          <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على المشروع المطلوب</p>
          <Link href="/projects">
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <ArrowRight className="w-4 h-4" />
              العودة للمشاريع
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" className="hover:bg-muted/50 transition-all duration-200 gap-2">
                  <ArrowRight className="w-4 h-4" />
                  العودة للمشاريع
                </Button>
              </Link>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  {getProjectTypeIcon(project.type)}
                </div>
                <div>
                  <h1 className="text-lg font-bold line-clamp-1 max-w-xs">{project.name}</h1>
                  <p className="text-xs text-muted-foreground">{getProjectTypeName(project.type)} • {project.location}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Project Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Images Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative group bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden shadow-lg">
              {project.images && project.images.length > 0 ? (
                <>
                  <img
                    src={project.images[selectedImageIndex].imageUrl}
                    alt={project.name}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Image Title */}
                  {project.images[selectedImageIndex].title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white font-semibold">{project.images[selectedImageIndex].title}</p>
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? project.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === project.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md flex items-center gap-2 ${
                      project.status === "completed" 
                        ? "bg-green-500/20 text-green-700 border border-green-500/30" 
                        : "bg-yellow-500/20 text-yellow-700 border border-yellow-500/30"
                    }`}>
                      {project.status === "completed" ? (
                        <>
                          <Check className="w-4 h-4" />
                          مشروع مكتمل
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          قيد التنفيذ
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96 text-muted-foreground">
                  <Building className="w-12 h-12" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {project.images && project.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4">
                {project.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === idx 
                      ? "border-primary ring-2 ring-primary/30" 
                      : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={`صورة ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Info Section */}
          <div className="space-y-6">
            {/* Type & Location */}
            <div className="flex items-center gap-4 mb-2">
              <div className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                {getProjectTypeName(project.type)}
              </div>
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {project.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg mr-2">{project.rating}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">({project.reviewCount} تقييم)</span>
                </div>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>تم {new Date(project.completedDate).toLocaleDateString("ar-SA")}</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{project.capacity}KW</div>
                  <div className="text-sm text-muted-foreground">القدرة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{project.duration}</div>
                  <div className="text-sm text-muted-foreground">يوم تنفيذ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{budgetInSAR}</div>
                  <div className="text-sm text-muted-foreground">ر.س الميزانية</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{project.savings.annualSavings / 100}</div>
                  <div className="text-sm text-muted-foreground">ر.س توفير سنوي</div>
                </div>
              </div>
            </div>

            {/* Savings Comparison */}
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-2xl p-6 border border-green-500/20">
              <h3 className="font-bold text-lg mb-4 text-green-700">التوفير والاقتصاد</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">فاتورة الكهرباء قبل المشروع</span>
                  <span className="font-bold line-through text-muted-foreground">{project.savings.before.monthlyBill} ر.س/شهر</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">فاتورة الكهرباء بعد المشروع</span>
                  <span className="font-bold text-green-600">{project.savings.after.monthlyBill} ر.س/شهر</span>
                </div>
                <div className="pt-3 border-t border-green-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">التوفير الشهري</span>
                    <span className="font-bold text-green-700 text-lg">{project.savings.monthlySavings} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-semibold">التوفير السنوي</span>
                    <span className="font-bold text-green-700 text-lg">{project.savings.annualSavings} ر.س</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary gap-3">
                <Phone className="w-5 h-5" />
                طلب دراسة مشروع مماثل
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="w-4 h-4" />
                  مشاركة
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  تحميل التفاصيل
                </Button>
              </div>
            </div>

            {/* Client Info */}
            {project.client && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-bold text-lg mb-4">عميل المشروع</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{project.client.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{project.client.type}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {project.client.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {project.client.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-12">
          {/* Description Section */}
          <ExpandableSection
            title="تفاصيل المشروع"
            icon={<FileText className="w-5 h-5" />}
            isExpanded={expandedSection === "description"}
            onToggle={() => toggleSection("description")}
          >
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-4 whitespace-pre-line">
                {project.detailedDescription}
              </p>
            </div>
          </ExpandableSection>

          {/* Specifications Section */}
          <ExpandableSection
            title="المواصفات والمعدات"
            icon={<Settings className="w-5 h-5" />}
            isExpanded={expandedSection === "specifications"}
            onToggle={() => toggleSection("specifications")}
          >
            <div className="space-y-6">
              {Object.entries(project.specifications).map(([category, items]: [string, any]) => (
                <div key={category}>
                  <h4 className="font-bold text-lg mb-4">
                    {category === "general" && "المعلومات العامة"}
                    {category === "equipment" && "المعدات المستخدمة"}
                    {category === "performance" && "أداء النظام"}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {items.map((item: any, idx: number) => (
                      <div key={idx} className="bg-card p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground mb-1">{item.name}</div>
                        <div className="font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Team Section */}
          {project.team && (
            <ExpandableSection
              title="فريق العمل"
              icon={<Users className="w-5 h-5" />}
              isExpanded={expandedSection === "team"}
              onToggle={() => toggleSection("team")}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.team.map((member: any, idx: number) => (
                  <div key={idx} className="text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}

          {/* Challenges & Solutions */}
          <ExpandableSection
            title="التحديات والحلول"
            icon={<Shield className="w-5 h-5" />}
            isExpanded={expandedSection === "challenges"}
            onToggle={() => toggleSection("challenges")}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-4 text-red-600">التحديات</h4>
                <div className="space-y-3">
                  {project.challenges.map((challenge: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 font-bold">!</span>
                      </div>
                      <p className="text-muted-foreground">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-green-600">الحلول</h4>
                <div className="space-y-3">
                  {project.solutions.map((solution: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-muted-foreground">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Documents Section */}
          {project.documents && (
            <ExpandableSection
              title="الوثائق والمستندات"
              icon={<Download className="w-5 h-5" />}
              isExpanded={expandedSection === "documents"}
              onToggle={() => toggleSection("documents")}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {project.documents.map((doc: any, idx: number) => (
                  <a
                    key={idx}
                    href={doc.url}
                    download
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </ExpandableSection>
          )}

          {/* Client Testimonial */}
          {project.client && (
            <ExpandableSection
              title="شهادة العميل"
              icon={<Star className="w-5 h-5" />}
              isExpanded={expandedSection === "testimonial"}
              onToggle={() => toggleSection("testimonial")}
            >
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">{project.client.name}</p>
                    <p className="text-muted-foreground">{project.client.type}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < project.client.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6">
                  "{project.client.testimonial}"
                </blockquote>
                
                <div className="pt-6 border-t border-primary/20">
                  <p className="text-muted-foreground">{project.client.feedback}</p>
                </div>
              </div>
            </ExpandableSection>
          )}
        </div>

        {/* Related Projects */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">مشاريع مشابهة</h2>
            <Link href="/projects">
              <Button variant="outline" className="gap-2">
                عرض جميع المشاريع
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockProjects
              .filter(p => p.id !== project.id && p.type === project.type)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link key={relatedProject.id} href={`/project/${relatedProject.id}`}>
                  <div className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedProject.images[0].imageUrl}
                        alt={relatedProject.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary">
                        {relatedProject.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{relatedProject.location}</span>
                        <span>{relatedProject.capacity}KW</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{(relatedProject.budget / 100).toFixed(0)} ر.س</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {getProjectTypeName(relatedProject.type)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExpandableSection({
  title,
  icon,
  children,
  isExpanded,
  onToggle
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      
      {isExpanded && (
        <div className="p-6 border-t border-border animate-in fade-in">
          {children}
        </div>
      )}
    </div>
  );
}