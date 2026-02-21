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
  Monitor,
  Lightbulb,
  Globe,
  LineChart,
  Settings as SettingsIcon,
  FileBarChart,
  AlertCircle,
  Target as TargetIcon,
  Zap as ZapIcon,
  DollarSign,
  Percent,
  ChevronDown
} from "lucide-react";

// استيراد المكونات المشتركة
import Header from "../Header";
import Footer from "../Footer";

export default function EnergyConsultations() {
  const [selectedConsultationType, setSelectedConsultationType] = useState("solar");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    position: "",
    governorate: "",
    address: "",
    projectType: "residential",
    consultationType: "solar",
    energyConsumption: "1000-2000",
    monthlyBill: "",
    projectArea: "",
    budget: "",
    timeline: "1-3",
    priority: "cost-saving",
    currentEnergySource: "electricity",
    sustainabilityGoals: [],
    monitoringNeeds: "basic",
    message: "",
    preferredDate: "",
    preferredTime: "morning",
    contactMethod: ["phone", "whatsapp"],
    documents: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFAQ, setActiveFAQ] = useState(null);
  
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // أنواع الاستشارات
  const consultationTypes = [
    {
      id: "solar",
      name: "استشارات الطاقة الشمسية",
      description: "تصميم وتركيب أنظمة الطاقة الشمسية المتكاملة",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      details: [
        "دراسة جدوى اقتصادية شاملة",
        "تصميم النظام الأمثل",
        "تحليل العائد على الاستثمار",
        "اختيار المعدات المناسبة"
      ]
    },
    {
      id: "efficiency",
      name: "كفاءة الطاقة",
      description: "تحسين استهلاك الطاقة وتقليل الفاقد",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      details: [
        "مراجعة أنظمة الإضاءة والتكييف",
        "تحسين العزل الحراري",
        "ترشيد استهلاك الأجهزة",
        "برامج تخفيض الاستهلاك"
      ]
    },
    {
      id: "audit",
      name: "التدقيق والمراجعة",
      description: "مراجعة شاملة لأنظمة الطاقة الحالية",
      icon: <FileCheck className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      details: [
        "فحص شامل لأنظمة الطاقة",
        "تحديد نقاط الهدر",
        "توصيات تحسين الأداء",
        "معايير السلامة والجودة"
      ]
    },
    {
      id: "sustainability",
      name: "الاستدامة",
      description: "خطط التحول للطاقة النظيفة والمستدامة",
      icon: <Globe className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      details: [
        "خطط التحول للطاقة المتجددة",
        "التزام المعايير البيئية",
        "شهادات الاستدامة",
        "تقارير الكربون"
      ]
    },
    {
      id: "industrial",
      name: "استشارات صناعية",
      description: "حلول الطاقة للمصانع والمنشآت الكبيرة",
      icon: <Factory className="w-8 h-8" />,
      color: "from-red-500 to-amber-500",
      details: [
        "حلول الطاقة للصناعات",
        "أنظمة التوليد المشترك",
        "إدارة الأحمال الصناعية",
        "التحكم في التكاليف"
      ]
    }
  ];

  // أنواع المشاريع
  const projectTypes = [
    {
      id: "residential",
      name: "سكني",
      description: "فلل، عمائر، مجمعات سكنية",
      icon: <Home className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "commercial",
      name: "تجاري",
      description: "مراكز تجارية، مكاتب، فنادق",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "industrial",
      name: "صناعي",
      description: "مصانع، معامل، منشآت إنتاجية",
      icon: <Factory className="w-6 h-6" />,
      color: "from-red-500 to-orange-500"
    },
    {
      id: "agricultural",
      name: "زراعي",
      description: "مزارع، مشاريع زراعية، بيوت محمية",
      icon: <Trees className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "governmental",
      name: "حكومي",
      description: "مباني حكومية، مدارس، مستشفيات",
      icon: <Building className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800"
    }
  ];

  // المحافظات
  const governorates = [
    "الرياض", "مكة المكرمة", "المدينة المنورة", "الشرقية", 
    "القصيم", "حائل", "تبوك", "الجوف", "الحدود الشمالية",
    "جازان", "نجران", "الباحة", "عسير"
  ];

  // أولويات المشروع
  const priorities = [
    {
      id: "cost-saving",
      name: "توفير التكاليف",
      description: "التركيز على تقليل فواتير الطاقة",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: "sustainability",
      name: "الاستدامة البيئية",
      description: "التركيز على البصمة الكربونية",
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: "reliability",
      name: "الموثوقية",
      description: "ضمان استمرارية الطاقة",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "fast-roi",
      name: "عائد استثمار سريع",
      description: "استرجاع التكلفة في أقصر وقت",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  // أهداف الاستدامة
  const sustainabilityGoals = [
    { id: "carbon-neutral", name: "حياد كربوني", icon: <Globe className="w-4 h-4" /> },
    { id: "energy-independence", name: "استقلال طاقي", icon: <Zap className="w-4 h-4" /> },
    { id: "leed-cert", name: "شهادة LEED", icon: <Award className="w-4 h-4" /> },
    { id: "green-building", name: "مباني خضراء", icon: <Building className="w-4 h-4" /> },
    { id: "water-saving", name: "ترشيد المياه", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "waste-reduction", name: "تقليل النفايات", icon: <Trash2 className="w-4 h-4" /> }
  ];

  // مراحل تقديم الاستشارة
  const consultationSteps = [
    {
      step: 1,
      title: "التقييم الأولي",
      description: "تحليل الاحتياجات والدراسة الأولية للمشروع",
      duration: "2-3 أيام",
      icon: <Target className="w-8 h-8" />,
      details: [
        "جمع البيانات والمعلومات",
        "تحليل الاستهلاك الحالي",
        "تحديد الأهداف والاحتياجات",
        "دراسة الموقع والظروف"
      ]
    },
    {
      step: 2,
      title: "الدراسة الفنية",
      description: "تحليل فني متعمق وإعداد الحلول المقترحة",
      duration: "3-5 أيام",
      icon: <FileBarChart className="w-8 h-8" />,
      details: [
        "تحليل البيانات الفنية",
        "دراسة الحلول المتاحة",
        "حساب المؤشرات الاقتصادية",
        "إعداد نماذج المحاكاة"
      ]
    },
    {
      step: 3,
      title: "إعداد التقرير",
      description: "إعداد تقرير مفصل مع التوصيات والحلول",
      duration: "2-3 أيام",
      icon: <FileText className="w-8 h-8" />,
      details: [
        "إعداد التقرير الشامل",
        "عرض المقترحات والحلول",
        "تحليل التكلفة والعائد",
        "خطة التنفيذ الزمنية"
      ]
    },
    {
      step: 4,
      title: "عرض التقرير والمتابعة",
      description: "عرض النتائج وتقديم الدعم اللازم للتنفيذ",
      duration: "1-2 أيام",
      icon: <PresentationIcon className="w-8 h-8" />,
      details: [
        "عرض التقرير والمقترحات",
        "مناقشة خيارات التنفيذ",
        "تقديم الدعم الفني",
        "برنامج المتابعة"
      ]
    }
  ];

  // خدمات الاستشارات
  const consultationServices = [
    {
      id: "feasibility-study",
      title: "دراسة الجدوى الاقتصادية",
      description: "تحليل دقيق للتكلفة والعائد على الاستثمار لمشاريع الطاقة",
      icon: <Calculator className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "تحليل التكلفة الرأسمالية",
        "حساب فترة الاسترداد",
        "تحليل التدفق النقدي",
        "مؤشرات الربحية"
      ],
      time: "5-7 أيام",
      price: "5,000+"
    },
    {
      id: "energy-audit",
      title: "تدقيق الطاقة الشامل",
      description: "فحص شامل لأنظمة الطاقة وتحديد فرص التحسين والتوفير",
      icon: <FileCheck className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "فحص جميع أنظمة الطاقة",
        "تحليل فواتير الاستهلاك",
        "تحديد فرص التوفير",
        "توصيات تحسين الكفاءة"
      ],
      time: "3-5 أيام",
      price: "3,000+"
    },
    {
      id: "system-design",
      title: "التصميم الفني المتكامل",
      description: "تصميم أنظمة الطاقة المتجددة وفق أحدث المعايير العالمية",
      icon: <SettingsIcon className="w-10 h-10" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "تصميم ثلاثي الأبعاد",
        "محاكاة أداء النظام",
        "اختيار المعدات المناسبة",
        "الرسومات التنفيذية"
      ],
      time: "7-10 أيام",
      price: "8,000+"
    },
    {
      id: "sustainability-plan",
      title: "خطط الاستدامة",
      description: "إعداد خطط متكاملة للتحول نحو الطاقة النظيفة والمستدامة",
      icon: <Globe className="w-10 h-10" />,
      color: "from-yellow-500 to-amber-500",
      features: [
        "خطط التحول الطاقي",
        "معايير الاستدامة",
        "تقارير البصمة الكربونية",
        "شهادات الاعتماد"
      ],
      time: "10-14 يوم",
      price: "10,000+"
    }
  ];

  // مزايا الاستشارات
  const consultationBenefits = [
    {
      title: "توفير يصل إلى 40%",
      description: "في فواتير الطاقة من خلال تحسين الكفاءة",
      icon: <Percent className="w-8 h-8" />,
      color: "text-green-500"
    },
    {
      title: "عائد استثمار سريع",
      description: "فترة استرداد تتراوح بين 2-5 سنوات",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-blue-500"
    },
    {
      title: "خبرة أكثر من 15 سنة",
      description: "في مجال استشارات الطاقة والاستدامة",
      icon: <Award className="w-8 h-8" />,
      color: "text-purple-500"
    },
    {
      title: "دعم فني متكامل",
      description: "مرافقة كاملة من الدراسة إلى التنفيذ",
      icon: <Headphones className="w-8 h-8" />,
      color: "text-orange-500"
    }
  ];

  // فريق الخبراء
  const expertTeam = [
    {
      name: "د. أحمد الشمري",
      role: "خبير الطاقة الشمسية",
      experience: "18 سنة",
      specialties: ["أنظمة الطاقة الشمسية", "التصميم الفني", "الدراسات الاقتصادية"],
      certifications: ["CEM", "LEED AP", "PMI-PMP"],
      imageColor: "from-blue-500 to-cyan-500"
    },
    {
      name: "م. سارة القحطاني",
      role: "خبيرة كفاءة الطاقة",
      experience: "12 سنة",
      specialties: ["تدقيق الطاقة", "تحسين الكفاءة", "إدارة الطاقة"],
      certifications: ["CEM", "CMVP", "BEP"],
      imageColor: "from-purple-500 to-pink-500"
    },
    {
      name: "د. محمد العتيبي",
      role: "خبير الاستدامة",
      experience: "15 سنة",
      specialties: ["الاستدامة البيئية", "شهادات المباني الخضراء", "تقارير الكربون"],
      certifications: ["LEED AP", "WELL AP", "GRI"],
      imageColor: "from-green-500 to-emerald-500"
    },
    {
      name: "م. خالد الجبير",
      role: "خبير المشاريع الصناعية",
      experience: "20 سنة",
      specialties: ["الطاقة الصناعية", "التوليد المشترك", "إدارة الأحمال"],
      certifications: ["CEM", "CBCP", "CEA"],
      imageColor: "from-red-500 to-amber-500"
    }
  ];

  // الأسئلة الشائعة
  const faqs = [
    {
      question: "ما الفرق بين الاستشارة والتركيب؟",
      answer: "الاستشارة تركز على الدراسة والتخطيط واختيار الحلول الأمثل، بينما التركيب هو التنفيذ الفعلي. نقدم خدمة متكاملة تشمل الاستشارة ثم التركيب إذا رغبت."
    },
    {
      question: "كم تستغرق عملية الاستشارة الكاملة؟",
      answer: "تتراوح مدة الاستشارة بين 10-20 يوم عمل حسب حجم المشروع وتعقيده، تشمل جمع البيانات، الدراسة الفنية، وإعداد التقرير النهائي."
    },
    {
      question: "هل تقدموا ضماناً على التوصيات؟",
      answer: "نعم، نضمن أن توصياتنا ستؤدي إلى تحقيق الأهداف المتفق عليها، مع تقديم دعم فني لمدة عام كامل بعد تسليم التقرير."
    },
    {
      question: "ما هي تكلفة خدمة الاستشارة؟",
      answer: "تختلف التكلفة حسب حجم المشروع ونوع الخدمة، تبدأ من 3,000 ريال للدراسات البسيطة وقد تصل إلى 50,000 ريال للمشاريع الكبيرة."
    },
    {
      question: "هل يمكنني الاعتماد على تقريركم للتمويل؟",
      answer: "نعم، تقاريرنا معتمدة من جهات التمويل المحلية والدولية، ونقدم دعماً في إعداد مستندات التمويل."
    }
  ];

  // خطوات التنقل
  const steps = [
    { id: 1, name: "طلب الاستشارة", icon: <FileText className="w-5 h-5" /> },
    { id: 2, name: "اختيار الخدمات", icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 3, name: "معلومات المشروع", icon: <ClipboardCheck className="w-5 h-5" /> },
    { id: 4, name: "التأكيد والإرسال", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsultationTypeSelect = (typeId) => {
    setSelectedConsultationType(typeId);
    setFormData(prev => ({
      ...prev,
      consultationType: typeId
    }));
  };

  const handleProjectTypeSelect = (typeId) => {
    setFormData(prev => ({
      ...prev,
      projectType: typeId
    }));
  };

  const handlePrioritySelect = (priorityId) => {
    setFormData(prev => ({
      ...prev,
      priority: priorityId
    }));
  };

  const handleSustainabilityGoalToggle = (goalId) => {
    setFormData(prev => {
      const currentGoals = [...prev.sustainabilityGoals];
      if (currentGoals.includes(goalId)) {
        return { ...prev, sustainabilityGoals: currentGoals.filter(id => id !== goalId) };
      } else {
        return { ...prev, sustainabilityGoals: [...currentGoals, goalId] };
      }
    });
  };

  const handleContactMethodToggle = (method) => {
    setFormData(prev => {
      const currentMethods = [...prev.contactMethod];
      if (currentMethods.includes(method)) {
        return { ...prev, contactMethod: currentMethods.filter(m => m !== method) };
      } else {
        return { ...prev, contactMethod: [...currentMethods, method] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      type: file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : 'other',
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      url: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newFiles.map(f => f.id)]
    }));
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(id => id !== fileId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // إعادة تعيين النموذج بعد 5 ثواني
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          companyName: "",
          position: "",
          governorate: "",
          address: "",
          projectType: "residential",
          consultationType: "solar",
          energyConsumption: "1000-2000",
          monthlyBill: "",
          projectArea: "",
          budget: "",
          timeline: "1-3",
          priority: "cost-saving",
          currentEnergySource: "electricity",
          sustainabilityGoals: [],
          monitoringNeeds: "basic",
          message: "",
          preferredDate: "",
          preferredTime: "morning",
          contactMethod: ["phone", "whatsapp"],
          documents: []
        });
        setUploadedFiles([]);
        setCurrentStep(1);
      }, 5000);
    }, 2000);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* شريط التنقل */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-xl transform scale-105'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50 hover:shadow-md'
                  }`}
                >
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
                    currentStep === step.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-gray-100'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="font-semibold text-sm lg:text-base whitespace-nowrap">
                    {step.name}
                  </span>
                  
                  {currentStep === step.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rotate-45"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                الخطوة {currentStep} من {steps.length}
              </div>
              <div className="hidden md:block text-xs text-gray-500">
                التقدم: {Math.round((currentStep / steps.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* الخطوة 1: طلب الاستشارة */}
        {currentStep === 1 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-bold mb-6 shadow-lg border border-green-200">
                  <Lightbulb className="w-5 h-5" />
                  الخطوة الأولى - اختر نوع الاستشارة
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  استشارات الطاقة المتخصصة
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  احصل على استشارة متخصصة من خبراء الطاقة لتوفير التكاليف وزيادة الكفاءة وتحقيق الاستدامة في مشروعك
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleConsultationTypeSelect(type.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-right group hover:shadow-xl ${
                      selectedConsultationType === type.id
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {type.icon}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 group-hover:text-green-600 transition-colors">
                      {type.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      {type.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    {selectedConsultationType === type.id && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span className="font-semibold">التالي: اختيار الخدمات</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 2: اختيار الخدمات */}
        {currentStep === 2 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-bold mb-6 shadow-lg border border-green-200">
                  <SettingsIcon className="w-5 h-5" />
                  الخطوة الثانية - اختر الخدمات المطلوبة
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                  خدمات استشارات الطاقة المتكاملة
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  اختر من بين خدماتنا المتخصصة التي تناسب احتياجات مشروعك
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {consultationServices.map((service) => (
                  <div 
                    key={service.id}
                    className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-green-300 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <h4 className="font-bold text-gray-800">المميزات:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">{service.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-bold text-green-600">{service.price} ر.س</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600"
                      >
                        اختر الخدمة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* مزايا الاستشارات */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-16 border border-green-200">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">
                  مزايا الاستشارات الاحترافية
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {consultationBenefits.map((benefit, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors">
                      <div className={`${benefit.color} mb-4`}>
                        {benefit.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="gap-3 px-8 py-6 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  <span className="font-semibold">السابق</span>
                </Button>
                
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span className="font-semibold">التالي: معلومات المشروع</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 3: معلومات المشروع */}
        {currentStep === 3 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-bold mb-6 shadow-lg border border-green-200">
                  <ClipboardCheck className="w-5 h-5" />
                  الخطوة الثالثة - معلومات المشروع والاحتياجات
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                  أخبرنا عن مشروعك
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  كلما كانت المعلومات دقيقة، كانت الاستشارة أكثر فائدة لمشروعك
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* معلومات أساسية */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <User className="w-6 h-6 text-green-600" />
                      المعلومات الأساسية
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">الاسم الكامل *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">رقم الجوال *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="05XXXXXXXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">البريد الإلكتروني *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">اسم الشركة / المؤسسة</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="اسم الشركة أو المؤسسة"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">المنصب</label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="منصبك في المؤسسة"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">المحافظة *</label>
                        <select
                          name="governorate"
                          value={formData.governorate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          required
                        >
                          <option value="">اختر المحافظة</option>
                          {governorates.map((gov) => (
                            <option key={gov} value={gov}>{gov}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* معلومات المشروع */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <Building className="w-6 h-6 text-green-600" />
                      معلومات المشروع
                    </h3>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-4 text-gray-700">نوع المشروع *</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {projectTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleProjectTypeSelect(type.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group ${
                              formData.projectType === type.id
                                ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                              <div className="text-white">
                                {type.icon}
                              </div>
                            </div>
                            <div className="font-bold text-sm mb-1">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">الموقع / العنوان التفصيلي</label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                            placeholder="الحي - الشارع - رقم المبنى"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">المساحة التقريبية (م²)</label>
                        <input
                          type="text"
                          name="projectArea"
                          value={formData.projectArea}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="المساحة الإجمالية للمشروع"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">استهلاك الطاقة الشهري التقريبي (ك.و.س)</label>
                        <select
                          name="energyConsumption"
                          value={formData.energyConsumption}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        >
                          <option value="0-1000">أقل من 1,000</option>
                          <option value="1000-2000">1,000 - 2,000</option>
                          <option value="2000-5000">2,000 - 5,000</option>
                          <option value="5000-10000">5,000 - 10,000</option>
                          <option value="10000+">أكثر من 10,000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">فاتورة الكهرباء الشهرية (ر.س)</label>
                        <input
                          type="text"
                          name="monthlyBill"
                          value={formData.monthlyBill}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="متوسط فاتورة الكهرباء الشهرية"
                        />
                      </div>
                    </div>
                  </div>

                  {/* الأهداف والمتطلبات */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <TargetIcon className="w-6 h-6 text-green-600" />
                      الأهداف والمتطلبات
                    </h3>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-4 text-gray-700">الهدف الرئيسي للمشروع *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {priorities.map((priority) => (
                          <button
                            key={priority.id}
                            type="button"
                            onClick={() => handlePrioritySelect(priority.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                              formData.priority === priority.id
                                ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                              <div className="text-green-600">
                                {priority.icon}
                              </div>
                            </div>
                            <div className="font-bold text-sm mb-1">{priority.name}</div>
                            <div className="text-xs text-gray-500">{priority.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-4 text-gray-700">أهداف الاستدامة (اختياري)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {sustainabilityGoals.map((goal) => (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => handleSustainabilityGoalToggle(goal.id)}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 ${
                              formData.sustainabilityGoals.includes(goal.id)
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              formData.sustainabilityGoals.includes(goal.id)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {goal.icon}
                            </div>
                            <span className="text-sm font-medium text-right flex-1">{goal.name}</span>
                            {formData.sustainabilityGoals.includes(goal.id) && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">الميزانية المتوقعة (ر.س)</label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="الميزانية المخصصة للمشروع"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">الإطار الزمني المطلوب (أشهر)</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        >
                          <option value="1-3">1-3 أشهر</option>
                          <option value="3-6">3-6 أشهر</option>
                          <option value="6-12">6-12 شهر</option>
                          <option value="12+">أكثر من سنة</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* المستندات المرفقة */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <FileText className="w-6 h-6 text-green-600" />
                      المستندات المرفقة
                    </h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        أضف المستندات المساعدة (اختياري)
                      </label>
                      <div 
                        className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <div className="font-medium mb-2 text-gray-700">اسحب وأفلت الملفات أو انقر للرفع</div>
                        <div className="text-sm text-gray-500">
                          يمكنك رفع صور، PDF، Excel (الحد الأقصى 50MB لكل ملف)
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                          className="hidden"
                        />
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700">
                          الملفات المرفوعة ({uploadedFiles.length})
                        </label>
                        <div className="space-y-3">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  file.type === 'pdf' ? 'bg-red-100 text-red-600' :
                                  file.type === 'image' ? 'bg-blue-100 text-blue-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {file.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                                   file.type === 'image' ? <Image className="w-5 h-5" /> :
                                   <FileText className="w-5 h-5" />}
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-gray-800">{file.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {file.type === 'pdf' ? 'PDF' : file.type === 'image' ? 'صورة' : 'مستند'} • {file.size} MB
                                  </div>
                                </div>
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFile(file.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* معلومات إضافية */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                      معلومات إضافية
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">تفاصيل إضافية عن المشروع</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                          placeholder="أي معلومات إضافية تريد إضافتها عن المشروع أو الاحتياجات الخاصة..."
                        ></textarea>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">طريقة التواصل المفضلة *</label>
                          <div className="space-y-3">
                            {[
                              { id: "phone", name: "مكالمة هاتفية", icon: <Phone className="w-4 h-4" /> },
                              { id: "whatsapp", name: "واتساب", icon: <MessageSquare className="w-4 h-4" /> },
                              { id: "email", name: "بريد إلكتروني", icon: <Mail className="w-4 h-4" /> },
                              { id: "visit", name: "زيارة موقع", icon: <MapPin className="w-4 h-4" /> }
                            ].map((method) => (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => handleContactMethodToggle(method.id)}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                                  formData.contactMethod.includes(method.id)
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-green-300'
                                }`}
                              >
                                <div className={`p-2 rounded-lg ${
                                  formData.contactMethod.includes(method.id)
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {method.icon}
                                </div>
                                <span className="text-sm font-medium flex-1 text-right">{method.name}</span>
                                {formData.contactMethod.includes(method.id) && (
                                  <Check className="w-4 h-4 text-green-500" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">التاريخ المفضل للتواصل</label>
                            <input
                              type="date"
                              name="preferredDate"
                              value={formData.preferredDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">الوقت المفضل للتواصل</label>
                            <select
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                            >
                              <option value="morning">صباحاً (8 ص - 12 م)</option>
                              <option value="afternoon">ظهراً (12 م - 4 ع)</option>
                              <option value="evening">مساءً (4 ع - 8 م)</option>
                              <option value="flexible">أي وقت يناسبكم</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="flex-1 gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <span className="font-semibold">التالي: التأكيد والإرسال</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 gap-3 px-8 py-6 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                      <span className="font-semibold">السابق</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* الخطوة 4: التأكيد والإرسال */}
        {currentStep === 4 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-bold mb-6 shadow-lg border border-green-200">
                  <CheckCircle className="w-5 h-5" />
                  الخطوة الرابعة - تأكيد المعلومات والإرسال
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                  تأكيد طلب الاستشارة
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                راجع المعلومات التالية وتأكد من صحتها قبل الإرسال
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">تم إرسال طلبك بنجاح! 🎉</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    سنتواصل معك خلال 24 ساعة لتأكيد تفاصيل الاستشارة وتحديد الموعد المناسب.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setCurrentStep(1)}
                      className="gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                    >
                      <FileText className="w-5 h-5" />
                      طلب استشارة جديدة
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="gap-3 px-8 py-6 border-2 border-gray-300 hover:border-green-500">
                        <Home className="w-5 h-5" />
                        العودة للرئيسية
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900">ملخص المعلومات</h3>
                    
                    <div className="space-y-8">
                      {/* المعلومات الشخصية */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                          <User className="w-5 h-5 text-green-600" />
                          المعلومات الشخصية
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">الاسم</div>
                            <div className="font-medium">{formData.name || "لم يتم التحديد"}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">الهاتف</div>
                            <div className="font-medium">{formData.phone || "لم يتم التحديد"}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">البريد الإلكتروني</div>
                            <div className="font-medium">{formData.email || "لم يتم التحديد"}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">الشركة</div>
                            <div className="font-medium">{formData.companyName || "لم يتم التحديد"}</div>
                          </div>
                        </div>
                      </div>

                      {/* معلومات المشروع */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                          <Building className="w-5 h-5 text-green-600" />
                          معلومات المشروع
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">نوع المشروع</div>
                            <div className="font-medium">
                              {projectTypes.find(p => p.id === formData.projectType)?.name || "لم يتم التحديد"}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">نوع الاستشارة</div>
                            <div className="font-medium">
                              {consultationTypes.find(c => c.id === formData.consultationType)?.name || "لم يتم التحديد"}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">الهدف الرئيسي</div>
                            <div className="font-medium">
                              {priorities.find(p => p.id === formData.priority)?.name || "لم يتم التحديد"}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">المحافظة</div>
                            <div className="font-medium">{formData.governorate || "لم يتم التحديد"}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">المساحة</div>
                            <div className="font-medium">{formData.projectArea ? `${formData.projectArea} م²` : "لم يتم التحديد"}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">الاستهلاك الشهري</div>
                            <div className="font-medium">
                              {formData.energyConsumption === "1000-2000" ? "1,000 - 2,000 ك.و.س" : 
                               formData.energyConsumption === "2000-5000" ? "2,000 - 5,000 ك.و.س" :
                               formData.energyConsumption === "5000-10000" ? "5,000 - 10,000 ك.و.س" :
                               formData.energyConsumption === "10000+" ? "أكثر من 10,000 ك.و.س" :
                               "أقل من 1,000 ك.و.س"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* الأهداف والمتطلبات */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                          <TargetIcon className="w-5 h-5 text-green-600" />
                          الأهداف والمتطلبات
                        </h4>
                        <div className="space-y-4">
                          {formData.sustainabilityGoals.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-2">أهداف الاستدامة المحددة</div>
                              <div className="flex flex-wrap gap-2">
                                {formData.sustainabilityGoals.map(goalId => {
                                  const goal = sustainabilityGoals.find(g => g.id === goalId);
                                  return goal ? (
                                    <span key={goalId} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                      {goal.name}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">طريقة التواصل المفضلة</div>
                              <div className="font-medium">
                                {formData.contactMethod.map(method => {
                                  const methods = {
                                    "phone": "هاتف",
                                    "whatsapp": "واتساب",
                                    "email": "بريد",
                                    "visit": "زيارة"
                                  };
                                  return methods[method];
                                }).join("، ")}
                              </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">الميزانية</div>
                              <div className="font-medium">{formData.budget ? `${formData.budget} ر.س` : "غير محددة"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* الأسئلة الشائعة */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900">أسئلة شائعة</h3>
                    
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <HelpCircle className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-lg">{faq.question}</span>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                              activeFAQ === index ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {activeFAQ === index && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-gray-200 pt-6">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* فريق الخبراء */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">فريق خبرائنا</h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {expertTeam.map((expert, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${expert.imageColor} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                            {expert.name.split(' ')[1].charAt(0)}
                          </div>
                          <h4 className="font-bold text-lg mb-2">{expert.name}</h4>
                          <p className="text-green-600 text-sm mb-3">{expert.role}</p>
                          <div className="text-xs text-gray-500 mb-4">
                            خبرة {expert.experience}
                          </div>
                          <div className="space-y-2 mb-4">
                            {expert.specialties.map((spec, idx) => (
                              <div key={idx} className="text-xs text-gray-600">
                                • {spec}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {expert.certifications.map((cert, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* مراحل العمل */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 mb-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">مراحل تقديم الاستشارة</h3>
                    
                    <div className="relative">
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-green-200 via-green-300 to-green-200 -translate-y-1/2 rounded-full hidden lg:block"></div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
                        {consultationSteps.map((step, index) => (
                          <div key={step.step} className="relative">
                            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 hover:border-green-300 transition-all duration-300 shadow-lg h-full">
                              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                0{step.step}
                              </div>
                              
                              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 border-2 border-green-200">
                                <div className="text-green-600">
                                  {step.icon}
                                </div>
                              </div>
                              
                              <h3 className="text-xl font-bold mb-3 text-gray-900">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                {step.description}
                              </p>
                              
                              <div className="space-y-2 mb-4">
                                {step.details.map((detail, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                                    <span className="text-xs text-gray-600">{detail}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                <Clock className="w-3 h-3" />
                                <span>{step.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="gap-3 px-8 py-6 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                      <span className="font-semibold">السابق</span>
                    </Button>
                    
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">إرسال طلب الاستشارة</span>
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">جاهز لتحقيق توفير حقيقي في الطاقة؟</h2>
              <p className="text-white/90 mb-10 text-lg leading-relaxed">
                احصل على استشارة احترافية من خبراء الطاقة وابدأ رحلة التوفير والاستدامة اليوم
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  size="lg" 
                  className="bg-white text-green-700 hover:bg-white/90 gap-4 px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Lightbulb className="w-6 h-6" />
                  ابدأ الآن
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white/10 gap-4 px-10 py-6 text-lg font-semibold backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                    تواصل مع استشاري
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">خبرة 15+ سنة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">دعم متكامل</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">ضمان النتائج</span>
                </div>
                <div className="flex items-center gap-3">
                  <LineChart className="w-6 h-6 text-white/80" />
                  <span className="text-white/90">توفير يصل لـ40%</span>
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
const PresentationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h20"/>
    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/>
    <path d="m7 21 5-5 5 5"/>
  </svg>
);