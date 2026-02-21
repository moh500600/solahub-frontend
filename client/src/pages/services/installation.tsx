import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  Clock,
  Home,
  Building,
  Factory,
  MapPin,
  Users,
  Shield,
  Award,
  Truck,
  Wrench,
  Battery,
  PanelTop,
  Calculator,
  ArrowRight,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  TrendingUp,
  FileText,
  HelpCircle,
  X,
  Check,
  Package,
  Upload,
  Image,
  Video,
  User,
  Building2,
  Trees,
  Users as UsersIcon,
  ShoppingCart,
  Trash2,
  Eye,
  Target,
  Layers,
  Settings,
  Headphones,
  BatteryCharging,
  Cloud,
  Cpu,
  Smartphone,
  BarChart,
  FileCode,
  ClipboardCheck,
  Truck as TruckIcon,
  FileCheck,
  Server,
  Monitor
} from "lucide-react";

// استيراد المكونات المشتركة
import Header from "../Header";  // للخروج من electric-cars والعودة لمجلد pages
import Footer from "../Footer";  // للخروج من electric-cars والعودة لمجلد pages


export default function ProfessionalInstallation() {
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    propertyType: "house",
    roofType: "concrete",
    monthlyBill: "1000-2000",
    message: "",
    preferredDate: "",
    preferredTime: "morning",
    customerType: "individual",
    governorate: "",
    teamSize: "1",
    purchasedProduct: "yes",
    selectedProduct: "",
    engineers: [],
    repairItems: [],
    mediaFiles: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // أنواع العملاء
  const customerTypes = [
    {
      id: "individual",
      name: "عميل فردي",
      description: "فرد يريد تركيب نظام لمنزله",
      icon: <User className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "company",
      name: "شركة",
      description: "شركة أو مؤسسة تجارية",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "engineer",
      name: "مهندس",
      description: "مهندس أو مكتب استشاري",
      icon: <UsersIcon className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "farm",
      name: "صاحب مزرعة",
      description: "مشاريع زراعية أو مزارع",
      icon: <Trees className="w-6 h-6" />,
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: "government",
      name: "جهة حكومية",
      description: "مشاريع حكومية أو مؤسسات عامة",
      icon: <Building className="w-6 h-6" />,
      color: "from-red-500 to-orange-500"
    }
  ];

  // المحافظات
  const governorates = [
    "الرياض", "مكة المكرمة", "المدينة المنورة", "الشرقية", 
    "القصيم", "حائل", "تبوك", "الجوف", "الحدود الشمالية",
    "جازان", "نجران", "الباحة", "عسير"
  ];

  // المنتجات المباعة
  const purchasedProducts = [
    { id: "solar-panel-400", name: "لوح شمسي 400 واط", category: "solar-panels" },
    { id: "solar-panel-550", name: "لوح شمسي 550 واط", category: "solar-panels" },
    { id: "solar-panel-600", name: "لوح شمسي 600 واط", category: "solar-panels" },
    { id: "battery-5kw", name: "بطارية ليثيوم 5 كيلووات", category: "batteries" },
    { id: "battery-10kw", name: "بطارية ليثيوم 10 كيلووات", category: "batteries" },
    { id: "battery-3kw", name: "بطارية ليثيوم 3 كيلووات", category: "batteries" },
    { id: "inverter-3000", name: "عاكس كهربائي 3000 واط", category: "accessories" },
    { id: "mounting-system", name: "حامل ألواح شمسية", category: "accessories" },
    { id: "cable-10m", name: "كابل توصيل 10 متر", category: "accessories" },
    { id: "complete-system", name: "نظام متكامل", category: "packages" }
  ];

  // المهندسين المتاحين
  const availableEngineers = [
    { id: "eng1", name: "م. أحمد الشمري", specialty: "أنظمة الطاقة الشمسية", experience: "10 سنوات", rating: 4.9 },
    { id: "eng2", name: "م. محمد العتيبي", specialty: "تركيب وتصميم الأنظمة", experience: "8 سنوات", rating: 4.8 },
    { id: "eng3", name: "م. خالد الجبير", specialty: "بطاريات وتخزين الطاقة", experience: "12 سنوات", rating: 5.0 },
    { id: "eng4", name: "م. عبدالله الرشيد", specialty: "أنظمة المزارع والمساحات الكبيرة", experience: "15 سنوات", rating: 4.9 },
    { id: "eng5", name: "م. سلمان القحطاني", specialty: "الأنظمة التجارية والصناعية", experience: "9 سنوات", rating: 4.7 },
    { id: "eng6", name: "م. فيصل الحربي", specialty: "الصيانة والتصليح", experience: "7 سنوات", rating: 4.8 }
  ];

  // الأشياء التي تحتاج تصليح
  const repairItemsList = [
    { id: "panel-fix", name: "تصليح ألواح شمسية", icon: <PanelTop className="w-4 h-4" /> },
    { id: "battery-fix", name: "تصليح بطاريات", icon: <Battery className="w-4 h-4" /> },
    { id: "inverter-fix", name: "تصليح عاكس كهربائي", icon: <Zap className="w-4 h-4" /> },
    { id: "mount-fix", name: "تصليح حوامل التركيب", icon: <Wrench className="w-4 h-4" /> },
    { id: "cable-fix", name: "تصليح كابلات وتوصيلات", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "monitoring-fix", name: "تصليح نظام مراقبة", icon: <Eye className="w-4 h-4" /> },
    { id: "full-maintenance", name: "صيانة شاملة للنظام", icon: <Shield className="w-4 h-4" /> },
    { id: "installation-check", name: "فحص وتعديل التركيب", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  // باقات التركيب
  const installationPackages = [
    {
      id: "basic",
      name: "الباقة الذهبية",
      price: "8,500",
      description: "حلول مبتكرة للمنازل الذكية",
      features: [
        "تصميم ثلاثي الأبعاد للموقع",
        "تركيب ألواح مونو كريستال عالية الكفاءة",
        "نظام مراقبة أساسي عبر الجوال",
        "ضمان أداء 25 سنة على الألواح",
        "تدريب شامل على التشغيل",
        "دعم فني لمدة 12 شهر"
      ],
      excluded: [
        "نظام تخزين الطاقة",
        "تصميم هندسي تفصيلي",
        "نظام مراقبة متقدم"
      ],
      bestFor: ["الفلل الفاخرة", "المباني السكنية", "المكاتب الصغيرة"],
      icon: <Award className="w-6 h-6" />,
      color: "from-yellow-500 to-amber-500",
      duration: "3-5 أيام"
    },
    {
      id: "standard",
      name: "الباقة البلاتينية",
      price: "15,000",
      description: "حلول متكاملة للمشاريع التجارية",
      features: [
        "كل مزايا الباقة الذهبية",
        "نظام تخزين ليثيوم 5KW",
        "تصميم هندسي معتمد",
        "مراقبة ذكية عن بعد",
        "ضمان شامل 5 سنوات",
        "صيانة دورية لمدة عام",
        "تقارير أداء شهرية",
        "دعم فني 24/7"
      ],
      excluded: [
        "التركيبات الصناعية الكبيرة",
        "أنظمة الطاقة الهجينة"
      ],
      bestFor: ["المراكز التجارية", "المستشفيات", "المدارس", "المجمعات السكنية"],
      icon: <Shield className="w-6 h-6" />,
      color: "from-gray-400 to-gray-600",
      duration: "5-7 أيام",
      popular: true
    },
    {
      id: "premium",
      name: "الباقة الماسية",
      price: "30,000",
      description: "حلول احترافية للمشاريع الكبرى",
      features: [
        "كل مزايا الباقة البلاتينية",
        "نظام تخزين متطور 10KW",
        "تصميم هندسي تفصيلي",
        "نظام إدارة الطاقة الذكي",
        "ضمان شامل 10 سنوات",
        "صيانة مجانية 3 سنوات",
        "تدريب متقدم للطاقم",
        "نظام مراقبة ذكي متكامل",
        "تحديثات برمجية مجانية",
        "دعم فني مخصص"
      ],
      excluded: [],
      bestFor: ["المصانع الكبرى", "المدن الصناعية", "المشاريع الحكومية", "المنتجعات الفندقية"],
      icon: <DiamondIcon className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
      duration: "7-10 أيام"
    }
  ];

  // مراحل العمل
  const workflowSteps = [
    {
      step: 1,
      title: "التقييم والتحليل",
      description: "نقوم بزيارة موقعك وإجراء دراسة شاملة للجدوى الفنية والاقتصادية",
      duration: "1-2 أيام",
      icon: <Target className="w-8 h-8" />,
      details: [
        "قياس زوايا السقف والإشعاع الشمسي",
        "تحليل استهلاك الطاقة الحالي",
        "دراسة الظل والتوجيه الأمثل",
        "تحديد السعة المناسبة للنظام"
      ]
    },
    {
      step: 2,
      title: "التصميم والموافقات",
      description: "تصميم نظام متكامل ثلاثي الأبعاد مع الحصول على جميع التصاريح الرسمية",
      duration: "3-5 أيام",
      icon: <Layers className="w-8 h-8" />,
      details: [
        "تصميم ثلاثي الأبعاد للنظام",
        "تقديم طلبات التصاريح الحكومية",
        "حساب الأحمال والكابلات",
        "إعداد مخططات التركيب التفصيلية"
      ]
    },
    {
      step: 3,
      title: "التركيب والتجهيز",
      description: "تركيب النظام بأعلى معايير الجودة والسلامة باستخدام أحدث التقنيات",
      duration: "2-5 أيام",
      icon: <Settings className="w-8 h-8" />,
      details: [
        "تركيب حوامل الألواح الشمسية",
        "تركيب الألواح والربط الكهربائي",
        "تركيب أنظمة التخزين والمحولات",
        "فحص شامل للسلامة والجودة"
      ]
    },
    {
      step: 4,
      title: "الاختبار والتسليم",
      description: "اختبار النظام وضبط الإعدادات وتدريب العميل على التشغيل والصيانة",
      duration: "1-2 أيام",
      icon: <ClipboardCheck className="w-8 h-8" />,
      details: [
        "اختبار النظام تحت ظروف تشغيل كاملة",
        "ضبط إعدادات النظام الأمثل",
        "تدريب العميل على التشغيل",
        "تسليم جميع الوثائق والضمانات"
      ]
    }
  ];

  // ميزات التركيب الاحترافي
  const installationFeatures = [
    {
      id: "smart-design",
      title: "تصميم ذكي ثلاثي الأبعاد",
      description: "استخدام أحدث برامج المحاكاة لتصميم ثلاثي الأبعاد يضمن أقصى استفادة من الطاقة الشمسية",
      icon: <Cpu className="w-10 h-10" />,
      color: "from-purple-500 to-pink-500",
      details: [
        "برامج محاكاة متقدمة",
        "نمذجة ثلاثية الأبعاد",
        "تحليل الظل الدقيق",
        "تحديد زوايا التركيب المثلى"
      ]
    },
    {
      id: "ai-monitoring",
      title: "مراقبة ذكية بالذكاء الاصطناعي",
      description: "أنظمة مراقبة ذكية تتنبأ بالمشاكل قبل وقوعها وتقترح الحلول التلقائية",
      icon: <BrainIcon className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      details: [
        "تحليل تنبؤي للأداء",
        "تنبيهات ذكية للأعطال",
        "تقارير أداء تلقائية",
        "إدارة الطاقة الذكية"
      ]
    },
    {
      id: "quality-control",
      title: "مراقبة جودة احترافية",
      description: "نظام متكامل لمراقبة الجودة في كل مرحلة من مراحل التركيب",
      icon: <Shield className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      details: [
        "فحص المواد قبل التركيب",
        "مراقبة خطوط الإنتاج",
        "اختبارات الجودة الشاملة",
        "شهادات مطابقة عالمية"
      ]
    },
    {
      id: "tech-support",
      title: "دعم فني متقدم",
      description: "دعم فني متخصص على مدار الساعة مع تقنيات الاتصال الحديثة",
      icon: <Headphones className="w-10 h-10" />,
      color: "from-orange-500 to-red-500",
      details: [
        "دعم فني 24/7",
        "اتصال مرئي مباشر",
        "تحكم عن بعد",
        "فريق دعم متخصص"
      ]
    },
    {
      id: "smart-battery",
      title: "نظم تخزين ذكية",
      description: "أنظمة تخزين متطورة مع إدارة ذكية للطاقة لضمان الاستدامة",
      icon: <BatteryCharging className="w-10 h-10" />,
      color: "from-yellow-500 to-amber-500",
      details: [
        "بطاريات ليثيوم متطورة",
        "إدارة ذكية للشحن",
        "حماية متقدمة",
        "تحكم ذكي بالطاقة"
      ]
    },
    {
      id: "cloud-management",
      title: "إدارة سحابية متكاملة",
      description: "منصة سحابية متكاملة لإدارة وتتبع أداء النظام من أي مكان",
      icon: <Cloud className="w-10 h-10" />,
      color: "from-indigo-500 to-blue-500",
      details: [
        "منصة إدارة سحابية",
        "تتبع الأداء عن بعد",
        "تقارير مفصلة",
        "إشعارات ذكية"
      ]
    }
  ];

  // تقنيات متقدمة
  const advancedTechnologies = [
    {
      name: "أنظمة IoT الذكية",
      description: "أجهزة استشعار ذكية تتابع أداء النظام لحظياً",
      icon: <Server className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "التحليل التنبؤي",
      description: "توقع الأداء المستقبلي باستخدام الذكاء الاصطناعي",
      icon: <BarChart className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "التقارير الذكية",
      description: "تقارير أداء مفصلة مع تحليلات ذكية",
      icon: <FileCode className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "التحكم الذكي",
      description: "تحكم كامل في النظام عبر التطبيق الذكي",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  // فريق العمل الاحترافي
  const professionalTeam = [
    {
      role: "مهندس تصميم",
      description: "متخصص في تصميم أنظمة الطاقة الشمسية",
      icon: <Calculator className="w-8 h-8" />,
      count: "15+ مهندس"
    },
    {
      role: "فني تركيب",
      description: "فنيون معتمدون في تركيب الأنظمة",
      icon: <Wrench className="w-8 h-8" />,
      count: "30+ فني"
    },
    {
      role: "دعم فني",
      description: "متخصصون في الدعم والصيانة",
      icon: <Headphones className="w-8 h-8" />,
      count: "10+ مختص"
    },
    {
      role: "إدارة الجودة",
      description: "فرق مراقبة الجودة والسلامة",
      icon: <Shield className="w-8 h-8" />,
      count: "5+ مختص"
    }
  ];

  // خطوات التنقل
  const steps = [
    { id: 1, name: "احجز خدمة التركيب", icon: <Calendar className="w-5 h-5" /> },
    { id: 2, name: "اختر الباقة المناسبة", icon: <Package className="w-5 h-5" /> },
    { id: 3, name: "كيف نعمل معك", icon: <Clock className="w-5 h-5" /> },
    { id: 4, name: "ميزات التركيب", icon: <Star className="w-5 h-5" /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomerTypeSelect = (typeId) => {
    setFormData(prev => ({
      ...prev,
      customerType: typeId
    }));
  };

  const handleEngineerSelect = (engineerId) => {
    setFormData(prev => {
      const currentEngineers = [...prev.engineers];
      if (currentEngineers.includes(engineerId)) {
        return { ...prev, engineers: currentEngineers.filter(id => id !== engineerId) };
      } else {
        return { ...prev, engineers: [...currentEngineers, engineerId] };
      }
    });
  };

  const handleRepairItemSelect = (itemId) => {
    setFormData(prev => {
      const currentItems = [...prev.repairItems];
      if (currentItems.includes(itemId)) {
        return { ...prev, repairItems: currentItems.filter(id => id !== itemId) };
      } else {
        return { ...prev, repairItems: [...currentItems, itemId] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      url: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newFiles.map(f => f.id)]
    }));
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter(id => id !== fileId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          location: "",
          propertyType: "house",
          roofType: "concrete",
          monthlyBill: "1000-2000",
          message: "",
          preferredDate: "",
          preferredTime: "morning",
          customerType: "individual",
          governorate: "",
          teamSize: "1",
          purchasedProduct: "yes",
          selectedProduct: "",
          engineers: [],
          repairItems: [],
          mediaFiles: []
        });
        setUploadedFiles([]);
        setCurrentStep(2);
      }, 5000);
    }, 2000);
  };

  const selectedPackageData = installationPackages.find(p => p.id === selectedPackage);

  const totalCost = () => {
    let base = parseInt(selectedPackageData.price.replace(/,/g, ''));
    let additional = 0;
    
    if (formData.teamSize === "2") additional += 2000;
    if (formData.teamSize === "3") additional += 3500;
    if (formData.teamSize === "4+") additional += 5000;
    
    additional += formData.engineers.length * 1000;
    
    return (base + additional).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/5">
      <Header />

      {/* شريط التنقل المحسّن */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-lg">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white shadow-xl transform scale-105'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-md'
                  }`}
                >
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
                    currentStep === step.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-muted/50'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="font-semibold text-sm lg:text-base">{step.name}</span>
                  
                  {currentStep === step.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                الخطوة {currentStep} من {steps.length}
              </div>
              <div className="hidden md:block text-xs text-muted-foreground">
                التقدم: {Math.round((currentStep / steps.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* الخطوة 1: حجز خدمة التركيب */}
        {currentStep === 1 && (
          <section id="booking-form" className="py-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-sm font-bold mb-6 shadow-lg border border-primary/20 backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                  الخطوة الأولى - احجز خدمة التركيب الاحترافية
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  احجز خدمة التركيب المتكاملة
                </h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                  احصل على تقييم مجاني لمشروعك واختر من بين أفضل المهندسين المتخصصين لضمان تركيب احترافي لنظام الطاقة الشمسية الخاص بك
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-2xl border-2 border-primary/20">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">تم إرسال طلبك بنجاح! 🎉</h3>
                    <p className="text-muted-foreground mb-8">
                      سنتواصل معك خلال 24 ساعة لتأكيد الموعد وتفاصيل الخدمة.
                    </p>
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8"
                    >
                      <ArrowRight className="w-4 h-4" />
                      التالي: اختيار الباقة المناسبة
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold mb-8">معلومات الحجز والخدمة</h3>
                    
                    <div className="space-y-8">
                      {/* القسم 1: معلومات العميل */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <User className="w-6 h-6 text-primary" />
                          معلومات العميل الأساسية
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                              placeholder="أدخل اسمك الكامل"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">رقم الجوال *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                              placeholder="05XXXXXXXX"
                              required
                            />
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="example@email.com"
                          />
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-medium mb-2">المحافظة *</label>
                          <select
                            name="governorate"
                            value={formData.governorate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            required
                          >
                            <option value="">اختر المحافظة</option>
                            {governorates.map((gov) => (
                              <option key={gov} value={gov}>{gov}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-medium mb-2">موقع المشروع *</label>
                          <div className="relative">
                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                              placeholder="الحي - الشارع - رقم المبنى"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* القسم 2: نوع العميل */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <Building2 className="w-6 h-6 text-primary" />
                          اختر نوعك
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                          {customerTypes.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleCustomerTypeSelect(type.id)}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center group ${
                                formData.customerType === type.id
                                  ? 'border-primary bg-primary/5 shadow-lg'
                                  : 'border-border hover:border-primary/40 hover:bg-primary/5'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                                <div className="text-white">
                                  {type.icon}
                                </div>
                              </div>
                              <div className="font-bold mb-1">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                              {formData.customerType === type.id && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* القسم 3: المنتجات والخدمات */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <ShoppingCart className="w-6 h-6 text-primary" />
                          المنتجات والخدمات المطلوبة
                        </h4>
                        
                        <div className="space-y-6">
                          {/* هل اشتريت منتج من عندنا؟ */}
                          <div>
                            <label className="block text-sm font-medium mb-3">
                              هل اشتريت منتجاً من متجرنا سابقاً؟
                            </label>
                            <div className="flex gap-4">
                              <Button
                                type="button"
                                variant={formData.purchasedProduct === "yes" ? "default" : "outline"}
                                onClick={() => setFormData(prev => ({ ...prev, purchasedProduct: "yes" }))}
                                className="flex-1"
                              >
                                نعم، اشتريت منتجاً
                              </Button>
                              <Button
                                type="button"
                                variant={formData.purchasedProduct === "no" ? "default" : "outline"}
                                onClick={() => setFormData(prev => ({ ...prev, purchasedProduct: "no" }))}
                                className="flex-1"
                              >
                                لا، أريد شراء وتركيب
                              </Button>
                            </div>
                          </div>

                          {/* إذا نعم، اختيار المنتج */}
                          {formData.purchasedProduct === "yes" && (
                            <div>
                              <label className="block text-sm font-medium mb-2">اختر المنتج الذي اشتريته</label>
                              <select
                                name="selectedProduct"
                                value={formData.selectedProduct}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                              >
                                <option value="">اختر المنتج</option>
                                {purchasedProducts.map((product) => (
                                  <option key={product.id} value={product.id}>
                                    {product.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* الأشياء التي تحتاج تصليح */}
                          <div>
                            <label className="block text-sm font-medium mb-3">
                              ما هي الخدمات المطلوبة؟ (اختر كل ما ينطبق)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {repairItemsList.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => handleRepairItemSelect(item.id)}
                                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                                    formData.repairItems.includes(item.id)
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/40'
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg ${
                                    formData.repairItems.includes(item.id)
                                      ? 'bg-primary text-white'
                                      : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {item.icon}
                                  </div>
                                  <span className="text-sm font-medium text-right flex-1">{item.name}</span>
                                  {formData.repairItems.includes(item.id) && (
                                    <Check className="w-4 h-4 text-primary" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* القسم 4: اختيار المهندسين */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <UsersIcon className="w-6 h-6 text-primary" />
                          اختيار المهندسين والفرق
                        </h4>
                        
                        <div className="space-y-6">
                          {/* عدد الفرق */}
                          <div>
                            <label className="block text-sm font-medium mb-3">
                              كم فريق تركيب تفضل؟
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {["1", "2", "3", "4+"].map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, teamSize: size }))}
                                  className={`p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                                    formData.teamSize === size
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-border hover:border-primary/40'
                                  }`}
                                >
                                  <div className="font-bold text-lg">{size} فريق</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {size === "1" && "(فريق واحد)"}
                                    {size === "2" && "(فريقان)"}
                                    {size === "3" && "(ثلاث فرق)"}
                                    {size === "4+" && "(أربع فرق أو أكثر)"}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* اختيار المهندسين */}
                          <div>
                            <label className="block text-sm font-medium mb-3">
                              اختر المهندسين الذين تفضلهم (اختياري)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {availableEngineers.map((engineer) => (
                                <button
                                  key={engineer.id}
                                  type="button"
                                  onClick={() => handleEngineerSelect(engineer.id)}
                                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                                    formData.engineers.includes(engineer.id)
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/40'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                      <User className="w-5 h-5" />
                                    </div>
                                    {formData.engineers.includes(engineer.id) && (
                                      <Check className="w-5 h-5 text-primary" />
                                    )}
                                  </div>
                                  <div className="font-bold">{engineer.name}</div>
                                  <div className="text-sm text-muted-foreground mt-1">تخصص: {engineer.specialty}</div>
                                  <div className="text-xs text-muted-foreground mt-1">خبرة: {engineer.experience}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* القسم 5: رفع الصور والفيديوهات */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <Image className="w-6 h-6 text-primary" />
                          رفع صور أو فيديو للمكان
                        </h4>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium mb-3">
                              أضف صوراً أو فيديو للمساعدة في تقييم الموقع (اختياري)
                            </label>
                            <div 
                              className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 hover:bg-primary/5"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                              <div className="font-medium mb-2">اسحب وأفلت الملفات أو انقر للرفع</div>
                              <div className="text-sm text-muted-foreground">
                                يمكنك رفع صور JPG, PNG أو فيديو MP4, MOV (الحد الأقصى 50MB)
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                              />
                            </div>
                          </div>

                          {/* الملفات المرفوعة */}
                          {uploadedFiles.length > 0 && (
                            <div>
                              <label className="block text-sm font-medium mb-3">
                                الملفات المرفوعة ({uploadedFiles.length})
                              </label>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {uploadedFiles.map((file) => (
                                  <div key={file.id} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                                      {file.type === 'image' ? (
                                        <img 
                                          src={file.url} 
                                          alt={file.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                          <Video className="w-12 h-12 text-primary/50" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                      <div className="space-x-2">
                                        <Button
                                          type="button"
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => removeFile(file.id)}
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <div className="text-xs font-medium truncate">{file.name}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {file.type === 'image' ? 'صورة' : 'فيديو'} • {file.size} MB
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* القسم 6: معلومات إضافية */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <MessageSquare className="w-6 h-6 text-primary" />
                          معلومات إضافية
                        </h4>
                        
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">التاريخ المفضل للزيارة *</label>
                              <input
                                type="date"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">الوقت المفضل *</label>
                              <select
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                required
                              >
                                <option value="morning">صباحاً (8 ص - 12 م)</option>
                                <option value="afternoon">ظهراً (12 م - 4 ع)</option>
                                <option value="evening">مساءً (4 ع - 8 م)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">ملاحظات إضافية</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                              placeholder="أي معلومات إضافية تريد إضافتها عن الموقع أو الاحتياجات الخاصة..."
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* ملخص التكلفة الأولي */}
                      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                        <h4 className="text-xl font-bold mb-4">تقدير التكلفة الأولية</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>عدد الفرق المختارة:</span>
                            <span className="font-bold">{formData.teamSize === "4+" ? "4 فرق أو أكثر" : `${formData.teamSize} فريق`}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>عدد المهندسين المختارين:</span>
                            <span className="font-bold">{formData.engineers.length} مهندس</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>عدد الخدمات المطلوبة:</span>
                            <span className="font-bold">{formData.repairItems.length} خدمة</span>
                          </div>
                          <div className="pt-4 border-t">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>التكلفة الإضافية التقريبية:</span>
                              <span className="text-primary">
                                {(() => {
                                  let additional = 0;
                                  if (formData.teamSize === "2") additional += 2000;
                                  if (formData.teamSize === "3") additional += 3500;
                                  if (formData.teamSize === "4+") additional += 5000;
                                  additional += formData.engineers.length * 1000;
                                  return additional.toLocaleString();
                                })()} ر.س
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                              * هذه تكلفة إضافية أولية، سيتم تحديد السعر النهائي بعد زيارة الموقع
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* أزرار الإرسال */}
                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-14 text-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              جاري إرسال الطلب...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              إرسال طلب الخدمة الآن
                            </>
                          )}
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                          className="flex-1 gap-3 h-14 text-lg"
                        >
                          <ArrowRight className="w-5 h-5" />
                          التالي
                        </Button>
                      </div>

                      <p className="text-sm text-center text-muted-foreground">
                        بالضغط على الزر، أنت توافق على{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                          شروط الخدمة
                        </Link>
                        {' '}و{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                          سياسة الخصوصية
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 2: اختيار الباقة المناسبة */}
        {currentStep === 2 && (
          <section className="py-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-sm font-bold mb-6 shadow-lg border border-primary/20 backdrop-blur-sm">
                <Package className="w-5 h-5" />
                الخطوة الثانية - اختر الباقة الاحترافية المناسبة
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                باقات تركيب احترافية
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                اختر من بين باقاتنا المتخصصة المصممة لتلبية احتياجاتك بدقة مع ضمان أعلى مستويات الجودة والأداء
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {installationPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`relative bg-gradient-to-b from-card to-card/80 rounded-2xl border-2 p-8 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px] group overflow-hidden ${
                    selectedPackage === pkg.id
                      ? 'border-primary shadow-2xl'
                      : 'border-border/50 hover:border-primary/40'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white px-8 py-2 rounded-full text-sm font-bold shadow-2xl animate-pulse">
                        ⭐ الأكثر طلباً
                      </div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${pkg.color} mb-6 shadow-xl`}>
                        <div className="text-white">
                          {pkg.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3">{pkg.name}</h3>
                      <p className="text-muted-foreground mb-6">{pkg.description}</p>
                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          {pkg.price}
                        </span>
                        <span className="text-muted-foreground text-lg">ر.س</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        {pkg.duration}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          المميزات الأساسية:
                        </h4>
                        <ul className="space-y-3">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 group/item">
                              <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-green-500" />
                              </div>
                              <span className="text-sm leading-relaxed group-hover/item:text-primary transition-colors">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {pkg.excluded.length > 0 && (
                        <div>
                          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-600">
                            <X className="w-5 h-5 text-red-500" />
                            غير متضمن:
                          </h4>
                          <ul className="space-y-3">
                            {pkg.excluded.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-red-600/80">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-bold text-lg mb-4">الأنسب لـ:</h4>
                        <div className="flex flex-wrap gap-2">
                          {pkg.bestFor.map((item, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm border border-primary/20 hover:bg-primary/10 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button 
                      className={`w-full mt-10 h-14 text-lg font-semibold transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-2xl transform scale-105'
                          : 'bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-800 border-2 border-gray-200'
                      }`}
                    >
                      {selectedPackage === pkg.id ? (
                        <span className="flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          الباقة المختارة
                        </span>
                      ) : (
                        "اختر هذه الباقة"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* ملخص التكلفة الكلي */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/20">
                <h3 className="text-2xl font-bold mb-6 text-center">ملخص التكلفة الكلي</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <div className="font-bold">{selectedPackageData.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedPackageData.description}</div>
                    </div>
                    <div className="text-xl font-bold">{selectedPackageData.price} ر.س</div>
                  </div>

                  <div className="space-y-3">
                    <div className="font-bold">التكاليف الإضافية:</div>
                    
                    {formData.teamSize && formData.teamSize !== "1" && (
                      <div className="flex justify-between items-center">
                        <span>فرق إضافية ({formData.teamSize === "4+" ? "4+ فرق" : `${formData.teamSize} فريق`})</span>
                        <span className="font-medium">
                          {(() => {
                            if (formData.teamSize === "2") return "2,000 ر.س";
                            if (formData.teamSize === "3") return "3,500 ر.س";
                            if (formData.teamSize === "4+") return "5,000 ر.س";
                            return "0 ر.س";
                          })()}
                        </span>
                      </div>
                    )}

                    {formData.engineers.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span>مهندسين إضافيين ({formData.engineers.length})</span>
                        <span className="font-medium">{(formData.engineers.length * 1000).toLocaleString()} ر.س</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t text-2xl font-bold">
                    <span>الإجمالي:</span>
                    <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {totalCost()} ر.س
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-4">
                    * السعر النهائي قد يختلف قليلاً بعد زيارة الموقع والتقييم الدقيق
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="gap-3 px-8 py-6 h-auto border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  <span className="font-semibold">السابق</span>
                </Button>
                
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="gap-3 px-8 py-6 h-auto bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="font-semibold">التالي: كيف نعمل معك</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 3: كيف نعمل معك */}
        {currentStep === 3 && (
          <section className="py-20">
            <div className="container">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-sm font-bold mb-6 shadow-lg border border-primary/20 backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                  الخطوة الثالثة - منهجية العمل الاحترافية
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  كيف نعمل معك؟
                </h2>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                  نتبع منهجية عمل علمية مدروسة تضمن لك جودة استثنائية وتنفيذ دقيق وفق أعلى المعايير العالمية
                </p>
              </div>

              <div className="relative mb-20">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -translate-y-1/2 rounded-full hidden lg:block"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
                  {workflowSteps.map((step, index) => (
                    <div key={step.step} className="relative">
                      <div className="bg-gradient-to-b from-card to-card/90 rounded-3xl p-8 border-2 border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl h-full group">
                        <div className="absolute -top-6 -right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                          0{step.step}
                        </div>
                        
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-8 border-2 border-primary/20 group-hover:scale-110 transition-transform duration-500">
                          <div className="text-primary">
                            {step.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-10 mb-20 border-2 border-primary/20">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">تقنيات متقدمة نستخدمها</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    نستخدم أحدث التقنيات الذكية لضمان دقة وأداء استثنائي لنظامك الشمسي
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {advancedTechnologies.map((tech, index) => (
                    <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {tech.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-20">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">فريق العمل الاحترافي</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    نعتمد على فريق متكامل من المتخصصين لضمان جودة استثنائية في كل مرحلة
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {professionalTeam.map((member, index) => (
                    <div key={index} className="bg-gradient-to-b from-card to-card/80 rounded-2xl p-6 border-2 border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                        <div className="text-primary">
                          {member.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-xl mb-3">{member.role}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
                      <div className="text-primary font-bold text-lg">{member.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="gap-3 px-8 py-6 h-auto border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  <span className="font-semibold">السابق</span>
                </Button>
                
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="gap-3 px-8 py-6 h-auto bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="font-semibold">التالي: ميزات التركيب</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 4: ميزات التركيب */}
        {currentStep === 4 && (
          <section className="py-20">
            <div className="container">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-sm font-bold mb-6 shadow-lg border border-primary/20 backdrop-blur-sm">
                  <Star className="w-5 h-5" />
                  الخطوة الرابعة - مزايا التركيب الاحترافية
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  مميزات تركيب استثنائية
                </h2>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                  نقدم لك تجربة تركيب شاملة مع تقنيات متطورة وخدمات مميزة تضمن أداءً استثنائياً لنظام الطاقة الشمسية الخاص بك
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {installationFeatures.map((feature) => (
                  <div 
                    key={feature.id} 
                    className="group bg-gradient-to-b from-card to-card/80 rounded-3xl p-8 border-2 border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px] relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-10 mb-20 border-2 border-primary/20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-3">98%</div>
                    <div className="text-lg font-semibold mb-2">رضا العملاء</div>
                    <div className="text-sm text-muted-foreground">نسبة رضا استثنائية</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-3">25+</div>
                    <div className="text-lg font-semibold mb-2">سنة ضمان</div>
                    <div className="text-sm text-muted-foreground">على أداء الألواح</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-3">1000+</div>
                    <div className="text-lg font-semibold mb-2">مشروع مكتمل</div>
                    <div className="text-sm text-muted-foreground">خبرة واسعة في التطبيق</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-3">24/7</div>
                    <div className="text-lg font-semibold mb-2">دعم فني</div>
                    <div className="text-sm text-muted-foreground">متوفر على مدار الساعة</div>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">أسئلة شائعة حول التركيب الاحترافي</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    إجابات مفصلة على الأسئلة الأكثر شيوعاً حول خدماتنا الاحترافية
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: "ما الذي يميز تركيبكم عن الآخرين؟",
                      a: "نتميز باستخدام أحدث التقنيات الذكية، تصميم ثلاثي الأبعاد دقيق، فريق عمل معتمد دولياً، ونظام مراقبة ذكي يتنبأ بالمشاكل قبل وقوعها."
                    },
                    {
                      q: "كم تستغرق عملية التركيب الكاملة؟",
                      a: "تتراوح من 3 إلى 10 أيام حسب حجم النظام، تشمل التصميم الدقيق، الحصول على التصاريح، التركيب الاحترافي، والاختبار الشامل."
                    },
                    {
                      q: "هل تقدمون ضماناً شاملاً؟",
                      a: "نعم، نقدم ضماناً شاملاً يصل إلى 25 سنة على الألواح، 10 سنوات على التركيب، و5 سنوات على جميع المكونات الكهربائية."
                    },
                    {
                      q: "كيف تتم المراقبة بعد التركيب؟",
                      a: "من خلال منصة ذكية تتيح لك مراقبة الأداء لحظياً، استقبال تقارير شهرية، وتنبيهات فورية عن أي تغييرات في الأداء."
                    },
                    {
                      q: "هل يمكنني توسيع النظام مستقبلاً؟",
                      a: "نعم، جميع أنظمتنا مصممة لتكون قابلة للتوسع بسهولة، ويمكننا إضافة المزيد من الألواح أو البطاريات عند الحاجة."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="group bg-card rounded-2xl p-6 border-2 border-border hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-start justify-between gap-6 cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                              <HelpCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                              {faq.q}
                            </h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed pl-14">
                            {faq.a}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="w-5 h-5 transform group-hover:rotate-90 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-20">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(3)}
                    className="gap-3 px-8 py-6 h-auto border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    <span className="font-semibold">السابق</span>
                  </Button>
                  
                  <div className="space-x-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="gap-3 px-8 py-6 h-auto border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">تعديل الحجز</span>
                    </Button>
                    
                    <Link href="/contact">
                      <Button className="gap-3 px-8 py-6 h-auto bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <Phone className="w-5 h-5" />
                        <span className="font-semibold">تواصل معنا الآن</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"></div>
        <div className="container relative">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative max-w-4xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">جاهز لبدء مشروع الطاقة الشمسية؟</h2>
              <p className="text-white/90 mb-10 text-xl leading-relaxed">
                انضم إلى الآلاف من العملاء الراضين واستمتع بفواتير كهرباء منخفضة وطاقة نظيفة مستدامة
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 gap-4 px-10 py-7 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="w-6 h-6" />
                  احجز خدمة التركيب الآن
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white/10 gap-4 px-10 py-7 text-lg font-semibold hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                    تواصل مع استشاري متخصص
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">ضمان 25 سنة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">دعم فني 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <TruckIcon className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">تركيب سريع</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// الأيقونات المخصصة
const DiamondIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const BrainIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);